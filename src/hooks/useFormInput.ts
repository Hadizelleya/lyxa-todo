import { useState, ChangeEvent, useCallback } from "react";

export const useFormInput = <T extends Record<string, any>>(
  initialValue: T
) => {
  const [values, setValues] = useState<T>(initialValue);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => setValues(initialValue), [initialValue]);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return {
    values,
    handleChange,
    resetForm,
    setValue,
  };
};
