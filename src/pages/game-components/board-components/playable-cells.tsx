import { CellState } from "../../../types";
import { FilledCell } from "./fillted-cell";
import { EmptyCell } from "./empty-cell";
import { CrossedCell } from "./crossed-cell";

type PlayableCellProps = {
  state: CellState;
  fill: (type: CellState) => void;
};

const CorrectCell = () => <div className="min-w-6 min-h-6 border flex items-center justify-center bg-green-500" />;

export const PlayableCell = ({ state, fill }: PlayableCellProps) => {
  if (state === "correct") return <CorrectCell />;
  if (state === "filled") return <FilledCell fill={fill} />;
  if (state === "crossed") return <CrossedCell fill={fill} />;
  return <EmptyCell fill={fill} />;
};
