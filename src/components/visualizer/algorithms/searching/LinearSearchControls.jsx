import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Slider } from "@nextui-org/react";
import { Play, Pause, RotateCcw } from "lucide-react";
import {
  setArray,
  setSearchTarget,
  setCurrentStep,
  setIsPlaying,
  setPaused,
  resumeSearch,
  reset,
  setAnimationSpeed,
  generateNewArray,
  setArraySize,
} from "../../../../features/visualizer/algorithms/searching/linearSearchVisualizerSlice";

/*
 * Hark! O noble debugger, witness our search's progress,
 * As we track each step with utmost finesse.
 * Through console logs our journey we shall trace,
 * Like actors on a stage, each in their rightful place.
 *
 * Act I: The Controls
 * Where buttons fair do guide our merry way,
 * Through pause and play, as night follows day.
 */
const DEBUG = false;
const debugLog = (...args) => {
  if (DEBUG) {
    console.log("[LinearSearch Debug]:", ...args);
  }
};

const ControlButtons = memo(
  ({
    isPlaying,
    isPaused,
    onStart,
    onPause,
    onResume,
    onReset,
    onGenerateNew,
  }) => (
    <div className="flex items-center justify-center gap-2">
      {!isPlaying && !isPaused ? (
        <Button
          color="primary"
          onClick={onStart}
          startContent={<Play size={18} />}
        >
          Start Search
        </Button>
      ) : isPaused ? (
        <Button
          color="success"
          onClick={onResume}
          startContent={<Play size={18} />}
        >
          Resume
        </Button>
      ) : (
        <Button
          color="warning"
          onClick={onPause}
          startContent={<Pause size={18} />}
        >
          Pause
        </Button>
      )}

      <Button
        color="default"
        onClick={onReset}
        startContent={<RotateCcw size={18} />}
      >
        Reset
      </Button>

      <Button
        color="secondary"
        isDisabled={isPlaying || isPaused}
        onClick={onGenerateNew}
      >
        Randomize
      </Button>
    </div>
  )
);

/*
 * Act II: The Animation
 * Where time doth flow like gentle stream,
 * Each step a moment, each pause a dream.
 */
function LinearSearchControls() {
  const dispatch = useDispatch();
  const {
    isPlaying,
    isPaused,
    array,
    currentStep,
    searchSteps,
    searchTarget,
    animationSpeed,
    arraySize,
    visitedIndices,
    currentIndex,
    searchComplete,
  } = useSelector((state) => state.linearSearchVisualizer);

  const [animationTimeout, setAnimationTimeout] = useState(null);

  useEffect(() => {
    debugLog("Animation state changed:", {
      isPlaying,
      isPaused,
      currentStep,
      visitedIndices: Array.from(visitedIndices),
      currentIndex,
      searchComplete,
    });
    return () => {
      if (animationTimeout) {
        debugLog("Cleaning up animation timeout");
        clearTimeout(animationTimeout);
        setAnimationTimeout(null);
      }
    };
  }, [
    animationTimeout,
    isPlaying,
    isPaused,
    currentStep,
    visitedIndices,
    currentIndex,
    searchComplete,
  ]);

  const animate = useCallback(
    (step) => {
      debugLog("Animate called:", {
        step,
        isPlaying,
        isPaused,
        searchComplete,
        currentIndex,
      });

      // Don't continue if paused or search is complete
      if (isPaused || searchComplete) {
        debugLog("Animation stopped:", { isPaused, searchComplete });
        return;
      }

      if (step >= searchSteps.length) {
        debugLog("Animation complete");
        dispatch(setIsPlaying(false));
        return;
      }

      dispatch(setCurrentStep(step));
      debugLog("Setting current step:", step);

      // Base delay is now directly proportional to speed
      const baseDelay = 1000;
      const speedFactor = animationSpeed;
      const timeout = setTimeout(() => {
        if (!isPaused && !searchComplete) {
          animate(step + 1);
        }
      }, baseDelay / speedFactor);

      setAnimationTimeout(timeout);
    },
    [
      dispatch,
      searchSteps.length,
      animationSpeed,
      isPaused,
      isPlaying,
      searchComplete,
    ]
  );

  useEffect(() => {
    if (isPlaying && !isPaused && !searchComplete) {
      debugLog("Starting/Resuming animation from step:", currentStep);
      animate(currentStep);
    }
    return () => {
      if (animationTimeout) {
        debugLog("Cleaning up animation on effect change");
        clearTimeout(animationTimeout);
        setAnimationTimeout(null);
      }
    };
  }, [
    isPlaying,
    isPaused,
    animationSpeed,
    animate,
    currentStep,
    searchComplete,
  ]);

  /*
   * Act III: The Handlers
   * Each function a player in our grand design,
   * Their roles entwined, their purpose divine.
   */
  const handleStartSearch = useCallback(() => {
    if (!searchTarget && searchTarget !== 0) return;
    debugLog("Starting search for target:", searchTarget);
    dispatch(reset());
    dispatch(setIsPlaying(true));
  }, [dispatch, searchTarget]);

  const handlePauseSearch = useCallback(() => {
    debugLog("Pause search requested");
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      setAnimationTimeout(null);
    }
    dispatch(setPaused(true));
  }, [dispatch, animationTimeout]);

  const handleResumeSearch = useCallback(() => {
    debugLog("Resume search requested");
    dispatch(resumeSearch());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    debugLog("Reset requested");
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      setAnimationTimeout(null);
    }
    dispatch(reset());
  }, [dispatch, animationTimeout]);

  const handleTargetChange = useCallback(
    (e) => {
      const value = e.target.value;
      if (value === "" || /^\d+$/.test(value)) {
        debugLog("Search target changed to:", value);
        dispatch(setSearchTarget(parseInt(value)));
      }
    },
    [dispatch]
  );

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <ControlButtons
        isPlaying={isPlaying}
        isPaused={isPaused}
        onStart={handleStartSearch}
        onPause={handlePauseSearch}
        onResume={handleResumeSearch}
        onReset={handleReset}
        onGenerateNew={() => dispatch(generateNewArray())}
      />
      <div className="flex items-center justify-center gap-4">
        <Input
          type="number"
          label="Search Target"
          value={searchTarget}
          onChange={handleTargetChange}
          className="w-[150px]"
          size="md"
          isDisabled={isPlaying || isPaused}
        />

        <Input
          type="number"
          label="Array Length"
          minValue={5}
          maxValue={100}
          value={arraySize}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            // if (value >= 5 && value <= 100) {
            debugLog("Array size changed to:", value);
            dispatch(setArraySize(value));
            // }
          }}
          className="w-[150px]"
          size="md"
          isDisabled={isPlaying || isPaused}
        />

        <Slider
          value={animationSpeed}
          onChange={(value) => {
            debugLog("Animation speed changed to:", value);
            dispatch(setAnimationSpeed(value));
          }}
          minValue={1}
          maxValue={10}
          step={1}
          className="w-48"
          size="md"
          aria-label="Search Speed"
          label="Search Speed"
          description="Higher = Faster"
          isDisabled={isPlaying && !isPaused}
        />
      </div>
    </div>
  );
}

export default memo(LinearSearchControls);
