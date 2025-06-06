import { X } from "lucide-react";
import { CellState } from "../../../types";
import { useGame } from "../../../contexts/game-context";

type CellProps = {
  fill: (type: CellState) => void;
};

export const CrossedCell = ({ fill }: CellProps) => {
  const { isMouseDown, setIsMouseDown, setMouseDownState, mouseDownState } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    setMouseDownState("empty-cross");
    fill("empty");
  };

  const handleMouseMove = () => {
    if (isMouseDown && mouseDownState == "empty-cross") {
      fill("empty");
    }
  };

  return (
    <div
      className="min-w-6 min-h-6 border flex items-center justify-center bg-gray-300"
      onClick={() => fill("empty")}
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
      // onTouchStart={onMouseDown}
      onTouchMove={handleMouseMove}
    >
      <X className="w-4 h-4 text-gray-600" />
    </div>
  );
};
