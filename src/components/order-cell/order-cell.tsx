import React from 'react';
import s from './order-cell.module.scss'
import { IOrder } from '@customTypes/auth/types'
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '@hooks/index';

interface OrderCellProps {
  order: IOrder;
}

enum OrderStatus {
  Created = 'created',
  Pending = 'pending',
  Done = 'done',
}

const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Created:
      return 'Создан';
    case OrderStatus.Pending:
      return 'В процессе';
    case OrderStatus.Done:
      return 'Выполнен';
    default:
      return 'Неизвестно';
  }
};

export const OrderCell: React.FC<OrderCellProps> = ({ order }) => {
  const ingredients = useSelector((state) => state.ingredients);
  const totalPrice = order.ingredients.reduce((total, id) => {
    const ingredient = ingredients.allItems.find((item) => item._id === id);
    return ingredient ? total + ingredient.price : total;
  }, 0);
  return (
    <div className={s.order_div}>
      <div className='d-flex w-100'>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default ml-auto text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <div className='mt-6'>
        <p className="text text_type_main-medium">
          {order.name.length > 50 ? `${order.name.slice(0, 50)}...` : order.name}
        </p>
      </div>
      <div className='mt-2'>
        <p className="text text_type_main-small">{getStatusText(order.status as OrderStatus)}</p>
      </div>
      <div className='w-100 d-flex justify-between'>
        <div className={s.order__ingredients}>
          {order.ingredients.map((id, index) => {
            const ingredient = ingredients.allItems.find((item) => item._id === id);
            if (!ingredient) return null;
            return (
              <div className={s.order__ingredients__div} style={{ zIndex: order.ingredients.length - index }}>
                <img className={s.order__ingredients__image} src={ingredient.image_mobile} alt="" />
              </div>
            )
          })}
        </div>
        <div className='d-flex valign-center'>
          <div className='d-flex'>
            <div className='d-flex valign-center'>
              <span className="text text_type_digits-default">{totalPrice}</span>
            </div>
            <CurrencyIcon className='m-2' type="primary" />
          </div>
        </div>
      </div>

    </div>
  )
}
