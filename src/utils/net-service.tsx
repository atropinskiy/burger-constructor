import { Ingredient } from './data';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = async (): Promise<Ingredient[]> => {
	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error('Ошибка при получении данных');
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(error);
		throw new Error('Ошибка при получении ингредиентов');
	}
};
