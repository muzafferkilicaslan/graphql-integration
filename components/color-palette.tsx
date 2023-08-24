"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ColorPaletteProps {
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  backgroundColor,
  setBackgroundColor,
}) => {
  const selectColor = (e: string) => {
    setBackgroundColor(e);
  };

  return (
    <div className="p-2">
      <p className="text-center text-sm">Pick a color</p>
      <div className="flex flex-wrap gap-1">
        <div
          onClick={() => selectColor("red")}
          className={cn(
            "cursor-pointer p-4 border-2 rounded-full bg-red-500",
            backgroundColor == "red" ? "border-black" : ""
          )}
        ></div>
        <div
          onClick={() => selectColor("yellow")}
          className={cn(
            "cursor-pointer p-4 border-2 rounded-full bg-yellow-500",
            backgroundColor == "yellow" ? "border-black" : ""
          )}
        ></div>
        <div
          onClick={() => selectColor("green")}
          className={cn(
            "cursor-pointer p-4 border-2 rounded-full bg-green-500",
            backgroundColor == "green" ? "border-black" : ""
          )}
        ></div>
        <div
          onClick={() => selectColor("blue")}
          className={cn(
            "cursor-pointer p-4 border-2 rounded-full bg-blue-500",
            backgroundColor == "blue" ? "border-black" : ""
          )}
        ></div>
      </div>
    </div>
  );
};

export default ColorPalette;
