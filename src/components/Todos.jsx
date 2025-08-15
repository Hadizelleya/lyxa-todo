import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOverdue, moveTodo } from "../store/todoSlice";
import { FiAlertCircle, FiCheckCircle, FiClock, FiPlus } from "react-icons/fi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Category from "./Category";
import AddTodoModal from "./AddTodoModal";
import EditTodoModal from "./EditTodoModal";

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [isModalOpened, setIsModalOpened] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(checkOverdue());
    }, 60000);

    dispatch(checkOverdue());

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleDrop = (todoId, newStatus, position) => {
    dispatch(moveTodo({ id: todoId, newStatus, position }));
  };

  const categories = [
    {
      status: "New",
      title: "New Tasks",
      color: "bg-blue-500",
      icon: FiAlertCircle,
      showAddForm: true,
      textColor: "text-blue-500",
    },
    {
      status: "Ongoing",
      title: "In Progress",
      color: "bg-orange-500",
      icon: FiClock,
      showAddForm: false,
      textColor: "text-orange-500",
    },
    {
      status: "Done",
      title: "Completed Tasks",
      color: "bg-green-500",
      icon: FiCheckCircle,
      showAddForm: false,
      textColor: "text-green-500",
    },
  ];

  const overdueTodos = todos.filter((todo) => todo.isOverdue);

  const showOverdueAlert = overdueTodos.length > 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen h-full relative bg-gradiend-to-br from-blue-100 to-indigo-300 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-blue-800 to-red-500 text-transparent bg-clip-text">
              LYXA Task
            </h1>
          </div>

          {showOverdueAlert && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
              <FiAlertCircle className="text-xl" />
              <span className="font-medium">
                {overdueTodos.length} Task{overdueTodos.length > 1 ? "s" : ""}{" "}
                {overdueTodos.length > 1 ? "are Overdue" : "is Overdue"}
              </span>
            </div>
          )}

          <AddTodoModal
            setIsModalOpened={setIsModalOpened}
            isModalOpened={isModalOpened}
          />
          <EditTodoModal />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Category
                key={category.status}
                status={category.status}
                title={category.title}
                color={category.color}
                onDrop={handleDrop}
                showAddForm={category.showAddForm}
                countColor={category.textColor}
              >
                {category.showAddForm && (
                  <button
                    onClick={() => setIsModalOpened(true)}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors flex items-center justify-center"
                  >
                    <FiPlus className="mr-2" />
                    Add New Task
                  </button>
                )}
              </Category>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const count = todos.filter(
                (todo) => todo.status === category.status
              ).length;
              const Icon = category.icon;
              return (
                <div
                  key={category.status}
                  className={`${category.color} text-white p-4 rounded-lg flex items-center justify-between shadow-lg `}
                >
                  <div className="flex gap-4 items-center">
                    <Icon className="text-xl" />
                    <div>
                      <p>{category.title}</p>
                      <p className="text-sm opacity-90">
                        {count} Task{count > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
