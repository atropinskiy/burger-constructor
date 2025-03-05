import { createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/data";
import { setIngredients } from "./reducer";

// Пример асинхронного экшена для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk<IngredientModel[], void>(
  "ingredients/loadIngredients",
  async () => {
    // Используем полный URL API
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");

    if (!response.ok) {
      throw new Error("Не удалось загрузить ингредиенты");
    }

    const data = await response.json();
    return data.data as IngredientModel[]; // Убедитесь, что данные находятся в data.data
  }
);

// Асинхронный экшен для добавления ингредиента (используем обычный экшен, а не асинхронный)
export const addIngredient = (ingredient: IngredientModel) => {
  return setIngredients([ingredient]); // Используем редьюсер setIngredients для добавления
};
