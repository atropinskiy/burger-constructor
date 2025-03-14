import { Link } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux'; // Импортируем useDispatch
import { registerUser } from '@services/auth/actions'; // Импортируем экшен регистрации
import s from '../login/login.module.scss';
import { AppDispatch } from '@services/store'; // Типизация dispatch

export const Register: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false); // Состояние загрузки
	const [error, setError] = useState<string | null>(null); // Ошибка, если есть

	const dispatch = useDispatch<AppDispatch>(); // Типизация dispatch
	const nameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const onIconClick = () => {
		setTimeout(() => nameRef.current?.focus(), 0); // Фокус на имя
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true); // Включаем состояние загрузки

		// Создаем объект данных для отправки
		const data = {
			name,
			email,
			password,
		};

		try {
			const result = await dispatch(registerUser(data));

			if (registerUser.rejected.match(result)) {
				setError(result.payload || 'Ошибка регистрации');
			} else {
				// Успешная регистрация
				console.log('Пользователь зарегистрирован', result.payload);
			}
		} catch (err) {
			setError('Неизвестная ошибка');
		} finally {
			setLoading(false); // Отключаем состояние загрузки
		}
	};

	return (
		<div className={s.auth_div}>
			<form onSubmit={handleSubmit}>
				<div className='w-100 mb-6 text-center'>
					<span className='text text_type_main-default'>Регистрация</span>
				</div>
				<div>
					<Input
						type='text'
						placeholder='Имя'
						value={name}
						onChange={(e) => setName(e.target.value)}
						ref={nameRef}
						onIconClick={onIconClick}
						name='name'
						error={false}
						errorText='Ошибка'
						size='default'
						extraClass='mb-6'
					/>
				</div>

				<div>
					<Input
						type='email'
						placeholder='E-mail'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						ref={emailRef}
						onIconClick={onIconClick}
						name='email'
						error={false}
						errorText='Ошибка'
						size='default'
						extraClass='mb-6'
					/>
				</div>

				<div>
					<Input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						icon='ShowIcon'
						ref={passwordRef}
						onIconClick={onIconClick}
						name='password'
						error={false}
						errorText='Ошибка'
						size='default'
						extraClass='mb-6'
					/>
				</div>

				<div className='w-100 d-flex justify-center'>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'
						disabled={loading}>
						{loading ? 'Загрузка...' : 'Зарегистрироваться'}
					</Button>
				</div>

				{error && (
					<div className='w-100 d-flex justify-center'>
						<span className='text text_type_main-default text_color_error'>
							{error}
						</span>
					</div>
				)}

				<div className='d-flex w-100 text-center mb-4 justify-center'>
					<p className='text text_type_main-default text_color_inactive'>
						Уже зарегистрированы?
					</p>
					<Link
						className='ml-4 text text_type_main-default color-blue'
						to='/login'>
						Войти
					</Link>
				</div>
			</form>
		</div>
	);
};
