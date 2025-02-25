// LinearSearchVisualizer.js
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import "./LinearSearchVisualizer.css";
import { Chip } from "@nextui-org/react";

const SearchingSVG = () => (
  <svg
    className="w-6 h-6 animate-spin text-warning-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const FoundSVG = () => (
  <svg
    className="w-6 h-6 text-success-500 animate-pulse"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const NotFoundSVG = () => (
  <svg
    className="w-6 h-6 text-danger-500 animate-pulse"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ArrayElement = memo(({ value, index, className }) => (
  <div className={className}>
    <span className="array-value">{value}</span>
    <span className="array-index">{index}</span>
  </div>
));

const SearchStatus = memo(
  ({
    currentStep,
    target,
    isFound,
    foundIndex,
    arrayLength,
    isPlaying,
    isPaused,
  }) => {
    const getStatusContent = () => {
      if (isFound) {
        return (
          <div
            className="flex items-center gap-2 min-w-fit bg-success-100/50 text-success-700 px-4 py-2 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <div className="flex-shrink-0">
              <FoundSVG />
            </div>
            <span className="font-bold whitespace-nowrap">
              Target {target} found at index {foundIndex}!
            </span>
          </div>
        );
      }

      if (currentStep >= arrayLength) {
        return (
          <div
            className="flex items-center gap-2 min-w-fit bg-danger-100/50 text-danger-700 px-4 py-2 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <div className="flex-shrink-0">
              <NotFoundSVG />
            </div>
            <span className="font-bold whitespace-nowrap">
              Target {target} not found in array
            </span>
          </div>
        );
      }

      if (isPlaying || isPaused) {
        return (
          <div
            className="flex items-center gap-2 min-w-fit bg-warning-100/50 text-warning-700 px-4 py-2 rounded-lg"
            role="status"
            aria-live="polite"
          >
            <div className="flex-shrink-0">{!isPaused && <SearchingSVG />}</div>
            <span className="font-bold whitespace-nowrap">
              {isPaused
                ? "Search paused"
                : `Searching for ${target}... Checked ${currentStep} elements`}
            </span>
          </div>
        );
      }

      return (
        <div
          className="flex items-center gap-2 min-w-fit bg-content2 px-4 py-2 rounded-lg"
          role="status"
        >
          <span className="font-bold whitespace-nowrap">
            Ready to search for target {target}
          </span>
        </div>
      );
    };

    return (
      <div className="flex items-center justify-between gap-4 bg-content1/50 backdrop-blur-sm p-4 rounded-xl w-fit max-w-4xl">
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="bg-content2/80 px-4 py-2 rounded-lg whitespace-nowrap">
            <span className="font-semibold">Steps: </span>
            <span className="text-primary-500">{currentStep}</span>
          </div>
          <div className="bg-content2/80 px-4 py-2 rounded-lg whitespace-nowrap">
            <span className="font-semibold">Target: </span>
            <span className="text-primary-500">{target}</span>
          </div>
        </div>
        {getStatusContent()}
      </div>
    );
  }
);

function LinearSearchVisualizer() {
  const {
    array,
    searchTarget,
    currentStep,
    isPlaying,
    isPaused,
    visitedIndices,
    currentIndex,
    foundIndex,
    searchComplete,
  } = useSelector((state) => state.linearSearchVisualizer);

  // Ensure visitedIndices is always an array before converting to Set
  const visitedSet = useMemo(() => {
    const indices = Array.isArray(visitedIndices) ? visitedIndices : [];
    return new Set(indices);
  }, [visitedIndices]);

  const getElementClass = (index) => {
    const classes = ["array-box"];

    // Element has been found
    if (foundIndex !== null && index === foundIndex) {
      classes.push("found");
      return classes.join(" ");
    }

    // Element is currently being searched
    if (index === currentIndex && (isPlaying || isPaused)) {
      classes.push("searching");
      return classes.join(" ");
    }

    // Element has been visited - ensure we check if visitedSet exists
    if (visitedSet && visitedSet.has(index)) {
      classes.push("visited");
      return classes.join(" ");
    }

    return classes.join(" ");
  };

  return (
    <div className="linear-search-container">
      <div className="array-container  max-h-[600px] overflow-y-auto">
        {array.map((value, index) => (
          <ArrayElement
            key={index}
            value={value}
            index={index}
            className={getElementClass(index)}
          />
        ))}
      </div>

      <SearchStatus
        currentStep={currentStep}
        target={searchTarget}
        isFound={foundIndex !== null}
        foundIndex={foundIndex}
        arrayLength={array.length}
        isPlaying={isPlaying}
        isPaused={isPaused}
        isSearching={isPlaying || isPaused}
      />

      <div className="flex gap-4 justify-center items-center mt-4">
        <Chip color="secondary" variant="flat">
          Not Visited
        </Chip>
        <Chip color="primary" variant="flat">
          Visited
        </Chip>
        <Chip color="success" variant="flat">
          Found
        </Chip>
        <Chip color="warning" variant="flat">
          Currently Searching
        </Chip>
      </div>
    </div>
  );
}

export default LinearSearchVisualizer;
