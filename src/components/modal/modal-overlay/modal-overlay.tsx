import React from 'react';
import s from './modal-overlay.module.scss';

interface ModalOverlayProps {
	onClose: () => void;
	children: React.ReactNode;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
	onClose,
	children,
}) => {
	return (
		<div className={s['modal-overlay']} onClick={onClose} aria-hidden='true'>
			<div
				role='button'
				aria-hidden='true'
				className={s['modal-content']}
				onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};
