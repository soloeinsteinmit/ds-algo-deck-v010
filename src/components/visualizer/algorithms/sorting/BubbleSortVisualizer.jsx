import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import "./BubbleSortVisualizer.css";

import {
  setArray,
  setCurrentStep,
  setIsPlaying,
  setPaused,
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
      .attr("viewBox", `0 0 ${width} ${height}`);

    const xScale = d3
      .scaleBand()
      .domain(array.map((_, i) => i.toString()))
      .range([padding, width - padding])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...array)])
      .range([height - padding, padding]);

    const getBarColor = (index) => {
      // If we're at the last step (sorting is complete), all bars are green
      if (currentStep === sortingSteps.length - 1) {
        return "#22c55e"; // Green for completed sort
      }

      // During sorting, show comparing/swapping colors
      if (sortingSteps[currentStep]?.comparing?.includes(index)) {
        return sortingSteps[currentStep].swapping ? "#ef4444" : "#fbbf24";
      }

      // Default color for unsorted bars
      return "#4f46e5";
    };

    // Create bars
    svg
      .selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => xScale(i.toString()))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - padding - yScale(d))
      .attr("fill", (_, i) => getBarColor(i))
      .attr("rx", 4);

    // Add labels if array length is 15 or less
    if (array.length <= 20) {
      svg
        .selectAll(".bar-label")
        .data(array)
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .text((d) => d)
        .attr("x", (_, i) => xScale(i.toString()) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d) - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#4b5563");
    }
  }, [array, currentStep, sortingSteps, dimensions]);

  return (
    <div ref={containerRef} className="visualizer-container">
      <svg ref={svgRef} />
      <p className="text-center text-sm text-gray-500">
        Steps {"->"} {currentStep} / {sortingSteps.length - 1}
      </p>
    </div>
  );
};
