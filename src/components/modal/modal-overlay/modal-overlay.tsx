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
		/* eslint-disable jsx-a11y/click-events-have-key-events */
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		<div className={s['modal-overlay']} onClick={onClose}>
			<div className={s['modal-content']} onClick={(e) => e.stopPropagation()}>
				<ModalHeader title={title} onClose={onClose} />
				{children}
			</div>
		</div>
		/* eslint-enable jsx-a11y/click-events-have-key-events */
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	);
};
