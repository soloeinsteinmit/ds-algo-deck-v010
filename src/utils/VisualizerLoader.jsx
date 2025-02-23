import { useMemo } from "react";
import { VisualizerType } from "../types/visualizer.js";
// Import notes directly
import { basicArrayOperationsNote } from "./data_structure/dsa_notes/arraysShortNotes";
import { bubbleSortNote } from "./data_structure/dsa_notes/sortingAlgorithmsShortNotes";

// Import components directly
import ArrayVisualizer from "../components/visualizer/data_structures/array/ArrayVisualizer";
import ArrayControls from "../components/visualizer/data_structures/array/ArrayControls";
import { BubbleSortVisualizer } from "../components/visualizer/algorithms/sorting/BubbleSortVisualizer";
import { BubbleSortControls } from "../components/visualizer/algorithms/sorting/BubbleSortControl";
import LinearSearchVisualizer from "../components/visualizer/algorithms/searching/LinearSearchVisualizer";
import LinearSearchControls from "../components/visualizer/algorithms/searching/LinearSearchControls";
import { linearSearchNote } from "./data_structure/dsa_notes/searchingAlgorithmsShortNotes";

const VisualizerLoader = ({ type }) => {
  const visualizerMap = useMemo(
    () => ({
      [VisualizerType.BASIC_ARRAY_OPERATIONS]: {
        visualizer: ArrayVisualizer,
        controls: ArrayControls,
        title: "Basic Array Operations",
        notes: basicArrayOperationsNote,
      },
      [VisualizerType.BUBBLE_SORT]: {
        visualizer: BubbleSortVisualizer,
        controls: BubbleSortControls,
        title: "Bubble Sort Algorithm",
        notes: bubbleSortNote,
      },
      [VisualizerType.LINEAR_SEARCH]: {
        visualizer: LinearSearchVisualizer,
        controls: LinearSearchControls,
        title: "Linear Search Algorithm",
        notes: linearSearchNote,
      },
    }),
    []
  );

  const current = useMemo(() => {
    if (type && Object.values(VisualizerType).includes(type)) {
      return visualizerMap[type];
    }
    // console.warn(
    //   `Invalid visualizer type: ${type}. Defaulting to Basic Array Operations.`
    // );
    return visualizerMap[VisualizerType.BASIC_ARRAY_OPERATIONS];
  }, [type, visualizerMap]);

  if (!current) {
    return {
      title: "Error",
      visualizer: null,
      controls: null,
      shortNotes: null,
    };
  }

  const Visualizer = current.visualizer;
  const Controls = current.controls;

  return {
    title: current.title,
    visualizer: <Visualizer />, // Directly render the component
    controls: <Controls />, // Directly render the component
    shortNotes: current.notes,
  };
};

export default VisualizerLoader;
