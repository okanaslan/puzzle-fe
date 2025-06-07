import { useGame } from "../../../contexts/game-context";
import { CellProps } from "./playable-cells";

export const EmptyCell = ({ row, col }: CellProps) => {
  const { isMouseDown, setIsMouseDown, clickMode, setMouseDownState, mouseDownState, fillCell } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    fillCell(row, col, clickMode == "fill" ? "filled" : "crossed");
    setMouseDownState(clickMode == "fill" ? "fill" : "cross");
  };

  const handleMouseMove = () => {
    if (isMouseDown && mouseDownState == "fill") {
      fillCell(row, col, clickMode == "fill" ? "filled" : "crossed");
    }
    if (isMouseDown && mouseDownState == "cross") {
      fillCell(row, col, clickMode == "fill" ? "filled" : "crossed");
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
