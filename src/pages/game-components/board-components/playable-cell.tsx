import { X } from "lucide-react";
import { CellState } from "../../../types";
import { EmptyCell } from "./empty-cell";

type PlayableCellProps = {
  state: CellState;
  onClick: (type: CellState) => void;
};

type CellProps = {
  onClick: (type: CellState) => void;
};

const CorrectCell = () => <div className="min-w-6 min-h-6 border flex items-center justify-center bg-green-500" />;

export const FilledCell = ({ onClick }: CellProps) => (
  <div className="min-w-6 min-h-6 border flex items-center justify-center bg-black" onClick={() => onClick("empty")} />
);

export const CrossedCell = ({ onClick }: CellProps) => (
  <div className="min-w-6 min-h-6 border flex items-center justify-center bg-gray-300" onClick={() => onClick("empty")}>
    <X className="w-4 h-4 text-gray-600" />
  </div>
);

export const PlayableCell = ({ state, onClick }: PlayableCellProps) => {
  if (state === "correct") return <CorrectCell />;
  if (state === "filled") return <FilledCell onClick={onClick} />;
  if (state === "crossed") return <CrossedCell onClick={onClick} />;
  return <EmptyCell onClick={onClick} />;
};
