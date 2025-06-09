import { CellProps } from "./playable-cells";

export const CorrectCell = ({ row, col }: CellProps) => (
  <div id={`cell-${row}-${col}`} className="min-w-6 min-h-6 border flex items-center justify-center bg-green-400" />
);
