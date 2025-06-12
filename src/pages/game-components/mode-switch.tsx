import { X, Square } from "lucide-react";
import { useLevel } from "../../contexts/level-context";

export const ModeSwitch = () => {
  const { clickMode, setClickMode } = useLevel();

  return (
    <div className="flex items-center gap-4 m-2">
      <div className="flex rounded overflow-hidden border border-blue-600 relative">
        {/* Animated background highlight */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-300 ease-in-out bg-blue-600 z-0 rounded ${
            clickMode === "fill" ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ pointerEvents: "none" }}
        />
        <span
          className={`flex items-center px-6 py-3 cursor-pointer select-none transition-colors duration-300 relative z-10 ${
            clickMode === "fill" ? "text-white" : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setClickMode("fill")}
        >
          <Square className="w-4 h-4" />
        </span>
        <span
          className={`flex items-center px-6 py-3 cursor-pointer select-none transition-colors duration-300 relative z-10 ${
            clickMode === "cross" ? "text-white" : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={() => setClickMode("cross")}
        >
          <X className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};
