import s from './main.module.scss';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@utils/data';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import { OrderDetails } from '../modal/order-details/order-details';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../services/store"; // Импорт AppDispatch
import { addIngredient } from "../../services/ingredients/actions"; // Правильный импорт экшена

interface MainProps {
	ingredients: IngredientModel[];
}

export const Main: React.FC<MainProps> = ({ ingredients }) => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const allIngredients = useSelector(
		(state: RootState) => state.ingredients.items
	);
	const dispatch = useDispatch<AppDispatch>(); // Применяем тип AppDispatch

	// Добавляем первый ингредиент из списка в конструктор
	// Используем async/await для обработки асинхронного экшена
	const handleAddIngredient = async () => {
		if (allIngredients.length > 0) {
			try {
				// Диспатчим асинхронный экшен
				await dispatch(addIngredient(allIngredients[0]));
			} catch (error) {
				console.error("Ошибка при добавлении ингредиента", error);
			}
		}
	};

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
							<Button htmlType="button" type="secondary" size="large" onClick={handleAddIngredient}>
								Добавить ингредиент
							</Button>
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
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</main>
	);
};
