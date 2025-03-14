import s from './app.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@hooks/index';
import { fetchIngredients } from '../services/actions';
import { fetchUser } from '@services/auth/actions';
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
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUser());
    }
  }, [accessToken]);

  if (loading) {
    return <p className={s.loading}>Загрузка...</p>;
  }

  if (error) {
    return <p className={s.error}>Ошибка: {error}</p>;
  }

  return (
    <Router>
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
      </div>
    </Router>
  );
};
