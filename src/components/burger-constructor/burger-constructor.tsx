import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd'; // Хук для перетаскивания
import s from './burger-constructor.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedIngredient, removeSelectedIngredient } from '../../services/ingredients/slices';
import { RootState } from '../../services/store';
import { IngredientMock } from '../../mock-data/ingredients';
import { IngredientModel } from '@utils/models';


const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((state: RootState) => state.ingredients.selectedItems);

  const bun = selectedIngredients.find(item => item.type === 'bun') || null;
  const fillings = selectedIngredients.filter(item => item.type !== 'bun');

  const handleRemoveIngredient = (id: string) => {
    dispatch(removeSelectedIngredient(id));
  };

  const handleAddIngredient = (ingredient: IngredientModel) => {
    dispatch(addSelectedIngredient(ingredient));
  };

  const handleReplaceBun = (newBun: IngredientModel) => {
    if (bun && bun.id) {
      dispatch(removeSelectedIngredient(bun.id)); 
    }
    dispatch(addSelectedIngredient(newBun));
  };

  const BunPlaceholder = () => (
    <div className={s.placeholder}>Добавьте булку</div>
  );

  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient', 
    drop: (item: { ingredient: IngredientModel }) => {
      if (item.ingredient.type === 'bun') {
        handleReplaceBun(item.ingredient);
      } else {
        handleAddIngredient(item.ingredient);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={s.constructorContainer}>
      <div className="ml-10">
        {/* Булка сверху */}
        {bun ? (
          <div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              handleClose={() => handleReplaceBun(IngredientMock)} // Кнопка замены
            />
          </div>
        ) : (
          <BunPlaceholder />
        )}

        {/* Начинки */}
				<div className = {s.ingredients_scroll}>
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
				</div>

        {/* Булка снизу */}
        {bun ? (
          <div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              handleClose={() => handleReplaceBun(IngredientMock)} // Кнопка замены
            />
            <button onClick={() => handleReplaceBun(IngredientMock)}>
              Заменить булку снизу
            </button>
          </div>
        ) : (
          <BunPlaceholder />
        )}
      </div>

      {/* Компонент для добавления ингредиентов */}
      <div className="ingredient-selector">
        <button onClick={() => handleAddIngredient(IngredientMock)}>
          Добавить начинку
        </button>
      </div>

      {/* Стиль для отображения визуального состояния перетаскивания */}
      {isOver && <div className={s.dropIndicator}>Перетащите сюда ингредиент</div>}
    </div>
  );
};

export default BurgerConstructor;
