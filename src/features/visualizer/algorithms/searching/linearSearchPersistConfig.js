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
    "lastPlayedStep",
    "visitedIndices",
    "currentSearchIndex",
    "searchState",
  ],
};
