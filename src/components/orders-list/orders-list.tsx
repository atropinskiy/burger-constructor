import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '@services/order/order-actions';
import { useDispatch, useSelector } from '@hooks/index';
import { OrderCell } from '@components/order-cell/order-cell';

export const OrdersList: React.FC = () => {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.order.orders);
	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	return (
		<div className='w-100'>
			{orders.map((order) => (
				<OrderCell key={order._id} order={order} />
			))}
		</div>
	);
};
