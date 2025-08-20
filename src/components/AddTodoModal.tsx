import React from "react";
import { FiFileText, FiType } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { AppDispatch } from "../types";
import { useFormInput } from "../hooks/useFormInput";
import { validateTodoForm } from "../utils/todoUtils";
import Modal from "./ui/Modal";
import FormField from "./ui/FormField";
import Button from "./ui/Button";

interface AddTodoModalProps {
  isModalOpened: boolean;
  setIsModalOpened: (opened: boolean) => void;
}

interface FormData {
  title: string;
  description: string;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isModalOpened,
  setIsModalOpened,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { values, handleChange, resetForm } = useFormInput<FormData>({
    title: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateTodoForm(values.title);
    if (validationError) {
      alert(validationError);
      return;
    }

    const newTodo = {
      title: values.title.trim(),
      description: values.description.trim(),
    };

    dispatch(addTodo(newTodo));
    resetForm();
    setIsModalOpened(false);
  };

  const handleClose = () => {
    resetForm();
    setIsModalOpened(false);
  };

  return (
    <Modal isOpen={isModalOpened} onClose={handleClose} title="Add a new Task">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Task Title"
          icon={FiType}
          required
          delay={100}
          isVisible={isModalOpened}
        >
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-0 transition-all duration-200"
            placeholder="Enter task title..."
            required
          />
        </FormField>

        <FormField
          label="Description"
          icon={FiFileText}
          delay={200}
          isVisible={isModalOpened}
        >
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-0 transition-all duration-200 resize-none"
            placeholder="Enter task description (optional)..."
          />
        </FormField>

        <div
          className={`flex gap-4 pt-4 transition-all duration-300 delay-250 ${
            isModalOpened
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTodoModal;
