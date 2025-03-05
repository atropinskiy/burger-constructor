import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/data";
import { fetchIngredients } from "./actions";  // Импорт асинхронных экшенов

interface IngredientsState {
  items: IngredientModel[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  loading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IngredientModel[]>) => {
      state.items = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IngredientModel>) => {
      state.items.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
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
        state.items = [...state.items, ...action.payload];
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Неизвестная ошибка";
      });
  },
});

export const { setIngredients, addIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
