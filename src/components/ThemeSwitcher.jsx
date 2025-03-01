import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { dispatch } from "d3";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAppTheme } from "../../src/features/playground/playgroundLayoutSlice";

/**
 * ThemeSwitcher component allows users to toggle between light and dark themes.
 *
 * This component utilizes the `useTheme` hook from `next-themes` to manage
 * theme state. It also uses the `useSwitch` hook from `@nextui-org/react` to
 * provide switch functionality.
 *
 * The component ensures that the theme switcher is only rendered on the client
 * side to avoid hydration mismatches by checking if the component is mounted.
 *
 * Props:
 * - Inherits all props from the `useSwitch` hook.
 *
 * @param {object} props - The properties passed to the ThemeSwitcher component.
 * @returns {JSX.Element|null} The rendered ThemeSwitcher component or null if not mounted.
 */
export const ThemeSwitcher = (props) => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    ...props,
    // Initialize isSelected based on current theme
    defaultSelected: theme === "light",
    onChange: () =>
      dispatch(setAppTheme(setTheme(isSelected ? "dark" : "light"))),
  });

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

/**
 * MoonIcon component renders an SVG icon representing the moon.
 *
 * This component is used to visually represent a "dark" or "night" theme.
 * It accepts all standard SVG props, allowing customization of attributes
 * such as color, size, and additional styling.
 *
 * @param {object} props - The props for the SVG element.
 * @returns {JSX.Element} The rendered SVG moon icon.
 */
export const MoonIcon = (props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

/**
 * SunIcon component renders an SVG icon representing the sun.
 *
 * This component is used to visually represent a "light" or "day" theme.
 * It accepts all standard SVG props, allowing customization of attributes
 * such as color, size, and additional styling.
 *
 * @param {Object} props - The properties to customize the SunIcon component.
 * @returns {JSX.Element} An SVG element representing the sun icon.
 */
export const SunIcon = (props) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);
