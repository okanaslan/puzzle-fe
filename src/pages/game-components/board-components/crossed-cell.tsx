import { X } from "lucide-react";
import { CellProps } from "./playable-cells";

export const CrossedCell = ({ row, col }: CellProps) => {
  return (
    <div
      id={`cell-${row}-${col}`}
      className="min-w-4 aspect-square border flex items-center justify-center bg-gray-300"
    >
      <X className="w-4 h-4 text-gray-600" />
    </div>
  );
};
