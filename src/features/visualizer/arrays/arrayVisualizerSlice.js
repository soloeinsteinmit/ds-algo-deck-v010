import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { persistReducer } from "redux-persist";
import { arrayVisualizerPersistConfig } from "./arrayVisualizerPersistConfig";

let index = 0;
let element = 0;
let message = "" || React.ReactNode;
let animatingIndex = null;
let isInserting = false;
let isTransitioning = false;
let isDeleting = false;
let isUpdating = false;
let isError = false;
let animationStage = null;
let isOperationInProgress = false;
let insertLastIndex = null;
let alertVisible = false;

const initialState = {
  array: [],
  index,
  element,
  message,
  elementPositions: [],
  animatingIndex,
  isInserting,
  isDeleting,
  isUpdating,
  isError,
  animationStage,
  isTransitioning,
  isOperationInProgress,
  insertLastIndex,
  alertVisible,
};

const arrayVisualizerSlice = createSlice({
  name: "arrayVisualizer",
  initialState,
  reducers: {
    /**
     * Sets the array to visualize in the array visualizer.
     * @param {array} action.payload The array to visualize.
     */
    setArray: (state, action) => {
      state.array = action.payload;
    },
    /**
     * Sets the index to visualize in the array visualizer.
     * @param {number} action.payload The index to visualize.
     */
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    /**
     * Sets the element to visualize in the array visualizer.
     * @param {number} action.payload The element to visualize.
     */
    setElement: (state, action) => {
      state.element = action.payload;
    },
    /**
     * Sets the message to display in the array visualizer.
     * @param {string} action.payload The message to display.
     */
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    /**
     * Sets the positions of the elements in the array visualizer.
     * @param {object[]} action.payload An array of objects, where each object has the following properties:
     * - index: The index of the element in the array.
     * - x: The x coordinate of the element.
     * - y: The y coordinate of the element.
     */
    setElementPositions: (state, action) => {
      state.elementPositions = action.payload;
    },
    /**
     * Sets the index of the element in the array visualizer that is currently being animated.
     * @param {number} action.payload The index of the element being animated.
     */
    setAnimatingIndex: (state, action) => {
      state.animatingIndex = action.payload;
    },

    /**
     * Sets whether the array visualizer is currently inserting an element.
     * @param {boolean} action.payload Whether the array visualizer is inserting an element.
     */
    setIsInserting: (state, action) => {
      state.isInserting = action.payload;
    },

    /**
     * Sets whether the array visualizer is currently deleting an element.
     * @param {boolean} action.payload Whether the array visualizer is deleting an element.
     */
    setIsDeleting: (state, action) => {
      state.isDeleting = action.payload;
    },
    /**
     * Sets whether the array visualizer is currently updating an element.
     * @param {boolean} action.payload Whether the array visualizer is updating an element.
     */
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    /**
     * Sets whether the array visualizer is currently in an error state.
     * @param {boolean} action.payload Whether the array visualizer is in an error state.
     */
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    /**
     * Sets the current animation stage in the array visualizer.
     * @param {string} action.payload The animation stage to set.
     */
    setAnimationStage: (state, action) => {
      state.animationStage = action.payload;
    },
    /**
     * Sets whether the array visualizer is currently transitioning between two states.
     * @param {boolean} action.payload Whether the array visualizer is transitioning.
     */
    setIsTransitioning: (state, action) => {
      state.isTransitioning = action.payload;
    },
    /**
     * Sets whether the array visualizer is currently performing an operation (inserting,
     * deleting, or updating an element).
     * @param {boolean} action.payload Whether the array visualizer is currently performing an operation.
     */
    setIsOperationInProgress: (state, action) => {
      state.isOperationInProgress = action.payload;
    },
    /**
     * Sets the last index where an insertion occurred in the array visualizer.
     * @param {number} action.payload The index to set as the last insertion point.
     */
    setInsertLastIndex: (state, action) => {
      state.insertLastIndex = action.payload;
    },
    /**
     * Sets whether the array visualizer alert is visible.
     * @param {boolean} action.payload Whether the array visualizer alert is visible.
     */
    setAlertVisible: (state, action) => {
      state.alertVisible = action.payload;
    },
  },
});

const persistedArrayVisualizerReducer = persistReducer(
  arrayVisualizerPersistConfig,
  arrayVisualizerSlice.reducer
);

export const {
  setArray,
  setIndex,
  setElement,
  setMessage,
  setElementPositions,
  setAnimatingIndex,
  setIsInserting,
  setIsDeleting,
  setIsUpdating,
  setIsError,
  setAnimationStage,
  setIsTransitioning,
  setIsOperationInProgress,
  setInsertLastIndex,
  setAlertVisible,
} = arrayVisualizerSlice.actions;

export default persistedArrayVisualizerReducer;
