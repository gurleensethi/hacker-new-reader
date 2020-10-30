import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import HomePage from "./pages/posts/PostsPage";
import store from "./store";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;500;700&display=swap");

  font-family: "Raleway", sans-serif;
`;

const App: FunctionComponent = () => {
  return (
    <Container>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </Container>
  );
};

export default App;
