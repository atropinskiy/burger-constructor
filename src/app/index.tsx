import s from './app.module.scss';
import { AppHeader } from '../components/app-header/app-header';
import { Main } from '../components/main/main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../services/ingredients/actions'; 
import { RootState, AppDispatch } from '../services/store';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Получаем состояние ингредиентов из Redux
  const { selectedItems: ingredients, loading, error } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (!ingredients.length) { // Запрашиваем только если ингредиенты еще не загружены
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={s.app}>
      <AppHeader />
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">Ошибка: {error}</p>}
      {!loading && !error && <Main ingredients={ingredients} />}  {/* Передаем ингредиенты в Main */}
    </div>
  );
};
