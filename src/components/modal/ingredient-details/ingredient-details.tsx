import React from 'react';
import s from './ingredient-details.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from '@hooks/index';

export const IngredientDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useSelector(
		(state) => state.ingredients.allItems.find((item) => item._id === id) 
	);
	if (!ingredient) {
		return <p>Ингредиент не найден</p>; 
	}
	return (
		<div className='d-flex flex-column valign-center'>
			<img width={'480px'} src={ingredient.image_large} alt={ingredient.name} />
			<h3 className='text text_type_main-medium'>{ingredient.name}</h3>
			<p className='text text_type_main-default'></p>
			<div className={'d-flex mt-8'}>
				<div className={`${s.blocks} text-center`}>
					<p className='text text_type_main-small text_color_inactive'>
						Калории,ккал
					</p>
					<p className='text text_type_digits-small text_color_inactive'>
						{ingredient.calories.toFixed(1)}
					</p>
				</div>
				<div className={`${s.blocks} text-center mr-5 ml-5`}>
					<p className='text text_type_main-small text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-small text_color_inactive'>
						{ingredient.proteins.toFixed(1)}
					</p>
				</div>
				<div className={`${s.blocks} text-center`}>
					<p className='text text_type_main-small text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-small text_color_inactive'>
						{ingredient.fat.toFixed(1)}
					</p>
				</div>
				<div className={`${s.blocks} text-center mb-5`}>
					<p className='text text_type_main-small text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-small text_color_inactive'>
						{ingredient.carbohydrates.toFixed(1)}
					</p>
				</div>
			</div>
		</div>
	);
};
