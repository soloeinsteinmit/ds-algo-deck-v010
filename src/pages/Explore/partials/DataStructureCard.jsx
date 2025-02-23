import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import NoteCard from "./Notescard";

const TreeNode = ({ value, x, y, children }) => (
  <g>
    {children && children[0] && (
      <line
        x1={x}
        y1={y + 18} // Adjusted to match larger circle
        x2={x - 40}
        y2={y + 50}
        stroke="#4B5563"
        strokeWidth="2"
      />
    )}
    {children && children[1] && (
      <line
        x1={x}
        y1={y + 18} // Adjusted to match larger circle
        x2={x + 40}
        y2={y + 50}
        stroke="#4B5563"
        strokeWidth="2"
      />
    )}
    <circle
      cx={x}
      cy={y}
      r="20" // MODIFIED: Increased from 16 to 20 for larger circles
      fill="#8B5CF6"
      className="transition-all duration-300"
    />
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dy="0.3em"
      fill="white"
      fontSize="18" // MODIFIED: Increased from 12 to 14 to match larger circles
    >
      {value}
    </text>
  </g>
);

const DataStructureCard = () => {
  const [value, setValue] = useState("");
  const [tree, setTree] = useState({
    value: 50,
    children: [
      {
        value: 30,
        children: [
          { value: 20, children: [] },
          { value: 40, children: [] },
        ],
      },
      {
        value: 70,
        children: [
          { value: 60, children: [] },
          { value: 80, children: [] },
        ],
      },
    ],
  });

  const insertNode = (newValue) => {
    const insert = (node) => {
      if (!node) return { value: parseInt(newValue), children: [] };

      if (parseInt(newValue) < node.value) {
        return {
          ...node,
          children: [insert(node.children[0]), node.children[1]],
        };
      } else {
        return {
          ...node,
          children: [node.children[0], insert(node.children[1])],
        };
      }
    };

    if (!isNaN(parseInt(newValue))) {
      setTree(insert(tree));
      setValue("");
    }
  };

  const renderTree = (node, x = 200, y = 40, level = 0) => {
    if (!node) return null;

    return (
      <g key={`${node.value}-${x}-${y}`}>
        <TreeNode value={node.value} x={x} y={y}>
          {node.children}
        </TreeNode>
        {node.children[0] &&
          renderTree(node.children[0], x - 80 / (level + 1), y + 60, level + 1)}
        {node.children[1] &&
          renderTree(node.children[1], x + 80 / (level + 1), y + 60, level + 1)}
      </g>
    );
  };

  const resetTree = () => {
    setTree({
      value: 50,
      children: [
        {
          value: 30,
          children: [
            { value: 20, children: [] },
            { value: 40, children: [] },
          ],
        },
        {
          value: 70,
          children: [
            { value: 60, children: [] },
            { value: 80, children: [] },
          ],
        },
      ],
    });
  };
  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      insertNode(value);
    }
  };

  return (
    <div className="relative rounded-lg bg-content2 p-2 w-[80%]">
      <div className="relative flex text-center ">
        <div className="flex pl-3.5 pt-3 ">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.5 mr-1.5 h-3 w-3 text-danger-500/20"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-warning-500/20"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="-ml-0.75 mr-1.5 h-3 w-3 text-success-500/20"
          >
            <circle r="12" cy="12" cx="12" />
          </svg>
        </div>
        <span className="absolute inset-x-0 top-2 text-xl text-default-500">
          binarySearchTree.js
        </span>
      </div>

      <div className="mt-5 flex space-y-1.5 px-5 pb-10">
        <div className="flex flex-col gap-4 w-[50%]">
          <div className="flex flex-col">
            <p className="font-mono text-xl font-normal tracking-wide text-secondary">
              <span className="text-default-600">{"class "}</span>
              <span className="text-primary">TreeNode</span>
              <span className="text-default-600">{" {"}</span>
            </p>
            <p className="ml-4 font-mono text-xl font-normal tracking-wide text-secondary">
              <span className="text-primary">{"constructor(value) {"}</span>
            </p>
            <p className="ml-8 font-mono text-xl font-normal tracking-wide text-secondary">
              <span className="text-primary">{"this.value = value;"}</span>
            </p>
            <p className="ml-8 font-mono text-xl font-normal tracking-wide text-secondary">
              <span className="text-primary">{"this.left = null;"}</span>
            </p>
            <p className="ml-8 font-mono text-xl font-normal tracking-wide text-secondary">
              <span className="text-primary">{"this.right = null;"}</span>
            </p>
            <p className="ml-4 font-mono text-xl font-normal tracking-wide text-slate-500">
              {"}"}
            </p>
            <p className="font-mono text-xl font-normal tracking-wide text-slate-500">
              {"}"}
            </p>
          </div>
          <NoteCard
            name="Binary Search Tree DS"
            notes={[
              "A Binary Search Tree (BST) is a data structure where each node has at most two children: left and right.",
              "In a BST, the left child of a node contains a value less than the parent, and the right child contains a value greater than the parent.",
              "BSTs allow for efficient searching, insertion, and deletion operations, typically with a time complexity of O(log n) in balanced trees.",
              "If the BST becomes unbalanced, the performance can degrade to O(n) for search, insert, and delete operations.",
              "Common operations on a BST include traversal (in-order, pre-order, post-order), searching, and insertion.",
            ]}
          />
        </div>

        <div className="mb-6 w-[60%]">
          <p className="font-mono text-xl font-normal tracking-wide text-secondary ">
            <span className="text-default-600">{"// "}</span>
            <span className="text-primary">
              Binary Search Tree Visualization
            </span>
          </p>

          <div className="mt-4 flex justify-center gap-4">
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter number"
              className="w-36 rounded"
              variant="faded"
              onKeyDown={handleOnEnter}
            />
            <Button onClick={() => insertNode(value)} color="primary">
              Insert Node
            </Button>
            <Button onClick={resetTree}>Reset</Button>
          </div>

          <div className="mt-4 flex justify-center ">
            <svg width="400" height="300" className="overflow-visible">
              {renderTree(tree)}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructureCard;
