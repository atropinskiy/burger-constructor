import reducer, {
	addIngredientToOrder,
	removeBunsFromOrderById,
	removeIngredientFromOrder,
	addBunsToOrderById,
	clearOrder,
} from './order-slices';
import { createOrder } from '../actions';
import { fetchOrders } from './order-actions';
import { OrderResponse, IOrderResponse, IOrder } from '../../types/auth/types';

const initialState = {
	number: null,
	error: null,
	ingredients: [],
	orders: [],
};

describe('orderSlice', () => {
	it('should handle addIngredientToOrder', () => {
		const action = addIngredientToOrder('ingredient1');
		const state = reducer(initialState, action);
		expect(state.ingredients).toContain('ingredient1');
	});

	it('should handle clearOrder', () => {
		const modifiedState = {
			...initialState,
			ingredients: ['item1'],
			error: 'some error',
		};
		const state = reducer(modifiedState, clearOrder());
		expect(state.ingredients).toEqual([]);
		expect(state.error).toBeNull();
	});

	it('should handle removeIngredientFromOrder', () => {
		const modifiedState = { ...initialState, ingredients: ['item1', 'item2'] };
		const state = reducer(modifiedState, removeIngredientFromOrder('item1'));
		expect(state.ingredients).toEqual(['item2']);
	});

	it('should handle removeBunsFromOrderById', () => {
		const modifiedState = {
			...initialState,
			ingredients: ['bun1', 'bun1', 'item'],
		};
		const state = reducer(modifiedState, removeBunsFromOrderById('bun1'));
		expect(state.ingredients).toEqual(['item']);
	});

	it('should handle addBunsToOrderById', () => {
		const state = reducer(initialState, addBunsToOrderById('bun1'));
		expect(state.ingredients).toEqual(['bun1', 'bun1']);
	});

	it('should handle createOrder.fulfilled', () => {
		const payload: OrderResponse = {
			name: 'Test Order',
			order: { number: 123 },
			success: true,
		};
		const state = reducer(
			initialState,
			createOrder.fulfilled(payload, '', ['ingredient1', 'ingredient2'])
		);
		expect(state.number).toBe(123);
	});

	it('should handle createOrder.rejected', () => {
		const state = reducer(
			initialState,
			createOrder.rejected(
				{} as Error,
				'',
				['ingredient1', 'ingredient2'],
				'Ошибка создания'
			)
		);
		expect(state.error).toBe('Ошибка создания');
	});

	it('should handle fetchOrders.fulfilled', () => {
		const mockOrders: IOrder[] = [
			{
				_id: '1',
				ingredients: ['i1', 'i2'],
				status: 'done',
				name: 'Order1',
				createdAt: '2023-01-01',
				updatedAt: '2023-01-01',
				number: 101,
			},
		];
		const payload: IOrderResponse = {
			success: true,
			orders: mockOrders,
			total: 1,
			totalToday: 1,
		};
		const state = reducer(
			initialState,
			fetchOrders.fulfilled(payload, '', undefined)
		);
		expect(state.orders).toEqual(mockOrders);
	});

	it('should handle fetchOrders.rejected', () => {
		const state = reducer(
			initialState,
			fetchOrders.rejected(
				{} as Error,
				'',
				undefined,
				'Ошибка при загрузке заказов'
			)
		);
		expect(state.error).toBe('Ошибка при загрузке заказов');
	});
});
