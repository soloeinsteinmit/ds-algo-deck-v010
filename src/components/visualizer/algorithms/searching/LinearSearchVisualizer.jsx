// LinearSearchVisualizer.js
import React, { memo } from "react";
import { useSelector } from "react-redux";
import "./LinearSearchVisualizer.css";
import { Chip } from "@nextui-org/react";

const ArrayElement = memo(({ value, index, className }) => (
  <div className={className}>
    <span className="array-value">{value}</span>
    <span className="array-index">{index}</span>
  </div>
));

const SearchStatus = memo(
  ({
    currentIndex,
    target,
    isFound,
    foundIndex,
    arrayLength,
    searchSteps,
    isSearching,
  }) => (
    <div className="flex items-center justify-center gap-4 text-xl">
      <p>Steps Taken: {searchSteps}</p>
      {/* <p className="text-lg">Current Index: {currentIndex}</p> */}
      <p>Searching for: {target}</p>
      <p>
        {isFound
          ? `Found at index ${foundIndex}!`
          : currentIndex >= arrayLength
          ? "Not found in array"
          : isSearching
          ? "Searching..."
          : "Not found in array"}
      </p>
    </div>
  )
);

function LinearSearchVisualizer() {
  const {
    array,
    searchTarget,
    currentIndex,
    isSearching,
    isFound,
    foundIndex,
    searchSteps,
  } = useSelector((state) => state.linearSearchVisualizer);

  const getElementClass = (index) => {
    const classes = ["array-box"];

    if (isSearching) {
      if (index === currentIndex) {
        classes.push("searching");
      } else if (index < currentIndex) {
        classes.push("visited");
      }
    }
    if (index < currentIndex && isFound) {
      classes.push("visited");
    }

    if (index === currentIndex && isSearching) {
      classes.push("searching");
    }

    if (isFound && index === foundIndex) {
      classes.push("found");
    }

    return classes.join(" ");
  };

  return (
    <div className="linear-search-container">
      <div className="array-container">
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
        currentIndex={currentIndex}
        target={searchTarget}
        isFound={isFound}
        foundIndex={foundIndex}
        arrayLength={array.length}
        searchSteps={searchSteps}
        isSearching={isSearching}
      />

      <div className="flex gap-4 justify-center items-center">
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
