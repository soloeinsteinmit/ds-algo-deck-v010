import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { bubbleSortPersistConfig } from "./bubbleSortPersistConfig";

const initialState = {
  array: [],
  sortingSteps: [],
  currentStep: 0,
  isPlaying: false,
  animationSpeed: 5,
  isPaused: false,
};

// Helper function to generate sorting steps
const generateSortingSteps = (arr) => {
  const steps = [];
  const n = arr.length;
  const tempArray = [...arr];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...tempArray],
        comparing: [j, j + 1],
        swapping: false,
      });

      if (tempArray[j] > tempArray[j + 1]) {
        [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
        steps.push({
          array: [...tempArray],
          comparing: [j, j + 1],
          swapping: true,
        });
      }
    }
  }
  return steps;
};

const bubbleSortVisualizerSlice = createSlice({
  name: "bubbleSortVisualizer",
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.array = action.payload;
      // Generate new sorting steps when array changes
      state.sortingSteps = generateSortingSteps([...action.payload]);
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
      // Update array to match current step
      if (state.sortingSteps[action.payload]) {
        state.array = state.sortingSteps[action.payload].array;
      }
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    stepForward: (state) => {
      if (state.currentStep < state.sortingSteps.length - 1) {
        state.currentStep += 1;
        state.array = state.sortingSteps[state.currentStep].array;
      }
    },
    stepBackward: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
        state.array = state.sortingSteps[state.currentStep].array;
      }
    },
    reset: (state) => {
      state.currentStep = 0;
      state.isPlaying = false;
      state.isPaused = false;
      if (state.sortingSteps.length > 0) {
        state.array = state.sortingSteps[0].array;
      }
    },
    generateNewArray: (state, action) => {
      const size = action.payload;
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 100) + 1
      );
      state.array = newArray;
      state.sortingSteps = generateSortingSteps(newArray);
      state.currentStep = 0;
    },
  },
});

const persistedBubbleSortReducer = persistReducer(
  bubbleSortPersistConfig,
  bubbleSortVisualizerSlice.reducer
);

export const {
  setArray,
  setCurrentStep,
  setIsPlaying,
  setAnimationSpeed,
  setPaused,
  stepForward,
  stepBackward,
  reset,
  generateNewArray,
} = bubbleSortVisualizerSlice.actions;

export default persistedBubbleSortReducer;
