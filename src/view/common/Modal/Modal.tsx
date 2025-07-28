import type { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({
                          isOpen, onClose, title, children, size = 'md'
                      }: ModalProps) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen px-4 py-8">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
                onClick={onClose}
            />

            {/* Modal Panel */}
            <div
                className={`relative z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all ${sizeClasses[size]} sm:w-full max-h-[90vh] overflow-y-auto`}
                onClick={e => e.stopPropagation()} // Prevent overlay from closing on inner click
            >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};