import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import reducer, { RootState } from "./reducer";

const store = configureStore({ reducer });

export default store;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
