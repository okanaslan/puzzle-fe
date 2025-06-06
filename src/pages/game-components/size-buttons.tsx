type LevelButtonsProps = {
  onSelect: (size: number) => void;
};

export function SizeButtons({ onSelect }: LevelButtonsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => onSelect(5)}
      >
        5x5
      </button>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => onSelect(10)}
      >
        10x10
      </button>
      <button
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
        onClick={() => onSelect(15)}
      >
        15x15
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={() => onSelect(20)}
      >
        20x20
      </button>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => onSelect(25)}
      >
        25x25
      </button>
    </div>
  );
}
