import { CellProps } from "./playable-cells";

export const EmptyCell = ({ row, col }: CellProps) => {
  return <div id={`cell-${row}-${col}`} className="min-w-4 border flex items-center justify-center aspect-square" />;
};
