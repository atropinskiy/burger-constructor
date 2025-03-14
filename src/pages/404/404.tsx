import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './404.module.scss';

export const NotFound: React.FC = () => {
	return (
		<div className={s.container}>
			<div className={s.messageContainer}>
				<h1 className={s.header}>404</h1>
				<p className={s.text}>Упс! Страница не найдена.</p>
				<Link to='/' className={s.link}>
					<Button htmlType='button'>На главную</Button>
				</Link>
			</div>
		</div>
	);
};
