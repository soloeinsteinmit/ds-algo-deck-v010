import { useState, useEffect } from 'react';
import {
  handleInsert,
  handleDelete,
  handleUpdate,
  handleSearch,
  handleClear,
  handleShuffle,
  randomizeArray,
} from './basic_array_operations';

/**
 * @fileoverview
 * Lo! Here lie the sacred keyboard bindings for our array operations,
 * like ancient runes that command our digital stage.
 */

/**
 * @constant KEYBOARD_SHORTCUTS
 * @description
 * Behold! The grand map of keyboard shortcuts,
 * each key a command to orchestrate our array's dance.
 */
export const KEYBOARD_SHORTCUTS = {
  INSERT: {
    key: "i",
    description: "Enter insert mode",
    combination: "i",
  },
  DELETE: {
    key: "d",
    description: "Enter delete mode",
    combination: "d",
  },
  UPDATE: {
    key: "u",
    description: "Enter update mode",
    combination: "u",
  },
  SEARCH: {
    key: "f",
    description: "Enter search mode",
    combination: "f",
  },
  CLEAR: {
    key: "c",
    description: "Clear array",
    combination: "Alt + C",
  },
  SHUFFLE: {
    key: "s",
    description: "Shuffle array",
    combination: "Alt + S",
  },
  RANDOMIZE: {
    key: "r",
    description: "Randomize array",
    combination: "Alt + R",
  },
  CONFIRM: {
    key: "Enter",
    description: "Confirm operation",
    combination: "Enter",
  },
  CANCEL: {
    key: "Escape",
    description: "Cancel operation",
    combination: "Esc",
  },
};

/**
 * @function useArrayKeyboardBindings
 * @description
 * Lo! A noble hook to manage our keyboard interactions,
 * like a conductor leading an orchestra with subtle gestures.
 * 
 * @param {Object} props - The properties passed to the hook
 * @param {Array} props.array - The current array state
 * @param {Function} props.dispatch - Redux dispatch function
 * @returns {Object} The current mode and temporary values for the operation
 */
export const useArrayKeyboardBindings = ({ array, dispatch }) => {
  const [mode, setMode] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [tempIndex, setTempIndex] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle mode switching
      if (!e.altKey && !mode) {
        switch (e.key.toLowerCase()) {
          case KEYBOARD_SHORTCUTS.INSERT.key:
            setMode("insert");
            break;
          case KEYBOARD_SHORTCUTS.DELETE.key:
            setMode("delete");
            break;
          case KEYBOARD_SHORTCUTS.UPDATE.key:
            setMode("update");
            break;
          case KEYBOARD_SHORTCUTS.SEARCH.key:
            setMode("search");
            break;
        }
      }

      // Handle direct operations
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case KEYBOARD_SHORTCUTS.CLEAR.key:
            handleClear(array, dispatch);
            break;
          case KEYBOARD_SHORTCUTS.SHUFFLE.key:
            handleShuffle(array, dispatch);
            break;
          case KEYBOARD_SHORTCUTS.RANDOMIZE.key:
            randomizeArray(dispatch);
            break;
        }
      }

      // Handle operation confirmation
      if (e.key === "Enter" && mode) {
        switch (mode) {
          case "insert":
            handleInsert({
              array,
              insertIndex: parseInt(tempIndex),
              insertElement: parseInt(tempValue),
              dispatch,
              setInsertIndex: setTempIndex,
              setInsertElement: setTempValue,
            });
            break;
          case "delete":
            handleDelete({
              array,
              deleteIndex: parseInt(tempIndex),
              dispatch,
              setDeleteIndex: setTempIndex,
            });
            break;
          case "update":
            handleUpdate({
              array,
              updateIndex: parseInt(tempIndex),
              updateElement: parseInt(tempValue),
              dispatch,
              setUpdateIndex: setTempIndex,
              setUpdateElement: setTempValue,
            });
            break;
          case "search":
            handleSearch({
              array,
              searchValue: tempValue,
              dispatch,
            });
            break;
        }
        setMode("");
        setTempValue("");
        setTempIndex("");
      }

      // Handle operation cancellation
      if (e.key === "Escape") {
        setMode("");
        setTempValue("");
        setTempIndex("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, tempValue, tempIndex, array, dispatch]);

  return { mode, tempValue, setTempValue, tempIndex, setTempIndex };
};
