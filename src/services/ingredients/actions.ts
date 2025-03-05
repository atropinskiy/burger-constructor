import { createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/models";
import { addSelectedIngredient } from "./slices";

// Асинхронный экшен для получения ингредиентов с API
export const fetchIngredients = createAsyncThunk<IngredientModel[], void>(
  "ingredients/loadIngredients",
  async () => {
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
    if (!response.ok) {
      throw new Error("Не удалось загрузить ингредиенты");
    }
    const data = await response.json();
    return data.data as IngredientModel[]; // Возвращаем массив ингредиентов
  }
);

// Экшен для добавления выбранного ингредиента в список selectedItems
export const addSelectedIngredientAction = (ingredient: IngredientModel) => {
  return (dispatch: any) => {
    dispatch(addSelectedIngredient(ingredient));  // Используем правильный экшен
  };
};
