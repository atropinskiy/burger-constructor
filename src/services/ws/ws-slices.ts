import { IOrder, IOrderResponse } from '@customTypes/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder } from '@services/order/order-actions';
import { feedMessage } from '@services/ws/feed-middleware';
import { profileMessage } from '@services/ws/profile-middleware';

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
		error(state, action: PayloadAction<string>) {
			// исправлено на string
			state.error = action.payload; // теперь сохраняем строку с ошибкой
		},
		getOrder(state, action: PayloadAction<IOrder>) {
			state.currentOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			feedMessage,
			(state, action: PayloadAction<IOrderResponse>) => {
				const sortedOrders = action.payload.orders.sort(
					(a, b) => b.number - a.number
				);
				state.orders = sortedOrders;
				state.totalOrders = action.payload.total;
				state.totalToday = action.payload.totalToday;
			}
		);

		// Profile WebSocket message
		builder.addCase(
			profileMessage,
			(state, action: PayloadAction<IOrderResponse>) => {
				const sortedProfileOrders = action.payload.orders.sort(
					(a, b) => b.number - a.number
				);
				state.profileOrders = sortedProfileOrders;
			}
		);

		builder.addCase(fetchOrder.fulfilled, (state, action) => {
			state.currentOrder = action.payload.orders[0];
		});

		builder.addCase(fetchOrder.rejected, (state, action) => {
			console.error('Ошибка загрузки заказа:', action.payload);
			state.currentOrder = null;
		});
	},
});

export const { open, close, error, getOrder } = wsSlice.actions;
export default wsSlice.reducer;
