import React from 'react';
import s from './modal-overlay.module.scss';
import { ModalHeader } from '../modal-header/modal-header';

interface ModalOverlayProps {
	title?: string;
	onClose: () => void;
	children: React.ReactNode;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
	title,
	onClose,
	children,
}) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			onClose();
		}
	};

	return (
		<div
			className={s['modal-overlay']}
			onClick={onClose}
			role='button'
			tabIndex={0}
			onKeyDown={handleKeyDown}
		>
			<div
				className={s['modal-content']}
				onClick={(e) => e.stopPropagation()}
			>
				<ModalHeader title={title} onClose={onClose} />
				{children}
			</div>
		</div>
	);
};
