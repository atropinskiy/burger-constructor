import reducer, {
	setUser,
	setError,
	setUserChecked,
	setVisitedForgotPassword,
	setTokens,
} from './slices';
import { RegistrationForm, User } from '@customTypes/auth/types';
import { loginUser, registerUser } from './actions';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer,
});

describe('userSlice', () => {
	const initialState = {
		user: null,
		isLogged: null,
		error: null,
		isUserChecked: false,
		loading: false,
		visitedForgotPassword: false,
	};

	it('должен вернуть начальное состояние', () => {
		expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
			initialState
		);
	});

	it('обрабатывает setUser', () => {
		const user: User = {
			name: 'Test User',
			email: 'test@example.com',
		};
		const nextState = reducer(initialState, setUser(user));
		expect(nextState.user).toEqual(user);
		expect(nextState.isLogged).toBe(true);
	});

	it('обрабатывает setTokens', async () => {
		const tokens = { accessToken: 'abc123', refreshToken: 'xyz456' };

		// Используйте dispatch для симуляции вызова экшена
		store.dispatch(setTokens(tokens)); // Убедитесь, что экшен возвращает промис

		expect(localStorage.getItem('accessToken')).toBe(tokens.accessToken);
		expect(localStorage.getItem('refreshToken')).toBe(tokens.refreshToken);
	});
	it('обрабатывает setError', () => {
		const errorMessage = 'Ошибка авторизации';
		const nextState = reducer(initialState, setError(errorMessage));
		expect(nextState.error).toBe(errorMessage);
	});

	it('обрабатывает setUserChecked', () => {
		const nextState = reducer(initialState, setUserChecked(true));
		expect(nextState.isUserChecked).toBe(true);
	});

	it('обрабатывает setVisitedForgotPassword', () => {
		const nextState = reducer(initialState, setVisitedForgotPassword(true));
		expect(nextState.visitedForgotPassword).toBe(true);
	});
});

describe('async actions', () => {
	const initialState = {
		user: null,
		isLogged: null,
		error: null,
		isUserChecked: false,
		loading: false,
		visitedForgotPassword: false,
	};

	const regForm: RegistrationForm = {
		email: 'test@example.com',
		password: 'password123',
		name: 'Test User',
	};

	describe('async actions', () => {
		it('обрабатывает loginUser.rejected', () => {
			const action = loginUser.rejected(
				new Error('Неизвестная ошибка'),
				'Неизвестная ошибка',
				{ email: 'test@example.com', password: 'password' }
			);

			const nextState = reducer(initialState, action);
			expect(nextState.loading).toBe(false);
			expect(nextState.error).toBe('Неизвестная ошибка');
		});
	});

	it('обрабатывает registerUser.pending', () => {
		const action = registerUser.pending('', {
			email: 'asd@asd.ru',
			name: 'asd',
			password: 'asdasd',
		});
		const nextState = reducer(initialState, action);
		expect(nextState.loading).toBe(true);
		expect(nextState.error).toBeNull();
	});

	it('обрабатывает registerUser.fulfilled', () => {
		const user = { name: 'Test User', email: 'test@example.com' };

		const action = registerUser.fulfilled(
			{
				accessToken: 'asd',
				refreshToken: 'asd',
				success: true,
				user: {
					email: 'test@example.com',
					name: 'Test User',
				},
			},
			'',
			regForm
		);

		const nextState = reducer(initialState, action);

		expect(nextState.loading).toBe(false);
		expect(nextState.user).toEqual(user);
	});

	it('обрабатывает registerUser.rejected', () => {
		const errorMessage = 'Неизвестная ошибка';

		// Создаем ошибку с нужным сообщением
		const action = registerUser.rejected(
			new Error(errorMessage), // Ошибка
			'', // Пустое значение для мета-данных
			{ email: 'asd@asd.ru', name: 'asd', password: 'asdasd' } // Данные формы
		);

		const nextState = reducer(initialState, action);
		expect(nextState.loading).toBe(false);
		expect(nextState.error).toBe(errorMessage); // Ожидаем, что ошибка будет сохранена
	});
});
