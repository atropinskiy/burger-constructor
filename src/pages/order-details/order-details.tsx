import { useParams } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';

import s from './order-details.module.scss';
import { useDispatch, useSelector } from '@hooks/index';
import { fetchOrder } from '@services/order/order-actions';
import { getStatusText } from '@components/order-cell/order-cell';
import { OrderStatus, IngredientModel } from '@customTypes/auth/types';
import {
	FormattedDate,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderDetailsProps {
	padding: boolean;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ padding }) => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const currentOrder = useSelector((state) => state.ws.currentOrder);
	const ingredients = useSelector((state) => state.ingredients.allItems);

	const groupedIngredients = useMemo(() => {
		if (!currentOrder) return [];

		return currentOrder.ingredients.reduce((acc, id) => {
			const ingredient = ingredients.find((item) => item._id === id);
			if (!ingredient) return acc;

			const existing = acc.find((item) => item._id === id);
			if (existing) {
				existing.count += 1;
			} else {
				acc.push({ ...ingredient, count: 1 });
			}

			return acc;
		}, [] as Array<IngredientModel & { count: number }>);
	}, [currentOrder, ingredients]);

	const totalPrice = useMemo(() => {
		return groupedIngredients.reduce((sum, ingredient) => {
			return sum + ingredient.price * ingredient.count;
		}, 0);
	}, [groupedIngredients]);

	useEffect(() => {
		if (id) {
			dispatch(fetchOrder(id));
		}
	}, [dispatch, id]);

	if (!currentOrder) {
		return <p>Загрузка заказа...</p>;
	}

	return (
		<div className={`${s.order__details__div} ${padding ? s.padding : ''}`}>
			<p className='text text_type_digits-default w-100 d-flex justify-center'>
				#{currentOrder.number}
			</p>
			<p className='mt-10 text text_type_main-medium'>{currentOrder.name}</p>
			<p className='mt-2 text text_type_main-default'>
				{getStatusText(currentOrder.status as OrderStatus)}
			</p>
			<p className='mt-15 text text_type_main-medium'>Состав:</p>
			<div className={`${s.order__details__ingredients}`}>
				{groupedIngredients.map((ingredient) => (
					<div key={ingredient._id} className={s.ingredient}>
						<img
							src={ingredient.image_mobile}
							alt={ingredient.name}
							className={s.ingredient__image}
						/>
						<p className='text text_type_main-default ml-1'>
							{ingredient.name}
						</p>
						<div className='ml-auto d-flex align-center'>
							<span className='text text_type_digits-default mr-1'>
								{ingredient.count} x {ingredient.price}
							</span>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				))}
			</div>
			<div className='d-flex w-100 mt-10'>
				<p className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(currentOrder.createdAt)} />
				</p>
				<p className='ml-auto d-flex valign-center text text_type_digits-default'>
					{totalPrice}
					<CurrencyIcon className='ml-1' type='primary' />
				</p>
			</div>
		</div>
	);
};
