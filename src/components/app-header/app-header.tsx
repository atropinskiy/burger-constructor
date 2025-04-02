import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss';
import { AppHeaderIconLabel } from './app-header-icon-label/app-header-icon-label';
import { useSelector } from '@hooks/index';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
	const user = useSelector((state) => state.user.user?.name);
	const isLogged = useSelector((state) => state.user.isLogged) === true;

	return (
		<header>
			<div className={s.header_content}>
				<div className='d-flex'>
					<Link to='/'>
						<AppHeaderIconLabel
							icon={<BurgerIcon type='primary' />}
							className='mr-2 color-white'
							label='Конструктор'
						/>
					</Link>

					{user ? (
						<Link to='/profile/orders'>
							<AppHeaderIconLabel
								icon={<ListIcon type={user ? 'primary' : 'secondary'} />}
								label='Лента заказов'
							/>
						</Link>
					) : (
						<AppHeaderIconLabel
							icon={<ListIcon type={user ? 'primary' : 'secondary'} />}
							label='Лента заказов'
							disabled={true}
						/>
					)}
					<Link to='/'>
						<div className={`mt-2 ${s.ml_14}`}>
							<Logo />
						</div>
					</Link>
				</div>
				<Link to='/profile'>
					<AppHeaderIconLabel
						icon={<ProfileIcon type={user ? 'primary' : 'secondary'} />}
						label='Личный кабинет'
						disabled={!isLogged}
					/>
				</Link>
			</div>
		</header>
	);
};
