import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import s from './profile.module.scss';
import { useDispatch } from '@hooks/index';
import { logOut } from '@services/auth/actions';

export const Profile: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await dispatch(logOut());
			navigate('/login');
		} catch (error) {
			console.error('Ошибка при логауте:', error);
		}
	};
	return (
		<div className={`d-flex mt-10 ${s.profile__div}`}>
			<div className='profile__menu'>
				<nav>
					<ul className={s.profile__nav}>
						<li className={s.profile__li}>
							<NavLink
								to='/profile'
								className={({ isActive }) =>
									`${s.profile__link} ${isActive ? s.profile__active : ''}`
								}
								end>
								Профиль
							</NavLink>
						</li>
						<li className={s.profile__li}>
							<NavLink
								to='/profile/orders'
								className={({ isActive }) =>
									`${s.profile__link} ${isActive ? s.profile__active : ''}`
								}>
								История заказов
							</NavLink>
						</li>
						<li className={s.profile__li}>
							<NavLink
								to='/login'
								className={({ isActive }) =>
									`${s.profile__link} ${isActive ? s.profile__active : ''}`
								}
								onClick={handleLogout}>
								Выход
							</NavLink>
						</li>
					</ul>
					<p className={s.profile__info}>
						<span className='text text_type_main-default text_color_inactive'>
							В этом разделе вы можете изменить свои персональные данные
						</span>
					</p>
				</nav>
			</div>
			<div className='w-100'>
				<Outlet />
			</div>
		</div>
	);
};
