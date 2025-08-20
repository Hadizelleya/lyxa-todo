import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { ANIMATION_CLASSES } from "../../constants";

interface FormFieldProps {
  label: string;
  icon?: IconType;
  required?: boolean;
  delay?: number;
  isVisible?: boolean;
  children: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  icon: Icon,
  required = false,
  delay = 0,
  isVisible = true,
  children,
}) => {
  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <div
      className={`${ANIMATION_CLASSES.FORM_FIELD} ${delayClass} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {Icon && <Icon className="text-blue-500 text-lg" />}
        <p>
          {label}
          {required && <span className="text-red-500 text-md">*</span>}
        </p>
      </label>
      {children}
    </div>
  );
};

export default FormField;
