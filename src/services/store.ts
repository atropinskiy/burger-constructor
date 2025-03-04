import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients';

export const store = configureStore({
	reducer: {
		ingredients: ingredientsReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
