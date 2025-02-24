import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Slider,
} from "@nextui-org/react";
import {
  Settings,
  Code,
  Type,
  AlignLeftIcon,
  PlayIcon,
  PaletteIcon,
  Maximize2,
  Minimize2,
} from "lucide-react";
import Loader from "./Loader";

import {
  setCode,
  setLanguage,
  setCodeEditortheme,
  setFontSize,
} from "../../features/code_editor/codeEditorSlice";
import { useDispatch, useSelector } from "react-redux";

/**
 * MonacoEditor component.
 *
 * @param {object} props
 * @param {boolean} [props.isConsoleMinimized=false] - Whether the console is minimized.
 * @param {string} [props.height="h-[55vh]"] - The height of the editor.
 *
 * @returns {React.ReactElement} The MonacoEditor component.
 */
const MonacoEditor = ({ isConsoleMinimized, height = "h-[55vh]" }) => {
  const { fontSize, language, codeEditortheme, code } = useSelector(
    (state) => state.codeEditor
  );
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editor, setEditor] = useState(null);

  // Move theme initialization to useEffect
  useEffect(() => {
    const newTheme = theme === "dark" ? "vs-dark" : "light";
    dispatch(setCodeEditortheme(newTheme));
  }, [theme, dispatch]);

  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "cpp",
    "csharp",
    "html",
    "css",
    "json",
  ];

  const themes = [
    { name: "VS Dark", value: "vs-dark" },
    { name: "Light", value: "light" },
    { name: "High Contrast", value: "hc-black" },
    { name: "Monokai", value: "monokai" },
    { name: "GitHub", value: "github" },
    { name: "Tomorrow Night", value: "tomorrow-night" },
  ];

  function handleEditorDidMount(editor, monaco) {
    setIsEditorReady(true);
    setEditor(editor);

    // Define custom themes
    monaco.editor.defineTheme("monokai", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "88846f", fontStyle: "italic" },
        { token: "keyword", foreground: "f92672" },
        { token: "string", foreground: "e6db74" },
      ],
      colors: {
        "editor.background": "#272822",
        "editor.foreground": "#f8f8f2",
        "editorLineNumber.foreground": "#90908a",
      },
    });

    monaco.editor.defineTheme("github", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6a737d", fontStyle: "italic" },
        { token: "keyword", foreground: "d73a49" },
        { token: "string", foreground: "032f62" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#24292e",
        "editor.lineHighlightBackground": "#f1f8ff",
        "editorLineNumber.foreground": "#1b1f234d",
      },
    });

    monaco.editor.defineTheme("tomorrow-night", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "727072", fontStyle: "italic" },
        { token: "keyword", foreground: "cc99cc" },
        { token: "string", foreground: "7ec699" },
      ],
      colors: {
        "editor.background": "#1d1f21",
        "editor.foreground": "#c5c8c6",
        "editorLineNumber.foreground": "#373b41",
      },
    });
  }

  const handleFormat = async () => {
    if (editor) {
      await editor.getAction("editor.action.formatDocument").run();
    }
  };

  const handleRunCode = () => {
    try {
      const wrappedCode = `
        try {
          ${code}
        } catch (error) {
          console.error(error);
        }
      `;
      // Use Function constructor for safer evaluation
      new Function(wrappedCode)();
    } catch (error) {
      console.error("Syntax Error:", error.message);
    }
  };

  const editorOptions = {
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: "on",
    accessibilitySupport: "auto",
    autoIndent: "full",
    automaticLayout: true,
    codeLens: true,
    colorDecorators: true,
    contextmenu: true,
    cursorBlinking: "expand",
    cursorSmoothCaretAnimation: true,
    cursorStyle: "line",
    dragAndDrop: true,
    folding: true,
    foldingStrategy: "auto",
    fontFamily: "'Fira Code', 'Consolas', monospace",
    fontLigatures: true,
    fontSize: fontSize,
    formatOnPaste: true,
    formatOnType: true,
    lineNumbers: "on",
    minimap: { enabled: true },
    links: true,
    mouseWheelZoom: true,
    multiCursorModifier: "alt",
    padding: { top: 10 },
    parameterHints: { enabled: true },
    quickSuggestions: true,
    renderLineHighlight: "all",
    renderWhitespace: "selection",
    smoothScrolling: true,
    snippetSuggestions: "bottom",
    suggestOnTriggerCharacters: true,
    wordSeparators: "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
    wordWrapBreakAfterCharacters: "\t})]?|&,;",
    wordWrapBreakBeforeCharacters: "{([+",
    wordWrapBreakObtrusiveCharacters: ".",
    wrappingIndent: "same",
    wrappingStrategy: "advanced",
    tabSize: 2,
    wordWrap: "on",
  };

  return (
    <div className="flex flex-col">
      <div className="flex-none h-[57px] border-b border-divider px-4 flex items-center justify-between bg-content2/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-default-700">
            Code Editor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" isIconOnly>
            {isConsoleMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4 pt-4">
          <div className="flex gap-2">
            <Dropdown size="sm">
              <DropdownTrigger>
                <Button
                  isDisabled={!isEditorReady}
                  variant="flat"
                  size="sm"
                  startContent={<Code size={18} />}
                >
                  {language.toUpperCase()}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Language selection"
                onAction={(key) => dispatch(setLanguage(key))}
                selectedKeys={new Set([language])}
              >
                {languages.map((lang) => (
                  <DropdownItem key={lang}>{lang.toUpperCase()}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  size="sm"
                  startContent={<PaletteIcon size={18} />}
                >
                  {themes.find((t) => t.value === codeEditortheme)?.name ||
                    "Theme"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Theme selection"
                onAction={(key) => dispatch(setCodeEditortheme(key))}
                selectedKeys={new Set([codeEditortheme])}
              >
                {themes.map((theme) => (
                  <DropdownItem key={theme.value}>{theme.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleRunCode}
              color="success"
              isDisabled={!isEditorReady}
            >
              <PlayIcon size={18} />
              Run
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Type size={18} />
            <Slider
              // label="px"
              size="sm"
              step={1}
              maxValue={24}
              minValue={10}
              value={fontSize}
              onChange={(value) => dispatch(setFontSize(value))}
              className="w-20"
              aria-label="Font Size"
            />
          </div>
        </div>
        <div className={`${height} border border-default-200`}>
          <Editor
            height="100%"
            theme={codeEditortheme}
            language={language}
            value={code}
            onChange={(newValue) => dispatch(setCode(newValue))}
            options={editorOptions}
            onMount={handleEditorDidMount}
            loading={<Loader />}
          />
        </div>
      </div>
    </div>
  );
};

export default MonacoEditor;
