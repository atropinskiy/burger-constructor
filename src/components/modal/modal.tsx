import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';

interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
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
		<ModalOverlay onClose={onClose} title={title}>
			{children}
		</ModalOverlay>,
		document.getElementById('modal-root') as HTMLElement
	);
};
