import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../utils/models';
import IngredientCard from './ingredient-card/ingredient-card';
import { Modal } from '../modal/modal';
import s from './burger-ingredients.module.scss';
import { useModal } from '../../hooks/use-modal';
import { RootState } from '../../services/store';
import { IngredientDetails } from '../modal/ingredient-details/ingredient-details';

export const BurgerIngredients: React.FC = () => {
  const [current, setCurrent] = useState<string>('one');
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientModel | null>(null); // состояние для выбранного ингредиента
  const { isModalOpen, openModal, closeModal } = useModal();
  const ingredients = useSelector((state: RootState) => state.ingredients.allItems);
  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  // Группируем ингредиенты, но добавляем проверку на уникальность по _id
  const groupedData = ingredients.reduce((acc, ingredient) => {
    const { type, _id } = ingredient;
    if (!acc[type]) {
      acc[type] = [];
    }

    // Проверяем на уникальность по _id
    if (!acc[type].some(item => item._id === _id)) {
      acc[type].push(ingredient);
    }

    return acc;
  }, {} as { [key: string]: IngredientModel[] });

  const handleTabClick = (tab: string) => {
    setCurrent(tab);
    let scrollTarget: HTMLElement | null = null;

    if (tab === 'one' && bunRef.current) {
      scrollTarget = bunRef.current;
    } else if (tab === 'two' && sauceRef.current) {
      scrollTarget = sauceRef.current;
    } else if (tab === 'three' && mainRef.current) {
      scrollTarget = mainRef.current;
    }

    if (scrollTarget) {
      scrollTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleIngredientClick = (ingredient: IngredientModel) => {
    setSelectedIngredient(ingredient); // Сохраняем выбранный ингредиент
    openModal(); // Открываем модалку
  };

  return (
    <div>
      <h1 className={'text text_type_main-large mt-10'}>Соберите бургер</h1>
      <div className={'d-flex mt-5'}>
        <Tab
          value="one"
          active={current === 'one'}
          onClick={() => handleTabClick('one')}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === 'two'}
          onClick={() => handleTabClick('two')}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === 'three'}
          onClick={() => handleTabClick('three')}
        >
          Начинки
        </Tab>
      </div>

      <div className={`w-100 р100 mt-10 ml-2 ${s['ingredients-block']}`}>
        <div ref={bunRef} className="ingredient-group">
          <h3 className="text text_type_main-medium">Булки</h3>
          <div className="grid-col-2">
            {groupedData['bun']?.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient)} // Открываем модалку с этим ингредиентом
              />
            ))}
          </div>
        </div>

        <div ref={sauceRef} className="ingredient-group">
          <h3 className="text text_type_main-medium">Соусы</h3>
          <div className="grid-col-2">
            {groupedData['sauce']?.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient)} // Открываем модалку с этим ингредиентом
              />
            ))}
          </div>
        </div>

        <div ref={mainRef} className="ingredient-group">
          <h3 className="text text_type_main-medium">Начинки</h3>
          <div className="grid-col-2">
            {groupedData['main']?.map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                onClick={() => handleIngredientClick(ingredient)} // Открываем модалку с этим ингредиентом
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedIngredient && (
        <Modal onClose={closeModal} title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient} /> {/* Передаем выбранный ингредиент в модалку */}
        </Modal>
      )}
    </div>
  );
};
