import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import s from './order-details.module.scss';
import { logOut } from '@services/auth/actions';
import { fetchOrders } from '@services/order/order-actions';
import { useDispatch, useSelector } from '@hooks/index';

export const OrderDetails: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const handleOnclick = () => {
    console.log(123)
  }

	return (
	<React.Fragment>
    <h2>Детали заказа</h2>
    <button onClick={handleOnclick}>Тест</button>
  </React.Fragment>	
  )
};
