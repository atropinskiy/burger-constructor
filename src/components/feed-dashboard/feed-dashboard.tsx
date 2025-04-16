import React, { useEffect } from "react";
import s from './feed-dashboard.module.scss'
import { useSelector } from "@hooks/index";

export const FeedDashboard: React.FC = () => {
  const { orders } = useSelector((state) => state.ws);
  const rdyOrders = orders
    .filter(order => order.status === "done")

  const pendingOrders = orders
    .filter(order => order.status !== "done")    

  return (
    <div className={s.feed__div}>
      <div className={s.feed__dash__div}>
        <div className={s.feed__rdy__div}>
          <p className="text text_type_main-medium">Готовы</p>
          <div className={`w-100 mt-6 text text_type_digits-default ${s.feed__rdy__color}`}>
            {/* Если есть готовые заказы, отображаем их */}
            {rdyOrders.length > 0 ? (
              rdyOrders.map(order => (
                <div key={order.number}>
                  <p>{order.number}</p>
                </div>
              ))
            ) : (
              <p>Нет готовых заказов</p>
            )}
          </div>
        </div>
        <div className={s.feed__process__div}>
          <p className="text text_type_main-medium">В работе:</p>
          <div className="w-100 mt-6 text text_type_digits-default">
            {pendingOrders.length > 0 ? (
              pendingOrders.map(order => (
                <div key={order.number}>
                  <p>{order.number}</p>
                </div>
              ))
            ) : (
              <p>Ничего не готовится</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
      </div>
      <div className={s.feed__total__div}>
        <p className="text text_type_digits-large">28752</p>
      </div>
      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено сегодня:</p>
      </div>
      <div className={s.feed__total__div}>
        <p className="text text_type_digits-large">138</p>
      </div>
    </div>
  )
}
