// src/utils/data.ts

export interface IngredientModel {
	sort_order?: number;
	id?: string;
	count?: number
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
	ingredients: IngredientModel[]
}

export interface OrderResponse {
  name: string;
  order: { number: number };
  success: boolean;
}

