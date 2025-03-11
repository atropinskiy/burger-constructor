import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from '@hooks/index';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../utils/models';
import IngredientCard from './ingredient-card/ingredient-card';
import { Modal } from '../modal/modal';
import s from './burger-ingredients.module.scss';
import { IngredientDetails } from '../modal/ingredient-details/ingredient-details';
import { openModal, closeModal } from '../../services/modal/modal-slices';

export const BurgerIngredients: React.FC = () => {
	const [current, setCurrent] = useState<string>('one');
	const dispatch = useDispatch();
	const { isOpen, title, ingredient } = useSelector((state) => state.modal);
	const ingredients = useSelector((state) => state.ingredients.allItems);
	const bunRef = useRef<HTMLDivElement | null>(null);
	const sauceRef = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	// Группировка данных по типу ингредиента
	const groupedData = ingredients.reduce((acc, ingredient) => {
		const { type, _id } = ingredient;
		if (!acc[type]) {
			acc[type] = [];
		}

		// Добавляем только уникальные ингредиенты
		if (!acc[type].some((item) => item._id === _id)) {
			acc[type].push(ingredient);
		}

		return acc;
	}, {} as { [key: string]: IngredientModel[] });

	const handleTabClick = (tab: string) => {
		setCurrent(tab);
		let scrollTarget: HTMLElement | null = null;

		// Определяем, к какой секции прокрутить
		if (tab === 'one' && bunRef.current) {
			scrollTarget = bunRef.current;
		} else if (tab === 'two' && sauceRef.current) {
			scrollTarget = sauceRef.current;
		} else if (tab === 'three' && mainRef.current) {
			scrollTarget = mainRef.current;
		}

		// Прокручиваем к целевой секции
		if (scrollTarget) {
			scrollTarget.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	const handleIngredientClick = (ingredient: IngredientModel) => {
		dispatch(
			openModal({
				title: 'Детали ингредиента',
				ingredient: ingredient,
			})
		);
	};

	const onScroll = () => {
		const sections = [
			{ ref: bunRef, tab: 'one' },
			{ ref: sauceRef, tab: 'two' },
			{ ref: mainRef, tab: 'three' },
		];

		let currentTab = 'one';
		let closestElementDistance = Infinity;

		// Определяем текущую вкладку, в зависимости от прокрутки
		sections.forEach(({ ref, tab }) => {
			if (ref.current) {
				const rect = ref.current.getBoundingClientRect();
				const distanceToTop = Math.abs(rect.top);
				if (distanceToTop < closestElementDistance) {
					closestElementDistance = distanceToTop;
					currentTab = tab;
				}
			}
		});

		setCurrent(currentTab);
	};

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener('scroll', onScroll);
		}

		// Очистка событий при размонтировании
		return () => {
			if (container) {
				container.removeEventListener('scroll', onScroll);
			}
		};
	}, []);

	const handleModalClose = () => {
		dispatch(closeModal());
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

			<div
				ref={containerRef}
				className={`w-100 p100 mt-10 ml-2 ${s['ingredients-block']}`}>
				{groupedData['bun']?.length > 0 && (
					<div ref={bunRef} className='ingredient-group'>
						<h3 className='text text_type_main-medium'>Булки</h3>
						<div className='grid-col-2'>
							{groupedData['bun'].map((ingredient) => (
								<IngredientCard
									key={ingredient._id}
									ingredient={ingredient}
									onClick={() => handleIngredientClick(ingredient)}
								/>
							))}
						</div>
					</div>
				)}

				{groupedData['sauce']?.length > 0 && (
					<div ref={sauceRef} className='ingredient-group'>
						<h3 className='text text_type_main-medium'>Соусы</h3>
						<div className='grid-col-2'>
							{groupedData['sauce'].map((ingredient) => (
								<IngredientCard
									key={ingredient._id}
									ingredient={ingredient}
									onClick={() => handleIngredientClick(ingredient)}
								/>
							))}
						</div>
					</div>
				)}

				{groupedData['main']?.length > 0 && (
					<div ref={mainRef} className='ingredient-group'>
						<h3 className='text text_type_main-medium'>Начинки</h3>
						<div className='grid-col-2'>
							{groupedData['main'].map((ingredient) => (
								<IngredientCard
									key={ingredient._id}
									ingredient={ingredient}
									onClick={() => handleIngredientClick(ingredient)}
								/>
							))}
						</div>
					</div>
				)}
			</div>

			{isOpen && ingredient && (
				<Modal onClose={handleModalClose} title={title}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</div>
	);
};
