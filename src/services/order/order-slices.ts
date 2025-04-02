import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderResponse } from '../../types/auth/types';
import { createOrder } from '../actions';

interface OrderState {
	number: number | null;
	error: string | null;
	ingredients: string[];
}

const initialState: OrderState = {
	number: null,
	error: null,
	ingredients: [],
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addIngredientToOrder: (state, action: PayloadAction<string>) => {
			state.ingredients.push(action.payload);
		},
		clearOrder: (state) => {
			state.ingredients = [];
			state.error = null;
		},
		removeIngredientFromOrder: (state, action: PayloadAction<string>) => {
			const bunIdToRemove = action.payload;
			const indexToRemove = state.ingredients.findIndex(
				(ingredientId) => ingredientId === bunIdToRemove
			);
			if (indexToRemove !== -1) {
				state.ingredients.splice(indexToRemove, 1);
			}
		},
		removeBunsFromOrderById: (state, action: PayloadAction<string>) => {
			const bunIdToRemove = action.payload;
			state.ingredients = state.ingredients.filter(
				(ingredientId) => ingredientId !== bunIdToRemove
			);
		},
		addBunsToOrderById: (state, action: PayloadAction<string>) => {
			state.ingredients.push(action.payload);
			state.ingredients.push(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<OrderResponse>) => {
					state.number = action.payload.order.number;
				}
			)
			.addCase(createOrder.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const {
	addIngredientToOrder,
	removeBunsFromOrderById,
	removeIngredientFromOrder,
	addBunsToOrderById,
	clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
