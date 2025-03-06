import s from './main.module.scss';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '@utils/models';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/use-modal';
import { OrderDetails } from '../modal/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "../../services/store";
import { addSelectedIngredient } from '../../services/ingredients/slices';
import { TotalPrice } from '../total-price/total-price';

interface MainProps {
  ingredients: IngredientModel[];
}

export const Main: React.FC<MainProps> = ({ ingredients }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const totalPrice = useSelector((state: RootState) => state.ingredients.totalPrice)

  const handleAddIngredient = (ingredient: IngredientModel) => {
    // Убедитесь, что все данные передаются корректно
    console.log(ingredient); // Проверка содержимого ингредиента
    dispatch(addSelectedIngredient(ingredient));  // Добавление в редуктор
  };
  

  return (
    <main>
      <div className="d-flex g-10 h-100">
        <section className={`${s.contructor_container}`}>
          <BurgerIngredients />
        </section>
        <section className={s.contructor_container}>
          <div className="mt-25 d-flex flex-column valign-center pb-4">
            <BurgerConstructor />
            <div className="ml-auto mt-10 pr-4 pb-10 d-flex">
              <TotalPrice price={totalPrice} />
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={openModal}
              >
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
