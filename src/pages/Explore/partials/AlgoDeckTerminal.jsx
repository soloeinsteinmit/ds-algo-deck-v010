import React, { useState } from "react";
import { categories } from "../../../utils/algorithmsData";

const AlgoDeckTerminal = () => {
  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);

  const CategorySection = ({ category, visible, setVisible, title }) => (
    <div className="w-full">
      <div
        className="text-yellow-400 text-lg font-semibold mb-4 cursor-pointer hover:text-yellow-300 flex items-center"
        onClick={() => setVisible(!visible)}
      >
        {visible ? "▼" : "▶"} {title}
      </div>

      {visible && (
        <div className="ml-4">
          {Object.entries(category.items).map(([topic, { topics }]) => (
            <div key={topic} className="mb-4">
              <div className="text-green-400 hover:text-green-300 cursor-pointer">
                └─ {topic}
              </div>
              <div className="ml-6">
                {topics.map((item, index) => (
                  <div
                    key={index}
                    className={`group flex items-center justify-between text-white hover:text-cyan-300 cursor-pointer transition-colors duration-200 ${
                      item.implemented ? "text-emerald-400" : ""
                    }`}
                  >
                    <span>
                      {index === topics.length - 1 ? "└─" : "├─"} {item.name}
                    </span>
                    <span
                      className="ml-2"
                      title={
                        item.implemented
                          ? "Implementation Complete"
                          : "Pending Implementation"
                      }
                    >
                      {item.implemented ? "✓" : "○"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="bg-black/95 text-white p-6 rounded-lg w-full max-w-6xl font-mono">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">algodeck@terminal</p>
      </div>

      <div className="text-cyan-300 text-2xl font-bold mb-6 text-center">
        AlgoDeck Implementation Roadmap 🚀
      </div>

      <div className="flex gap-8">
        <div className="flex-1 border-r border-gray-700 pr-8">
          <CategorySection
            category={categories.dataStructures}
            visible={leftVisible}
            setVisible={setLeftVisible}
            title="Data Structures"
          />
        </div>

        <div className="flex-1">
          <CategorySection
            category={categories.algorithms}
            visible={rightVisible}
            setVisible={setRightVisible}
            title="Algorithms"
          />
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-400 flex items-center gap-4">
        <span>Status:</span>
        <span className="flex items-center gap-1">
          <span className="text-emerald-400">✓</span> Implemented
        </span>
        <span className="flex items-center gap-1">
          <span>○</span> In Development
        </span>
      </div>
      <p className="text-green-400 mt-4">$ _</p>
    </aside>
  );
};

export default AlgoDeckTerminal;
