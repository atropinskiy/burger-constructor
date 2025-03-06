import { useDispatch } from "react-redux";
import { removeSelectedIngredient } from "../../../services/ingredients/constructor_slices";
import { removeIngredientFromOrder } from "../../../services/order/order-slices"
import { IngredientModel } from "@utils/models";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

interface FillingsElementProps {
  ingredient: IngredientModel;
  index: number; // Индекс элемента для перемещения
  moveIngredient: (fromIndex: number, toIndex: number) => void; // Функция для перемещения
}

const FillingsElement: React.FC<FillingsElementProps> = ({ ingredient, index, moveIngredient }) => {
  const dispatch = useDispatch();

  // Хук для перетаскивания элемента
  const [{ isDragging }, drag] = useDrag({
    type: "moveIngredient",  // Тип для перемещения
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Хук для обработки drop
  const [, drop] = useDrop({
    accept: "moveIngredient",  // Принимаем только "moveIngredient"
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredient(item.index, index);  // Перемещаем ингредиент
      }
    },
  });

  const handleRemoveIngredient = (id: string, id_: string) => {
    dispatch(removeSelectedIngredient(id));
    dispatch(removeIngredientFromOrder(id_))
  };

  return (
    <div className="d-flex mt-2" ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="d-flex valign-center">
        <DragIcon type="primary" className="cursor-pointer" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          if (ingredient.id) {
            handleRemoveIngredient(ingredient.id, ingredient._id); 
          }
        }}
      />
    </div>
  );
};

export default FillingsElement;
