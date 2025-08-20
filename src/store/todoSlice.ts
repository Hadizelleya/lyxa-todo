import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Todo,
  TodoState,
  AddTodoPayload,
  MoveTodoPayload,
  SetDueDatePayload,
  UpdateTodoPayload,
} from "../types";
import { STORAGE_KEYS } from "../constants";
import { getCurrentISOString, isDateOverdue } from "../utils/dateUtils";

const getSavedTodos = (): Todo[] => {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEYS.TODOS);
    return savedTodos ? JSON.parse(savedTodos) : [];
  } catch (error) {
    console.error("Failed to load todos:", error);
    return [];
  }
};

const saveTodos = (todos: Todo[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos:", error);
  }
};

const initialState: TodoState = {
  todos: getSavedTodos(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        status: "New",
        createdAt: getCurrentISOString(),
        dueDate: null,
        isOverdue: false,
      };

      state.todos.unshift(newTodo);
      saveTodos(state.todos);
    },

    moveTodo: (state, action: PayloadAction<MoveTodoPayload>) => {
      const { id, newStatus, position } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex];

        state.todos.splice(todoIndex, 1);

        todo.status = newStatus;
        if (newStatus === "Done") {
          todo.completedAt = getCurrentISOString();
        }

        const targetTodos = state.todos.filter((t) => t.status === newStatus);

        if (position !== undefined && position >= 0) {
          let insertIndex = 0;
          let count = 0;

          for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].status === newStatus) {
              if (count === position) {
                insertIndex = i;
                break;
              }
              count++;
            }
          }

          if (count < position || position >= targetTodos.length) {
            insertIndex = state.todos.length;
            for (let i = state.todos.length - 1; i >= 0; i--) {
              if (state.todos[i].status === newStatus) {
                insertIndex = i + 1;
                break;
              }
            }
          }

          state.todos.splice(insertIndex, 0, todo);
        } else {
          state.todos.unshift(todo);
        }
      }
      saveTodos(state.todos);
    },

    setDueDate: (state, action: PayloadAction<SetDueDatePayload>) => {
      const { id, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.dueDate = dueDate;
      }
      saveTodos(state.todos);
    },

    checkOverdue: (state) => {
      state.todos.forEach((todo) => {
        todo.isOverdue = isDateOverdue(todo.dueDate, todo.status);
      });
      saveTodos(state.todos);
    },

    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const { id, title, description, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
      }
      saveTodos(state.todos);
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodos(state.todos);
    },
  },
});

export const {
  addTodo,
  moveTodo,
  setDueDate,
  checkOverdue,
  deleteTodo,
  updateTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
