import { Link } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '@hooks/index';
import { resetPassword } from '@services/auth/actions';
import React, { useRef, useState } from 'react';
import s from '../login/login.module.scss';

export const ResetPassword: React.FC = () => {
	const dispatch = useDispatch();
	const [newPassword, setNewPassword] = useState('');
	const [resetCode, setResetCode] = useState('');

	const newPasswordRef = useRef<HTMLInputElement | null>(null);
	const resetCodeRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(resetPassword({ password: newPassword, token: resetCode }));
	};

	return (
		<div className={s.auth_div}>
			<form onSubmit={handleSubmit}>
				<div className='w-100 mb-6 text-center'>
					<span className='text text_type_main-default'>Сброс пароля</span>
				</div>

				<div>
					<Input
						type='password'
						placeholder='Новый пароль'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						ref={newPasswordRef}
						name='new-password'
						error={false}
						errorText='Ошибка'
						size='default'
						extraClass='mb-6'
					/>
				</div>

				<div>
					<Input
						type='text'
						placeholder='Код из письма'
						value={resetCode}
						onChange={(e) => setResetCode(e.target.value)}
						ref={resetCodeRef}
						name='reset-code'
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
						extraClass='mb-20'>
						Сбросить пароль
					</Button>
				</div>

				<div className='d-flex w-100 text-center mb-4 justify-center'>
					<p className='text text_type_main-default text_color_inactive'>
						Вспомнили пароль?
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
