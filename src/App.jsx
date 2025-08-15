import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Todos from "./components/Todos";
import MainContextProvider from "./context/MainContext";

export default function App() {
  return (
    <Provider store={store}>
      <MainContextProvider>
        <Todos />
      </MainContextProvider>
    </Provider>
  );
}
