import s from './app.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@hooks/index';
import { fetchIngredients } from '../services/actions';
import { fetchUser } from '@services/auth/actions';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ForgotPassword, ResetPassword, Register, Main, Login, Profile, NotFound } from '@pages/index';
import { AppHeader } from '@components/app-header/app-header';
import { OrdersList } from '@components/orders-list/orders-list';
import { ProfileForm } from '@components/profile-form/profile-form';
import { IngredientDetailsPage } from '@pages/ingredient-details-page/ingredient-details-page';
import ProtectedRouteElement from '@components/protected-route-element/protected-route-element';
import { Modal } from '@components/modal/modal';
import { IngredientDetails } from '@components/modal/ingredient-details/ingredient-details';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const { loading, error } = useSelector((state) => state.ingredients);
  const accessToken = localStorage.getItem('accessToken');

  const handleModalClose = () => {
    navigate(-1); 
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUser());
    }
  }, [accessToken, dispatch]);

  if (loading) {
    return <p className={s.loading}>Загрузка...</p>;
  }

  if (error) {
    return <p className={s.error}>Ошибка: {error}</p>;
  }

  return (
    <div className={s.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        
        {/* Защищаем путь /login для залогиненных пользователей */}
        <Route
          path="/login"
          element={<ProtectedRouteElement element={<Login />} redirectPath="/" />}
        />
        
        {/* Защищаем путь /register для залогиненных пользователей */}
        <Route
          path="/register"
          element={<ProtectedRouteElement element={<Register />} redirectPath="/" />}
        />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Защищаем путь /profile и его подмаршруты */}
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} redirectPath="/login" />}
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<OrdersList />} />
        </Route>

        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Рендерим модалку, если background существует */}
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleModalClose} title='Детали ингредиента:'>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
