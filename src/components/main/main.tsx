import s from './main.module.scss';

export const Main = () => {
	return (
		<main>
			<div className='d-flex g-10'>
				<div className={s.contructor_container}></div>
				<div className={s.contructor_container}></div>
			</div>
		</main>
	);
};
