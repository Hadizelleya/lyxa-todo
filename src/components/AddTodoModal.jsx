import React, { useEffect, useRef, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FiCalendar, FiFileText, FiType } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";

export default function AddTodoModal({ isModalOpened, setIsModalOpened }) {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title for the task");
      return;
    }

    const newTodo = {
      title: formData.title.trim(),
      description: formData.description.trim(),
    };

    dispatch(addTodo(newTodo));

    setFormData({
      title: "",
      description: "",
    });
    setIsModalOpened(false);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
    });
    setIsModalOpened(false);
  };

  return (
    <div
      className={`absolute inset-0 w-full  h-full  bg-black/50 z-10 flex  items-center justify-center transition-all duration-300 ${
        isModalOpened ? "opacity-100 visible" : "invisible opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`relative max-w-2xl w-full mx-4 rounded-2xl shadow-2xl bg-white p-6 transition-all duration-300 transform ${
          isModalOpened
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add a new Task
          </h2>
          <FaWindowClose
            className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 transition-colors"
            onClick={handleClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`transition-all duration-300 delay-100 ${
              isModalOpened
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <label
              htmlFor="title"
              className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <FiType className="text-blue-500 text-lg" />
              <p>
                Task Title<span className="text-red-500 text-md">*</span>
              </p>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-0 transition-all duration-200"
              placeholder="Enter task title..."
              required
            />
          </div>

          <div
            className={`transition-all duration-300 delay-200 ${
              isModalOpened
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <label
              htmlFor="description"
              className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <FiFileText className="text-blue-500 text-lg" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-0 transition-all duration-200 resize-none"
              placeholder="Enter task description (optional)..."
            />
          </div>

          <div
            className={`flex gap-4 pt-4 transition-all duration-300 delay-250 ${
              isModalOpened
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
