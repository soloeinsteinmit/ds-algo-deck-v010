import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "// Start coding here...",
  language: "javascript",
  codeEditortheme: "vs-dark",
  fontSize: 16,
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
