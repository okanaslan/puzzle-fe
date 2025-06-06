import { useGame } from "../../contexts/game-context";

// Switch component
export const ModeSwitch = () => {
  const { clickMode, setClickMode } = useGame();

  return (
    <div className="flex items-center gap-2 m-4">
      <button
        className={`px-3 py-1 rounded-l ${clickMode === "fill" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        onClick={() => setClickMode("fill")}
      >
        Fill
      </button>
      <button
        className={`px-3 py-1 rounded-r ${clickMode === "cross" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        onClick={() => setClickMode("cross")}
      >
        Cross
      </button>
    </div>
  );
};
