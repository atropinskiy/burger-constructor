import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@hooks/index';

interface ProtectedRouteElementProps {
	element: React.ReactNode;
	redirectPath?: string;
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
	element,
	redirectPath = '/login',
}) => {
	const location = useLocation();
	const isLogged = useSelector((state) => state.user.isLogged);

	const restrictedPaths = [
		'/login',
		'/register',
		'/forgot-password',
		'/reset-password',
	];

	if (isLogged && restrictedPaths.includes(location.pathname)) {
		return <Navigate to='/' replace />;
	}

	if (!isLogged && location.pathname.startsWith('/profile')) {
		return <Navigate to={redirectPath} replace />;
	}

	return <>{element}</>;
};

export default ProtectedRouteElement;
