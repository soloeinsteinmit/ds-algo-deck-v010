import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

// Add this configuration for Redux DevTools
const devToolsOptions = {
  maxAge: 50, // Limit the number of stored actions
  actionSanitizer: (action) => {
    // Sanitize large actions if needed
    if (action.type === "bubbleSortVisualizer/setArray" && action.payload) {
      return {
        ...action,
        payload: `Array with ${action.payload.length} items`,
      };
    }
    return action;
  },
  stateSanitizer: (state) => {
    // Sanitize large state objects
    if (state.bubbleSortVisualizer) {
      return {
        ...state,
        bubbleSortVisualizer: {
          ...state.bubbleSortVisualizer,
          sortingSteps: `${state.bubbleSortVisualizer.sortingSteps.length} steps`,
        },
      };
    }
    return state;
  },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development" ? devToolsOptions : false,
});

export const persistor = persistStore(store);
