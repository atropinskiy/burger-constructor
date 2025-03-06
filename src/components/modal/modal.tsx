import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Устанавливаем фокус на модальное окно при открытии
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <ModalOverlay onClose={onClose} title={title}>
      <div
        ref={modalRef}
        tabIndex={-1} // Сделаем модальное окно фокусируемым
        aria-labelledby="modal-title"
        aria-hidden="false"
      >
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement
  );
};
