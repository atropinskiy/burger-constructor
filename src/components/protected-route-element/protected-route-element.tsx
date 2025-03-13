import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@hooks/index';

interface ProtectedRouteElementProps {
  element: React.ReactNode;
  redirectPath?: string;
  restrictedPaths?: string[];
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element, redirectPath = '/login', restrictedPaths = [] }) => {
  const location = useLocation();
  const accessToken = useSelector((state) => state.user.accessToken); // Получаем accessToken из состояния

  const isLoggedIn = Boolean(accessToken);

  // Если маршрут защищён и пользователь не авторизован
  if (restrictedPaths.includes(location.pathname) && !isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // Если пользователь пытается попасть на /login или /register, когда он уже авторизован
  if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  // Если пользователь авторизован, просто передаем его на защищённый маршрут
  return <>{element}</>;
};

export default ProtectedRouteElement;
