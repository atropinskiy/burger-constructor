import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IngredientModel } from '../../utils/data';
import s from './burger-constructor.module.scss';

interface BurgerConstructorProps {
	currentIngredients: IngredientModel[];
}
const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
	currentIngredients,
}) => {
	if (!currentIngredients || currentIngredients.length === 0) {
		return <div>Нет ингредиентов для конструктора</div>;
	}
	return (
		<div>
			<ConstructorElement
				type='top'
				isLocked={true}
				text={currentIngredients[0].name + ' (верх)'}
				price={currentIngredients[0].price}
				thumbnail={currentIngredients[0].image_mobile}
				extraClass='ml-8'
			/>
			<div className={s['ingredients-scroll']}>
				{currentIngredients.slice(1, 12).map((item, index) => (
					<div className='d-flex valign-center mt-4' key={index}>
						<DragIcon type='primary' className='mr-2' />
						<ConstructorElement
							text={item.name}
							price={item.price}
							thumbnail={item.image_mobile}
						/>
					</div>
				))}
			</div>
			<ConstructorElement
				type='bottom'
				isLocked={true}
				text={currentIngredients[0].name + ' (низ)'}
				price={currentIngredients[0].price}
				thumbnail={currentIngredients[0].image_mobile}
				extraClass='ml-8 mt-4'
			/>
		</div>
	);
};

export default BurgerConstructor;
