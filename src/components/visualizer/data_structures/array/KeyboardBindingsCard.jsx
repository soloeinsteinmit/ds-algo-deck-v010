import React from "react";
import { KEYBOARD_SHORTCUTS } from "../../../../utils/data_structure/arrays/arrayKeyboardBindings";

/**
 * @component KeyboardBindingsCard
 * @description
 * Lo! A noble component to display our keyboard shortcuts,
 * like a scroll of ancient wisdom for all to see.
 *
 * @returns {JSX.Element} A card displaying all available keyboard shortcuts
 */
const KeyboardBindingsCard = () => {
  return (
    <div className="absolute bottom-0 right-1/2 translate-x-1/2 bg-background border border-border rounded-lg p-4 shadow-lg w-full">
      <h3 className="text-lg font-semibold mb-2">⌨️ Keyboard Shortcuts</h3>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(KEYBOARD_SHORTCUTS).map(
          ([name, { combination, description }]) => (
            <div key={name} className="col-span-1">
              <kbd className="px-2 py-1 bg-default-100 rounded">
                {combination}
              </kbd>
              <span className="ml-2 text-sm">{description}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default KeyboardBindingsCard;
