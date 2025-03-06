import { createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientModel, OrderResponse } from '@utils/models';
import { BASE_URL } from '@utils/constants';

export const fetchIngredients = createAsyncThunk<IngredientModel[], void>(
	'ingredients/loadIngredients',
	async () => {
		const response = await fetch(`${BASE_URL}/ingredients`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка ${res.status}`);
			})
			.catch((error) => {
				throw new Error(error);
			});
		return response.data as IngredientModel[];
	}
);

export const createOrder = createAsyncThunk<OrderResponse, string[]>(
	'order/createOrder',
	async (ingredients: string[], { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ingredients }),
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					}
					return Promise.reject(`Ошибка ${res.status}`);
				})
				.catch((error) => {
					throw new Error(error);
				});
			return response;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Неизвестная ошибка');
		}
	}
);
