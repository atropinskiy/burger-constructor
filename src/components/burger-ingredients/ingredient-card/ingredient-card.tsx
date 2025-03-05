import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../../utils/models';
import s from './ingredient-card.module.scss';
import { string, number, func, shape } from 'prop-types';
interface IngredientCardProps {
	ingredient: IngredientModel;
	onClick: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
	onClick,
}) => {
	return (
		<div
			className={s.card}
			onClick={onClick}
			role='button'
			tabIndex={0} // Добавлено для поддержки навигации через Tab
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClick(); // Обработка нажатия Enter или пробела
				}
			}}>
			<img src={ingredient.image} alt={ingredient.name} />
			<span className='text text_type_digits-default w-100 d-flex justify-center'>
				<span className='mr-1'>{ingredient.price}</span>
				<CurrencyIcon type='primary' />
			</span>
			<span className='text text_type_main-default mt-1 w-100 d-flex justify-center text-center'>
				{ingredient.name}
			</span>
		</div>
	);
};

IngredientCard.propTypes = {
	ingredient: shape({
		_id: string.isRequired,
		name: string.isRequired,
		type: string.isRequired,
		proteins: number.isRequired,
		fat: number.isRequired,
		carbohydrates: number.isRequired,
		calories: number.isRequired,
		price: number.isRequired,
		image: string.isRequired,
		image_mobile: string.isRequired,
		image_large: string.isRequired,
		__v: number.isRequired,
	}).isRequired,
	onClick: func.isRequired,
};

export default IngredientCard;
