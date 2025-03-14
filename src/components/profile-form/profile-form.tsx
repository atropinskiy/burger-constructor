import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '@hooks/index';
import s from './profile-form.module.scss';
import { useForm } from '@hooks/use-form';
import { updateUser } from '@services/auth/actions';

export const ProfileForm: React.FC = () => {
	const loginRef = useRef<HTMLInputElement | null>(null);
	const user = useSelector((state) => state.user.user);
	const token = localStorage.getItem('accessToken');
	const dispatch = useDispatch();

	const { values, handleChange, setValues } = useForm({
		login: user?.name || '',
		email: user?.email || '',
		password: '',
	});

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (user) {
			setValues({ login: user.name, email: user.email, password: '' });
		}
	}, [user, setValues]);

	useEffect(() => {
		loginRef.current?.focus();
	}, []);

	const onIconClick = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setValues({
			login: user?.name || '',
			email: user?.email || '',
			password: '',
		});
		setIsEditing(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!token) {
			setError('Токен не найден. Пожалуйста, войдите в систему.');
			return;
		}

		try {
			await dispatch(
				updateUser({
					email: values.email,
					name: values.login,
					password: values.password,
					token,
				})
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
					value={values.login}
					onChange={handleChange}
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
					value={values.email}
					onChange={handleChange}
					onIconClick={onIconClick}
					name='email'
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
					value={values.password}
					onChange={handleChange}
					onIconClick={onIconClick}
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
