import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientModel } from '../../../utils/models';
import s from './ingredient-card.module.scss';
import { useDrag } from 'react-dnd';

interface IngredientCardProps {
  ingredient: IngredientModel;
  onClick: () => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onClick }) => {
  // Используем useDrag для перетаскивания
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',  // Определяем тип перетаскиваемого элемента
    item: { ingredient },  // Передаем сам объект ингредиента
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),  // Определяем, в процессе ли перетаскивания
    }),
  });

  return (
    <div
      ref={drag}  // Оборачиваем элемент для отслеживания перетаскивания
      className={s.card}
      onClick={onClick}
      role="button"
      tabIndex={0} // Для поддержки навигации через Tab
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(); // Обработка нажатия Enter или пробела
        }
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }} // Уменьшаем непрозрачность при перетаскивании
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <span className="text text_type_digits-default w-100 d-flex justify-center">
        <span className="mr-1">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </span>
      <span className="text text_type_main-default mt-1 w-100 d-flex justify-center text-center">
        {ingredient.name}
      </span>
    </div>
  );
};

export default IngredientCard;
