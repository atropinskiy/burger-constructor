import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

const BurgerConstructor: React.FC = () => {
  // Получаем список выбранных ингредиентов из состояния Redux
  const selectedIngredients = useSelector((state: RootState) => state.ingredients.selectedItems);

  return (
    <div className={s.constructorContainer}>
      <div className="ml-10">
        {/* Булка сверху */}
        {selectedIngredients.length > 0 && selectedIngredients[0].type === 'bun' && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedIngredients[0].name} (верх)`}
            price={selectedIngredients[0].price}
            thumbnail={selectedIngredients[0].image}
          />
        )}

        {/* Начинки */}
        {selectedIngredients.slice(1, selectedIngredients.length - 1).map((ingredient) => (
          <div key={ingredient._id} className="d-flex align-center mb-2">
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </div>
        ))}

        {/* Булка снизу */}
        {selectedIngredients.length > 0 && selectedIngredients[selectedIngredients.length - 1].type === 'bun' && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedIngredients[selectedIngredients.length - 1].name} (низ)`}
            price={selectedIngredients[selectedIngredients.length - 1].price}
            thumbnail={selectedIngredients[selectedIngredients.length - 1].image}
          />
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
