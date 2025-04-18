import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@hooks/index';
import { Link, useLocation } from 'react-router-dom';
import { feedConnect, feedDisconnect } from '@services/ws/feed-middleware';
import {
	profileConnect,
	profileDisconnect,
} from '@services/ws/profile-middleware';
import s from './order-list.module.scss';
import { OrderCell } from '@components/order-cell/order-cell';

export const OrdersList: React.FC = () => {
	const dispatch = useDispatch();
	const { orders, profileOrders, error } = useSelector((state) => state.ws);
	const location = useLocation();
	const isProfilePage = location.pathname.startsWith('/profile/orders');

	// Выбираем действия для подключения и отключения
	const connectAction = isProfilePage ? profileConnect : feedConnect;
	const disconnectAction = isProfilePage ? profileDisconnect : feedDisconnect;

	const displayedOrders = isProfilePage ? profileOrders : orders;
	const wsUrl = useMemo(
		() =>
			isProfilePage
				? 'wss://norma.nomoreparties.space/orders'
				: 'wss://norma.nomoreparties.space/orders/all',
		[isProfilePage]
	);

	useEffect(() => {
		dispatch(connectAction(wsUrl));
		return () => {
			dispatch(disconnectAction());
		};
	}, [dispatch, connectAction, disconnectAction, wsUrl]);

	return (
		<div className={s.order__list}>
			{error && <p className={s.error}>Ошибка: {error}</p>}
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
