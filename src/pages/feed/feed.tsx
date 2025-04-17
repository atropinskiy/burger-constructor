import React, { useEffect } from "react";
import { useSelector, useDispatch } from "@hooks/index";
import { OrdersList } from "@components/orders-list/orders-list";
import { FeedDashboard } from "@components/feed-dashboard/feed-dashboard";
import s from './feed.module.scss'

export const Feed: React.FC = () => {
  console.log("Подключение к WebSocket...");
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.ws);

  useEffect(() => {
    // Подключение к WebSocket
    dispatch({ type: 'wsFeed/connect' });
    return () => {
      dispatch({ type: 'wsFeed/disconnect' });
      console.log("Соединение с сокетом разорвано")
    };
  }, [dispatch]);


  return (
    <div className="mt-10">
      <p className="text text_type_main-large">Лента заказов</p>
      <div className="d-flex mt-5">
        <div className={s.feed__order__list}>
          <OrdersList/>
        </div>
        <FeedDashboard />
      </div>
    </div>

  )
}
