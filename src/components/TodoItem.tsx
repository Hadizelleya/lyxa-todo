import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteTodo, moveTodo, setDueDate } from "../store/todoSlice";
import { FiClock } from "react-icons/fi";
import ContextMenu from "./ContextMenu";
import { Todo, AppDispatch } from "../types";
import { STATUS_COLORS } from "../constants";
import { getStatusOptions } from "../utils/todoUtils";
import { formatDate } from "../utils/dateUtils";
import { useClickOutside } from "../hooks/useClickOutside";

interface TodoItemProps {
  todo: Todo;
}

interface ContextMenuPosition {
  x: number;
  y: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition>({
      x: 0,
      y: 0,
    });
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TODO_CARD",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleMoveToStatus = (newStatus: Todo["status"]) => {
    dispatch(moveTodo({ id: todo.id, newStatus }));
    setShowContextMenu(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTodo(todo.id));
    setShowContextMenu(false);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDueDate({ id: todo.id, dueDate: e.target.value }));
  };

  useClickOutside(contextMenuRef, () => setShowContextMenu(false));

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md p-4 mb-3 cursor-move transition-all duration-300 hover:shadow-lg ${
        isDragging ? "opacity-50 scale-90" : ""
      } ${todo.isOverdue ? "bg-red-50 border  border-red-400" : ""}`}
      ref={drag as any}
      onContextMenu={handleContextMenu}
    >
      {todo.isOverdue && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-2 py-2 rounded-full animate-pulse">
          OVERDUE!
        </div>
      )}

      <div
        className={` inline-block px-2 py-1 rounded-full text-sm font-medium mb-2 ${
          STATUS_COLORS[todo.status]
        }`}
      >
        {todo.status}
      </div>

      <h3 className="font-bold text-black mb-2 line-clamp-2">{todo.title}</h3>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {todo.description}
      </p>

      {todo.dueDate && (
        <p className="text-red-400 flex items-center text-xs mb-2 gap-2">
          <FiClock className="text-sm" />
          Due: {formatDate(todo.dueDate)}
        </p>
      )}

      <div className="text-xs text-gray-400">
        Created: {formatDate(todo.createdAt)}
      </div>

      {todo.status === "Done" && todo.completedAt && (
        <div className="text-xs text-gray-400 mt-2">
          Completed: {formatDate(todo.completedAt)}
        </div>
      )}

      {showContextMenu && (
        <ContextMenu
          contextMenuRef={contextMenuRef}
          setShowDueDatePicker={setShowDueDatePicker}
          getStatusOptions={getStatusOptions}
          todo={todo}
          showDueDatePicker={showDueDatePicker}
          contextMenuPosition={contextMenuPosition}
          handleDelete={handleDeleteTask}
          handleDueDateChange={handleDueDateChange}
          handleMoveToStatus={handleMoveToStatus}
          setShowContextMenu={setShowContextMenu}
        />
      )}
    </div>
  );
};

export default TodoItem;
