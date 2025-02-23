import React, { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import Console from "./Console";
import { ChevronUp, ChevronDown, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";

/**
 * CodeEditor component provides an interactive code editing interface with a resizable console panel.
 *
 * This component integrates the Monaco code editor and a console for displaying logs.
 * Users can resize the console panel by dragging, and toggle its visibility.
 *
 * @component
 * @returns {JSX.Element} The rendered CodeEditor component.
 */
const CodeEditor = () => {
  // State for console panel size and visibility
  const [consoleHeight, setConsoleHeight] = useState(250);
  const [isConsoleMinimized, setIsConsoleMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Event handler for when the user starts dragging the console panel.
   * @param {React.MouseEvent} e The event object.
   * @private
   */
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Event handler for when the user is dragging the console panel.
   * Updates the console height by calculating the position of the mouse
   * cursor relative to the bottom of the editor.
   * @param {React.MouseEvent} e The event object.
   * @private
   */
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const editorRect = e.currentTarget.getBoundingClientRect();
    const newHeight = editorRect.bottom - e.clientY;

    // Limit console height between 100px and 60% of editor height
    if (newHeight >= 100 && newHeight <= editorRect.height * 0.6) {
      setConsoleHeight(newHeight);
    }
  };

  /**
   * Event handler for when the mouse button is released.
   * Resets the dragging state to reflect the current dragging status.
   * @private
   */
  const handleMouseUp = () => {
    setIsDragging(isDragging);
  };

  // Add event listeners for mouse events
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="h-fullflex flex-col bg-background/60 backdrop-blur-lg border-l border-divider"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <MonacoEditor
          isConsoleMinimized={isConsoleMinimized}
          height={isConsoleMinimized ? "h-[77vh]" : "h-[55vh]"}
        />
      </div>

      {/* Resizable Console */}
      <div
        className={`flex flex-col transition-all duration-200 ease-in-out ${
          isConsoleMinimized ? "h-10" : ""
        }`}
        style={{ height: isConsoleMinimized ? 40 : consoleHeight }}
      >
        {/* Drag Handle */}
        <div
          className="h-2 cursor-ns-resize bg-content2 hover:bg-content3 transition-colors flex items-center justify-center"
          onMouseDown={handleMouseDown}
        >
          <div className="w-8 h-1 rounded-full bg-default-400" />
        </div>

        {/* Console Header */}
        <div className="flex-none h-8 bg-content2/50 border-t border-b border-divider px-4 flex items-center justify-between">
          <span className="text-sm font-medium text-default-700">Console</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsConsoleMinimized(!isConsoleMinimized)}
            isIconOnly
          >
            {isConsoleMinimized ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Console Content */}
        <div className="flex-1 overflow-hidden">
          <Console height={isConsoleMinimized ? "0px" : "100%"} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
