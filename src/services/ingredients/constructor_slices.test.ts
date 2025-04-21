import {
	setAllIngredients,
	addSelectedIngredient,
	removeSelectedIngredient,
	clearSelectedItems,
	updateOrder,
	ingredientsReducer as reducer,
	initialState,
} from './constructor_slices';
import { IngredientModel } from '../../types/auth/types';

const bun: IngredientModel = {
	_id: 'bun1',
	id: 'bun1',
	name: 'Булка',
	type: 'bun',
	proteins: 10,
	fat: 5,
	carbohydrates: 15,
	calories: 200,
	price: 100,
	image: '',
	image_mobile: '',
	image_large: '',
};

const sauce: IngredientModel = {
	_id: 'sauce1',
	id: 'sauce1',
	name: 'Соус',
	type: 'sauce',
	proteins: 0,
	fat: 0,
	carbohydrates: 5,
	calories: 50,
	price: 20,
	image: '',
	image_mobile: '',
	image_large: '',
};

describe('ingredientsSlice', () => {
	it('should handle setAllIngredients', () => {
		const state = reducer(initialState, setAllIngredients([bun, sauce]));
		expect(state.allItems).toHaveLength(2);
	});

	it('should handle addSelectedIngredient (bun)', () => {
		const state = reducer(initialState, addSelectedIngredient(bun));
		expect(state.selectedItems.bun?.name).toBe('Булка');
		expect(state.totalPrice).toBe(200);
		expect(typeof state.selectedItems.bun?.id).toBe('string'); // Проверяем только тип
	});

	it('should replace bun and update totalPrice', () => {
		const midState = reducer(initialState, addSelectedIngredient(bun));
		const newBun = { ...bun, id: 'bun2', price: 150 };
		const state = reducer(midState, addSelectedIngredient(newBun));

		expect(typeof state.selectedItems.bun?.id).toBe('string'); // Проверяем только тип
		expect(state.totalPrice).toBe(300);
	});

	it('should handle addSelectedIngredient (filling)', () => {
		const state = reducer(initialState, addSelectedIngredient(sauce));
		expect(state.selectedItems.fillings).toHaveLength(1);
		expect(typeof state.selectedItems.fillings[0].id).toBe('string'); // Проверяем только тип
		expect(state.totalPrice).toBe(20);
	});

	it('should handle removeSelectedIngredient (filling)', () => {
		const filledState = reducer(initialState, addSelectedIngredient(sauce));
		const ingredientId = filledState.selectedItems.fillings[0].id!;
		const state = reducer(filledState, removeSelectedIngredient(ingredientId));
		expect(state.selectedItems.fillings).toHaveLength(0);
		expect(state.totalPrice).toBe(0);
	});

	it('should handle removeSelectedIngredient (bun)', () => {
		const bunState = reducer(initialState, addSelectedIngredient(bun));
		const bunId = bunState.selectedItems.bun!.id!;
		const state = reducer(bunState, removeSelectedIngredient(bunId));
		expect(state.selectedItems.bun).toBeNull();
		expect(state.totalPrice).toBe(0);
	});

	it('should handle clearSelectedItems', () => {
		let state = reducer(initialState, addSelectedIngredient(bun));
		state = reducer(state, addSelectedIngredient(sauce));
		state = reducer(state, clearSelectedItems());

		expect(state.selectedItems.bun).toBeNull();
		expect(state.selectedItems.fillings).toEqual([]);
		expect(state.totalPrice).toBe(0);
	});

	it('should handle updateOrder', () => {
		let state = reducer(initialState, addSelectedIngredient(sauce));
		const secondSauce = { ...sauce, id: 'sauce2', name: 'Другой соус' };
		state = reducer(state, addSelectedIngredient(secondSauce));

		const fromIndex = 0;
		const toIndex = 1;
		const updated = reducer(state, updateOrder({ fromIndex, toIndex }));

		expect(typeof updated.selectedItems.fillings[0].id).toBe('string');
		expect(typeof updated.selectedItems.fillings[1].id).toBe('string');
		expect(updated.selectedItems.fillings[1].name).toBe('Соус');
	});
});
