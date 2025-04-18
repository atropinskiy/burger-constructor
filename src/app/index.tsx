import s from './app.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@hooks/index';
import { fetchIngredients } from '../services/actions';
import { fetchUser } from '@services/auth/actions';
import { setUserChecked } from '@services/auth/slices';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
	ForgotPassword,
	ResetPassword,
	Register,
	Main,
	Login,
	Profile,
	NotFound,
	OrderDetails,
	Feed,
} from '@pages/index';
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
	const isUserChecked = useSelector((state) => state.user.isUserChecked);
	const accessToken = localStorage.getItem('accessToken');

	const handleModalClose = () => {
		navigate(-1);
	};

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	useEffect(() => {
		const checkUser = async () => {
			if (accessToken) {
				await dispatch(fetchUser());
			}
			dispatch(setUserChecked(true));
		};

		checkUser();
	}, [accessToken, dispatch]);

	if (!isUserChecked) {
		return <p className={s.loading}>Загрузка пользователя...</p>;
	}

	return (
		<div className={s.app}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<Main />} />

				<Route
					path='/login'
					element={
						<ProtectedRouteElement element={<Login />} redirectPath='/' />
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRouteElement element={<Register />} redirectPath='/' />
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRouteElement
							element={<ForgotPassword />}
							redirectPath='/'
						/>
					}
				/>
				<Route
					path='/feed'
					element={
						<ProtectedRouteElement element={<Feed />} redirectPath='/' />
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRouteElement
							element={<ResetPassword />}
							redirectPath='/'
						/>
					}
				/>

				<Route
					path='/profile/orders/:id'
					element={
						<ProtectedRouteElement
							element={<OrderDetails padding={false} />}
							redirectPath='/login'
						/>
					}
				/>

				<Route
					path='/profile'
					element={
						<ProtectedRouteElement
							element={<Profile />}
							redirectPath='/login'
						/>
					}>
					<Route index element={<ProfileForm />} />
					<Route path='orders' element={<OrdersList />} />
				</Route>
				<Route path='feed/:id' element={<OrderDetails padding={true} />} />
				<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal onClose={handleModalClose} title='Детали ингредиента:'>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
			{background && (
				<Routes>
					<Route
						path='/profile/orders/:id'
						element={
							<ProtectedRouteElement
								redirectPath='/login'
								element={
									<Modal onClose={handleModalClose} title=''>
										<OrderDetails padding={false} />
									</Modal>
								}
							/>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
