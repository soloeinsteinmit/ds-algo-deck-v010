import { useDispatch, useSelector } from "react-redux";
import { Button, Slider, Input, Tooltip } from "@nextui-org/react";
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
  setArraySize,
} from "../../../../features/visualizer/algorithms/sorting/bubbleSortVisualizerSlice";
import { useState } from "react";
import {
  CirclePause,
  CirclePlay,
  CircleStop,
  SkipBack,
  SkipForward,
} from "lucide-react";

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
    arraySize,
  } = useSelector((state) => state.bubbleSortVisualizer);
  // const [arraySize, setArraySize] = useState(array.length);

  return (
    <div className="p-4 space-y-4 flex items-center justify-center">
      <div className="flex gap-4 items-center">
        {!isPlaying && !isPaused && (
          <Button color="primary" onClick={() => dispatch(setIsPlaying(true))}>
            Start Sorting
          </Button>
        )}

        {isPlaying && !isPaused && (
          <Tooltip content="Pause" showArrow placement="bottom">
            <Button
              color="warning"
              onClick={() => dispatch(setPaused(true))}
              isIconOnly
            >
              {/* Pause */}
              <CirclePause />
            </Button>
          </Tooltip>
        )}

        {isPaused && (
          <Tooltip content="Resume" showArrow placement="bottom">
            <Button
              color="primary"
              onClick={() => dispatch(setPaused(false))}
              isIconOnly
            >
              {/* Resume */}
              <CirclePlay />
            </Button>
          </Tooltip>
        )}

        <Tooltip content="Stop" showArrow placement="bottom">
          <Button
            color="danger"
            onClick={() => dispatch(reset())}
            isDisabled={!isPlaying && !isPaused}
            isIconOnly
          >
            <CircleStop />
          </Button>
        </Tooltip>

        <Tooltip content="Step Back" showArrow placement="bottom">
          <Button
            color="default"
            onClick={() => dispatch(stepBackward())}
            isDisabled={isPlaying || currentStep === 0}
            isIconOnly
          >
            {/* Step Back */}
            <SkipBack />
          </Button>
        </Tooltip>

        <Tooltip content="Step Forward" showArrow placement="bottom">
          <Button
            color="default"
            onClick={() => dispatch(stepForward())}
            isDisabled={isPlaying || currentStep === sortingSteps.length - 1}
            isIconOnly
          >
            {/*   */}
            <SkipForward />
          </Button>
        </Tooltip>

        <Button
          color="secondary"
          onClick={() => dispatch(generateNewArray(arraySize))}
          isDisabled={isPlaying || isPaused}
          className="min-w-[100px]"
        >
          Randomize
        </Button>

        <Input
          type="number"
          label="Array Size"
          value={arraySize}
          onChange={(e) => dispatch(setArraySize(Number(e.target.value)))}
          min={2}
          max={200}
          className="max-w-[120px]"
          isDisabled={isPlaying || isPaused}
        />
        <div className="flex items-center gap-4">
          {/* <span className="text-sm">Animation Speed:</span> */}
          <Slider
            value={animationSpeed}
            onChange={(value) => dispatch(setAnimationSpeed(value))}
            minValue={5}
            maxValue={100}
            step={0.1}
            className="w-44"
            label="Sorting Speed"
            aria-label="Sorting Speed"
          />
        </div>
      </div>
    </div>
  );
};
