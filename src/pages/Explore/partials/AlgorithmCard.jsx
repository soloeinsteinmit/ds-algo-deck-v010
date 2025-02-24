import { Button, Slider } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import NoteCard from "./Notescard";

const AlgorithmCard = ({
  arr = [64, 34, 25, 12, 22, 11, 90, 80, 71, 73, 17, 56],
}) => {
  const [array, setArray] = useState(arr);
  const [sortedIndexes, setSortedIndexes] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sortingRef = useRef(false);
  const [isArraySorted, setIsArraySorted] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const animationTimeoutRef = useRef(null);
  const currentProgressRef = useRef({ i: 0, j: 0 });

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const sleep = (ms) =>
    new Promise((resolve) => {
      animationTimeoutRef.current = setTimeout(resolve, ms);
    });

  const bubbleSort = async () => {
    if (isArraySorted) {
      resetArray();
      return;
    }

    if (isPaused) {
      setIsPaused(false);
      sortingRef.current = true;
      return;
    }

    if (!isSorting) {
      setIsSorting(true);
      sortingRef.current = true;
      setIsArraySorted(false);
    }

    let arr = [...array];
    let n = arr.length;

    for (
      let i = currentProgressRef.current.i;
      i < n - 1 && sortingRef.current;
      i++
    ) {
      for (
        let j =
          i === currentProgressRef.current.i ? currentProgressRef.current.j : 0;
        j < n - i - 1 && sortingRef.current;
        j++
      ) {
        currentProgressRef.current = { i, j };
        setComparing([j, j + 1]);
        await sleep((1 - speed) * 1000); // Invert speed for more intuitive control

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
      if (sortingRef.current) {
        setSortedIndexes((prev) => [...prev, n - 1 - i]);
      }
    }

    if (sortingRef.current) {
      setSortedIndexes([...Array(n).keys()]);
      setIsArraySorted(true);
    }

    setComparing([]);
    setIsSorting(false);
  };

  const resetArray = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    sortingRef.current = false;
    setArray(arr);
    setSortedIndexes([]);
    setComparing([]);
    setIsSorting(false);
    setIsArraySorted(false);
    currentProgressRef.current = { i: 0, j: 0 };
  };

  const randomizeArray = () => {
    let randomArray = [];
    for (let i = 0; i < 12; i++) {
      randomArray.push(Math.floor(Math.random() * 100 + 1));
    }
    resetArray(); // Use resetArray to ensure proper state cleanup
    setArray(randomArray);
  };

  const stopSorting = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    sortingRef.current = false;
    setIsSorting(false);
    setIsPaused(false);
    setComparing([]);
  };

  const pauseSorting = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    sortingRef.current = false;
    setIsPaused(true);
  };

  const getBarHeight = (value) => {
    // Scale value to be between 5 and 96 (tailwind's h-5 to h-96)
    const scaledHeight = Math.floor((value / Math.max(...array)) * 96);
    return Math.max(5, Math.min(scaledHeight, 96)); // Ensure minimum height of 5
  };

  return (
    <div className="relative rounded-lg bg-content2 p-2 w-[80%]">
      <div className="relative flex text-center">
        <div className="flex pl-3.5 pt-3">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.5 mr-1.5 h-3 w-3 text-danger-500/30"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-warning-500/30"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-success-500/30"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
        </div>
        <span className="absolute inset-x-0 top-2 text-base text-default-600">
          bubbleSort.js
        </span>
      </div>

      <div className="mt-10 flex space-x-5  px-5 pb-10 ">
        <div className="mb-6 w-[60%]">
          <p className="font-mono text-xl font-normal tracking-wide text-secondary">
            <span className="text-default">{"// "}</span>
            <span className="text-primary">Bubble Sort Visualization</span>
          </p>

          <div className="mt-4 flex justify-center gap-2 w-[100%] h-[500px] ">
            {array.map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ease-in-out flex w-20 items-end justify-center rounded
                  ${
                    sortedIndexes.includes(index)
                      ? "bg-success"
                      : comparing.includes(index)
                      ? "bg-warning"
                      : "bg-secondary"
                  }`}
                style={{ height: `${getBarHeight(value)}%` }}
              >
                <span className="mb-1 text-xs text-center text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              onClick={bubbleSort}
              className=""
              color="primary"
              // isDisabled={isSorting && !isPaused}
            >
              {isPaused ? "Resume" : "Sort Array"}
            </Button>

            {/* <Button
              onClick={bubbleSort}
              className=""
              color="primary"
              isDisabled={isSorting && !isPaused}
            >
              Sort Array
            </Button> */}

            <Button
              onClick={pauseSorting}
              className=""
              color="warning"
              isDisabled={!isSorting || isPaused}
            >
              Pause
            </Button>
            <Button
              onClick={stopSorting}
              className=""
              color="danger"
              isDisabled={!isSorting && !isPaused}
            >
              Stop
            </Button>
            <Button onClick={resetArray} isDisabled={isSorting}>
              Reset
            </Button>
            <Button
              onClick={randomizeArray}
              isDisabled={isSorting}
              color="secondary"
            >
              Randomize
            </Button>
            {/* // TODO: WORK ON THE SPEED SLIDER IT IS OPPPOSITE OF WHAT IT SHOULD
            BE */}
            <Slider
              label="Speed"
              size="sm"
              step={0.01}
              maxValue={1}
              minValue={0}
              defaultValue={0.4}
              value={speed}
              onChange={(value) => setSpeed(value)}
              className="max-w-xs"
              isDisabled={isSorting}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-xl">
            <p className="font-mono font-normal tracking-wide text-secondary">
              <span className="text-default-600">{"function "}</span>
              <span className="text-primary">bubbleSort</span>
              <span className="text-default-600">{"(arr) {"}</span>
            </p>
            <p className="ml-4 font-mono font-normal tracking-wide text-secondary">
              <span className="text-primary">{"let n = arr.length;"}</span>
            </p>
            <p className="ml-4 font-mono font-normal tracking-wide text-secondary">
              <span className="text-danger-400">{"for"}</span>
              <span className="text-default-600">
                {" (let i = 0; i < n - 1; i++) {"}
              </span>
            </p>
            <p className="ml-8 font-mono font-normal tracking-wide text-secondary">
              <span className="text-danger-400">{"for"}</span>
              <span className="text-default-600">
                {" (let j = 0; j < n - i - 1; j++) {"}
              </span>
            </p>
            <p className="ml-12 font-mono font-normal tracking-wide text-secondary">
              <span className="text-danger-400">{"if"}</span>
              <span className="text-default-600">
                {" (arr[j] > arr[j + 1]) {"}
              </span>
            </p>
            <p className="ml-16 font-mono font-normal tracking-wide text-primary">
              {"let temp = arr[j];"}
            </p>
            <p className="ml-16 font-mono font-normal tracking-wide text-primary">
              {"arr[j] = arr[j + 1];"}
            </p>
            <p className="ml-16 font-mono font-normal tracking-wide text-primary">
              {"arr[j + 1] = temp;"}
            </p>
            <p className="ml-12 font-mono font-normal tracking-wide text-default-600">
              {"}"}
            </p>
            <p className="ml-8 font-mono font-normal tracking-wide text-default-600">
              {"}"}
            </p>
            <p className="ml-4 font-mono font-normal tracking-wide text-default-600">
              {"}"}
            </p>
            <p className="font-mono font-normal tracking-wide text-default-600">
              {"}"}
            </p>
          </div>
          <NoteCard
            notes={[
              "Bubble Sort is a simple comparison-based sorting algorithm.",
              "It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
              "The algorithm gets its name because smaller elements bubble to the top of the list.",
              "Bubble Sort has an average and worst-case time complexity of O(n^2), making it inefficient on large lists.",
              "It is a stable sorting algorithm, meaning it maintains the relative order of equal elements.",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard;
