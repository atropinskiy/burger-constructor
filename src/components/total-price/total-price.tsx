import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

interface TotalPriceProps {
	price: number;
}

export const TotalPrice: React.FC<TotalPriceProps> = ({ price }) => {
	return (
		<div className='text text_type_digits-medium d-flex valign-center mr-10'>
			{price}
			<CurrencyIcon type='primary' />
		</div>
	);
};
