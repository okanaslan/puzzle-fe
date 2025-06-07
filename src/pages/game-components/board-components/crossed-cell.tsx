import { X } from "lucide-react";
import { useGame } from "../../../contexts/game-context";
import { CellProps } from "./playable-cells";

export const CrossedCell = ({ row, col }: CellProps) => {
  const { isMouseDown, setIsMouseDown, setMouseDownState, mouseDownState, fillCell } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    setMouseDownState("empty-cross");
    fillCell(row, col, "empty");
  };

  const handleMouseMove = () => {
    if (isMouseDown && mouseDownState == "empty-cross") {
      fillCell(row, col, "empty");
    }
  };

  return (
    <div
      id={`cell-${row}-${col}`}
      className="min-w-4 aspect-square border flex items-center justify-center bg-gray-300"
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
    >
      <X className="w-4 h-4 text-gray-600" />
    </div>
  );
};
