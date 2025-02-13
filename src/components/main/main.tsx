import { useState } from 'react';
import s from './main.module.scss';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '@utils/data';
import { Modal } from '../modal/modal';

interface MainProps {
	ingredients: Ingredient[];
}

export const Main: React.FC<MainProps> = ({ ingredients }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);
	return (
		<main>
			<div className='d-flex g-10 h-100'>
				<section className={`${s.contructor_container} ${s.bordered}`}>
					<BurgerIngredients ingredients={ingredients} />
				</section>
				<section className={s.contructor_container}>
					<div className='mt-25 d-flex flex-column valign-center pb-4'>
						<BurgerConstructor currentIngredients={ingredients} />
						<div className='ml-auto mt-10 pr-4 pb-10'>
							<Button
								htmlType='button'
								type='primary'
								size='large'
								onClick={handleOpenModal}>
								Оформить заказ
							</Button>
						</div>
					</div>
				</section>
			</div>
			{isModalOpen && <Modal onClose={handleCloseModal} orderNumber={12345} />}
		</main>
	);
};
