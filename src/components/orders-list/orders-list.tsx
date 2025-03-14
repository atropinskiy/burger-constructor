import React from 'react';
import { Link } from 'react-router-dom';

export const OrdersList: React.FC = () => {
	const orders = [
		{ id: 1, number: 123, date: '2025-03-01', status: 'В процессе' },
		{ id: 2, number: 124, date: '2025-03-05', status: 'Завершен' },
		{ id: 3, number: 125, date: '2025-03-08', status: 'Отменен' },
	];

	return (
		<div>
			<h2>История заказов</h2>
			<ul>
				{orders.map((order) => (
					<li key={order.id}>
						<Link to={`/profile/orders/${order.number}`}>
							Заказ №{order.number} — {order.status} (Дата: {order.date})
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
