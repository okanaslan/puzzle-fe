import { useGame } from "../../../contexts/game-context";
import { CellState } from "../../../types";

type EmptyCellProps = {
  fill: (type: CellState) => void;
};

export const EmptyCell = ({ fill }: EmptyCellProps) => {
  const { isMouseDown, setIsMouseDown, clickMode, setMouseDownState, mouseDownState } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    fill(clickMode == "fill" ? "filled" : "crossed");
    setMouseDownState(clickMode == "fill" ? "fill" : "cross");
  };

  const handleMouseMove = () => {
    if (isMouseDown && mouseDownState == "fill") {
      fill(clickMode == "fill" ? "filled" : "crossed");
    }
    if (isMouseDown && mouseDownState == "cross") {
      fill(clickMode == "fill" ? "filled" : "crossed");
    }
  };

  return (
    <div
      className="min-w-4 border flex items-center justify-center aspect-square"
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
      // onTouchStart={onMouseDown}
      onTouchMove={handleMouseMove}
      draggable={false}
    />
  );
};
