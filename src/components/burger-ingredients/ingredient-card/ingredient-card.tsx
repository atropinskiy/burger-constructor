import React from 'react';
import { useSelector } from '@hooks/index'; // Импортируем типизированные хуки
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../../types/auth/types';
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
	// Получаем список ингредиентов из состояния с помощью типизированного useSelector
	const orderIngredients = useSelector((state) => state.order.ingredients);
	const count = orderIngredients.filter((id) => id === ingredient._id).length;
	const [{ isDragging }, drag] = useDrag({
		type: 'addIngredient',
		item: { ingredient },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onClick();
		}
	};

	return (
		<div
			ref={drag}
			className={s.card}
			onClick={onClick}
			role='button'
			tabIndex={0}
			onKeyDown={handleKeyDown} // Используем улучшенный обработчик
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
