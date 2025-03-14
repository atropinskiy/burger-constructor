import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '@hooks/index';
import s from './profile-form.module.scss';

import { updateUser } from '@services/auth/actions';
import { useNavigate } from 'react-router-dom';

export const ProfileForm: React.FC = () => {
	const loginRef = useRef<HTMLInputElement | null>(null);
	const user = useSelector((state) => state.user.user);
	const token = localStorage.getItem('accessToken');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [login, setLogin] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string>('');
	const [initialLogin] = useState(user?.name || '');
	const [initialEmail] = useState(user?.email || '');
	const [initialPassword] = useState('');

	useEffect(() => {
		if (user) {
			setLogin(user.name);
			setEmail(user.email);
		}
	}, [user]);

	useEffect(() => {
		loginRef.current?.focus();
	}, []);

	const onIconClick = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setLogin(initialLogin);
		setEmail(initialEmail);
		setPassword(initialPassword);
		setIsEditing(false);
	};

	const onPasswordIconClick = () => {
		navigate('/forgot-password');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!token) {
			setError('Токен не найден. Пожалуйста, войдите в систему.');
			return;
		}

		try {
			await dispatch(
				updateUser({ email, name: login, password, token })
			).unwrap();
			setIsEditing(false);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message || 'Не удалось обновить профиль');
			} else {
				setError('Неизвестная ошибка');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<Input
					type='text'
					placeholder='Имя'
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					onIconClick={onIconClick}
					name='login'
					icon='EditIcon'
					error={false}
					errorText='Ошибка'
					size='default'
					extraClass='mb-6 ml-15'
					ref={loginRef}
					disabled={!isEditing}
				/>
				<Input
					type='text'
					placeholder='Логин'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onIconClick={onIconClick}
					name='login'
					icon='EditIcon'
					error={false}
					errorText='Ошибка'
					size='default'
					extraClass='mb-6 ml-15'
					disabled={!isEditing}
				/>
				<Input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onIconClick={onPasswordIconClick}
					name='password'
					icon='EditIcon'
					error={false}
					errorText='Ошибка'
					size='default'
					extraClass='mb-6 ml-15'
					disabled={!isEditing}
				/>
				{isEditing && (
					<div className='d-flex'>
						<Button extraClass={s.save_btn} htmlType='submit'>
							Сохранить
						</Button>
						<Button
							extraClass={s.save_btn}
							htmlType='button'
							onClick={handleCancel}>
							Отмена
						</Button>
					</div>
				)}

				{error && (
					<div className='text text_type_main-small text_color_inactive mt-4'>
						{error}
					</div>
				)}
			</div>
		</form>
	);
};
