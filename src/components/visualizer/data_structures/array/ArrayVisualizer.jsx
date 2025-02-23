/**
 * @fileoverview
 * Hark! Behold the grand theater of array visualization!
 * Here lies the stage where elements dance, shift, and transform
 * in a most elegant ballet of data structures.
 */

import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setArray,
  setAlertVisible,
} from "../../../../features/visualizer/arrays/arrayVisualizerSlice";
import "./ArrayVisualizer.css";
import ControlsAlert from "../../../playground/ControlsAlert";
import { useArrayKeyboardBindings } from "../../../../utils/data_structure/arrays/arrayKeyboardBindings";
import KeyboardBindingsCard from "./KeyboardBindingsCard";
import { Input } from "@nextui-org/react";

/**
 * @component ArrayVisualizer
 *
 * @description
 * Lo! Behold the grand stage where our array's tale unfolds,
 * now enhanced with the power of keyboard commands!
 */
const ArrayVisualizer = () => {
  const dispatch = useDispatch();
  const {
    array,
    index,
    isInserting,
    isUpdating,
    isDeleting,
    message,
    isError,
    alertVisible,
  } = useSelector((state) => state.arrayVisualizer);

  const [lastArrayIndex, setLastArrayIndex] = useState(array?.length);
  /**
   * Lo! When our array doth change, we must update our knowledge
   * of its boundaries, lest we attempt insertion beyond its realm.
   */
  useEffect(() => {
    setLastArrayIndex(array?.length);
  }, [array]);

  // Harken! Here we summon the power of keyboard bindings
  const { mode, tempValue, setTempValue, tempIndex, setTempIndex } =
    useArrayKeyboardBindings({ array, dispatch });

  /**
   * @function getElementClassName
   * @description
   * Like a master choreographer, this function determines
   * how each element shall move and appear on our stage.
   */
  const getElementClassName = useMemo(
    () => (idx) => {
      const classes = ["array-element-wrapper"];

      if (isInserting) {
        if (idx === index) {
          classes.push("inserting");
        } else if (idx >= index) {
          classes.push("shifting-right");
        }
      } else if (isDeleting) {
        if (idx === index) {
          classes.push("deleting");
        } else if (idx > index) {
          classes.push("shifting-left");
        }
      } else if (isUpdating && idx === index) {
        classes.push("updating");
      }

      return classes.join(" ");
    },
    [isInserting, isDeleting, isUpdating, index]
  );

  /**
   * @function getContainerClassName
   * @description
   * Sets the stage for our grand performance,
   * preparing the container for each type of animation.
   */
  const getContainerClassName = useMemo(
    () => () => {
      const classes = ["array-container"];
      if (isInserting) classes.push("is-inserting");
      if (isDeleting) classes.push("is-deleting");
      if (isUpdating) classes.push("is-updating");
      return classes.join(" ");
    },
    [isInserting, isDeleting, isUpdating]
  );

  return (
    <div className="relative h-full ">
      <div className=" transition-all array-visualizer max-w-4xl mx-auto p-8 flex flex-col items-center justify-center w-full">
        <div className="transition-all h-fit w-full flex items-center justify-center mb-4">
          {array.length === 0 ? (
            <div className="text-center text-foreground w-full">
              <h3 className="text-3xl">
                An empty array is like a blank canvas 🎨 - add some elements to
                get started and explore the different operations! 💻
              </h3>
            </div>
          ) : (
            <div className={getContainerClassName()}>
              {array.map((value, idx) => (
                <div
                  key={`${idx}-${value}-${isDeleting ? "deleting" : ""}`}
                  className={getElementClassName(idx)}
                >
                  <div className="array-element">
                    <span className="array-element__value text-xl text-white">
                      {value}
                    </span>
                  </div>
                  <div className="array-element__index text-xl text-foreground">
                    {idx}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-10">
          <ControlsAlert
            message={message}
            isError={isError}
            isVisible={alertVisible}
            onHide={() => dispatch(setAlertVisible(false))}
          />
        </div>
      </div>
      {/* Lo! The keyboard bindings scroll appears */}
      <KeyboardBindingsCard />
      {/* Harken! A modal for keyboard input appears when in a mode */}
      {mode && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg">
            <h3 className="text-xl mb-4">
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </h3>
            {(mode === "insert" || mode === "update") && (
              <Input
                type="number"
                label="Element"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="mb-2"
                autoFocus
              />
            )}
            {(mode === "insert" || mode === "update" || mode === "delete") && (
              <Input
                type="number"
                label="Index"
                value={tempIndex}
                min={0}
                max={lastArrayIndex}
                onChange={(e) => setTempIndex(e.target.value)}
                className="mb-4"
                autoFocus
              />
            )}
            {mode === "search" && (
              <Input
                type="number"
                label="Search Value"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="mb-4"
              />
            )}
            <div className="text-sm text-gray-500">
              Press Enter to confirm or Esc to cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArrayVisualizer;
