import React from 'react';
import { OrderCell } from '@components/order-cell/order-cell';
import { IOrder } from '@customTypes/auth/types';

interface IOrderListProps {
	orders: IOrder[]
}

export const OrdersList: React.FC<IOrderListProps> = ({ orders }) => {
	return (
		<div className='w-100'>
			{orders.map((order) => (
				<OrderCell key={order._id} order={order} />
			))}
		</div>
	);
};
