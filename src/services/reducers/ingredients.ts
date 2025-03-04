import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientModel } from '../../utils/data';
import { getIngredients } from '../../utils/net-service';

// Тип для состояния
interface IngredientsState {
	items: IngredientModel[];
	loading: boolean;
	error: string | null;
}

// Начальное состояние
const initialState: IngredientsState = {
	items: [],
	loading: false,
	error: null,
};

// Асинхронный thunk для загрузки ингредиентов
export const fetchIngredients = createAsyncThunk(
	'ingredients/fetch',
	async () => {
		return await getIngredients();
	}
);

// Слайс
const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchIngredients.fulfilled,
				(state, action: PayloadAction<IngredientModel[]>) => {
					state.loading = false;
					state.items = action.payload;
				}
			)
			.addCase(fetchIngredients.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.error.message || 'Ошибка при загрузке ингредиентов';
			});
	},
});

export default ingredientsSlice.reducer;
