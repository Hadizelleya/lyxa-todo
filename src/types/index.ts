export interface Todo {
  id: string;
  title: string;
  description: string;
  status: "New" | "Ongoing" | "Done";
  createdAt: string;
  dueDate: string | null;
  isOverdue: boolean;
  completedAt?: string;
}

export interface TodoState {
  todos: Todo[];
}

export interface RootState {
  todos: TodoState;
}

export type AppDispatch = import("../store/store").AppDispatch;

export interface AddTodoPayload {
  title: string;
  description: string;
}

export interface MoveTodoPayload {
  id: string;
  newStatus: Todo["status"];
  position?: number;
}

export interface SetDueDatePayload {
  id: string;
  dueDate: string | null;
}

export interface UpdateTodoPayload {
  id: string;
  title?: string;
  description?: string;
  dueDate?: string | null;
}

export interface CategoryConfig {
  status: Todo["status"];
  title: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  showAddForm: boolean;
  textColor: string;
}

export interface DropResult {
  todoId: string;
  newStatus: Todo["status"];
  position?: number;
}
