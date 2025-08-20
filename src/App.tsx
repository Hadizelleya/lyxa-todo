import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Todos from "./components/Todos";
import MainContextProvider from "./context/MainContext";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainContextProvider>
        <Todos />
      </MainContextProvider>
    </Provider>
  );
};

export default App;
