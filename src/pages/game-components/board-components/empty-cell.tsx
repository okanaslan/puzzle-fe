import { useGame } from "../../../contexts/game-context";
import { CellProps } from "./playable-cells";

export const EmptyCell = ({ row, col }: CellProps) => {
  const { isMouseDown, setIsMouseDown, clickMode, fillCell } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    fillCell(row, col, clickMode == "fill" ? "select" : "cross");
  };

  const handleMouseMove = () => {
    if (isMouseDown && clickMode == "fill") {
      fillCell(row, col, "select");
    }
    if (isMouseDown && clickMode == "cross") {
      fillCell(row, col, "cross");
    }
  };

  return (
    <div
      id={`cell-${row}-${col}`}
      className="min-w-4 border flex items-center justify-center aspect-square"
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
    />
  );
};
