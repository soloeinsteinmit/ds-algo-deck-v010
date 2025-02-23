/**
 * @fileoverview
 * Hark! Behold the sacred operations that shall transform our array!
 * Here lie the functions most noble, each with its own purpose divine.
 */

import {
  setArray,
  setIndex,
  setMessage,
  setIsInserting,
  setIsDeleting,
  setIsUpdating,
  setIsError,
  setAlertVisible,
  setIsOperationInProgress,
  setElement,
} from "../../../features/visualizer/arrays/arrayVisualizerSlice";

/**
 * @function handleInsert
 * @description
 * Lo! This noble function doth orchestrate the insertion of elements
 * into our array, like a playwright adding new characters to the stage.
 *
 * Act I: The Validation
 * - Verify the numbers be true and the bounds be proper
 *
 * Act II: The State Management
 * - Update Redux for the grand visualization
 * - Clear local state for future performances
 *
 * Act III: The Animation
 * - Let the element make its entrance
 * - Other elements shift to make way
 *
 * @param {Object} params - The sacred parameters for our performance
 * @param {Array} params.array - The array to which we shall add
 * @param {number} params.insertIndex - The position where our new player shall enter
 * @param {number} params.insertElement - The value that shall join our array
 * @param {function} params.dispatch - Our messenger to the Redux realm
 * @param {function} params.setInsertIndex - Function to clear the index input
 * @param {function} params.setInsertElement - Function to clear the element input
 */
export const handleInsert = ({
  array,
  insertIndex,
  insertElement,
  dispatch,
  setInsertIndex,
  setInsertElement,
}) => {
  // Validate our inputs be proper numbers
  if (isNaN(insertElement) || isNaN(insertIndex)) {
    dispatch(
      setMessage(
        "Input Error: Both element and index must be valid numbers. For example, to insert 5 at position 2, enter: Element = 5, Index = 2"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  // Ensure the index lies within our array's bounds
  if (insertIndex < 0 || insertIndex > array.length) {
    dispatch(
      setMessage(
        `Array Bounds Error: Index ${insertIndex} is invalid. Valid indices for insertion are between 0 and ${array.length}. Remember: You can insert at position ${array.length} to add at the end.`
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  // Update Redux state for visualization
  dispatch(setIndex(insertIndex));
  dispatch(setElement(insertElement));
  dispatch(setIsInserting(true));
  dispatch(setIsOperationInProgress(true));

  // Create our new array with the inserted element
  const newArray = [...array];
  newArray.splice(insertIndex, 0, insertElement);
  dispatch(setArray(newArray));

  // Clear local state after successful insertion
  setInsertIndex("");
  setInsertElement("");

  // After the animation completes, reset our state
  setTimeout(() => {
    dispatch(setIsInserting(false));
    dispatch(setIsOperationInProgress(false));
    dispatch(
      setMessage(
        `Success🎉! Inserted ${insertElement} at index ${insertIndex}. The array shifted right to make space for the new element.`
      )
    );
    dispatch(setIsError(false));
    dispatch(setAlertVisible(true));
  }, 500);
};

/**
 * @function handleDelete
 * @description
 * Lo! This noble function doth orchestrate the removal of elements
 * from our array, like a director removing actors from the stage.
 *
 * Act I: The Validation
 * - Verify the index be proper and within bounds
 *
 * Act II: The State Management
 * - Update Redux for the grand visualization
 * - Clear local state for future performances
 *
 * Act III: The Animation
 * - Let the element make its exit
 * - Other elements shift to fill the void
 *
 * @param {Object} params - The sacred parameters for our performance
 * @param {Array} params.array - The array from whence we shall remove
 * @param {number} params.deleteIndex - The position of our departing element
 * @param {function} params.dispatch - Our messenger to the Redux realm
 * @param {function} params.setDeleteIndex - Function to clear the index input
 */
export const handleDelete = ({
  array,
  deleteIndex,
  dispatch,
  setDeleteIndex,
}) => {
  console.log("handleDelete called with:", {
    array,
    deleteIndex,
    dispatch,
    setDeleteIndex,
  });
  if (isNaN(deleteIndex)) {
    console.log("hererer");
    dispatch(
      setMessage(
        "Input Error: Please enter a valid index to delete an element. For example, to delete the 5th element, enter: Delete Index = 4"
      )
    );
    dispatch(setIsOperationInProgress(false));
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }
  if (array.length === 0) {
    dispatch(
      setMessage(
        "Empty Array: Cannot delete from an empty array. Try inserting some elements first!"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  if (deleteIndex < 0 || deleteIndex >= array.length) {
    dispatch(
      setMessage(
        `Array Bounds Error: Index ${deleteIndex} is invalid. Valid indices for deletion are between 0 and ${
          array.length - 1
        }. Remember: Array indices start at 0.`
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  const elementToDelete = array[deleteIndex];

  console.log(" after after afere handleDelete called with:", {
    array,
    deleteIndex,
    dispatch,
    setDeleteIndex,
  });

  // Update Redux for visualization
  dispatch(setIndex(deleteIndex));
  dispatch(setIsDeleting(true));
  dispatch(setIsOperationInProgress(true));

  // Clear local state
  setDeleteIndex("");

  setTimeout(() => {
    const newArray = [...array];
    newArray.splice(deleteIndex, 1);
    dispatch(setIsDeleting(false));
    dispatch(setArray(newArray));

    setTimeout(() => {
      dispatch(setIsOperationInProgress(false));
      dispatch(
        setMessage(
          `Success🎉! Deleted element ${elementToDelete} from index ${deleteIndex}. The array shifted left to fill the gap.`
        )
      );
      dispatch(setIsError(false));
      dispatch(setAlertVisible(true));
    }, 300);
  }, 400);
};

/**
 * @function handleUpdate
 * @description
 * Lo! This noble function doth transform elements in our array,
 * like a magician changing one prop to another upon the stage.
 *
 * Act I: The Validation
 * - Verify our numbers be true and bounds be proper
 *
 * Act II: The State Management
 * - Update Redux for the grand visualization
 * - Clear local state for future performances
 *
 * Act III: The Animation
 * - Let the element transform before the audience's eyes
 *
 * @param {Object} params - The sacred parameters for our performance
 * @param {Array} params.array - The array we shall transform
 * @param {number} params.updateIndex - The position of our transforming element
 * @param {number} params.updateElement - The new value it shall become
 * @param {function} params.dispatch - Our messenger to the Redux realm
 * @param {function} params.setUpdateIndex - Function to clear the index input
 * @param {function} params.setUpdateElement - Function to clear the element input
 */
export const handleUpdate = ({
  array,
  updateIndex,
  updateElement,
  dispatch,
  setUpdateIndex,
  setUpdateElement,
}) => {
  if (isNaN(updateElement) || isNaN(updateIndex)) {
    dispatch(
      setMessage(
        "Input Error: Both element and index must be valid numbers. For example, to update position 2 to value 5, enter: Element = 5, Index = 2"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  if (updateIndex < 0 || updateIndex >= array.length) {
    dispatch(
      setMessage(
        `Array Bounds Error: Index ${updateIndex} is invalid. Valid indices for updating are between 0 and ${
          array.length - 1
        }. Remember: You can only update existing elements.`
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  const oldElement = array[updateIndex];

  // Update Redux for visualization
  dispatch(setIndex(updateIndex));
  dispatch(setElement(updateElement));
  dispatch(setIsUpdating(true));
  dispatch(setIsOperationInProgress(true));

  // Update array and clear local state
  const newArray = [...array];
  newArray[updateIndex] = updateElement;
  dispatch(setArray(newArray));

  // Clear local state
  setUpdateIndex("");
  setUpdateElement("");

  setTimeout(() => {
    dispatch(setIsUpdating(false));
    dispatch(setIsOperationInProgress(false));
    dispatch(
      setMessage(
        `Success🎉! Updated index ${updateIndex} from ${oldElement} to ${updateElement}. Notice that other elements remained in their positions.`
      )
    );
    dispatch(setIsError(false));
    dispatch(setAlertVisible(true));
  }, 500);
};

/**
 * @function handleSearch
 * @description
 * Lo! This noble function doth seek out elements in our array,
 * like a scholar searching through ancient tomes.
 *
 * @param {Object} params - The sacred parameters for our quest
 * @param {Array} params.array - The array in which we shall search
 * @param {string} params.searchValue - The value we seek
 * @param {function} params.dispatch - Our messenger to the Redux realm
 */
export const handleSearch = ({ array, searchValue, dispatch }) => {
  if (isNaN(searchValue) || searchValue === "") {
    dispatch(
      setMessage(
        "Input Error: Search value must be a number. For example, to search for 5, enter: Search = 5"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }
  if (array.length === 0) {
    dispatch(
      setMessage(
        "Empty Array: There are no elements to search. Try adding some elements first!"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  if (isNaN(searchValue)) {
    dispatch(
      setMessage(
        "Input Error: Search value must be a number. For example, to search for 5, enter: Search = 5"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  const foundIndices = [];
  array.forEach((element, index) => {
    if (element === parseInt(searchValue)) {
      foundIndices.push(index);
    }
  });

  if (foundIndices.length === 0) {
    dispatch(
      setMessage(
        `Element Not Found: ${searchValue} is not in the array. Try searching for a value that exists in the array.`
      )
    );
    dispatch(setIsError(true));
  } else {
    dispatch(
      setMessage(
        `Success🔍! Found ${searchValue} at ${
          foundIndices.length === 1
            ? `index ${foundIndices[0]}`
            : `indices ${foundIndices.join(", ")}`
        }. Linear search completed in ${array.length} steps.`
      )
    );
    dispatch(setIsError(false));
  }
  dispatch(setAlertVisible(true));
};

/**
 * @function handleClear
 * @description
 * Lo! This noble function doth reset our array to its pristine state,
 * like a stage hand clearing the stage between acts.
 */
export const handleClear = (array, dispatch) => {
  if (array.length === 0) {
    dispatch(
      setMessage(
        "Array Already Empty: The array has no elements to clear. Try adding some elements first!"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  dispatch(setArray([]));
  dispatch(
    setMessage(
      "Success🧹! Array cleared. All elements have been removed. Start fresh by adding new elements!"
    )
  );
  dispatch(setIsError(false));
  dispatch(setAlertVisible(true));
};

/**
 * @function handleShuffle
 * @description
 * Lo! This noble function doth mix the elements of our array,
 * like a dealer shuffling cards before a grand game.
 */
export const handleShuffle = (array, dispatch) => {
  if (array.length <= 1) {
    dispatch(
      setMessage(
        "Cannot Shuffle: Array needs at least 2 elements to shuffle. Try adding more elements!"
      )
    );
    dispatch(setIsError(true));
    dispatch(setAlertVisible(true));
    return;
  }

  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  dispatch(setArray(shuffledArray));
  dispatch(
    setMessage(
      "Success🎲! Array shuffled using the Fisher-Yates algorithm. Each element is now in a random position!"
    )
  );
  dispatch(setIsError(false));
  dispatch(setAlertVisible(true));
};

/**
 * @function randomizeArray
 * @description
 * Lo! This noble function doth create a new array filled with random values,
 * like a magician conjuring numbers from thin air.
 */
export const randomizeArray = (dispatch) => {
  const length = Math.floor(Math.random() * 6) + 5; // 5-10 elements
  const newArray = Array.from({ length }, () =>
    Math.floor(Math.random() * 100)
  );

  dispatch(setArray(newArray));
  dispatch(
    setMessage(
      `Success🎯! Created a new array with ${length} random numbers between 0 and 99. Try performing operations on these elements!`
    )
  );
  dispatch(setIsError(false));
  dispatch(setAlertVisible(true));
};
