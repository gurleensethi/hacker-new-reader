import React, { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadSettingsFromStorage } from "./features/settings/settings.slice";
import HomePage from "./pages/home/HomePage";
import { RootState } from "./reducer";

const Container = styled.div`
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
