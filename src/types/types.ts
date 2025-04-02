import { store } from '../services/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface ApiResponse<T> {
	success: boolean;
	data: T;
}

export interface ApiError {
	message: string;
}
