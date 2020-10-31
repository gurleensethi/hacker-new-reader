import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";

interface Settings {
  pageSize: number;
}

interface SettingsState {
  data: Settings;
  settingsLoaded: boolean;
}

const initialState: SettingsState = {
  data: {
    pageSize: 20,
  },
  settingsLoaded: false,
};

type SettingsLoadedPayload = Settings;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    loadingComplete(state) {
      state.settingsLoaded = true;
    },
    loadSettings(state, action: PayloadAction<SettingsLoadedPayload>) {
      state.data = action.payload;
    },
  },
});

export const { loadSettings, loadingComplete } = settingsSlice.actions;

export default settingsSlice.reducer;

export const loadSettingsFromStorage = (): AppThunk => {
  return (dispatch) => {
    const settings = localStorage.getItem("settings");
    if (settings) {
      dispatch(loadSettings(JSON.parse(settings)));
    } else {
      dispatch(loadSettings(initialState.data));
    }
    dispatch(loadingComplete());
  };
};
