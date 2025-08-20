import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const useTodoContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useTodoContext used outside MainContextProvider");
  }

  return context;
};
