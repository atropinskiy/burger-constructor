import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { IngredientModel } from '../../types/auth/types';
import { fetchIngredients } from '../actions';

interface IngredientsState {
	allItems: IngredientModel[];
	selectedItems: {
		bun: IngredientModel | null;
		fillings: IngredientModel[];
	};
	bun: IngredientModel | null;
	totalPrice: number;
	loading: boolean;
	error: string | null;
}

const initialState: IngredientsState = {
	allItems: [],
	selectedItems: {
		bun: null,
		fillings: [],
	},
	bun: null,
	totalPrice: 0,
	loading: false,
	error: null,
};

const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setAllIngredients: (state, action: PayloadAction<IngredientModel[]>) => {
			state.allItems = action.payload;
		},
		addSelectedIngredient: {
			reducer: (state, action: PayloadAction<IngredientModel>) => {
				const ingredient = action.payload;
				if (ingredient.type === 'bun') {
					if (state.selectedItems.bun) {
						state.totalPrice -= state.selectedItems.bun.price * 2;
					}
					state.selectedItems.bun = ingredient;
					state.totalPrice += ingredient.price * 2;
				} else {
					state.selectedItems.fillings.push(ingredient);
					state.totalPrice += ingredient.price;
				}
			},
			prepare: (ingredient: IngredientModel) => {
				return {
					payload: {
						...ingredient,
						id: nanoid(),
					},
				};
			},
		},
		updateOrder(
			state,
			action: PayloadAction<{ fromIndex: number; toIndex: number }>
		) {
			const { fromIndex, toIndex } = action.payload;
			const movedItem = state.selectedItems.fillings[fromIndex];
			if (fromIndex !== toIndex) {
				state.selectedItems.fillings.splice(fromIndex, 1);
				state.selectedItems.fillings.splice(toIndex, 0, movedItem);
				state.selectedItems.fillings = state.selectedItems.fillings.map(
					(item, index) => ({
						...item,
						sort_order: index,
					})
				);
				state.totalPrice = state.selectedItems.fillings.reduce(
					(total, item) => total + item.price,
					state.selectedItems.bun ? state.selectedItems.bun.price * 2 : 0
				);
			}
		},
		clearSelectedItems: (state) => {
			// Очищаем выбранные ингредиенты
			state.selectedItems.bun = null;
			state.selectedItems.fillings = [];
			state.totalPrice = 0; // Сбрасываем общую цену
		},

		removeSelectedIngredient: (state, action: PayloadAction<string>) => {
			const ingredientId = action.payload;
			if (
				state.selectedItems.bun &&
				state.selectedItems.bun.id === ingredientId
			) {
				state.totalPrice -= state.selectedItems.bun.price * 2;
				state.selectedItems.bun = null;
			} else {
				state.selectedItems.fillings = state.selectedItems.fillings.filter(
					(ingredient) => ingredient.id !== ingredientId
				);
				state.totalPrice = state.selectedItems.fillings.reduce(
					(total, item) => total + item.price,
					state.selectedItems.bun ? state.selectedItems.bun.price * 2 : 0
				);
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
					id: item.id || nanoid(),
				}));
			})
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error?.message || 'Неизвестная ошибка';
			});
	},
});

export const {
	setAllIngredients,
	addSelectedIngredient,
	removeSelectedIngredient,
	clearSelectedItems,
	updateOrder,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
