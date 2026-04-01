"use client";

import { useState, useEffect, useCallback } from "react";

// Popular Google Fonts to start with
const POPULAR_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Source Sans Pro",
  "Poppins",
  "Raleway",
  "Nunito",
  "PT Sans",
  "Ubuntu",
  "Playfair Display",
  "Merriweather",
  "Oswald",
  "Source Serif Pro",
  "Libre Franklin",
  "Work Sans",
  "Fira Sans",
  "Noto Sans",
  "Public Sans",
  "Atkinson Hyperlegible",
  "Krub",
  "Gowun Dodum",
  "Bellota Text",
  "Wix Madefor Display",
];

type FontPickerProps = {
  onFontChange?: (fontFamily: string) => void;
};

export function FontPicker({ onFontChange }: FontPickerProps) {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [customFont, setCustomFont] = useState("");
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  const loadGoogleFont = useCallback(
    (fontName: string) => {
      if (loadedFonts.has(fontName)) return;

      // Remove existing font links to avoid conflicts
      const existingLinks = document.querySelectorAll("link[data-font-picker]");
      existingLinks.forEach((link) => link.remove());

      // Create new font link
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.setAttribute("data-font-picker", "true");
      const googleFontName = fontName.replace(/\s+/g, "+");
      link.href = `https://fonts.googleapis.com/css2?family=${googleFontName}:wght@300;400;500;600;700&display=swap`;

      document.head.appendChild(link);
      setLoadedFonts((prev) => new Set(prev).add(fontName));
    },
    [loadedFonts],
  );

  const applyFont = (fontName: string) => {
    loadGoogleFont(fontName);

    // Apply font to html element
    document.documentElement.style.fontFamily = `"${fontName}", sans-serif`;

    setSelectedFont(fontName);
    onFontChange?.(fontName);
  };

  const handleCustomFont = () => {
    if (customFont.trim()) {
      applyFont(customFont.trim());
      setCustomFont("");
    }
  };

  const resetToOriginal = () => {
    document.documentElement.style.fontFamily = "";
    const fontLinks = document.querySelectorAll("link[data-font-picker]");
    fontLinks.forEach((link) => link.remove());
    setSelectedFont("");
    setLoadedFonts(new Set());
  };

  useEffect(() => {
    // Load Inter by default
    loadGoogleFont("Inter");
  }, [loadGoogleFont]);

  return (
    <div className="x:fixed x:top-4 x:right-4 x:z-50 x:max-w-xs x:rounded-lg x:border x:border-gray-300 x:bg-white x:p-4 x:shadow-lg">
      <h3 className="x:mb-3 x:text-sm x:font-semibold">Font Picker</h3>

      {/* Popular fonts dropdown */}
      <div className="x:mb-3">
        <label className="x:mb-1 x:block x:text-xs x:text-gray-600">
          Popular Fonts:
        </label>
        <select
          value={selectedFont}
          onChange={(e) => applyFont(e.target.value)}
          className="x:w-full x:rounded x:border x:border-gray-300 x:px-2 x:py-1 x:text-sm"
        >
          <option value="">Select a font...</option>
          {POPULAR_FONTS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Custom font input */}
      <div className="x:mb-3">
        <label className="x:mb-1 x:block x:text-xs x:text-gray-600">
          Try any Google Font:
        </label>
        <div className="x:flex x:gap-1">
          <input
            type="text"
            value={customFont}
            onChange={(e) => setCustomFont(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCustomFont()}
            placeholder="e.g. Roboto Mono"
            className="x:flex-1 x:rounded x:border x:border-gray-300 x:px-2 x:py-1 x:text-sm"
          />
          <button
            onClick={handleCustomFont}
            className="x:rounded x:bg-blue-500 x:px-2 x:py-1 x:text-xs x:text-white x:hover:bg-blue-600"
          >
            Try
          </button>
        </div>
      </div>

      {/* Current font display */}
      {selectedFont && (
        <div className="x:mb-3 x:text-xs x:text-gray-600">
          Current: <span className="x:font-semibold">{selectedFont}</span>
        </div>
      )}

      {/* Reset button */}
      <button
        onClick={resetToOriginal}
        className="x:w-full x:rounded x:bg-gray-500 x:px-2 x:py-1 x:text-xs x:text-white x:hover:bg-gray-600"
      >
        Reset to Original
      </button>

      {/* Sample text */}
      <div className="x:mt-3 x:border-t x:pt-2 x:text-xs x:text-gray-600">
        <div className="x:mb-1">Sample:</div>
        <div
          style={{
            fontFamily: selectedFont
              ? `"${selectedFont}", sans-serif`
              : "inherit",
          }}
        >
          <div className="x:font-bold">Bold Heading</div>
          <div>
            Regular body text with some longer content to test readability.
          </div>
        </div>
      </div>
    </div>
  );
}
