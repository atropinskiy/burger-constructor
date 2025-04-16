import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/constructor_slices';
import orderReducer from './order/order-slices';
import modalReducer from './modal/modal-slices';
import userReducer from './auth/slices';
import wsReducer from './ws/ws-slices';
import { createWebSocketMiddleware } from './ws-middleware';

const wsMiddleware = createWebSocketMiddleware('wss://norma.nomoreparties.space/orders');

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
		order: orderReducer,
		modal: modalReducer,
		user: userReducer,
		ws: wsReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['modal/openModal', 'modal/setLoading'],
			},
		}).concat(wsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
