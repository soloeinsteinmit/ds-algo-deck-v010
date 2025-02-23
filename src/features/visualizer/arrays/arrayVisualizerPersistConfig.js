import storage from "redux-persist/lib/storage";

export const arrayVisualizerPersistConfig = {
  key: "arrayVisualizer",
  storage,
  whitelist: [
    "array",
    "index",
    "element",
    "message",
    "elementPositions",
    "animatingIndex",
    "isInserting",
    "isDeleting",
    "isUpdating",
    "isError",
    "animationStage",
    "isTransitioning",
    "isOperationInProgress",
    "insertLastIndex",
    "alertVisible",
  ],
};
