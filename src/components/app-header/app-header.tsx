import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss';
import { AppHeaderIconLabel } from './app-header-icon-label/app-header-icon-label';

export const AppHeader = () => {
	return (
		<header>
			<div className={s.header_content}>
				<div className='d-flex'>
					<AppHeaderIconLabel
						icon={<BurgerIcon type='primary' />}
						className='mr-2'
						label='Конструктор'
					/>
					<AppHeaderIconLabel
						icon={<ListIcon type='primary' />}
						label='Лента заказов'
					/>
					<div className={`mt-2 ${s.ml_14}`}>
						<Logo />
					</div>
				</div>
				<AppHeaderIconLabel
					icon={<ProfileIcon type='primary' />}
					label='Личный кабинет'
				/>
			</div>
		</header>
	);
};
