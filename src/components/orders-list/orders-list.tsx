import React, { useEffect } from 'react';
import { OrderCell } from '@components/order-cell/order-cell';
import { useDispatch, useSelector } from '@hooks/index';
import { Link, useLocation } from 'react-router-dom';
import s from './order-list.module.scss';

export const OrdersList: React.FC = () => {
	const dispatch = useDispatch();
	const { orders, profileOrders } = useSelector((state) => state.ws);
	const location = useLocation();
	const isProfilePage = location.pathname.startsWith('/profile/orders');

	const prefix = isProfilePage ? 'wsProfile' : 'wsFeed';
	const displayedOrders = isProfilePage ? profileOrders : orders;

	useEffect(() => {
		dispatch({ type: `${prefix}/connect` });

		return () => {
			dispatch({ type: `${prefix}/disconnect` });
		};
	}, [dispatch, prefix]);

	return (
		<div className={s.order__list}>
			{displayedOrders.length > 0 ? (
				displayedOrders.map((order) => (
					<Link
						key={order._id}
						to={
							isProfilePage
								? `/profile/orders/${order.number}`
								: `/feed/${order.number}`
						}
						state={isProfilePage ? { background: location } : undefined}>
						<OrderCell order={order} />
					</Link>
				))
			) : (
				<p>Нет заказов для отображения.</p>
			)}
		</div>
	);
};
