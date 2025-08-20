import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { CategoryConfig, Todo } from "../types";

export const TODO_STATUSES = {
  NEW: "New" as const,
  ONGOING: "Ongoing" as const,
  DONE: "Done" as const,
} as const;

export const STORAGE_KEYS = {
  TODOS: "todos",
} as const;

export const STATUS_COLORS: Record<Todo["status"], string> = {
  New: "bg-blue-100 border-blue-300 text-blue-800",
  Ongoing: "bg-orange-100 border-orange-300 text-orange-800",
  Done: "bg-green-100 border-green-300 text-green-800",
};

export const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    status: TODO_STATUSES.NEW,
    title: "New Tasks",
    color: "bg-blue-500",
    icon: FiAlertCircle,
    showAddForm: true,
    textColor: "text-blue-500",
  },
  {
    status: TODO_STATUSES.ONGOING,
    title: "In Progress",
    color: "bg-orange-500",
    icon: FiClock,
    showAddForm: false,
    textColor: "text-orange-500",
  },
  {
    status: TODO_STATUSES.DONE,
    title: "Completed Tasks",
    color: "bg-green-500",
    icon: FiCheckCircle,
    showAddForm: false,
    textColor: "text-green-500",
  },
];

export const ANIMATION_CLASSES = {
  MODAL_OVERLAY: "transition-all duration-300",
  MODAL_CONTENT: "transition-all duration-300 transform",
  FORM_FIELD: "transition-all duration-300",
} as const;
