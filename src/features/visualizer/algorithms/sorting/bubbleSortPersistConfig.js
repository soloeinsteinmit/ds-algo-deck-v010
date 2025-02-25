import storage from "redux-persist/lib/storage";

export const bubbleSortPersistConfig = {
  key: "bubbleSort",
  storage,
  whitelist: [
    "array",
    "isPlaying",
    "isPaused",
    "sortingSteps",
    "currentStep",
    "animationSpeed",
    "arraySize",
  ], // Only persist these fields
};
