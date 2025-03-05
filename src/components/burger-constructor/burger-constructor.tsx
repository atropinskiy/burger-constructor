import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedIngredient, removeSelectedIngredient } from '../../services/ingredients/slices';
import { RootState } from '../../services/store';
import { IngredientMock } from '../../mock-data/ingredients';
import { IngredientModel } from '@utils/models';

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((state: RootState) => state.ingredients.selectedItems);

  // Ищем булки (верх и низ)
  const bun = selectedIngredients.find(item => item.type === 'bun') || null;
  // Фильтруем только начинки (не булки)
  const fillings = selectedIngredients.filter(item => item.type !== 'bun');

  // Удаляем выбранный ингредиент
  const handleRemoveIngredient = (id: string) => {
    dispatch(removeSelectedIngredient(id)); // Удаляем только конкретный ингредиент
  };

  // Добавление ингредиента
  const handleAddIngredient = (ingredient: IngredientModel) => {
    dispatch(addSelectedIngredient(ingredient));
  };

  return (
    <div className={s.constructorContainer}>
      <div className="ml-10">
        {/* Булка сверху */}
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        {/* Начинки */}
        {fillings.map((ingredient) => (
          <div key={ingredient.id} className="d-flex align-center mb-2 mt-2">
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
							handleClose={() => {
								if (ingredient.id) {
									handleRemoveIngredient(ingredient.id);
								}
							}}
            />
          </div>
        ))}

        {/* Булка снизу */}
        {/* {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )} */}
      </div>

      {/* Компонент для добавления ингредиентов */}
      <div className="ingredient-selector">
        {/* Здесь могут быть кнопки для добавления ингредиентов */}
        <button onClick={() => handleAddIngredient(IngredientMock)}>
          Добавить начинку
        </button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
