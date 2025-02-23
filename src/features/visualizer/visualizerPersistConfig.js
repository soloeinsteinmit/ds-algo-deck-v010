import storage from "redux-persist/lib/storage";

export const visualizerPersistConfig = {
  key: "visualizer",
  storage,
  whitelist: ["currentView", "code", "settings"],
};
