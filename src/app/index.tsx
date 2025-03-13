import s from './app.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@hooks/index';
import { fetchIngredients } from '../services/actions';
import { fetchUser } from '@services/auth/actions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgotPassword, ResetPassword, Register, Main, Login, Profile } from '@pages/index';
import { AppHeader } from '@components/app-header/app-header';
import { OrdersList } from '@components/orders-list/orders-list';
import { ProfileForm } from '@components/profile-form/profile-form';
import { IngredientDetailsPage } from '@pages/ingredient-details-page/ingredient-details-page';
import ProtectedRouteElement from '@components/protected-route-element/protected-route-element';

export const App = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.ingredients);
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    // Загрузка ингредиентов
    dispatch(fetchIngredients());
  }, []); // Этот эффект выполняется только один раз при монтировании

  useEffect(() => {
    // Если есть accessToken, выполняем запрос для данных пользователя
    if (accessToken) {
      dispatch(fetchUser());
    }
  }, [accessToken]);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className={s.app}>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/profile"
              element={<ProtectedRouteElement element={<Profile />} restrictedPaths={['/profile']} />}
            >
              <Route index element={<ProfileForm />} />
              <Route path="orders" element={<OrdersList />} />
            </Route>
            <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          </Routes>
          {loading && <p>Загрузка...</p>}
          {error && <p className="error">Ошибка: {error}</p>}
        </div>
      </DndProvider>
    </Router>
  );
};
