import s from './app.module.scss';
import { AppHeader } from '../components/app-header/app-header';
import { Main } from '../components/main/main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@hooks/index'; // Импортируем типизированные хуки
import { fetchIngredients } from '../services/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.ingredients); // Типизация автоматически добавляется

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={s.app}>
				<AppHeader />
				{loading && <p>Загрузка...</p>}
				{error && <p className='error'>Ошибка: {error}</p>}
				{!loading && !error && <Main />}
			</div>
		</DndProvider>
	);
};
