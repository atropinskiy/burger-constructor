// src/utils/data.ts

export interface IngredientModel {
	sort_order?: number;
	id?: string;
	count?: number;
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
}

export interface OrderModel {
	id: number;
	ingredients: IngredientModel[];
}

export interface OrderResponse {
	name: string;
	order: { number: number };
	success: boolean;
}

export interface User {
	email: string;
	name: string;
}

export interface RegistrationForm {
	email: string;
	password: string;
	name: string;
}

export interface RegistrationResponse {
	success: boolean;
	user: User;
	accessToken: string;
	refreshToken: string;
}

export interface LoginForm {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: User;
}

export interface Token {
	token: string;
}

export interface FetchUserResponse {
	success: boolean;
	user: User;
}

export interface RefreshTokenResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

export interface LogoutResponse {
	success: boolean;
	message: string;
}

export interface ForgotPasswordResponse {
	success: boolean;
	message: string;
}

export interface ResetPasswordRequest {
	password: string;
	token: string;
}

export interface ResetPasswordResponse {
	success: boolean;
	message: string;
}

export interface UpdateUserRequest {
	email: string;
	name: string;
	password: string;
	token: string;
}

export interface UpdateUserResponse {
	success: boolean;
	user: User;
}

export interface IOrder {
	_id: string;
	ingredients: string[];
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
}

export interface IOrderResponse {
	success: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
}

export enum OrderStatus {
	Created = 'created',
	Pending = 'pending',
	Done = 'done',
}
