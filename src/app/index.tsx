import s from './app.module.scss';
import { AppHeader } from '../components/app-header/app-header';
import { Main } from '../components/main/main';
import { Ingredient } from '@utils/data';
import { getIngredients } from '@utils/net-service';
import { useEffect, useState } from 'react';

export const App = () => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getIngredients();
				setIngredients(data);
			} catch (error) {
				console.error('Ошибка при загрузке данных', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className={s.app}>
			<AppHeader />
			<Main ingredients={ingredients} />
		</div>
	);
};
