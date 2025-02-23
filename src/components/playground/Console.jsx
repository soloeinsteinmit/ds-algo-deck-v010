import { Terminal, XCircle, Maximize2, Minimize2, Trash } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Console = ({ height = "200px" }) => {
  const [logs, setLogs] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const consoleEndRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    if (!originalLog || !originalError) {
      return;
    }

    console.log = (...args) => {
      setLogs((prev) => [
        ...prev,
        { type: "log", content: args, timestamp: new Date() },
      ]);
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      setLogs((prev) => [
        ...prev,
        { type: "error", content: args, timestamp: new Date() },
      ]);
      originalError.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const clearConsole = () => {
    setLogs([]);
  };

  const formatLogContent = (content) => {
    return content
      .map((item) => {
        try {
          if (item === null) return "null";
          if (item === undefined) return "undefined";
          if (typeof item === "object") {
            // Handle Error objects specially
            if (item instanceof Error) {
              return item.stack || item.message;
            }
            // Handle React component stack traces
            if (item.componentStack) {
              return `Component Stack: ${item.componentStack}`;
            }
            // For circular references and other complex objects
            const cache = new Set();
            return JSON.stringify(
              item,
              (key, value) => {
                if (typeof value === "object" && value !== null) {
                  if (cache.has(value)) {
                    return "[Circular Reference]";
                  }
                  cache.add(value);
                }
                return value;
              },
              2
            );
          }
          return String(item);
        } catch (err) {
          return `[Unable to stringify: ${err.message}]`;
        }
      })
      .join(" ");
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour12: false });
  };

  return (
    <div
      className={`bg-gray-100 dark:bg-[#1e1e1e] border-t border-gray-200 dark:border-[#2d2d2d] ${
        isExpanded ? "fixed bottom-0 left-0 right-0 z-50" : ""
      }`}
      style={{ height: isExpanded ? "50vh" : height }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#252526] border-b border-gray-200 dark:border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="dark:text-[#cccccc]" />
          <span className="font-medium dark:text-[#cccccc]">Console</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearConsole}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded"
            title="Clear console"
          >
            <Trash size={16} className="dark:text-[#cccccc]" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] rounded"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? (
              <Minimize2 size={16} className="dark:text-[#cccccc]" />
            ) : (
              <Maximize2 size={16} className="dark:text-[#cccccc]" />
            )}
          </button>
        </div>
      </div>

      <div className="overflow-auto h-[calc(100%-40px)] font-mono text-sm">
        {logs.length === 0 ? (
          <div className="p-4 text-gray-500 dark:text-[#858585]">
            No output to display
          </div>
        ) : (
          <div className="p-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`py-1 px-2 rounded ${
                  log.type === "error"
                    ? "bg-red-50 dark:bg-[#5a1d1d] text-red-600 dark:text-[#f48771]"
                    : "text-gray-800 dark:text-[#cccccc]"
                }`}
              >
                <span className="text-gray-500 dark:text-[#858585] mr-2">
                  [{formatTimestamp(log.timestamp)}]
                </span>
                {log.type === "error" && (
                  <XCircle size={14} className="inline mr-2 text-[#f48771]" />
                )}
                <span className="whitespace-pre-wrap font-mono">
                  {formatLogContent(log.content)}
                </span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Console;
