import { combineReducers } from "@reduxjs/toolkit";

import arrayVisualizerReducer from "../features/visualizer/arrays/arrayVisualizerSlice";
import visualizerReducer from "../features/visualizer/visualizerSlice";
import bubbleSortVisualizerReducer from "../features/visualizer/algorithms/sorting/bubbleSortVisualizerSlice";
import codeEditorReducer from "../features/code_editor/codeEditorSlice";
import linearSearchVisualizerReducer from "../features/visualizer/algorithms/searching/linearSearchVisualizerSlice";
import playgroundLayoutReducer from "../features/playground/playgroundLayoutSlice";

const rootReducer = combineReducers({
  arrayVisualizer: arrayVisualizerReducer,
  visualizer: visualizerReducer,
  bubbleSortVisualizer: bubbleSortVisualizerReducer,
  codeEditor: codeEditorReducer,
  linearSearchVisualizer: linearSearchVisualizerReducer,
  playgroundLayout: playgroundLayoutReducer,
});

export default rootReducer;
