import { createAsyncThunk } from "@reduxjs/toolkit";
import { IngredientModel, OrderResponse } from "../utils/models"

export const fetchIngredients = createAsyncThunk<IngredientModel[], void>(
  "ingredients/loadIngredients",
  async () => {
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
    if (!response.ok) {
      throw new Error("Не удалось загрузить ингредиенты");
    }
    const data = await response.json();
    return data.data as IngredientModel[];
  }
);

export const createOrder = createAsyncThunk<OrderResponse, string[]>(
  "order/createOrder",
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const response = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании заказа");
      }

      const data: OrderResponse = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
