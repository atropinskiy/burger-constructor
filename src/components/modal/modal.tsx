import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Ingredient } from '@utils/data';
import { ModalOverlay } from './modal-overlay/modal-overlay';

interface ModalProps {
	orderNumber?: number;
	ingredient?: Ingredient;
	onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
	orderNumber,
	ingredient,
	onClose,
}) => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return createPortal(
		<ModalOverlay
			onClose={onClose}
			ingredient={ingredient}
			orderNumber={orderNumber}
		/>,
		document.getElementById('modal-root') as HTMLElement
	);
};
