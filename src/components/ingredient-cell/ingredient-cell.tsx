import React from 'react';
import s from './ingredient-cell.module.scss';

interface ingredientCellProps {
	title: string;
	type: 'top' | 'bottom';
}

const IngredientCell: React.FC<ingredientCellProps> = ({ title, type }) => {
	const cellClass = type === 'top' ? s.top_bun : s.bottom_bun;
	return (
		<div className={cellClass}>
			<p className='text text_type_main-medium text_color_inactive'>{title}</p>
		</div>
	);
};

export default IngredientCell;
