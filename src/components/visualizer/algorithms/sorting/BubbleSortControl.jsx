import { useDispatch, useSelector } from "react-redux";
import { Button, Slider, Input } from "@nextui-org/react";
import {
  setArray,
  setCurrentStep,
  setIsPlaying,
  setAnimationSpeed,
  setPaused,
  reset,
  generateNewArray,
  stepForward,
  stepBackward,
} from "../../../../features/visualizer/algorithms/sorting/bubbleSortVisualizerSlice";
import { useState } from "react";

/**
 * A React component that renders a set of controls for the Bubble Sort visualizer.
 * This component takes a single prop, `onStart`, which is a function that starts
 * the animation when called.
 *
 * The component renders three buttons:
 * 1. "Start Sorting": Starts the animation when clicked, unless the animation
 *    is already running.
 * 2. "Randomize": Randomizes the array when clicked, unless the animation is
 *    already running.
 * 3. A slider to control the animation speed.
 *
 * The component also renders a text label for the animation speed slider.
 *
 * @param {function} onStart - A function that starts the animation when called.
 * @returns {JSX.Element} A React component that renders the controls.
 */
export const BubbleSortControls = () => {
  const dispatch = useDispatch();
  const {
    array,
    isPlaying,
    animationSpeed,
    isPaused,
    currentStep,
    sortingSteps,
  } = useSelector((state) => state.bubbleSortVisualizer);
  const [arraySize, setArraySize] = useState(array.length);

  return (
    <div className=" p-4 space-y-4">
      <div className="flex gap-4 items-center">
        {!isPlaying && !isPaused && (
          <Button color="primary" onClick={() => dispatch(setIsPlaying(true))}>
            Start Sorting
          </Button>
        )}

        {isPlaying && !isPaused && (
          <Button color="warning" onClick={() => dispatch(setPaused(true))}>
            Pause
          </Button>
        )}

        {isPaused && (
          <Button color="primary" onClick={() => dispatch(setPaused(false))}>
            Resume
          </Button>
        )}

        <Button
          color="danger"
          onClick={() => dispatch(reset())}
          isDisabled={!isPlaying && !isPaused}
        >
          Stop
        </Button>

        <Button
          color="default"
          onClick={() => dispatch(stepBackward())}
          isDisabled={isPlaying || currentStep === 0}
        >
          Step Back
        </Button>

        <Button
          color="default"
          onClick={() => dispatch(stepForward())}
          isDisabled={isPlaying || currentStep === sortingSteps.length - 1}
        >
          Step Forward
        </Button>

        <Button
          color="secondary"
          onClick={() => dispatch(generateNewArray(arraySize))}
          isDisabled={isPlaying || isPaused}
        >
          Randomize
        </Button>

        <Input
          type="number"
          label="Array Size"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          min={2}
          max={100}
          className="w-32"
          isDisabled={isPlaying || isPaused}
        />
        <div className="flex items-center gap-4">
          <span className="text-sm">Animation Speed:</span>
          <Slider
            value={animationSpeed}
            onChange={(value) => dispatch(setAnimationSpeed(value))}
            minValue={5}
            maxValue={100}
            step={0.5}
            className="w-48"
            aria-label="Animation Speed"
          />
        </div>
      </div>
    </div>
  );
};
