import s from './main.module.scss';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const Main = () => {
	return (
		<main>
			<div className='d-flex g-10 h-100'>
				<div className={`${s.contructor_container} custom-scroll`}>
					<BurgerIngredients />
				</div>
				<div className={s.contructor_container}>
					<section className='mt-25 d-flex flex-column valign-center pb-4'>
						<BurgerConstructor />
						<div className='ml-auto mt-10 pr-4 pb-10'>
							<Button htmlType='button' type='primary' size='large'>
								Нажми на меня
							</Button>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
};
