import React, { useEffect } from 'react';
import { OrderCell } from '@components/order-cell/order-cell';
import { IOrder } from '@customTypes/auth/types';
import { useDispatch, useSelector } from '@hooks/index';
import { Link, useLocation } from 'react-router-dom';

export const OrdersList: React.FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ws);
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/profile/orders');
  
  // Динамическое подключение к WebSocket
  const prefix = isProfilePage ? 'wsProfile' : 'wsFeed';

  useEffect(() => {
    console.log("Подключение к WebSocket...");
    dispatch({ type: `${prefix}/connect` }); // Подключение WebSocket для соответствующей страницы

    return () => {
      dispatch({ type: `${prefix}/disconnect` }); // Отключение WebSocket при размонтировании компонента
      console.log("Соединение с сокетом разорвано");
    };
  }, [dispatch, prefix]); // Префикс зависит от того, на какой странице мы

  return (
    <div className='w-100'>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Link
            key={order._id}
            to={
              isProfilePage
                ? `/profile/orders/${order.number}`
                : `/feed/${order.number}`
            }
            state={isProfilePage ? { background: location } : undefined}
          >
            <OrderCell order={order} />
          </Link>
        ))
      ) : (
        <p>Нет заказов для отображения.</p>
      )}
    </div>
  );
};
