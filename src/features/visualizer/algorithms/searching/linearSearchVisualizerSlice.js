import { createSlice } from "@reduxjs/toolkit";
import { linearSearchPersistConfig } from "./linearSearchPersistConfig";
import { persistReducer } from "redux-persist";

/*
 * Hark! Dear fellow programmer, gather 'round,
 * For here lies the tale of searching most profound.
 * In this sacred scroll of JavaScript divine,
 * We track the elements that fall in line.
 *
 * Act I: The State
 * Like players on a stage, each with their role to play,
 * Our state doth hold the truth of search's way.
 */

const initialState = {
  array: [],
  searchTarget: 0,
  searchSteps: [],
  currentStep: 0,
  isPlaying: false,
  isPaused: false,
  animationSpeed: 5,
  arraySize: 20,
  visitedIndices: [], // Track visited indices as array
  currentIndex: -1, // Current index being searched
  searchComplete: false, // Whether search is complete
  foundIndex: null, // Index where target was found
};

/*
 * Act II: The Search Steps
 * Each step a scene, each movement planned with care,
 * As through the array we search with flair.
 */
const generateSearchSteps = (array, target) => {
  const steps = [];
  const visited = [];

  for (let i = 0; i < array.length; i++) {
    visited.push(i);
    const isFound = array[i] === target;

    steps.push({
      array: [...array],
      currentIndex: i,
      isFound,
      foundIndex: isFound ? i : null,
      visited: [...visited], // Store as array
      searching: !isFound,
    });

    if (isFound) break;
  }

  if (steps.length === 0 || !steps[steps.length - 1].isFound) {
    visited.push(array.length - 1);
    steps.push({
      array: [...array],
      currentIndex: array.length,
      isFound: false,
      foundIndex: null,
      visited: [...visited],
      searching: false,
    });
  }

  return steps;
};

/*
 * Act III: The Slice
 * Where actions and state in harmony combine,
 * To guide our search through space and time.
 */
export const linearSearchVisualizerSlice = createSlice({
  name: "linearSearchVisualizer",
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.array = action.payload;
      state.searchSteps = generateSearchSteps(
        action.payload,
        state.searchTarget
      );
      state.currentStep = 0;
      state.visitedIndices = [];
      state.currentIndex = -1;
      state.isPlaying = false;
      state.isPaused = false;
      state.searchComplete = false;
      state.foundIndex = null;
    },
    setSearchTarget: (state, action) => {
      state.searchTarget = action.payload;
      state.searchSteps = generateSearchSteps(state.array, action.payload);
      state.currentStep = 0;
      state.visitedIndices = [];
      state.currentIndex = -1;
      state.isPlaying = false;
      state.isPaused = false;
      state.searchComplete = false;
      state.foundIndex = null;
    },
    setCurrentStep: (state, action) => {
      if (!state.isPaused && !state.searchComplete) {
        const step = state.searchSteps[action.payload];
        if (step) {
          state.currentStep = action.payload;
          state.visitedIndices = Array.isArray(step.visited)
            ? [...step.visited]
            : [];
          state.currentIndex = step.currentIndex;
          state.foundIndex = step.foundIndex;
          state.searchComplete =
            step.isFound || state.currentIndex >= state.array.length;
        }
      }
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
      if (state.searchTarget === state.array[state.foundIndex]) {
        console.log(
          "state.searchTarget === array[foundIndex]",
          state.searchTarget,
          state.array[state.foundIndex]
        );
        state.isPlaying = false;
        state.isPaused = false;
        return;
      }
      if (state.searchComplete === true) {
        console.log("state.searchComplete", state.searchComplete);
        state.isPlaying = false;
        state.isPaused = false;
        return;
      }
      if (action.payload) {
        state.isPaused = false;
      }
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
      if (action.payload) {
        state.isPlaying = false;
        // Store current state when pausing
        const currentStep = state.searchSteps[state.currentStep];
        if (currentStep) {
          state.visitedIndices = Array.isArray(currentStep.visited)
            ? [...currentStep.visited]
            : [];
          state.currentIndex = currentStep.currentIndex;
        }
      }
    },
    resumeSearch: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
      // Ensure visited indices is an array
      if (!Array.isArray(state.visitedIndices)) {
        state.visitedIndices = [];
      }
    },
    setAnimationSpeed: (state, action) => {
      state.animationSpeed = action.payload;
    },
    stepForward: (state) => {
      if (
        !state.isPaused &&
        !state.searchComplete &&
        state.currentStep < state.searchSteps.length - 1
      ) {
        const nextStep = state.searchSteps[state.currentStep + 1];
        state.currentStep += 1;
        state.visitedIndices = Array.isArray(nextStep.visited)
          ? [...nextStep.visited]
          : [];
        state.currentIndex = nextStep.currentIndex;
        state.foundIndex = nextStep.foundIndex;
        state.searchComplete =
          nextStep.isFound || state.currentIndex >= state.array.length;
      } else if (state.isPlaying) {
        state.isPlaying = false;
        state.isPaused = false;
      }
    },
    stepBackward: (state) => {
      if (!state.isPaused && state.currentStep > 0) {
        const prevStep = state.searchSteps[state.currentStep - 1];
        state.currentStep -= 1;
        state.visitedIndices = Array.isArray(prevStep.visited)
          ? [...prevStep.visited]
          : [];
        state.currentIndex = prevStep.currentIndex;
        state.foundIndex = prevStep.foundIndex;
        state.searchComplete = prevStep.isFound;
      }
    },
    reset: (state) => {
      state.currentStep = 0;
      state.visitedIndices = [];
      state.currentIndex = -1;
      state.isPlaying = false;
      state.isPaused = false;
      state.searchComplete = false;
      state.foundIndex = null;
    },
    setArraySize: (state, action) => {
      state.arraySize = action.payload;
    },
    generateNewArray: (state) => {
      const newArray = Array.from({ length: state.arraySize }, () =>
        Math.floor(Math.random() * 100)
      );
      state.array = newArray;
      state.searchSteps = generateSearchSteps(newArray, state.searchTarget);
      state.currentStep = 0;
      state.visitedIndices = [];
      state.currentIndex = -1;
      state.isPlaying = false;
      state.isPaused = false;
      state.searchComplete = false;
      state.foundIndex = null;
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
  setCurrentStep,
  setIsPlaying,
  setPaused,
  resumeSearch,
  setAnimationSpeed,
  stepForward,
  stepBackward,
  reset,
  setArraySize,
  generateNewArray,
} = linearSearchVisualizerSlice.actions;

export default persistedLinearSearchReducer;
