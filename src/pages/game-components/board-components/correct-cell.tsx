import { CellProps } from "./playable-cells";

export const CorrectCell = ({ row, col }: CellProps) => (
  <div
    id={`cell-${row}-${col}`}
    className="min-w-4 aspect-square border flex items-center justify-center bg-green-400"
  />
);
