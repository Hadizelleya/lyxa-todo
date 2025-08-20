import React, { ReactNode, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ANIMATION_CLASSES } from "../../constants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        ANIMATION_CLASSES.MODAL_OVERLAY
      } ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`relative ${maxWidth} w-full mx-4 rounded-2xl shadow-2xl bg-white p-6 ${
          ANIMATION_CLASSES.MODAL_CONTENT
        } ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <FaWindowClose
            className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
