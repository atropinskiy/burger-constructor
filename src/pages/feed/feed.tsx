import React from "react";
import { OrdersList } from "@components/orders-list/orders-list";
import { FeedDashboard } from "@components/feed-dashboard/feed-dashboard";
import s from './feed.module.scss'

export const Feed: React.FC = () => {
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
