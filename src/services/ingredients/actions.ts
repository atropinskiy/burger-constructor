import { createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/models";

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
