import storage from "redux-persist/lib/storage";

export const linearSearchPersistConfig = {
  key: "linearSearch",
  storage,
  whitelist: [
    "array",
    "target",
    "currentIndex",
    "isPlaying",
    "isPaused",
    "animationSpeed",
    "searchingSteps",
    "currentStep",
    "isFound",
    "foundIndex",
  ],
};
