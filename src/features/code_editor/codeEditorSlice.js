import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: `// 🚀 Welcome to DS.AlgoDeck Code Editor! 

/**
 * 🎮 Coming Soon: Interactive Algorithm Visualizations!
 * Soon you'll be able to:
 * - Write code that directly controls the visualizers
 * - Test your implementations in real-time
 * - See your algorithms come to life visually
 * 
 * For now, you can:
 * 1. Write and run JavaScript/TypeScript code
 * 2. Use the built-in console for output
 * 3. Experiment with different algorithms
 * 
 * Example:
 */

console.log("Hello, Algorithm Explorer! 👋");

// Try this simple array manipulation:
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", numbers);

// Sort the array
numbers.sort((a, b) => a - b);
console.log("Sorted array:", numbers);

// Soon you'll see this sorting process animated! ✨
`,
  language: "javascript",
  codeEditortheme: "vs-dark",
  fontSize: 14,
};

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    /**
     * Set the code in the editor.
     * @param {object} state - The state of the code editor.
     * @param {object} action - The action to set the code, with the code as the payload.
     * @returns {object} The updated state.
     */
    setCode: (state, action) => {
      state.code = action.payload;
    },
    /**
     * Set the language of the code editor.
     * @param {object} state - The state of the code editor.
     * @param {object} action - The action to set the language, with the language as the payload.
     * @returns {object} The updated state.
     */
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    /**
     * Set the theme of the code editor.
     * @param {object} state - The state of the code editor.
     * @param {object} action - The action to set the theme, with the theme as the payload.
     * @returns {object} The updated state.
     */
    setCodeEditortheme: (state, action) => {
      state.codeEditortheme = action.payload;
    },

    /**
     * Set the font size of the code editor.
     * @param {object} state - The state of the code editor.
     * @param {object} action - The action to set the font size, with the font size as the payload.
     * @returns {object} The updated state.
     */
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setCode, setLanguage, setCodeEditortheme, setFontSize } =
  codeEditorSlice.actions;
export default codeEditorSlice.reducer;
