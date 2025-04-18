import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reucer';
import { feedMiddleware } from './ws/feed-middleware';
import { profileMiddleware } from './ws/profile-middleware';

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
