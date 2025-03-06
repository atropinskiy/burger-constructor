import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../../utils/models';
import s from './ingredient-card.module.scss';
import { useDrag } from 'react-dnd';

interface IngredientCardProps {
	ingredient: IngredientModel;
	onClick: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
	onClick,
}) => {
	const orderIngredients = useSelector(
		(state: RootState) => state.order.ingredients
	);
	const count = orderIngredients.filter((id) => id === ingredient._id).length;
	const [{ isDragging }, drag] = useDrag({
		type: 'addIngredient',
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div
			ref={drag}
			className={s.card}
			onClick={onClick}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick();
				}
			}}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
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
	);
};

export default IngredientCard;
