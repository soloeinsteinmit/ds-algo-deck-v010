import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Slider } from "@nextui-org/react";
import { Play, Pause, RotateCcw, Plus } from "lucide-react";
import {
  setArray,
  setSearchTarget,
  setCurrentIndex,
  setIsSearching,
  setIsPaused,
  setIsFound,
  setFoundIndex,
  setResetSearch,
  setAnimationSpeed,
  setSearchSteps,
} from "../../../../features/visualizer/algorithms/searching/linearSearchVisualizerSlice";

const ControlButtons = memo(
  ({
    isSearching,
    isPaused,
    onStart,
    onPauseResume,
    onReset,
    onGenerateNew,
  }) => (
    <div className="flex items-center justify-center gap-2">
      {isSearching ? (
        <Button color="warning" size="md" onClick={onPauseResume} isIconOnly>
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </Button>
      ) : (
        <Button color="primary" size="md" onClick={onStart} isIconOnly>
          <Play size={18} />
        </Button>
      )}
      <Button color="default" size="md" onClick={onReset} isIconOnly>
        <RotateCcw size={18} />
      </Button>
      <Button
        color="secondary"
        isDisabled={isSearching}
        size="md"
        onClick={onGenerateNew}
        isIconOnly
      >
        <Plus size={18} />
      </Button>
    </div>
  )
);

function LinearSearchControls() {
  const dispatch = useDispatch();
  const {
    isSearching,
    isPaused,
    array,
    currentIndex,
    searchTarget,
    animationSpeed,
  } = useSelector((state) => state.linearSearchVisualizer);

  const [searchTimeout, setSearchTimeout] = useState(null);
  const [arrayLength, setArrayLength] = useState(array.length);

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const performSearch = async () => {
    for (let i = 0; i < array.length; i++) {
      if (isPaused) {
        return; // Exit if paused
      }
      dispatch(setIsSearching(true));
      dispatch(setCurrentIndex(i));

      dispatch(setSearchSteps(i + 1));

      // Found the target
      if (array[i] === searchTarget) {
        dispatch(setIsFound(true));
        dispatch(setFoundIndex(i));
        dispatch(setIsSearching(false));
        return;
      }

      // Wait for the animation speed
      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
    }

    // Target not found
    dispatch(setIsFound(false));
    dispatch(setFoundIndex(null));
    dispatch(setIsSearching(false));
  };

  const handleStartSearch = useCallback(() => {
    if (!searchTarget && searchTarget !== 0) return;

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    dispatch(setResetSearch(false));

    dispatch(setCurrentIndex(0));
    dispatch(setIsPaused(false));
    performSearch();
  }, [dispatch, searchTarget, searchTimeout, performSearch]);

  const handleReset = useCallback(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    dispatch(setResetSearch(true));
    dispatch(setSearchTarget(0));
    dispatch(setIsFound(false));
    dispatch(setIsSearching(false));
    dispatch(setFoundIndex(null));
    setSearchTimeout(null);
  }, [dispatch, searchTimeout]);

  const handlePauseResume = useCallback(() => {
    dispatch(setIsPaused(!isPaused));
    if (isPaused) {
      performSearch();
    }
  }, [dispatch, isPaused, performSearch]);

  const generateNewArray = useCallback(() => {
    const newArray = Array.from({ length: arrayLength }, () =>
      Math.floor(Math.random() * 100)
    );
    dispatch(setArray(newArray));
    dispatch(setIsFound(false));
    dispatch(setFoundIndex(null));
    dispatch(setIsSearching(false));

    handleReset();
  }, [dispatch, handleReset, arrayLength]);

  const handleTargetChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === "" || /^\d+$/.test(value)) {
        dispatch(setSearchTarget(parseInt(value)));
      }
    },
    [dispatch]
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4">
        <Input
          type="number"
          label="Search Target"
          value={searchTarget}
          onChange={handleTargetChange}
          className="w-48"
          size="md"
          isDisabled={isSearching}
        />
        <ControlButtons
          isSearching={isSearching}
          isPaused={isPaused}
          onStart={handleStartSearch}
          onPauseResume={handlePauseResume}
          onReset={handleReset}
          onGenerateNew={generateNewArray}
        />

        <Input
          type="number"
          label="Array Length"
          minValue={5}
          maxValue={100}
          value={arrayLength}
          onChange={(e) => setArrayLength(e.target.value)}
          className="w-48"
          size="md"
          isDisabled={isSearching}
        />

        <Slider
          value={animationSpeed}
          onChange={(value) => dispatch(setAnimationSpeed(value))}
          minValue={100}
          maxValue={2000}
          step={100}
          className="w-48"
          size="md"
          aria-label="Search Speed"
          isDisabled={isSearching}
        />
      </div>
    </div>
  );
}

export default memo(LinearSearchControls);
