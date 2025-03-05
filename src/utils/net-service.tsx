import { IngredientModel } from './models';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = async (): Promise<IngredientModel[]> => {
  try {
    const response = await fetch(API_URL);

    // Проверяем успешность ответа
    if (!response.ok) {
      // Выводим статус ошибки и текст ошибки для более точного понимания
      const errorText = await response.text();
      console.error(`Ошибка при получении данных: ${errorText}`);
      throw new Error('Ошибка при получении данных');
    }

    // Преобразуем ответ в JSON
    const data = await response.json();

    // Проверяем, есть ли ключ `data` в ответе
    if (!data || !data.data) {
      throw new Error('Некорректный формат данных');
    }

    return data.data; // Возвращаем нужные данные
  } catch (error) {
    // Логируем ошибку и передаем ее дальше
    console.error('Ошибка при получении ингредиентов:', error);
    throw new Error('Ошибка при получении ингредиентов');
  }
};
