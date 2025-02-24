import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { linearSearchPersistConfig } from "./linearSearchPersistConfig";
import { persistReducer } from "redux-persist";

// Enable Map and Set support in Immer
enableMapSet();

/\*

- Hark! Dear fellow programmer, gather 'round,
- For here lies the tale of searching most profound.
- In this sacred scroll of JavaScript divine,
- We track the elements that fall in line.
-
- Act I: The State
- Like players on a stage, each with their role to play,
- Our state doth hold the truth of search's way.
  \*/

const initialState = {
array: [],
searchTarget: 0,
searchSteps: [],
currentStep: 0,
isPlaying: false,
isPaused: false,
animationSpeed: 5,
arraySize: 20,
lastPlayedStep: 0,
pausedState: {
visitedIndices: [],
currentIndex: -1,
foundIndex: null,
isFound: false,
searching: false,
stepData: null, // Store complete step data for resume
},
};

/\*

- Act II: The Search Steps
- Each step a scene, each movement planned with care,
- As through the array we search with flair.
  \*/
  const generateSearchSteps = (array, target) => {
  const steps = [];
  const visited = [];

for (let i = 0; i < array.length; i++) {
visited.push(i);
const isFound = array[i] === target;

    steps.push({
      array: [...array],
      currentIndex: i,
      isFound,
      foundIndex: isFound ? i : null,
      visited: [...visited],
      foundIndices: isFound
        ? Array.from({ length: 10 }, (_, idx) => i - idx).filter(
            (idx) => idx >= 0
          )
        : [],
      searching: !isFound,
    });

    if (isFound) break;

}

if (steps.length === 0 || !steps[steps.length - 1].isFound) {
visited.push(array.length - 1);
steps.push({
array: [...array],
currentIndex: array.length,
isFound: false,
foundIndex: null,
visited: [...visited],
foundIndices: [],
searching: false,
});
}

return steps;
};

/\*

- Act III: The Slice
- Where actions and state in harmony combine,
- To guide our search through space and time.
  \*/
  export const linearSearchVisualizerSlice = createSlice({
  name: "linearSearchVisualizer",
  initialState,
  reducers: {
  setArray: (state, action) => {
  state.array = action.payload;
  state.searchSteps = generateSearchSteps(
  action.payload,
  state.searchTarget
  );
  state.currentStep = 0;
  state.lastPlayedStep = 0;
  state.isPlaying = false;
  state.isPaused = false;
  state.pausedState = {
  visitedIndices: [],
  currentIndex: -1,
  foundIndex: null,
  isFound: false,
  searching: false,
  stepData: null,
  };
  },
  setSearchTarget: (state, action) => {
  state.searchTarget = action.payload;
  state.searchSteps = generateSearchSteps(state.array, action.payload);
  state.currentStep = 0;
  state.lastPlayedStep = 0;
  state.isPlaying = false;
  state.isPaused = false;
  state.pausedState = {
  visitedIndices: [],
  currentIndex: -1,
  foundIndex: null,
  isFound: false,
  searching: false,
  stepData: null,
  };
  },
  setCurrentStep: (state, action) => {
  const step = action.payload;
  if (!state.isPaused) {
  state.currentStep = step;
  state.lastPlayedStep = step;

          // Update paused state with current step info
          const currentStepData = state.searchSteps[step];
          if (currentStepData) {
            state.pausedState = {
              visitedIndices: Array.isArray(currentStepData.visited)
                ? [...currentStepData.visited]
                : [],
              currentIndex: currentStepData.currentIndex,
              foundIndex: currentStepData.foundIndex,
              isFound: currentStepData.isFound,
              searching: currentStepData.searching,
              stepData: { ...currentStepData },
            };
          }
        }
      },
      setIsPlaying: (state, action) => {
        state.isPlaying = action.payload;
        if (action.payload) {
          state.isPaused = false;
        }
      },
      setPaused: (state, action) => {
        state.isPaused = action.payload;
        if (action.payload) {
          state.isPlaying = false;
          state.lastPlayedStep = state.currentStep;

          // Store comprehensive pause state
          const currentStepData = state.searchSteps[state.currentStep];
          if (currentStepData) {
            state.pausedState = {
              visitedIndices: Array.isArray(currentStepData.visited)
                ? [...currentStepData.visited]
                : [],
              currentIndex: currentStepData.currentIndex,
              foundIndex: currentStepData.foundIndex,
              isFound: currentStepData.isFound,
              searching: currentStepData.searching,
              stepData: { ...currentStepData },
            };
          }
        }
      },
      resumeSearch: (state) => {
        // Only resume if we have valid pause state
        if (state.pausedState.stepData) {
          state.isPlaying = true;
          state.isPaused = false;
          // Restore from the saved step data
          state.currentStep = state.lastPlayedStep;
        } else {
          // If no valid pause state, reset to beginning
          state.currentStep = 0;
          state.lastPlayedStep = 0;
          state.isPlaying = false;
          state.isPaused = false;
        }
      },
      setAnimationSpeed: (state, action) => {
        state.animationSpeed = action.payload;
      },
      stepForward: (state) => {
        if (!state.isPaused && state.currentStep < state.searchSteps.length - 1) {
          state.currentStep += 1;
          state.lastPlayedStep = state.currentStep;

          // Update paused state
          const currentStepData = state.searchSteps[state.currentStep];
          if (currentStepData) {
            state.pausedState = {
              visitedIndices: Array.isArray(currentStepData.visited)
                ? [...currentStepData.visited]
                : [],
              currentIndex: currentStepData.currentIndex,
              foundIndex: currentStepData.foundIndex,
              isFound: currentStepData.isFound,
              searching: currentStepData.searching,
              stepData: { ...currentStepData },
            };
          }
        } else if (state.isPlaying) {
          state.isPlaying = false;
          state.isPaused = false;
        }
      },
      stepBackward: (state) => {
        if (!state.isPaused && state.currentStep > 0) {
          state.currentStep -= 1;
          state.lastPlayedStep = state.currentStep;

          // Update paused state
          const currentStepData = state.searchSteps[state.currentStep];
          if (currentStepData) {
            state.pausedState = {
              visitedIndices: Array.isArray(currentStepData.visited)
                ? [...currentStepData.visited]
                : [],
              currentIndex: currentStepData.currentIndex,
              foundIndex: currentStepData.foundIndex,
              isFound: currentStepData.isFound,
              searching: currentStepData.searching,
              stepData: { ...currentStepData },
            };
          }
        }
      },
      reset: (state) => {
        state.currentStep = 0;
        state.lastPlayedStep = 0;
        state.isPlaying = false;
        state.isPaused = false;
        state.pausedState = {
          visitedIndices: [],
          currentIndex: -1,
          foundIndex: null,
          isFound: false,
          searching: false,
          stepData: null,
        };
      },
      setArraySize: (state, action) => {
        state.arraySize = action.payload;
      },
      generateNewArray: (state) => {
        const newArray = Array.from({ length: state.arraySize }, () =>
          Math.floor(Math.random() * 100)
        );
        state.array = newArray;
        state.searchSteps = generateSearchSteps(newArray, state.searchTarget);
        state.currentStep = 0;
        state.lastPlayedStep = 0;
        state.isPlaying = false;
        state.isPaused = false;
        state.pausedState = {
          visitedIndices: [],
          currentIndex: -1,
          foundIndex: null,
          isFound: false,
          searching: false,
          stepData: null,
        };
      },

  },
  });

const persistedLinearSearchReducer = persistReducer(
linearSearchPersistConfig,
linearSearchVisualizerSlice.reducer
);

export const {
setArray,
setSearchTarget,
setCurrentStep,
setIsPlaying,
setPaused,
resumeSearch,
setAnimationSpeed,
stepForward,
stepBackward,
reset,
setArraySize,
generateNewArray,
} = linearSearchVisualizerSlice.actions;

export default persistedLinearSearchReducer;

=======================================================================================================================================================
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

/\*

- Hark! O noble debugger, witness our search's progress,
- As we track each step with utmost finesse.
- Through console logs our journey we shall trace,
- Like actors on a stage, each in their rightful place.
-
- Act I: The Controls
- Where buttons fair do guide our merry way,
- Through pause and play, as night follows day.
  \*/
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
startContent={<Play size={18} />} >
Start Search
</Button>
) : isPaused ? (
<Button
color="success"
onClick={onResume}
startContent={<Play size={18} />} >
Resume
</Button>
) : (
<Button
color="warning"
onClick={onPause}
startContent={<Pause size={18} />} >
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

/\*

- Act II: The Animation
- Where time doth flow like gentle stream,
- Each step a moment, each pause a dream.
  \*/
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
  pausedState,
  } = useSelector((state) => state.linearSearchVisualizer);

const [animationTimeout, setAnimationTimeout] = useState(null);

// Clear any existing timeouts when component unmounts
useEffect(() => {
return () => {
if (animationTimeout) {
debugLog("Cleaning up animation timeout");
clearTimeout(animationTimeout);
}
};
}, [animationTimeout]);

const animate = useCallback(
(step) => {
debugLog("Animate called:", { step, isPlaying, isPaused });

      if (isPaused) {
        debugLog("Animation paused");
        return;
      }

      if (step >= searchSteps.length) {
        debugLog("Animation complete");
        dispatch(setIsPlaying(false));
        dispatch(setPaused(false));
        return;
      }

      dispatch(setCurrentStep(step));
      debugLog("Setting current step:", step);

      // Base delay is now inversely proportional to animation speed
      const baseDelay = 1000;
      const speedFactor = animationSpeed; // Higher speed = faster animation
      const timeout = setTimeout(() => {
        if (!isPaused) {
          animate(step + 1);
        }
      }, baseDelay / speedFactor);

      setAnimationTimeout(timeout);
    },
    [dispatch, searchSteps.length, animationSpeed, isPaused]

);

useEffect(() => {
if (isPlaying && !isPaused) {
debugLog("Starting/Resuming animation from step:", currentStep);
animate(currentStep);
}
return () => {
if (animationTimeout) {
debugLog("Cleaning up animation on effect change");
clearTimeout(animationTimeout);
}
};
}, [isPlaying, isPaused, animationSpeed, animate, currentStep]);

/\*

- Act III: The Handlers
- Each function a player in our grand design,
- Their roles entwined, their purpose divine.
  \*/
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
// Only resume if we have valid pause state
if (pausedState.stepData) {
dispatch(resumeSearch());
} else {
// If no valid pause state, start from beginning
handleStartSearch();
}
}, [dispatch, pausedState, handleStartSearch]);

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
            if (value >= 5 && value <= 100) {
              debugLog("Array size changed to:", value);
              dispatch(setArraySize(value));
            }
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
