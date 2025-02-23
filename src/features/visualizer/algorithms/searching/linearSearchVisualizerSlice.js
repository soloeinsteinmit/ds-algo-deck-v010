import { createSlice } from "@reduxjs/toolkit";
import { linearSearchPersistConfig } from "./linearSearchPersistConfig";
import { persistReducer } from "redux-persist";

let currentIndex = 0;
let animationSpeed = 1000;
let searchSteps = 0;

const initialState = {
  array: [],
  searchTarget: 0,
  currentIndex: currentIndex,
  isSearching: false,
  isPaused: false,
  animationSpeed: animationSpeed,
  searchSteps: searchSteps,
  isFound: false,
  foundIndex: null,
  resetSearch: false,
};

export const linearSearchVisualizerSlice = createSlice({
  name: "linearSearchVisualizer",
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.array = action.payload;
    },
    setSearchTarget: (state, action) => {
      state.searchTarget = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setIsPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
    setSearchSteps: (state, action) => {
      state.searchSteps = action.payload;
    },
    setIsFound: (state, action) => {
      state.isFound = action.payload;
    },
    setFoundIndex: (state, action) => {
      state.foundIndex = action.payload;
    },
    setResetSearch: (state, action) => {
      state.resetSearch = action.payload;
    },
  },
});

const persistedLinearSearchReducer = persistReducer(
  linearSearchPersistConfig,
  linearSearchVisualizerSlice.reducer
);

export const {
  setArray,
  setSearchTarget,
  setCurrentIndex,
  setIsSearching,
  setIsPaused,
  setAnimationSpeed,
  setSearchSteps,
  setIsFound,
  setFoundIndex,
  setResetSearch,
} = linearSearchVisualizerSlice.actions;

export default persistedLinearSearchReducer;
