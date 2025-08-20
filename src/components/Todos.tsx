import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOverdue, moveTodo } from "../store/todoSlice";
import { FiPlus } from "react-icons/fi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Category from "./Category";
import AddTodoModal from "./AddTodoModal";
import EditTodoModal from "./EditTodoModal";
import Alert from "./ui/Alert";
import { RootState, AppDispatch } from "../types";
import { CATEGORY_CONFIGS } from "../constants";
import { getOverdueTodos } from "../utils/todoUtils";

const Todos: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(checkOverdue());
    }, 60000);

    dispatch(checkOverdue());

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleDrop = (todoId: string, newStatus: string, position?: number) => {
    dispatch(moveTodo({ id: todoId, newStatus: newStatus as any, position }));
  };

  const overdueTodos = getOverdueTodos(todos);
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

          <Alert
            message={overdueTodos.length > 1 ? "are Overdue" : "is Overdue"}
            count={overdueTodos.length}
            isVisible={showOverdueAlert}
          />

          <AddTodoModal
            setIsModalOpened={setIsModalOpened}
            isModalOpened={isModalOpened}
          />
          <EditTodoModal />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORY_CONFIGS.map((category) => (
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
            {CATEGORY_CONFIGS.map((category) => {
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
};

export default Todos;
