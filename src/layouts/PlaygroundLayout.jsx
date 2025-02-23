/**
 * @fileoverview Hark! Behold the grand stage upon which our algorithms shall dance!
 * This sacred layout doth provide the perfect environment for visualization and learning.
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Import our noble components
import LeftSideBar from "../components/playground/LeftSideBar";
import CodeEditor from "../components/playground/CodeEditor";
import MemoizedVisualizingPanel from "../pages/Playground/VisualizingPanel";

/**
 * @component PlaygroundLayout
 * @description Lo! This grand theater presents three noble acts:
 * 1. A sidebar most wise, containing our algorithmic treasures
 * 2. A visualizing panel, where algorithms come to life
 * 3. A code editor most sacred, where wisdom is writ
 *
 * Each may be shown or hidden at the user's command, like actors
 * entering and exiting our grand stage.
 */
const PlaygroundLayout = () => {
  // Our state managers, like puppet strings for our performance
  const { isEditorOpen, isListOpen } = useSelector(
    (state) => state.playgroundLayout
  );

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-background">
      {/* The Left Sidebar, a scroll of knowledge */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isListOpen ? "w-[380px] opacity-100" : "w-0 opacity-0"
        }`}
      >
        <LeftSideBar />
      </div>

      {/* The Main Stage */}
      <div className="flex flex-1 overflow-hidden">
        {/* The Visualizing Panel, where magic happens */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditorOpen ? "w-2/3" : "w-full"
          }`}
        >
          <MemoizedVisualizingPanel />
        </div>

        {/* The Code Editor, where wisdom is writ */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isEditorOpen ? "w-2/6" : "w-0"
          }`}
        >
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default PlaygroundLayout;
