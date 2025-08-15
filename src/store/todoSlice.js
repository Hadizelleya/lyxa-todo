import { createSlice } from "@reduxjs/toolkit";

const getSavedTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState = {
  todos: getSavedTodos(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        status: "New",
        createdAt: new Date().toISOString(),
        dueDate: null,
        isOverdue: false,
      };

      state.todos.unshift(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    moveTodo: (state, action) => {
      const { id, newStatus, position } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex];

        state.todos.splice(todoIndex, 1);

        todo.status = newStatus;
        if (newStatus === "Done") {
          todo.completedAt = new Date().toISOString();
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
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    setDueDate: (state, action) => {
      const { id, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.dueDate = dueDate;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    checkOverdue: (state) => {
      const now = new Date();
      state.todos.forEach((todo) => {
        if (todo.dueDate && todo.status === "Ongoing") {
          const dueDate = new Date(todo.dueDate);
          todo.isOverdue = now > dueDate;
        } else {
          todo.isOverdue = false;
        }
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    updateTodo: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.dueDate = dueDate || todo.dueDate;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
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
