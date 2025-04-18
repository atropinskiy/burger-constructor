import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	LoginForm,
	LoginResponse,
	RegistrationForm,
	RegistrationResponse,
	FetchUserResponse,
	RefreshTokenResponse,
	LogoutResponse,
	ForgotPasswordResponse,
	ResetPasswordResponse,
	ResetPasswordRequest,
	UpdateUserRequest,
	UpdateUserResponse,
} from '@customTypes/auth/types';
import { BASE_URL } from '@utils/constants';
import { setTokens, setUser, logout } from './slices';

const handleError = async (response: Response) => {
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Неизвестная ошибка');
	}
};

const handleCatch = (
	error: unknown,
	rejectWithValue: (value: string) => unknown
) => {
	if (error instanceof Error) {
		return rejectWithValue(error.message);
	}
	return rejectWithValue('Неизвестная ошибка');
};

export const loginUser = createAsyncThunk<
	LoginResponse,
	LoginForm,
	{ rejectValue: string }
>('user/login', async (data: LoginForm, { rejectWithValue, dispatch }) => {
	try {
		const response = await fetch(`${BASE_URL}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		await handleError(response);

		const responseData = await response.json();

		const accessToken = responseData.accessToken.split(' ')[1];
		const refreshToken = responseData.refreshToken;

		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);

		dispatch(setTokens({ accessToken, refreshToken }));

		return responseData;
	} catch (error: unknown) {
		return handleCatch(error, rejectWithValue);
	}
});

export const registerUser = createAsyncThunk<
	RegistrationResponse,
	RegistrationForm,
	{ rejectValue: string }
>('auth/register', async (formData, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		await handleError(response);

		const data: RegistrationResponse = await response.json();
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const fetchUser = createAsyncThunk<
	FetchUserResponse,
	void,
	{ rejectValue: string }
>('user/fetchUser', async (_, { rejectWithValue, dispatch }) => {
	console.log('token: ', localStorage.getItem('accessToken'));
	try {
		const response = await fetch(`${BASE_URL}/auth/user`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		if (!response.ok) {
			if (response.status === 403) {
				const errorData = await response.json();
				console.log(errorData.message);
				if (errorData.message === 'jwt expired') {
					const refreshResponse = await dispatch(refreshToken()).unwrap();
					if (refreshResponse.success) {
						const retryResponse = await fetch(`${BASE_URL}/auth/user`, {
							method: 'GET',
							headers: {
								Authorization: `${refreshResponse.accessToken}`,
							},
						});

						if (!retryResponse.ok) {
							throw new Error(
								'Не удалось получить данные пользователя после обновления токена'
							);
						}

						const data = await retryResponse.json();
						return data.user;
					} else {
						throw new Error('Не удалось обновить токен');
					}
				} else {
					throw new Error(errorData.message || 'Неизвестная ошибка');
				}
			}

			throw new Error('Не удалось получить данные пользователя');
		}

		const data = await response.json();
		dispatch(setUser(data.user));
		return data.user;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const refreshToken = createAsyncThunk<
	RefreshTokenResponse,
	void,
	{ rejectValue: string }
>('user/refreshToken', async (_, { rejectWithValue }) => {
	try {
		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) {
			throw new Error('Токен обновления отсутствует');
		}

		const response = await fetch(`${BASE_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});

		await handleError(response);

		const data: RefreshTokenResponse = await response.json();

		if (!data.success) {
			return rejectWithValue('Не удалось обновить токен');
		}

		localStorage.setItem('accessToken', data.accessToken.slice(7));
		localStorage.setItem('refreshToken', data.refreshToken);

		return {
			success: data.success,
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const logOut = createAsyncThunk<
	LogoutResponse,
	void,
	{ rejectValue: string }
>('user/logout', async (_, { rejectWithValue, dispatch }) => {
	try {
		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) {
			throw new Error('Токен обновления отсутствует');
		}

		const response = await fetch(`${BASE_URL}/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		});

		await handleError(response);

		dispatch(logout());

		return { success: true, message: 'Successful logout' };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const forgotPassword = createAsyncThunk<
	ForgotPasswordResponse,
	{ email: string },
	{ rejectValue: string }
>('user/forgotPassword', async ({ email }, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BASE_URL}/password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		await handleError(response);

		return { success: true, message: 'Reset email sent' };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const resetPassword = createAsyncThunk<
	ResetPasswordResponse,
	ResetPasswordRequest,
	{ rejectValue: string }
>('user/resetPassword', async ({ password, token }, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BASE_URL}/password-reset/reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, token }),
		});

		await handleError(response);

		const data: ResetPasswordResponse = await response.json();
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const updateUser = createAsyncThunk<
	UpdateUserResponse,
	UpdateUserRequest,
	{ rejectValue: string }
>(
	'user/updateUser',
	async ({ email, name, password, token }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/auth/user`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ email, name, password }),
			});

			await handleError(response);

			const data: UpdateUserResponse = await response.json();

			return data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Неизвестная ошибка');
		}
	}
);
