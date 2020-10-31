import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadSettingsFromStorage } from "./features/settings/settings.slice";
import HomePage from "./pages/home/HomePage";
import { RootState } from "./reducer";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;500;700&display=swap");

  font-family: "Raleway", sans-serif;
`;

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  const settingsLoaded = useSelector(
    (state: RootState) => state.settings.settingsLoaded
  );

  useEffect(() => {
    dispatch(loadSettingsFromStorage());
  }, [dispatch]);

  if (!settingsLoaded) {
    return null;
  }

  return (
    <Container>
      <HomePage />
    </Container>
  );
};

export default App;
