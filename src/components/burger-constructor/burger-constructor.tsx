import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import s from './burger-constructor.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedIngredient, removeSelectedIngredient, updateOrder } from '../../services/ingredients/constructor_slices';
import { addIngredientToOrder, removeBunsFromOrderById, addBunsToOrderById } from '../../services/order/order-slices'
import { RootState } from '../../services/store';
import { IngredientModel } from '@utils/models';
import FillingsElement from './fillings_element/fillings-element';
import IngredientCell from '../ingredient-cell/ingredient-cell';

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((state: RootState) => state.ingredients.selectedItems);
  const bun = useSelector((state: RootState) => state.ingredients.bun);
  const fillings = selectedIngredients.filter(item => item.type !== 'bun');

  const handleAddIngredient = (ingredient: IngredientModel) => {
    if (ingredient.type === 'bun') {
      if (bun && bun._id) {
        dispatch(removeBunsFromOrderById(bun._id));  
      }
      dispatch(addBunsToOrderById(ingredient._id));
      dispatch(addSelectedIngredient(ingredient)); 
    } else {
      dispatch(addSelectedIngredient(ingredient));
      dispatch(addIngredientToOrder(ingredient._id))
    }
  };

  const moveIngredient = (fromIndex: number, toIndex: number) => {
    console.log(fromIndex, toIndex)
    if (fromIndex !== toIndex) {
      dispatch(updateOrder({ fromIndex, toIndex }));
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'addIngredient', 
    drop: (item: { ingredient?: IngredientModel; fromIndex?: number; toIndex?: number }) => {
      if (item.ingredient) {
        handleAddIngredient(item.ingredient); // Добавляем ингредиент
      } else if (item.fromIndex !== undefined && item.toIndex !== undefined) {
        moveIngredient(item.fromIndex, item.toIndex); // Перемещаем ингредиент
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={s.constructorContainer}>
      <div className="ml-10">
        {/* Вставка булки сверху или снизу */}
        <div>
          {bun ? (
            <div className="ml-7 mb-2">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => handleAddIngredient(bun)} // Заменить булку
              />
            </div>
          ) : (
            <IngredientCell title="Выберите булочку" type="top" />
          )}
        </div>

        {/* Список начинок */}
        {fillings.map((ingredient, index) => (
          <div key={ingredient.id}>
            <FillingsElement
              ingredient={ingredient}
              index={index}
              moveIngredient={moveIngredient}
            />
          </div>
        ))}

        {/* Вставка булки снизу */}
        <div>
          {bun ? (
            <div className="ml-7 mt-2">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
                handleClose={() => handleAddIngredient(bun)} // Заменить булку
              />
            </div>
          ) : (
            <div className="w-100 mt-2">
              <IngredientCell title="Выберите булочку" type="bottom" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurgerConstructor;
