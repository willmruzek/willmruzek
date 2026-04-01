"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// SVG Icons as components
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="x:h-9 x:w-9 x:animate-pulse x:rounded-full x:bg-gray-200 x:dark:bg-gray-700" />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    // Simple toggle between light and dark (no system mode persistence)
    setTheme(isDark ? "light" : "dark");
  };

  const getIcon = () => {
    return (
      <div className="x:relative x:flex x:h-5 x:w-5 x:items-center x:justify-center">
        <SunIcon
          className={`x:absolute x:h-5 x:w-5 x:transform x:transition-all x:duration-500 x:ease-in-out ${
            isDark
              ? "x:scale-75 x:rotate-90 x:opacity-0"
              : "x:scale-100 x:rotate-0 x:text-yellow-500 x:opacity-100"
          }`}
        />
        <MoonIcon
          className={`x:absolute x:h-5 x:w-5 x:transform x:transition-all x:duration-500 x:ease-in-out ${
            isDark
              ? "x:scale-100 x:rotate-0 x:text-blue-400 x:opacity-100"
              : "x:scale-75 x:-rotate-90 x:opacity-0"
          }`}
        />
      </div>
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="x:group hover:x:bg-gray-100 hover:x:text-gray-700 focus-visible:x:outline focus-visible:x:outline-2 focus-visible:x:outline-offset-2 focus-visible:x:outline-gray-400 x:relative x:flex x:h-9 x:w-9 x:items-center x:justify-center x:rounded-full x:text-gray-500 x:transition-colors x:duration-200 x:dark:text-gray-300 x:dark:hover:bg-gray-800 x:dark:hover:text-gray-100 x:dark:focus-visible:outline-gray-500"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode. Currently ${isDark ? "dark" : "light"} theme`}
    >
      {getIcon()}

      {/* Tooltip */}
      <div className="group-hover:x:opacity-100 group-hover:x:scale-100 group-focus-visible:x:opacity-100 group-focus-visible:x:scale-100 x:pointer-events-none x:absolute x:bottom-full x:left-1/2 x:mb-2 x:-translate-x-1/2 x:scale-95 x:transform x:rounded-md x:bg-gray-900 x:px-2 x:py-1 x:text-xs x:font-medium x:whitespace-nowrap x:text-white x:opacity-0 x:transition-all x:duration-200 x:dark:bg-gray-700">
        {isDark ? "Light mode" : "Dark mode"}
        <div className="x:absolute x:top-full x:left-1/2 x:h-0 x:w-0 x:-translate-x-1/2 x:border-t-4 x:border-r-4 x:border-l-4 x:border-transparent x:border-t-gray-900 x:dark:border-t-gray-700" />
      </div>
    </button>
  );
}
