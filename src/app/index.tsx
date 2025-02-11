import s from './app.module.scss';
import { AppHeader } from '../components/app-header/app-header';
import { Main } from '../components/main/main';

export const App = () => {
	return (
		<div className={s.app}>
			<AppHeader />
			<Main />
		</div>
	);
};
