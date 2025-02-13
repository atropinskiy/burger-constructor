import React from 'react';
import s from './modal-overlay.module.scss';
import { ModalHeader } from '../modal-header/modal-header';
import { Ingredient } from '@utils/data';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

interface ModalProps {
	onClose: () => void;
	ingredient?: Ingredient;
	orderNumber?: number;
}

export const ModalOverlay: React.FC<ModalProps> = ({
	onClose,
	ingredient,
	orderNumber,
}) => {
	const title = orderNumber ? '' : 'Детали ингредиента';

	// Функция для обработки нажатия клавиш
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onClose(); // Закрытие модалки по нажатию Enter или пробела
		}
	};

	return (
		<div
			className={s['modal-overlay']}
			onClick={onClose}
			role='button'
			tabIndex={0} // Это позволяет элементу быть доступным для навигации с помощью клавиши Tab
			onKeyDown={handleKeyDown} // Обработка нажатия клавиш
		>
			<div className={s['modal-content']}>
				<ModalHeader title={title} onClose={onClose} />
				{orderNumber ? (
					<OrderDetails orderNumber={orderNumber} />
				) : ingredient ? (
					<IngredientDetails ingredient={ingredient} />
				) : (
					<p className='text text_type_main-medium'>Нет данных</p>
				)}
			</div>
		</div>
	);
};
