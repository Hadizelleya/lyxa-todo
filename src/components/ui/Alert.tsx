import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface AlertProps {
  message: string;
  count: number;
  isVisible: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, count, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="mb-6 bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
      <FiAlertCircle className="text-xl" />
      <span className="font-medium">
        {count} Task{count > 1 ? "s" : ""} {message}
      </span>
    </div>
  );
};

export default Alert;
