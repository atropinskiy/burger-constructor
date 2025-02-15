import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';

interface ModalProps {
	title?: string;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
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
		<ModalOverlay title={title} onClose={onClose}>
			{children}
		</ModalOverlay>,
		document.getElementById('modal-root') as HTMLElement
	);
};