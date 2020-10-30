import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import HomePage from "./pages/home/HomePage";
import store from "./store";

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
