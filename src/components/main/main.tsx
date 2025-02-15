import s from './main.module.scss';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '@utils/data';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import { OrderDetails } from '../modal/order-details/order-details';

interface MainProps {
	ingredients: Ingredient[];
}

export const Main: React.FC<MainProps> = ({ ingredients }) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<main>
			<div className='d-flex g-10 h-100'>
				<section className={`${s.contructor_container}`}>
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
								onClick={openModal}>
								Оформить заказ
							</Button>
						</div>
					</div>
				</section>
			</div>
			{isModalOpen && (
				<Modal title='' onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</main>
	);
};