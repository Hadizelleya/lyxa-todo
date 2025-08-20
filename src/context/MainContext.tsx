import React, { createContext, useState, ReactNode } from "react";
import { Todo } from "../types";

interface MainContextType {
  editModalOpened: boolean;
  setEditModalOpened: (opened: boolean) => void;
  todoToEdit: Todo | null;
  setTodoToEdit: (todo: Todo | null) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const MainContext = createContext<MainContextType | undefined>(
  undefined
);

const MainContextProvider: React.FC<MainContextProviderProps> = ({
  children,
}) => {
  const [editModalOpened, setEditModalOpened] = useState<boolean>(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  return (
    <MainContext.Provider
      value={{
        editModalOpened,
        setEditModalOpened,
        todoToEdit,
        setTodoToEdit,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
