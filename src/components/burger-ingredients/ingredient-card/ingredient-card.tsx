import React from 'react';
import { useDispatch, useSelector } from '@hooks/index'; // Импортируем типизированные хуки
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../../types/auth/types';
import s from './ingredient-card.module.scss';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { openModal } from '@services/modal/modal-slices';

interface IngredientCardProps {
	ingredient: IngredientModel;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
	const location = useLocation();
	const orderIngredients = useSelector((state) => state.order.ingredients);
	const count = orderIngredients.filter((id) => id === ingredient._id).length;
	const [{ isDragging }, drag] = useDrag({
		type: 'addIngredient',
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<Link
      key={ingredient.id}
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
    >
		<div
			ref={drag}
			className={s.card}
			role='button'
			tabIndex={0}
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<img src={ingredient.image} alt={ingredient.name} />
			<span className='text text_type_digits-default w-100 d-flex justify-center'>
				<span className='mr-1'>{ingredient.price}</span>
				<CurrencyIcon type='primary' />
			</span>
			<span className='text text_type_main-default mt-1 w-100 d-flex justify-center text-center'>
				{ingredient.name}
			</span>
			{count > 0 && (
				<div className={s.circle}>
					<span className='text text_type_digits-default'>{count}</span>
				</div>
			)}
		</div>
		</Link>
	);
};

export default IngredientCard;
