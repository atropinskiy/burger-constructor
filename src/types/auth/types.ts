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
