/**
 * @fileoverview
 * Hark! Here lies the sacred scroll of layout management,
 * where we doth control the grand theater of our playground.
 */

import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { playgroundLayoutPersistConfig } from "./playgroundPersistConfig";

/**
 * @constant initialState
 * @description
 * Lo! The initial state of our grand stage,
 * like a theater before the curtain rises.
 */
const initialState = {
  isEditorOpen: false,
  isListOpen: true,
  viewMode: "list", // Choices: "list" or "grid"
  implementedFilter: false, // Whether to show only implemented algorithms
  searchMode: "category", // Choices: "category" or "topic"
  searchQuery: "", // Current search query
};

/**
 * @constant playgroundLayoutSlice
 * @description
 * Behold! The slice that controls our stage's configuration,
 * like a master puppeteer pulling the strings of our theater.
 */
const playgroundLayoutSlice = createSlice({
  name: "playgroundLayout",
  initialState,
  reducers: {
    /**
     * @function toggleEditor
     * @description Like a curtain drawn aside, this action reveals or conceals our code editor
     */
    toggleEditor: (state) => {
      state.isEditorOpen = !state.isEditorOpen;
    },

    /**
     * @function toggleList
     * @description As a scroll unfurls, this action shows or hides our noble sidebar
     */
    toggleList: (state) => {
      state.isListOpen = !state.isListOpen;
    },

    /**
     * @function toggleViewMode
     * @description As a magician changes scenes, this action switches between list and grid views
     */
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "list" ? "grid" : "list";
    },

    /**
     * @function toggleImplementedFilter
     * @description Like a filter for precious gems, this shows only the algorithms ready for use
     */
    toggleImplementedFilter: (state) => {
      state.implementedFilter = !state.implementedFilter;
    },

    /**
     * @function setEditorOpen
     * @description Commands the editor to take its position, whether visible or hidden
     */
    setEditorOpen: (state, action) => {
      state.isEditorOpen = action.payload;
    },

    /**
     * @function setListOpen
     * @description Directs the sidebar to show or hide itself
     */
    setListOpen: (state, action) => {
      state.isListOpen = action.payload;
    },

    /**
     * @function setSearchMode
     * @description Changes the way we search through our grand collection
     */
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
    },

    /**
     * @function setSearchQuery
     * @description Updates the search query like a scholar's quest for knowledge
     */
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

const persistedPlaygroundLayoutSlice = persistReducer(
  playgroundLayoutPersistConfig,
  playgroundLayoutSlice.reducer
);

export const {
  toggleEditor,
  toggleList,
  toggleViewMode,
  toggleImplementedFilter,
  setEditorOpen,
  setListOpen,
  setSearchMode,
  setSearchQuery,
} = playgroundLayoutSlice.actions;

export default persistedPlaygroundLayoutSlice;
