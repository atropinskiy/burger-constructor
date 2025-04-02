import { useParams } from 'react-router-dom';
import { useSelector } from '@hooks/index';
import { IngredientDetails } from '@components/modal/ingredient-details/ingredient-details';

export const IngredientDetailsPage = () => {
	const { id } = useParams();
	const ingredients = useSelector((state) => state.ingredients.allItems);

	const ingredient = ingredients.find((item) => item._id === id);

	if (!ingredient) {
		return <p>Ингредиент не найден или еще загружается...</p>;
	}

	return (
		<div>
			<IngredientDetails />
		</div>
	);
};
