import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../utils/data';
import s from './ingredient-card.module.scss';

interface IngredientCardProps {
	ingredient: Ingredient;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
	return (
		<div className={s.card}>
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

export default IngredientCard;
