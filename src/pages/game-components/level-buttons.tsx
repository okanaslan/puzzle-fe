import { Difficultty } from "../../types";

type LevelButtonsProps = {
  onSelect: (difficulty: Difficultty) => void;
};

export function LevelButtons({ onSelect }: LevelButtonsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => onSelect("beginner")}
      >
        Beginner
      </button>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => onSelect("easy")}
      >
        Easy
      </button>
      <button
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        onClick={() => onSelect("medium")}
      >
        Medium
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={() => onSelect("hard")}
      >
        Hard
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => onSelect("expert")}
      >
        Expert
      </button>
    </div>
  );
}
