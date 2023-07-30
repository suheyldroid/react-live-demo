import React, {PropsWithChildren, useEffect} from 'react';
import {X} from "tabler-icons-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({isOpen, onClose, children}: PropsWithChildren<ModalProps>) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleOverlayClick}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-20 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <X size={24}></X>
                </button>
                {children}
            </div>
        </div>
    );
};


