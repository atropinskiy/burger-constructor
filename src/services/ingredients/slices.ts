import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/models";
import { fetchIngredients } from "./actions";  // Импорт асинхронного экшена

interface IngredientsState {
  allItems: IngredientModel[];  // Список всех ингредиентов
  selectedItems: IngredientModel[];  // Список выбранных ингредиентов для конструктора
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  allItems: [],  // Изначально список всех ингредиентов пуст
  selectedItems: [],  // Изначально список выбранных ингредиентов пуст
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setAllIngredients: (state, action: PayloadAction<IngredientModel[]>) => {
      state.allItems = action.payload;
    },
    addSelectedIngredient: (state, action: PayloadAction<IngredientModel>) => {
      // Добавляем выбранный ингредиент в список
      state.selectedItems.push(action.payload);
    },
    removeSelectedIngredient: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(item => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;  // Сброс ошибки при новом запросе
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload;  // Заполняем список всех ингредиентов
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Неизвестная ошибка";
      });
  },
});

export const { setAllIngredients, addSelectedIngredient, removeSelectedIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
