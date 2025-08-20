import { Todo } from "../types";

export const getStatusOptions = (
  currentStatus: Todo["status"]
): Todo["status"][] => {
  const allStatuses: Todo["status"][] = ["New", "Ongoing", "Done"];
  return allStatuses.filter((status) => status !== currentStatus);
};

export const filterTodosByStatus = (
  todos: Todo[],
  status: Todo["status"]
): Todo[] => {
  return todos.filter((todo) => todo.status === status);
};

export const getOverdueTodos = (todos: Todo[]): Todo[] => {
  return todos.filter((todo) => todo.isOverdue);
};

export const validateTodoForm = (title: string): string | null => {
  if (!title.trim()) {
    return "Title is required";
  }
  return null;
};
