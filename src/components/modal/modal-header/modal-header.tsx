import React from 'react';
import s from '../modal.module.scss';
import closeIcon from '../assets/close-icon.png';
interface ModalProps {
	title?: string;
	onClose: () => void;
}

export const ModalHeader: React.FC<ModalProps> = ({ title, onClose }) => {
	return (
		<div className='w-100 d-flex valign-center'>
			<h1 className='text text_type_main-large'>{title}</h1>
			<button
				className={`${s['modal-close-btn']} ml-auto cursor-pointer`}
				onClick={onClose}
				data-testid='close-modal'
				aria-label='Close'>
				<img src={closeIcon} alt='Close' />
			</button>
		</div>
	);
};
