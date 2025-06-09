import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { CellState } from "../../../types";

type CellProps = {
  row: number;
  col: number;
  state: CellState;
};

export const BoardCell = ({ row, col, state }: CellProps) => {
  const cellRef = useRef<HTMLDivElement>(null);

  // Animation for false-correct and false-crossed
  useEffect(() => {
    if (state === "false-correct" || state === "false-crossed") {
      const cell = cellRef.current;
      if (cell) {
        cell.classList.add("false-correct-fade");
        const timeout = setTimeout(() => {
          cell.classList.remove("bg-rose-400");
          cell.classList.add(state === "false-correct" ? "bg-green-400" : "bg-green-400");
        }, 800); // match animation duration
        return () => clearTimeout(timeout);
      }
    }
  }, [state]);

  // Determine content and classes
  let content = null;
  let className = "min-w-4 aspect-square border flex items-center justify-center transition-colors duration-300";

  if (state === "empty") {
    // nothing
  } else if (state === "correct") {
    className += " bg-green-400";
  } else if (state === "crossed") {
    className += " bg-gray-300";
    content = <X className="w-4 h-4 text-gray-600" />;
  } else if (state === "false-correct") {
    className += " bg-rose-400";
    content = <X className="w-4 h-4 text-gray-600" />;
  } else if (state === "false-crossed") {
    className += " bg-rose-400";
    content = <X className="w-4 h-4 text-gray-600" />;
  }

  return (
    <>
      {(state === "false-correct" || state === "false-crossed") && (
        <style>
          {`
            @keyframes false-correct-fade {
              0%   { background-color: #f87171; opacity: 1; }
              50%  { background-color: #f87171; opacity: 0.2; }
              70%  { background-color: #4ade80; opacity: 0.2; }
              100% { background-color: #4ade80; opacity: 1; }
            }
            .false-correct-fade {
              animation: false-correct-fade 1.2s ease-in-out forwards;
            }
          `}
        </style>
      )}
      <div ref={cellRef} id={`cell-${row}-${col}`} className={className}>
        {content}
      </div>
    </>
  );
};
