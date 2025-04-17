import { IOrder, IOrderResponse } from '@customTypes/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder } from '@services/order/order-actions';

interface WebSocketState {
	isConnected: boolean;
	orders: IOrder[];
	profileOrders: IOrder[];
	currentOrder: IOrder | null;
	error: string | null;
	totalOrders: number;
	totalToday: number;
}

const initialState: WebSocketState = {
	isConnected: false,
	orders: [],
	profileOrders: [],
	currentOrder: null,
	totalOrders: 0,
	totalToday: 0,
	error: null,
};

const wsSlice = createSlice({
	name: 'ws',
	initialState,
	reducers: {
		open(state) {
			state.isConnected = true;
		},
		close(state) {
			state.isConnected = false;
		},
		message(state, action: PayloadAction<{ data: IOrderResponse }>) {
			state.orders = action.payload.data.orders.sort(
				(a: IOrder, b: IOrder) => b.number - a.number
			);
			state.totalOrders = action.payload.data.total;
			state.totalToday = action.payload.data.totalToday;
		},

		messageProfile(state, action: PayloadAction<{ data: IOrderResponse }>) {
			state.profileOrders = action.payload.data.orders.sort(
				(a: IOrder, b: IOrder) => b.number - a.number
			);
		},

		error(state, action: PayloadAction<string>) {
			// исправлено на string
			state.error = action.payload; // теперь сохраняем строку с ошибкой
		},
		getOrder(state, action: PayloadAction<IOrder>) {
			state.currentOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOrder.fulfilled, (state, action) => {
			state.currentOrder = action.payload.orders[0];
		});

		builder.addCase(fetchOrder.rejected, (state, action) => {
			console.error('Ошибка загрузки заказа:', action.payload);
			state.currentOrder = null;
		});
	},
});

export const { open, close, message, error, getOrder } = wsSlice.actions;
export default wsSlice.reducer;
