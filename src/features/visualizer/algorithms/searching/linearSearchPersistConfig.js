import storage from "redux-persist/lib/storage";

export const linearSearchPersistConfig = {
  key: "linearSearch",
  storage,
  whitelist: [
    "array",
    "searchTarget",
    "searchSteps",
    "currentStep",
    "isPlaying",
    "isPaused",
    "animationSpeed",
    "arraySize",
    "visitedIndices", // Track visited indices as array
    "currentIndex", // Current index being searched
    "searchComplete", // Whether search is complete
    "foundIndex",
  ],
};
