import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@hooks/index';

interface ProtectedRouteElementProps {
  element: React.ReactNode;
  redirectPath?: string;
  restrictedPaths?: string[]; // Можно убрать, если оно больше не нужно
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  element,
  redirectPath = '/login',
}) => {
  const location = useLocation();
  const isLogged = useSelector((state) => state.user.isLogged);

  if (!isLogged && location.pathname.startsWith('/profile')) {
    return <Navigate to={redirectPath} replace />;
  }

  // Если пользователь залогинен и пытается попасть на /login или /register
  if (isLogged && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

export default ProtectedRouteElement;
