import React from "react";
import { FiClock, FiEdit, FiTrash } from "react-icons/fi";
import { Todo } from "../types";
import { useTodoContext } from "../hooks/useTodoContext";

interface ContextMenuProps {
  contextMenuRef: React.RefObject<HTMLDivElement | null>;
  getStatusOptions: (currentStatus: Todo["status"]) => Todo["status"][];
  handleMoveToStatus: (newStatus: Todo["status"]) => void;
  showDueDatePicker: boolean;
  handleDueDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  contextMenuPosition: { x: number; y: number };
  setShowDueDatePicker: (show: boolean) => void;
  handleDelete: () => void;
  todo: Todo;
  setShowContextMenu: (show: boolean) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenuRef,
  getStatusOptions,
  handleMoveToStatus,
  showDueDatePicker,
  handleDueDateChange,
  contextMenuPosition,
  setShowDueDatePicker,
  handleDelete,
  todo,
  setShowContextMenu,
}) => {
  const { setEditModalOpened, setTodoToEdit } = useTodoContext();

  const handleEdit = () => {
    setEditModalOpened(true);
    setShowContextMenu(false);
    setTodoToEdit({ ...todo });
  };

  return (
    <div
      ref={contextMenuRef}
      className="fixed z-20 bg-white border cursor-auto border-gray-100 rounded-lg shadow-lg p-2 min-w-32"
      style={{
        left: contextMenuPosition.x,
        top: contextMenuPosition.y,
      }}
    >
      {getStatusOptions(todo.status).map((status) => (
        <button
          key={status}
          onClick={() => handleMoveToStatus(status)}
          className="w-full text-start cursor-pointer hover:bg-gray-100 px-4 py-2 transition-all duration-300"
        >
          Move To {status}
        </button>
      ))}

      {todo.status !== "Done" && (
        <button
          onClick={() => handleEdit()}
          className="w-full text-start px-4 gap-2 py-2 text-sm hover:bg-gray-100 transition-all flex items-center cursor-pointer"
        >
          <FiEdit />
          Edit Task
        </button>
      )}

      {todo.status === "Ongoing" && (
        <div className="border-t border-gray-200 mt-1 pt-1">
          <button
            onClick={() => setShowDueDatePicker(!showDueDatePicker)}
            className="w-full text-start px-4 gap-2 py-2 text-sm hover:bg-gray-100 transition-all flex items-center cursor-pointer"
          >
            <FiClock />
            Set Due Date
          </button>
          {showDueDatePicker && (
            <div className="px-4 py-2">
              <input
                type="datetime-local"
                value={todo.dueDate || ""}
                onChange={handleDueDateChange}
                className="w-full text-xs border border-gray-200 rounded px-2 py-2"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      )}

      <div
        className="w-full text-start px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-red-100 transition-colors gap-2 duration-200 flex items-center "
        onClick={() => handleDelete()}
      >
        <FiTrash />
        Delete Task
      </div>
    </div>
  );
};

export default ContextMenu;
