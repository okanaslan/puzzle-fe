import { CellState } from "../../../types";
import { FilledCell } from "./fillted-cell";
import { EmptyCell } from "./empty-cell";
import { CrossedCell } from "./crossed-cell";

export type CellProps = {
  row: number;
  col: number;
};

type PlayableCellProps = {
  row: number;
  col: number;
  state: CellState;
};

const CorrectCell = ({ row, col }: CellProps) => (
  <div id={`cell-${row}-${col}`} className="min-w-6 min-h-6 border flex items-center justify-center bg-green-500" />
);

export const PlayableCell = ({ state, row, col }: PlayableCellProps) => {
  if (state === "correct") return <CorrectCell row={row} col={col} />;
  if (state === "filled") return <FilledCell row={row} col={col} />;
  if (state === "crossed") return <CrossedCell row={row} col={col} />;
  return <EmptyCell row={row} col={col} />;
};
