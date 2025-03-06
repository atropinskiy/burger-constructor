import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/constructor_slices"; 
import orderReducer from "./order/order-slices";
import modalReducer from "./modal/modal-slices";


export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Определяем тип AppDispatch
