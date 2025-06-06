import { useState } from "react";

type LevelButtonsProps = {
  onSelect: ({ size }: { size: number }) => void;
};

export function SizeSlider({ onSelect }: LevelButtonsProps) {
  const [value, setValue] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setValue(newSize);
    onSelect({ size: newSize });
  };

  return (
    <div className="flex flex-col items-center mb-4 w-full">
      <input
        id="size-slider"
        type="range"
        min={5}
        max={25}
        step={5}
        value={value}
        onChange={handleChange}
        className="w-64 accent-blue-600"
      />
      <div className="flex justify-between w-64 text-xs mt-1 text-black">
        <span>5x5</span>
        <span>10x10</span>
        <span>15x15</span>
        <span>20x20</span>
        <span>25x25</span>
      </div>
    </div>
  );
}
