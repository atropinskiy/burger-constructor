import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientModel } from "../../utils/models";

interface ModalState {
  isOpen: boolean;
  ingredient: IngredientModel | null;
}

const initialState: ModalState = {
  isOpen: false,
  ingredient: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IngredientModel>) => {
      state.isOpen = true;
      state.ingredient = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.ingredient = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
