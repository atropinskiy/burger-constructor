import React from 'react';
import s from './order-details.module.scss';
import doneImg from './assets/done.png';

export const OrderDetails: React.FC = () => {
	return (
		<div className='mt-10 d-flex flex-column valign-center'>
			<h1 className={`text text_type_digits-large ${s.digits}`}>034536</h1>
			<p className='mt-2 text text_type_main-medium'>идентификатор заказа</p>
			<img className='mt-15' src={doneImg} alt='Order done' />
			<p className='text text_type_main-default'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive mt-2 pb-20'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
