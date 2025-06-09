import { CellState } from "../../../types";
import { EmptyCell } from "./empty-cell";
import { CrossedCell } from "./crossed-cell";
import { CorrectCell } from "./correct-cell";
import { FalseCorrectCell } from "./false-correct-cell";
import { FalseCrossedCell } from "./false-crossed-cell";

export type CellProps = {
  row: number;
  col: number;
};

type PlayableCellProps = {
  row: number;
  col: number;
  state: CellState;
};

export const PlayableCell = ({ state, row, col }: PlayableCellProps) => {
  if (state === "correct") return <CorrectCell row={row} col={col} />;
  if (state === "crossed") return <CrossedCell row={row} col={col} />;
  if (state === "false-correct") return <FalseCorrectCell row={row} col={col} />;
  if (state === "false-crossed") return <FalseCrossedCell row={row} col={col} />;
  return <EmptyCell row={row} col={col} />;
};
