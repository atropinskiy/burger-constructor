import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm, LoginResponse, RegistrationForm, RegistrationResponse, FetchUserResponse, RefreshTokenResponse, LogoutResponse } from '@customTypes/auth/types';
import { BASE_URL } from '@utils/constants';
import { setTokens, setUser, logout } from './slices';

export const loginUser = createAsyncThunk<LoginResponse, LoginForm, { rejectValue: string }>(
  'user/login',
  async (data: LoginForm, { rejectWithValue, dispatch }) => {  // <-- добавили dispatch!
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      const responseData = await response.json();

      // Извлекаем токены
      const accessToken = responseData.accessToken.split(' ')[1]; 
      const refreshToken = responseData.refreshToken;

      // ✅ Сохраняем в localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // ✅ Передаём токены в Redux
      dispatch(setTokens({ accessToken, refreshToken }));

      return responseData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



export const registerUser = createAsyncThunk<RegistrationResponse, RegistrationForm, { rejectValue: string }>(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации");
      }

      const data: RegistrationResponse = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const fetchUser = createAsyncThunk<FetchUserResponse, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue, dispatch }) => {
    console.log('token: ', localStorage.getItem('accessToken'))
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
          console.log(errorData.message)
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
                throw new Error('Не удалось получить данные пользователя после обновления токена');
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
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const refreshToken = createAsyncThunk<RefreshTokenResponse, void, { rejectValue: string }>(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
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
        body: JSON.stringify({ token: refreshToken }), // передаем refreshToken в теле запроса
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить токен');
      }

      const data: RefreshTokenResponse = await response.json();

      if (!data.success) {
        return rejectWithValue('Не удалось обновить токен');
      }

      localStorage.setItem('accessToken', data.accessToken.slice(7));
      localStorage.setItem('refreshToken', data.refreshToken);

      // Возвращаем объект, который соответствует RefreshTokenResponse
      return {
        success: data.success, // необходимо вернуть поле success
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk<LogoutResponse, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue, dispatch }) => {
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

      if (!response.ok) {
        throw new Error('Не удалось завершить сессию на сервере');
      }

      // Выполняем логаут в Redux
      dispatch(logout());

      // Возвращаем успешный ответ с сообщением
      return { success: true, message: 'Successful logout' };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
