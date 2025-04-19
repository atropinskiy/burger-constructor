import reducer, { open, close, error, getOrder } from './ws-slices';
import { IOrder } from '@customTypes/auth/types';

describe('wsSlice reducer', () => {
	const initialState = {
		isConnected: false,
		orders: [],
		profileOrders: [],
		currentOrder: null,
		error: null,
		totalOrders: 0,
		totalToday: 0,
	};

	it('должен вернуть начальное состояние', () => {
		expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
	});

	it('обрабатывает open', () => {
		const nextState = reducer(initialState, open());
		expect(nextState.isConnected).toBe(true);
	});

	it('обрабатывает close', () => {
		const modifiedState = { ...initialState, isConnected: true };
		const nextState = reducer(modifiedState, close());
		expect(nextState.isConnected).toBe(false);
	});

	it('обрабатывает error', () => {
		const errorMsg = 'Ошибка соединения';
		const nextState = reducer(initialState, error(errorMsg));
		expect(nextState.error).toBe(errorMsg);
	});

	it('обрабатывает getOrder', () => {
		const fakeOrder: IOrder = {
			_id: '1',
			status: 'done',
			number: 123,
			ingredients: [],
			createdAt: '',
			updatedAt: '',
			name: 'Test order',
		};
		const nextState = reducer(initialState, getOrder(fakeOrder));
		expect(nextState.currentOrder).toEqual(fakeOrder);
	});
});
