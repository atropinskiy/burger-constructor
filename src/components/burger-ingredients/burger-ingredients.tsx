import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Data from '../../utils/data';
import IngredientCard from './ingredient-card/ingredient-card';
import s from './burger-ingredients.module.scss';

export const BurgerIngredients = () => {
	const [current, setCurrent] = useState<string>('one');

	// Фильтруем данные в зависимости от текущей вкладки
	const filteredData = Data.filter((ingredient) => {
		if (current === 'one') return ingredient.type === 'bun'; // Булки
		if (current === 'two') return ingredient.type === 'sauce'; // Соусы
		if (current === 'three') return ingredient.type === 'main'; // Начинки
		return true;
	});

	// Указываем тип для groupedData
	const groupedData: { [key: string]: typeof Data } = filteredData.reduce(
		(acc, ingredient) => {
			const { type } = ingredient;
			if (!acc[type]) {
				acc[type] = [];
			}
			acc[type].push(ingredient);
			return acc;
		},
		{} as { [key: string]: typeof Data }
	);

	return (
		<div className='d-flex flex-column'>
			<h1 className='text text_type_main-medium mt-10'>Соберите бургер</h1>
			<div className={`d-flex mt-5 ${s.tab}`}>
				<Tab value='one' active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='two' active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='three' active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className='grid-col-2 pr-4 pl-4 border-box w-100'>
				{Object.keys(groupedData).map((type) => (
					<div key={type} className='ingredient-group'>
						<h3>{type}</h3>
						<div className='grid-col-2'>
							{groupedData[type].map((ingredient) => (
								<IngredientCard key={ingredient._id} ingredient={ingredient} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
