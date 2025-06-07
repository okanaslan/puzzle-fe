import { useGame } from "../../../contexts/game-context";
import { CellProps } from "./playable-cells";

export const FilledCell = ({ row, col }: CellProps) => {
  const { isMouseDown, setIsMouseDown, setMouseDownState, mouseDownState, fillCell } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    setMouseDownState("empty-fill");
    fillCell(row, col, "empty");
  };

  const handleMouseMove = () => {
    if (isMouseDown && mouseDownState == "empty-fill") {
      fillCell(row, col, "empty");
    }
  };

  return (
    <div
      id={`cell-${row}-${col}`}
      className="min-w-4 aspect-square border flex items-center justify-center bg-black"
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
    />
  );
};
