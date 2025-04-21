import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientModel } from '../../types/auth/types';

interface ModalState {
	isOpen: boolean;
	title?: string;
	content?: string;
	ingredient?: IngredientModel;
	isLoading: boolean;
}

export const initialState: ModalState = {
	isOpen: false,
	title: undefined,
	content: undefined,
	ingredient: undefined,
	isLoading: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (
			state: ModalState,
			action: PayloadAction<{
				title?: string;
				content?: string;
				ingredient?: IngredientModel;
			}>
		) => {
			state.isOpen = true;
			state.title = action.payload.title;
			state.content = action.payload.content;
			state.ingredient = action.payload.ingredient;
			state.isLoading = true;
		},
		closeModal: (state: ModalState) => {
			state.isOpen = false;
			state.title = undefined;
			state.content = undefined;
			state.ingredient = undefined;
			state.isLoading = false;
		},
		setLoading: (state: ModalState, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const { openModal, closeModal, setLoading } = modalSlice.actions;
export default modalSlice.reducer;
