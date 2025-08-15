import { createContext, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState({});

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
