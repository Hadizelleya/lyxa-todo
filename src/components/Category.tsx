import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { FaBeerMugEmpty } from "react-icons/fa6";
import TodoItem from "./TodoItem";
import { RootState, Todo } from "../types";

interface DropResult {
  position?: number;
}

interface DropZoneProps {
  position: number;
  status: Todo["status"];
}

interface CategoryProps {
  status: Todo["status"];
  title: string;
  color: string;
  onDrop: (todoId: string, newStatus: string, position?: number) => void;
  showAddForm?: boolean;
  children?: React.ReactNode;
  countColor: string;
}

const DropZone: React.FC<DropZoneProps> = ({ position }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TODO_CARD",
    drop: () => ({ position }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as any}
      className={`h-4 transition-all duration-200 border-2 border-dashed ${
        isOver
          ? "bg-blue-100 border-blue-400 rounded"
          : "border-transparent hover:border-gray-300 hover:bg-gray-50"
      }`}
    />
  );
};

const Category: React.FC<CategoryProps> = ({
  status,
  title,
  color,
  onDrop,
  showAddForm = false,
  children,
  countColor,
}) => {
  const allTodos = useSelector((state: RootState) => state.todos.todos);
  const todosContainerRef = useRef<HTMLDivElement>(null);

  const todos = allTodos.filter((todo) => todo.status === status);

  const [{ isOver }, drop] = useDrop({
    accept: "TODO_CARD",
    drop: (task: any, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (dropResult) {
        onDrop(task.id, status, dropResult.position);
      } else {
        onDrop(task.id, status, todos.length);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop as any}
      className={`flex-1 bg-white shadow-2xl rounded-lg p-4 ${
        isOver ? "bg-gray-100" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between mb-3 p-4 rounded-lg ${color}`}
      >
        <h2 className="font-bold text-lg text-white">{title}</h2>
        <span
          className={`bg-white ${countColor} text-sm px-2 py-2 rounded-full`}
        >
          {todos.length}
        </span>
      </div>

      {showAddForm && <div className="mb-4">{children}</div>}

      <div className="space-y-3" ref={todosContainerRef}>
        <DropZone position={0} status={status} />

        {todos.map((todo, index) => (
          <div key={todo.id} className="relative">
            <TodoItem todo={todo} />
            <DropZone position={index + 1} status={status} />
          </div>
        ))}

        {todos.length === 0 && <DropZone position={0} status={status} />}
      </div>

      {/* empty state */}
      {todos.length === 0 && (
        <div className="text-center flex flex-col items-center justify-center py-8 ">
          <p className="text-gray-800">No {status.toLowerCase()} tasks</p>
          <FaBeerMugEmpty className=" text-yellow-900 text-2xl" />
        </div>
      )}
    </div>
  );
};

export default Category;
