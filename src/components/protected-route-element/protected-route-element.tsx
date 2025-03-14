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
  const accessToken = localStorage.getItem('accessToken');

  const isLoggedIn = Boolean(accessToken);

  if (restrictedPaths.includes(location.pathname) && !isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

export default ProtectedRouteElement;
