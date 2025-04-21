import React from 'react';
import s from './order-details.module.scss';
import doneImg from './assets/done.png';

interface OrderDetailsProps {
	orderNumber: number | null;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
	return (
		<div
			data-testid='order_modal'
			className='mt-10 d-flex flex-column valign-center'>
			<h1 className={`text text_type_digits-large ${s.digits}`}>
				{orderNumber ?? '—'}
			</h1>
			<p className='mt-2 text text_type_main-medium'>идентификатор заказа</p>
			<img className='mt-15' src={doneImg} alt='Order done' />
			<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive mt-2 pb-20'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
