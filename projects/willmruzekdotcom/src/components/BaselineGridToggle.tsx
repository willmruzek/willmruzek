"use client";

interface BaselineGridToggleProps {
  showGrid: boolean;
  onToggle: (show: boolean) => void;
}

export function BaselineGridToggle({
  showGrid,
  onToggle,
}: BaselineGridToggleProps) {
  const toggleGrid = () => {
    onToggle(!showGrid);
  };

  return (
    <button
      onClick={toggleGrid}
      className={`fixed top-4 right-4 z-50 px-3 py-2 text-xs font-mono rounded-md border transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 x:dark:focus:ring-offset-gray-800 ${
        showGrid
          ? "bg-red-500 text-white border-red-600 hover:bg-red-600 x:dark:border-red-700 x:dark:bg-red-600 x:dark:hover:bg-red-700"
          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 x:dark:border-gray-600 x:dark:bg-gray-800 x:dark:text-gray-200 x:dark:hover:bg-gray-700"
      } `}
      title={`${showGrid ? "Hide" : "Show"} baseline grid`}
    >
      {showGrid ? "Hide Grid" : "Show Grid"}
    </button>
  );
}
