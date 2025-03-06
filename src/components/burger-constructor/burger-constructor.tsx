import React, { useCallback } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import s from './burger-constructor.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedIngredient, removeSelectedIngredient, updateOrder } from '../../services/ingredients/slices';
import { RootState } from '../../services/store';
import { IngredientModel } from '@utils/models';
import FillingsElement from './fillings_element/fillings-element';

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((state: RootState) => state.ingredients.selectedItems);
  const allIngredients = useSelector((state: RootState) => state.ingredients.allItems);
  const bun = useSelector((state: RootState) => state.ingredients.bun);
  const fillings = selectedIngredients.filter(item => item.type !== 'bun');

  // Функции для работы с ингредиентами
  const handleAddIngredient = (ingredient: IngredientModel) => {
    dispatch(addSelectedIngredient(ingredient));
  };

  const handleReplaceBun = (newBun: IngredientModel) => {
    if (bun && bun.id) {
      dispatch(removeSelectedIngredient(bun.id)); // Удаляем старую булку
    }
    dispatch(addSelectedIngredient(newBun)); // Добавляем новую булку
  };

  // Перемещение ингредиента в списке
  const moveIngredient = useCallback(
    (fromIndex: number, toIndex: number) => {
      console.log(fromIndex, toIndex)
    },
    [dispatch]
  );

  // Настройка drop (перетаскивания)
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'addIngredient',  // Принимаем только добавление ингредиента
    drop: (item: { ingredient?: IngredientModel; fromIndex?: number; toIndex?: number }) => {
      if (item.ingredient) {
        handleAddIngredient(item.ingredient); // Добавляем ингредиент
      } else if (item.fromIndex !== undefined && item.toIndex !== undefined) {
        moveIngredient(item.fromIndex, item.toIndex); // Перемещаем ингредиент только на отпускании
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
        {/* Вставка булки сверху */}
        {bun ? (
          <div className="ml-7 mb-2">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`} 
              price={bun.price} 
              thumbnail={bun.image} 
              handleClose={() => handleReplaceBun(bun)} // Замена булки
            />
          </div>
        ) : (
          <div className={s.placeholder}>Добавьте булку</div>
        )}

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
        {bun ? (
          <div className="ml-7 mt-2">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`} 
              price={bun.price} 
              thumbnail={bun.image} 
              handleClose={() => handleReplaceBun(bun)} // Замена булки
            />
          </div>
        ) : (
          <div className={s.placeholder}>Добавьте булку</div>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
