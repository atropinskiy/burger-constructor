import { IOrderResponse } from "@customTypes/auth/types";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '@utils/constants';

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
				const errorData = await response.json();
				console.log(errorData.message);
			}

			throw new Error('Не удалось получить данные пользователя');
		}

		const data = await response.json();
		return data
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Неизвестная ошибка');
	}
});
