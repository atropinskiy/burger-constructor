import s from './main.module.scss';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal';
import { useDispatch, useSelector } from '@hooks/index';
import { TotalPrice } from '@components/total-price/total-price';
import { createOrder } from '../../services/actions';
import {
	openModal,
	closeModal,
	setLoading,
} from '../../services/modal/modal-slices';
import { OrderDetails } from '@components/modal/order-details/order-details';
import { clearSelectedItems } from '@services/ingredients/constructor_slices';
import { clearOrder } from '@services/order/order-slices';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

export const Main: React.FC = () => {
	const dispatch = useDispatch();
	const totalPrice = useSelector((state) => state.ingredients.totalPrice);
	const orderIngredients = useSelector((state) => state.order.ingredients);
	const isLogged = useSelector((state) => state.user.isLogged) === true;
	const error = useSelector((state) => state.order.error);
	const isModalOpen = useSelector((state) => state.modal.isOpen);
	const modalContent = useSelector((state) => state.modal.content);
	const orderNumber = useSelector((state) => state.order.number);

	const handleOrderClick = async () => {
		dispatch(setLoading(true));

		const resultAction = await dispatch(createOrder(orderIngredients));

		if (createOrder.fulfilled.match(resultAction)) {
			const updatedOrderNumber = resultAction.payload.order.number;
			if (updatedOrderNumber) {
				dispatch(
					openModal({
						title: 'Номер заказа',
						content: `Ваш номер заказа: ${updatedOrderNumber}`,
					})
				);

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
			<DndProvider backend={HTML5Backend}>
				<div className='d-flex g-10 h-100'>
					<section className={`${s.contructor_container}`}>
						<BurgerIngredients />
					</section>
					<section className={s.contructor_container}>
						<div className='mt-25 d-flex flex-column valign-center pb-4'>
							<BurgerConstructor />
							<div className='ml-auto mt-10 pr-4 pb-10 d-flex'>
								<TotalPrice price={totalPrice} />
								{!isLogged ? (
									<Link to={'/login'}>
										<Button
											htmlType='button'
											type='primary'
											size='large'
											disabled={
												orderIngredients.length === 0 || isLogged === false
											}
											onClick={handleOrderClick}>
											Оформить заказ
										</Button>
									</Link>
								) : (
									<Button
										htmlType='button'
										type='primary'
										size='large'
										disabled={orderIngredients.length === 0}
										onClick={handleOrderClick}>
										Оформить заказ
									</Button>
								)}
							</div>
						</div>
					</section>
				</div>

				{isModalOpen && modalContent && (
					<Modal onClose={() => dispatch(closeModal())} title=''>
						<OrderDetails orderNumber={orderNumber} />
					</Modal>
				)}
			</DndProvider>
		</main>
	);
};
