import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import "./BubbleSortVisualizer.css";

import {
  setArray,
  setCurrentStep,
  setIsPlaying,
  setPaused,
  reset,
  stepForward,
  stepBackward,
  generateNewArray,
} from "../../../../features/visualizer/algorithms/sorting/bubbleSortVisualizerSlice";

/**
 * BubbleSortVisualizer is a React component that visualizes the Bubble Sort algorithm.
 * It uses D3.js to render a bar chart representation of an array being sorted.
 * The component manages sorting steps, animation control, and rendering updates with Redux.
 *
 * The visualization includes comparing and swapping animations between array elements.
 * A D3.js SVG is used to display the bars, with colors indicating the comparison/swapping state.
 *
 * The component initializes with a default array, and uses a control panel to start sorting.
 * Sorting speed and visual updates are controlled through dispatch actions and state updates.
 */
const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: {
    key: " ",
    description: "Play/Pause sorting",
    combination: "Space",
  },
  STEP_FORWARD: {
    key: "ArrowRight",
    description: "Step forward",
    combination: "→",
  },
  STEP_BACKWARD: {
    key: "ArrowLeft",
    description: "Step backward",
    combination: "←",
  },
  RESET: {
    key: "r",
    description: "Reset sorting",
    combination: "R",
  },
  RANDOMIZE: {
    key: "n",
    description: "New random array",
    combination: "N",
  },
};

export const BubbleSortVisualizer = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const {
    array,
    currentStep,
    isPlaying,
    animationSpeed,
    isPaused,
    sortingSteps,
    arraySize,
  } = useSelector((state) => state.bubbleSortVisualizer);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);

  // Add resize observer
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setDimensions({
          width: width,
          height: Math.min(width * 0.5, 400),
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Initialize with default array
  useEffect(() => {
    if (array.length === 0) {
      dispatch(setArray([64, 34, 25, 12, 22, 11, 90]));
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === KEYBOARD_SHORTCUTS.PLAY_PAUSE.key) {
        if (isPlaying) {
          dispatch(setPaused(!isPaused));
        } else {
          dispatch(setIsPlaying(true));
        }
      } else if (e.key === KEYBOARD_SHORTCUTS.STEP_FORWARD.key && !isPlaying) {
        dispatch(stepForward());
      } else if (e.key === KEYBOARD_SHORTCUTS.STEP_BACKWARD.key && !isPlaying) {
        dispatch(stepBackward());
      } else if (e.key === KEYBOARD_SHORTCUTS.RESET.key) {
        dispatch(reset());
      } else if (e.key === KEYBOARD_SHORTCUTS.RANDOMIZE.key && !isPlaying) {
        dispatch(generateNewArray(arraySize));
        console.log("array size:", arraySize);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying, isPaused]);

  // Handle animation
  useEffect(() => {
    if (isPlaying && !isPaused) {
      animate(currentStep);
    }
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, isPaused, animationSpeed]);

  const animate = (step) => {
    if (step >= sortingSteps.length) {
      dispatch(setIsPlaying(false));
      dispatch(setPaused(false));
      return;
    }

    dispatch(setCurrentStep(step));

    animationRef.current = setTimeout(() => {
      animate(step + 1);
    }, 1000 / animationSpeed);
  };

  // D3 visualization
  useEffect(() => {
    if (!svgRef.current || !array.length || !dimensions.width) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    const padding = 40;

    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("background-color", "transparent");

    const xScale = d3
      .scaleBand()
      .domain(d3.range(array.length))
      .range([padding, width - padding])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(array)])
      .range([height - padding, padding]);

    const currentStepDetails = sortingSteps[currentStep] || {
      comparing: [],
      swapping: false,
      sortedIndices: [],
    };

    const comparing = Array.isArray(currentStepDetails.comparing)
      ? currentStepDetails.comparing
      : [];
    const sortedIndices = Array.isArray(currentStepDetails.sortedIndices)
      ? currentStepDetails.sortedIndices
      : [];

    const bars = svg
      .selectAll("rect")
      .data(array)
      .join("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - padding - yScale(d))
      .attr("fill", (d, i) => {
        if (sortedIndices.includes(i)) return "#17c964"; // Success green for sorted
        if (comparing.includes(i)) return "#f5a524"; // Warning yellow for comparing
        return "#006FEE"; // Default blue
      })
      .attr("rx", 4)
      .attr("ry", 4);

    // Only show bar labels when array length is less than 60
    if (array.length <= 60) {
      svg
        .selectAll("text")
        .data(array)
        .join("text")
        .text((d) => d)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d) - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
    }
  }, [array, dimensions, currentStep, sortingSteps]);

  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col gap-5 w-full mt-10">
        <div ref={containerRef} className="visualizer-container">
          <svg ref={svgRef} />
        </div>
        <p className="text-center text-sm text-gray-500">
          Steps {"->"} {currentStep} / {sortingSteps.length - 1}
        </p>
      </div>

      {/* Keyboard Shortcuts Card */}
      <div className="absolute bottom-4 right-1/2 translate-x-1/2 bg-content border border-border rounded-lg p-4 shadow-lg  w-[500px]">
        <h3 className="text-lg font-semibold mb-2">⌨️ Keyboard Shortcuts</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(KEYBOARD_SHORTCUTS).map(
            ([name, { combination, description }]) => (
              <div key={name} className="col-span-1 flex items-center">
                <kbd className="px-2 py-1 bg-default-100 rounded text-sm">
                  {combination}
                </kbd>
                <span className="ml-2 text-sm">{description}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
