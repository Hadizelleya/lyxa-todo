import React, { useEffect } from "react";
import { FiCalendar, FiFileText, FiType } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { updateTodo } from "../store/todoSlice";
import { AppDispatch } from "../types";
import { useTodoContext } from "../hooks/useTodoContext";
import { useFormInput } from "../hooks/useFormInput";
import { validateTodoForm } from "../utils/todoUtils";
import Modal from "./ui/Modal";
import FormField from "./ui/FormField";
import Button from "./ui/Button";

interface FormData {
  title: string;
  description: string;
  dueDate: string;
}

const EditTodoModal: React.FC = () => {
  const { editModalOpened, setEditModalOpened, todoToEdit, setTodoToEdit } =
    useTodoContext();
  const dispatch = useDispatch<AppDispatch>();
  const { values, handleChange, resetForm, setValue } = useFormInput<FormData>({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (todoToEdit) {
      setValue("title", todoToEdit.title || "");
      setValue("description", todoToEdit.description || "");
      setValue("dueDate", todoToEdit.dueDate || "");
    }
  }, [todoToEdit, setValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateTodoForm(values.title);
    if (validationError) {
      alert(validationError);
      return;
    }

    if (!todoToEdit) {
      alert("No task selected");
      return;
    }

    const updatedTodo = {
      id: todoToEdit.id,
      title: values.title.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate || null,
    };

    dispatch(updateTodo(updatedTodo));
    resetForm();
    setTodoToEdit(null);
    setEditModalOpened(false);
  };

  const handleClose = () => {
    resetForm();
    setTodoToEdit(null);
    setEditModalOpened(false);
  };

  return (
    <Modal isOpen={editModalOpened} onClose={handleClose} title="Edit Task">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Task Title"
          icon={FiType}
          required
          delay={100}
          isVisible={editModalOpened}
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
          delay={150}
          isVisible={editModalOpened}
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

        <FormField
          label="Due Date"
          icon={FiCalendar}
          delay={200}
          isVisible={editModalOpened}
        >
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-0 transition-all duration-200"
          />
        </FormField>

        <div
          className={`flex gap-4 pt-4 transition-all duration-300 delay-250 ${
            editModalOpened
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update Task
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;
