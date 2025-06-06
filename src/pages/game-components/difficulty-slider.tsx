import { useState } from "react";

type DifficultySliderProps = {
  onSelect: ({ difficulty }: { difficulty: number }) => void;
};

export function DifficultySlider({ onSelect }: DifficultySliderProps) {
  const MAX_DIFFICULTY = 100;
  const [index, setIndex] = useState(1); // Default to "Easy"

  const handleDecrease = () => {
    if (index > 0) {
      setIndex(index - 1);
      onSelect({ difficulty: index - 1 });
    }
  };

  const handleIncrease = () => {
    if (index < MAX_DIFFICULTY) {
      setIndex(index + 1);
      onSelect({ difficulty: index + 1 });
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={handleDecrease}
        disabled={index === 0}
      >
        -
      </button>
      <span className="font-bold text-lg capitalize text-black">{index}</span>
      <button
        className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={handleIncrease}
        disabled={index === MAX_DIFFICULTY}
      >
        +
      </button>
    </div>
  );
}
