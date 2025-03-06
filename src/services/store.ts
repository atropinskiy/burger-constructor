import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/constructor_slices"; 
import orderReducer from "./order/order_slices";


export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Определяем тип AppDispatch
