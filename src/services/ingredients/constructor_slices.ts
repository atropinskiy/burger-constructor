import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/models";
import { fetchIngredients } from "../actions";  // Импорт асинхронного экшена

interface IngredientsState {
  allItems: IngredientModel[];  
  selectedItems: IngredientModel[];  
  bun: IngredientModel | null;  // Стейт для булки
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  allItems: [],  // Изначально список всех ингредиентов пуст
  selectedItems: [],  // Изначально список выбранных ингредиентов пуст
  bun: null,  // Изначально булка не выбрана
  totalPrice: 0,
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
    addSelectedIngredient: {
      reducer: (state, action: PayloadAction<IngredientModel>) => {
        const ingredient = action.payload;
        const newOrder = state.selectedItems.length;
        state.selectedItems.push({ ...ingredient, sort_order: newOrder });

        // Если это булка, записываем её отдельно
        if (ingredient.type === "bun") {
          if (state.bun) {
            state.totalPrice -= state.bun.price * 2;  // Убираем цену старой булки
          }
          state.bun = ingredient;  // Записываем новую булку в отдельный стейт
          state.totalPrice += ingredient.price * 2;
        } else {
          state.totalPrice += ingredient.price;
          
        }
      },
      prepare: (ingredient: IngredientModel) => {
        return {
          payload: {
            ...ingredient,
            id: nanoid(),  // Генерация уникального id для каждого ингредиента
          },
        };
      },
    },
    updateOrder(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
      const { fromIndex, toIndex } = action.payload;
      const movedItem = state.selectedItems[fromIndex];
      state.selectedItems.splice(fromIndex, 1);  // Убираем элемент из старой позиции
      state.selectedItems.splice(toIndex, 0, movedItem);  // Вставляем элемент на новую позицию
      state.selectedItems = state.selectedItems.map((item, index) => ({ ...item, order: index }));  // Пересчитываем порядок
    },
    
    removeSelectedIngredient: (state, action: PayloadAction<string>) => {
      const index = state.selectedItems.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        const ingredient = state.selectedItems[index];
        if (ingredient.type === "bun") {
          state.bun = null;  // Убираем булку из стейта
          state.totalPrice -= ingredient.price * 2;  // Убираем цену булки при удалении
        } else {
          state.totalPrice -= ingredient.price;
        }
        state.selectedItems.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = action.payload.map((item) => ({
          ...item,
          id: item.id || nanoid(),  // Генерация id для всех ингредиентов, если они отсутствуют
        }));
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Неизвестная ошибка";
      });
  },
});

export const { setAllIngredients, addSelectedIngredient, removeSelectedIngredient, updateOrder } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
