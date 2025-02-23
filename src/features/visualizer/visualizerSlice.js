import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { visualizerPersistConfig } from "./visualizerPersistConfig";

const initialState = {
  currentView: null,
  code: null,
  settings: {},
  isAnimating: false,
  speed: 1,
};

const visualizerSlice = createSlice({
  name: "visualizer",
  initialState,
  reducers: {
    /**
     * Sets the current view in the visualizer.
     * @param {object} state The current state of the visualizer.
     * @param {object} action The action to perform.
     * @param {string} action.payload The new view to display.
     */
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },

    /**
     * Sets the code to visualize in the visualizer.
     * @param {object} state The current state of the visualizer.
     * @param {object} action The action to perform.
     * @param {string} action.payload The new code to visualize.
     */
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

const persistedVisualizerReducer = persistReducer(
  visualizerPersistConfig,
  visualizerSlice.reducer
);

export const { setCurrentView, setCode } = visualizerSlice.actions;

export default persistedVisualizerReducer;
