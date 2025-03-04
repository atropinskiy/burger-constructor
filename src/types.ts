import { store } from './services/store'; // Добавляем импорт store

// Определение типа для Redux Store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Опционально: Общий тип для API-ответов
export interface ApiResponse<T> {
	success: boolean;
	data: T;
}

// Опционально: Тип ошибки для обработки API-запросов
export interface ApiError {
	message: string;
}
