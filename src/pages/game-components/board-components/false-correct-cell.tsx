import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { CellProps } from "./playable-cells";

export const FalseCorrectCell = ({ row, col }: CellProps) => {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cell = cellRef.current;
    if (cell) {
      cell.classList.add("false-correct-fade");
      const timeout = setTimeout(() => {
        cell.classList.remove("bg-rose-400");
        cell.classList.add("bg-green-400");
      }, 1200); // match animation duration
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes false-correct-fade {
            0%   { background-color: #f87171; opacity: 1; }
            50%  { background-color: #f87171; opacity: 0.2; }
            70%  { background-color: #d1d5db; opacity: 0.2; }  /* gray-300 */
            100% { background-color: #d1d5db; opacity: 1; }
          }
          .false-correct-fade {
            animation: false-correct-fade 1.2s ease-in-out forwards;
          }
        `}
      </style>
      <div
        ref={cellRef}
        id={`cell-${row}-${col}`}
        className="min-w-4 aspect-square border flex items-center justify-center bg-rose-400"
      >
        <X className="w-4 h-4 text-gray-600" />
      </div>
    </>
  );
};
