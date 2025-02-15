import React from 'react';
import s from './modal-overlay.module.scss';
import { ModalHeader } from '../modal-header/modal-header';

interface ModalOverlayProps {
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
	onClose,
	children,
	title,
}) => {
	return (
		<div className={s['modal-overlay']} onClick={onClose} aria-hidden='true'>
			<div
				role='button'
				aria-hidden='true'
				className={s['modal-content']}
				onClick={(e) => e.stopPropagation()}>
				<ModalHeader title={title} onClose={onClose} />
				{children}
			</div>
		</div>
	);
};
