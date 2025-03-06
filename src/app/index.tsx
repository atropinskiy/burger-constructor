import s from './app.module.scss';
import { AppHeader } from '../components/app-header/app-header';
import { Main } from '../components/main/main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../services/actions';
import { RootState, AppDispatch } from '../services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    selectedItems: ingredients,  
    loading,
    error,
  } = useSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={s.app}>
        <AppHeader />
        {loading && <p>Загрузка...</p>}
        {error && <p className="error">Ошибка: {error}</p>}
        {!loading && !error && <Main ingredients={ingredients} />}
      </div>
    </DndProvider>
  );
};
