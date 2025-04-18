import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReucer';
import { feedMiddleware } from './ws/feedMiddleware';
import { profileMiddleware } from './ws/profileMiddleware';

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['modal/openModal', 'modal/setLoading'],
			},
		}).concat(feedMiddleware, profileMiddleware),
});

export type AppDispatch = typeof store.dispatch;
