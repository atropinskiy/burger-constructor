import React from 'react';
import { IngredientModel } from '@utils/models';
import s from './ingredient-details.module.scss';

interface ModalProps {
	ingredient: IngredientModel;
}

export const IngredientDetails: React.FC<ModalProps> = ({ ingredient }) => {
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
