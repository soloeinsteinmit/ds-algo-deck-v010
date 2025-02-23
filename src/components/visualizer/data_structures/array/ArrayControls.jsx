/**
 * @fileoverview
 * Hark! Behold the grand control panel for our array's orchestration!
 * Here lie the noble instruments through which students shall learn
 * the mystical arts of data structures and algorithms.
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import {
  handleInsert,
  handleDelete,
  handleUpdate,
  handleSearch,
  handleShuffle,
  handleClear,
  randomizeArray,
} from "../../../../utils/data_structure/arrays/basic_array_operations";
import { setArray } from "../../../../features/visualizer/arrays/arrayVisualizerSlice";

/**
 * @section Insert Controls
 * Lo! Here lie the noble controls for inserting elements into our array.
 * Each input doth manage its own state, yet still communes with Redux
 * for the grand spectacle of visualization.
 */
const InsertControls = ({ array, lastArrayIndex, dispatch }) => {
  const [insertElement, setInsertElement] = useState("");
  const [insertIndex, setInsertIndex] = useState("");

  return (
    <div className="flex flex-col gap-2 items-center max-w-xs w-full">
      <Input
        type="number"
        label="Element"
        placeholder="Element"
        value={insertElement?.toString() || ""}
        className="min-w-24"
        onChange={(e) => setInsertElement(parseInt(e.target.value))}
      />
      <Input
        type="number"
        label="Index"
        placeholder="Index"
        max={lastArrayIndex}
        min={0}
        value={insertIndex?.toString()}
        onChange={(e) => setInsertIndex(parseInt(e.target.value))}
        className="min-w-24"
      />
      <Button
        onClick={() =>
          handleInsert({
            array,
            insertIndex: parseInt(insertIndex),
            insertElement: parseInt(insertElement),
            dispatch,
            setInsertIndex,
            setInsertElement,
          })
        }
        color="success"
        className="w-full"
      >
        Insert
      </Button>
    </div>
  );
};

/**
 * @section Delete Controls
 * Lo! Here lie the noble controls for removing elements from our array.
 * Each input doth manage its own state, yet still communes with Redux
 * for the grand spectacle of visualization.
 */
const DeleteControls = ({ array, lastArrayIndex, dispatch }) => {
  const [deleteIndex, setDeleteIndex] = useState("");

  return (
    <div className="flex flex-col gap-2 items-center">
      <Input
        type="number"
        label="Index"
        placeholder="Index"
        max={lastArrayIndex - 1}
        min={0}
        value={deleteIndex?.toString()}
        onChange={(e) => setDeleteIndex(parseInt(e.target.value))}
        className="min-w-24"
        isDisabled={array.length === 0}
      />
      <Button
        onClick={() =>
          handleDelete({
            array,
            deleteIndex: parseInt(deleteIndex),
            dispatch,
            setDeleteIndex,
          })
        }
        color="danger"
        className="w-full"
        isDisabled={array.length === 0}
      >
        Delete
      </Button>
    </div>
  );
};

/**
 * @section Update Controls
 * Lo! Here lie the noble controls for transforming elements in our array.
 * Each input doth manage its own state, yet still communes with Redux
 * for the grand spectacle of visualization.
 */
const UpdateControls = ({ array, lastArrayIndex, dispatch }) => {
  const [updateIndex, setUpdateIndex] = useState("");
  const [updateElement, setUpdateElement] = useState("");

  return (
    <div className="flex flex-col gap-2 items-center">
      <Input
        type="number"
        label="Element"
        placeholder="Element"
        value={updateElement?.toString() || ""}
        className="min-w-24"
        onChange={(e) => setUpdateElement(parseInt(e.target.value))}
        isDisabled={array.length === 0}
      />
      <Input
        type="number"
        label="Index"
        placeholder="Index"
        max={lastArrayIndex - 1}
        min={0}
        value={updateIndex?.toString()}
        onChange={(e) => setUpdateIndex(parseInt(e.target.value))}
        className="min-w-24"
        isDisabled={array.length === 0}
      />
      <Button
        onClick={() =>
          handleUpdate({
            array,
            updateIndex: parseInt(updateIndex),
            updateElement: parseInt(updateElement),
            dispatch,
            setUpdateIndex,
            setUpdateElement,
          })
        }
        color="warning"
        className="w-full"
        isDisabled={array.length === 0}
      >
        Update
      </Button>
    </div>
  );
};

/**
 * @component ArrayControls
 * @description
 * Lo! Behold the master control panel for our array operations.
 * Here we orchestrate the grand ballet of data manipulation.
 */
const ArrayControls = () => {
  // Our noble dispatch function, herald of state changes
  const dispatch = useDispatch();

  // The grand state of our array, held in Redux's embrace
  const { array, index, element, message, isError, alertVisible } = useSelector(
    (state) => state.arrayVisualizer
  );

  // Local state for search functionality
  const [searchValue, setSearchValue] = useState("");
  const [lastArrayIndex, setLastArrayIndex] = useState(array?.length);

  /**
   * Lo! When our array doth change, we must update our knowledge
   * of its boundaries, lest we attempt insertion beyond its realm.
   */
  useEffect(() => {
    setLastArrayIndex(array?.length);
  }, [array]);

  /**
   * Upon the first mounting of our stage, we shall populate
   * our array with five noble elements, each unique in value.
   */
  useEffect(() => {
    if (!array || array.length === 0) {
      dispatch(setArray([23, 45, 12, 67, 89, 10, 87]));
    }
  }, []);

  return (
    <div className="flex gap-4 justify-end items-end">
      {/* Insert Section */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <p className=" font-semibold text-center">Insert</p>
        <InsertControls
          array={array}
          lastArrayIndex={lastArrayIndex}
          dispatch={dispatch}
        />
      </div>

      {/* Delete Section */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <p className="font-semibold text-center">Delete</p>
        <DeleteControls
          array={array}
          lastArrayIndex={lastArrayIndex}
          dispatch={dispatch}
        />
      </div>

      {/* Update Section */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <h3 className=" font-semibold text-center">Update</h3>
        <UpdateControls
          array={array}
          lastArrayIndex={lastArrayIndex}
          dispatch={dispatch}
        />
      </div>

      {/* Search and Clear - The Tools of Discovery */}
      <div className="flex flex-col items-center justify-end h-full gap-3 transition-all w-full max-w-xs">
        <p>Search/Clear</p>
        <Input
          type="number"
          label="Search"
          placeholder="Search value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className=""
          isDisabled={array.length === 0}
        />
        <Button
          onClick={() => handleSearch({ array, searchValue, dispatch })}
          className="w-full"
          isDisabled={array.length === 0}
        >
          Search
        </Button>
        <Button
          onClick={() => handleClear(array, dispatch)}
          color="danger"
          variant="bordered"
          className="w-full"
        >
          Clear
        </Button>
      </div>

      {/* Array Transformations - The Magic of Manipulation */}
      <div className="flex flex-col items-center justify-end h-full gap-3 transition-all w-full max-w-xs">
        <p>Others</p>
        <Button
          onClick={() => handleShuffle(array, dispatch)}
          variant="bordered"
          className="w-full"
          color="warning"
          isDisabled={array.length <= 1}
        >
          Shuffle
        </Button>
        <Button
          className="min-w-fit w-full"
          onClick={() => randomizeArray(dispatch)}
          color="secondary"
        >
          Randomize
        </Button>
      </div>
    </div>
  );
};

export default ArrayControls;
