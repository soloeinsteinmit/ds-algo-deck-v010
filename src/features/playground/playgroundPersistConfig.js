import storage from "redux-persist/lib/storage";

export const playgroundLayoutPersistConfig = {
  key: "playgroundLayout",
  storage,
  whitelist: [
    "isEditorOpen",
    "isListOpen",
    "viewMode",
    "implementedFilter",
    "searchMode",
    "searchQuery",
  ],
};
