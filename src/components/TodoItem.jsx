import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteTodo, moveTodo, setDueDate } from "../store/todoSlice";
import { FiClock } from "react-icons/fi";
import ContextMenu from "./ContextMenu";
import EditTodoModal from "./EditTodoModal";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TODO_CARD",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const statusColors = {
    New: "bg-blue-100 border-blue-300 text-blue-800",
    Ongoing: "bg-orange-100 border-orange-300 text-orange-800",
    Done: "bg-green-100 border-green-300 text-green-800",
  };

  const getStatusOptions = (currentStatus) => {
    const allStatus = ["New", "Ongoing", "Done"];
    return allStatus.filter((status) => status !== currentStatus);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleMoveToStatus = (newStatus) => {
    dispatch(moveTodo({ id: todo.id, newStatus }));
    setShowContextMenu(false);
  };

  const handleDeleteTask = (e) => {
    dispatch(deleteTodo(todo.id));
    setShowContextMenu(false);
  };

  const handleDueDateChange = (e) => {
    dispatch(setDueDate({ id: todo.id, dueDate: e.target.value }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h12",
    });
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md p-4 mb-3 cursor-move transition-all duration-300 hover:shadow-lg ${
        isDragging ? "opacity-50 scale-90" : ""
      } ${todo.isOverdue ? "bg-red-50 border  border-red-400" : ""}`}
      ref={drag}
      onContextMenu={handleContextMenu}
    >
      {todo.isOverdue && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-2 py-2 rounded-full animate-pulse">
          OVERDUE!
        </div>
      )}

      <div
        className={` inline-block px-2 py-1 rounded-full text-sm font-medium mb-2 ${
          statusColors[todo.status]
        }`}
      >
        {todo.status}
      </div>

      <h3 className="font-bold text-(--color-primary) mb-2 line-clamp-2">
        {todo.title}
      </h3>

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
}
