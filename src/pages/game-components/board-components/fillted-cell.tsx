import { useGame } from "../../../contexts/game-context";
import { CellState } from "../../../types";

type CellProps = {
  fill: (type: CellState) => void;
};

export const FilledCell = ({ fill }: CellProps) => {
  const { isMouseDown, setIsMouseDown, setMouseDownState, mouseDownState } = useGame();

  const onMouseDown = () => {
    setIsMouseDown(true);
    setMouseDownState("empty-fill");
    fill("empty");
  };

  const handleMouseMove = () => {
    if (isMouseDown && mouseDownState == "empty-fill") {
      fill("empty");
    }
  };

  return (
    <div
      className="min-w-6 min-h-6 border flex items-center justify-center bg-black"
      onMouseDown={onMouseDown}
      onMouseMove={handleMouseMove}
      // onTouchStart={onMouseDown}
      onTouchMove={handleMouseMove}
    />
  );
};
