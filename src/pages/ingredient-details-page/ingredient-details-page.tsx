import { useParams } from "react-router-dom";
import { useSelector } from "@hooks/index";
import { IngredientDetails } from "@components/modal/ingredient-details/ingredient-details";

export const IngredientDetailsPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.allItems);
  
  console.log("ID из useParams:", id);
  console.log("Все ингредиенты:", ingredients);

  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return <p>Ингредиент не найден или еще загружается...</p>;
  }

  return (
    <div>
      <p>Тут отображается информация об ингредиенте с ID: {id}</p>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};
