import { colors } from "@/utils/colors";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  value: string;
  onChange: (color: string) => void;
}

const TwColorPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex max-h-40 w-full flex-wrap items-center justify-center gap-1 overflow-auto">
      {colors.map((color) => (
        <button
          type="button"
          key={color}
          className={twMerge(
            "h-4 w-4 rounded-full",
            "bg-current",
            color,
            value === color && "ring-2 ring-blue-500"
          )}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
};

export default TwColorPicker;
