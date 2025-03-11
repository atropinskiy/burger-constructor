import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import s from './burger-constructor.module.scss';
import { useDispatch, useSelector } from '@hooks/index';
import {
	addSelectedIngredient,
	updateOrder,
} from '../../services/ingredients/constructor_slices';
import {
	addIngredientToOrder,
	removeBunsFromOrderById,
	addBunsToOrderById,
} from '../../services/order/order-slices';
import { IngredientModel } from '@utils/models';
import FillingsElement from './fillings_element/fillings-element';
import IngredientCell from '../ingredient-cell/ingredient-cell';

const BurgerConstructor: React.FC = () => {
	const dispatch = useDispatch();
	const { bun, fillings } = useSelector(
		(state) => state.ingredients.selectedItems
	);

	const handleAddIngredient = (ingredient: IngredientModel) => {
		if (ingredient.type === 'bun') {
			if (bun && bun._id) {
				dispatch(removeBunsFromOrderById(bun._id));
			}
			dispatch(addBunsToOrderById(ingredient._id));
			dispatch(addSelectedIngredient(ingredient));
		} else {
			dispatch(addSelectedIngredient(ingredient));
			dispatch(addIngredientToOrder(ingredient._id));
		}
	};

	const moveIngredient = (fromIndex: number, toIndex: number) => {
		if (fromIndex !== toIndex) {
			dispatch(updateOrder({ fromIndex, toIndex }));
		}
	};

	const [, drop] = useDrop({
		accept: 'addIngredient',
		drop: (item: {
			ingredient?: IngredientModel;
			fromIndex?: number;
			toIndex?: number;
		}) => {
			if (item.ingredient) {
				handleAddIngredient(item.ingredient);
			} else if (item.fromIndex !== undefined && item.toIndex !== undefined) {
				moveIngredient(item.fromIndex, item.toIndex);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	return (
		<div ref={drop} className={s.constructorContainer}>
			<div className='ml-10'>
				<div>
					{bun ? (
						<div className='ml-7 mb-2'>
							<ConstructorElement
								type='top'
								isLocked={true}
								text={`${bun.name} (верх)`}
								price={bun.price}
								thumbnail={bun.image}
								handleClose={() => handleAddIngredient(bun)}
							/>
						</div>
					) : (
						<IngredientCell title='Выберите булочку' type='top' />
					)}
				</div>

				{fillings.map((ingredient, index) => (
					<div key={ingredient.id}>
						<FillingsElement
							ingredient={ingredient}
							index={index}
							moveIngredient={moveIngredient}
						/>
					</div>
				))}

				<div>
					{bun ? (
						<div className='ml-7 mt-2'>
							<ConstructorElement
								type='bottom'
								isLocked={true}
								text={`${bun.name} (низ)`}
								price={bun.price}
								thumbnail={bun.image}
								handleClose={() => handleAddIngredient(bun)}
							/>
						</div>
					) : (
						<div className='w-100 mt-2'>
							<IngredientCell title='Выберите булочку' type='bottom' />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BurgerConstructor;
