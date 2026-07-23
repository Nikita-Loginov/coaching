'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

import { X } from 'lucide-react';

import scss from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mounted || !isOpen) return null;

  const modalRoot = document.querySelector('#modal-root');

  if (!modalRoot) return null;

  return createPortal(
    <div
      className={scss['modal']}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={scss['modal__inner']} onClick={(e) => e.stopPropagation()}>
        <button className={scss['modal__close']} onClick={onClose}>
          <X/>
        </button>

        <div className={scss['modal__content']}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
