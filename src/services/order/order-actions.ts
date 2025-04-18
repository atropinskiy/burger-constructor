import { IOrderResponse } from '@customTypes/auth/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@utils/constants';
import { refreshToken } from '@services/auth/actions'; // Импортируем экшн для обновления токена

export const fetchOrders = createAsyncThunk<
	IOrderResponse,
	void,
	{ rejectValue: string }
>('/orders/all', async (_, { rejectWithValue, dispatch }) => {
	try {
		const response = await fetch(`${BASE_URL}/orders/all`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		if (!response.ok) {
			if (response.status === 403) {
				const refreshResult = await dispatch(refreshToken());
				const refreshPayload = refreshResult.payload;
				if (!refreshPayload || typeof refreshPayload === 'string') {
					return rejectWithValue('Не удалось обновить токен');
				}

				const newAccessToken = refreshPayload.accessToken;
				const retryResponse = await fetch(`${BASE_URL}/orders/all`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				});

				if (!retryResponse.ok) {
					throw new Error('Ошибка при загрузке заказов');
				}

				const retryData = await retryResponse.json();
				return retryData; // Возвращаем данные
			}

			throw new Error('Не удалось получить данные пользователя');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});

export const fetchOrder = createAsyncThunk<
	IOrderResponse,
	string,
	{ rejectValue: string }
>('orders/fetchOrder', async (orderNumber, { rejectWithValue, dispatch }) => {
	try {
		const response = await fetch(`${BASE_URL}/orders/${orderNumber}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});

		if (!response.ok) {
			if (response.status === 403) {
				const refreshResult = await dispatch(refreshToken());

				const refreshPayload = refreshResult.payload;
				if (!refreshPayload || typeof refreshPayload === 'string') {
					// Если payload отсутствует или это строка (ошибка), отклоняем запрос
					return rejectWithValue('Не удалось обновить токен');
				}

				const newAccessToken = refreshPayload.accessToken;
				const retryResponse = await fetch(`${BASE_URL}/orders/${orderNumber}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${newAccessToken}`,
					},
				});

				if (!retryResponse.ok) {
					throw new Error('Ошибка при загрузке заказа');
				}

				const retryData = await retryResponse.json();
				return retryData; // Возвращаем данные
			}

			throw new Error('Ошибка при загрузке заказа');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});
