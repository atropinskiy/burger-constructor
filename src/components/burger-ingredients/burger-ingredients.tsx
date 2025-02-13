import React, { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import IngredientCard from './ingredient-card/ingredient-card';
import { Modal } from '../modal/modal';
import s from './burger-ingredients.module.scss';

interface BurgerIngredientsProps {
	ingredients: Ingredient[];
}

export const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
	ingredients,
}) => {
	const [current, setCurrent] = useState<string>('one');
	const [selectedIngredient, setSelectedIngredient] =
		useState<Ingredient | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const bunRef = useRef<HTMLDivElement | null>(null);
	const sauceRef = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<HTMLDivElement | null>(null);

	const groupedData = ingredients.reduce((acc, ingredient) => {
		const { type } = ingredient;
		if (!acc[type]) {
			acc[type] = [];
		}
		acc[type].push(ingredient);
		return acc;
	}, {} as { [key: string]: Ingredient[] });

	const openModal = (ingredient: Ingredient) => {
		setSelectedIngredient(ingredient);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedIngredient(null);
	};

	const handleTabClick = (tab: string) => {
		setCurrent(tab);
		let scrollTarget: HTMLElement | null = null;

		if (tab === 'one' && bunRef.current) {
			scrollTarget = bunRef.current;
		} else if (tab === 'two' && sauceRef.current) {
			scrollTarget = sauceRef.current;
		} else if (tab === 'three' && mainRef.current) {
			scrollTarget = mainRef.current;
		}

		if (scrollTarget) {
			scrollTarget.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	return (
		<div>
			<h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
			<div className={'d-flex mt-5'}>
				<Tab
					value='one'
					active={current === 'one'}
					onClick={() => handleTabClick('one')}>
					Булки
				</Tab>
				<Tab
					value='two'
					active={current === 'two'}
					onClick={() => handleTabClick('two')}>
					Соусы
				</Tab>
				<Tab
					value='three'
					active={current === 'three'}
					onClick={() => handleTabClick('three')}>
					Начинки
				</Tab>
			</div>

			<div className={`w-100 р100 mt-10 ml-2 ${s['ingredients-block']}`}>
				<div ref={bunRef} className='ingredient-group'>
					<h3 className='text text_type_main-medium'>Булки</h3>
					<div className='grid-col-2'>
						{groupedData['bun']?.map((ingredient) => (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onClick={() => openModal(ingredient)}
							/>
						))}
					</div>
				</div>

				<div ref={sauceRef} className='ingredient-group'>
					<h3 className='text text_type_main-medium'>Соусы</h3>
					<div className='grid-col-2'>
						{groupedData['sauce']?.map((ingredient) => (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onClick={() => openModal(ingredient)}
							/>
						))}
					</div>
				</div>

				<div ref={mainRef} className='ingredient-group'>
					<h3 className='text text_type_main-medium'>Начинки</h3>
					<div className='grid-col-2'>
						{groupedData['main']?.map((ingredient) => (
							<IngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onClick={() => openModal(ingredient)}
							/>
						))}
					</div>
				</div>
			</div>

			{isModalOpen && selectedIngredient && (
				<Modal ingredient={selectedIngredient} onClose={closeModal} />
			)}
		</div>
	);
};
