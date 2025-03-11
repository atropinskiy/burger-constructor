import s from './main.module.scss';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { useDispatch, useSelector } from '@hooks/index';
import { RootState } from '../../services/store';
import { TotalPrice } from '../total-price/total-price';
import { createOrder } from '../../services/actions';
import {
	openModal,
	closeModal,
	setLoading,
} from '../../services/modal/modal-slices';
import { OrderDetails } from '../modal/order-details/order-details';
import { clearSelectedItems } from '@services/ingredients/constructor_slices'; // Импортируем экшен очистки ингредиентов
import { clearOrder } from '@services/order/order-slices';

export const Main: React.FC = () => {
	const dispatch = useDispatch();
	const totalPrice = useSelector(
		(state: RootState) => state.ingredients.totalPrice
	);
	const orderIngredients = useSelector(
		(state: RootState) => state.order.ingredients
	);
	const error = useSelector((state: RootState) => state.order.error);
	const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
	const modalContent = useSelector((state: RootState) => state.modal.content);
	const orderNumber = useSelector((state: RootState) => state.order.number);

	const handleOrderClick = async () => {
		dispatch(setLoading(true));

		const resultAction = await dispatch(createOrder(orderIngredients));

		if (createOrder.fulfilled.match(resultAction)) {
			const updatedOrderNumber = resultAction.payload.order.number;
			if (updatedOrderNumber) {
				// Открытие модала с номером заказа
				dispatch(
					openModal({
						title: 'Номер заказа',
						content: `Ваш номер заказа: ${updatedOrderNumber}`,
					})
				);

				// Очистить выбранные ингредиенты после успешного оформления
				dispatch(clearSelectedItems());
				dispatch(clearOrder());
			}
		} else {
			console.log('Ошибка при оформлении заказа:', error);
		}

		dispatch(setLoading(false));
	};

	return (
		<main>
			<div className='d-flex g-10 h-100'>
				<section className={`${s.contructor_container}`}>
					<BurgerIngredients />
				</section>
				<section className={s.contructor_container}>
					<div className='mt-25 d-flex flex-column valign-center pb-4'>
						<BurgerConstructor />
						<div className='ml-auto mt-10 pr-4 pb-10 d-flex'>
							<TotalPrice price={totalPrice} />
							<Button
								htmlType='button'
								type='primary'
								size='large'
								disabled={orderIngredients.length === 0}
								onClick={handleOrderClick}>
								Оформить заказ
							</Button>
						</div>
					</div>
				</section>
			</div>

			{isModalOpen && modalContent && (
				<Modal onClose={() => dispatch(closeModal())} title=''>
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</main>
	);
};
