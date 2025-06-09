import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { CellState } from "../../../types";

type CellProps = {
  row: number;
  col: number;
  state: CellState;
};

const createClassName = (bgColor: string, animation?: string) => {
  return `min-w-4 aspect-square border flex items-center justify-center transition-colors duration-300 ${bgColor} ${animation}`;
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
    className = createClassName("bg-gray-700");
  } else if (state === "crossed") {
    className = createClassName("bg-gray-300");
    content = <X className="w-4 h-4 text-gray-600" />;
  } else if (state === "false-correct") {
    className = createClassName("bg-rose-400", "false-correct-fade");
    content = <X className="w-4 h-4 text-gray-600" />;
  } else if (state === "false-crossed") {
    className = createClassName("bg-green-400", "false-crossed-fade");
  } else if (state === "finished") {
    className = createClassName("bg-green-400", "finish-fade");
  } else if (state === "failed") {
    className = createClassName("bg-rose-400", "fail-fade");
  }
  return (
    <>
      {(state === "false-correct" || state === "false-crossed") && (
        <style>
          {`
            @keyframes false-correct-fade {
              0%   { background-color: #f87171; opacity: 1; }
              50%  { background-color: #f87171; opacity: 0.2; }
              70%  { background-color: #d1d5db; opacity: 0.2; }
              100% { background-color: #d1d5db; opacity: 1; }
            }
            .false-correct-fade {
              animation: false-correct-fade 1.2s ease-in-out forwards;
            }
            @keyframes false-crossed-fade {
              0%   { background-color: #f87171; opacity: 1; }
              50%  { background-color: #f87171; opacity: 0.2; }
              70%  { background-color: #4ade80; opacity: 0.2; }
              100% { background-color: #4ade80; opacity: 1; }
            }
            .false-crossed-fade {
              animation: false-crossed-fade 1.2s ease-in-out forwards;
            }
            @keyframes finish-fade {
              0%   { background-color: #374151; opacity: 1; }
              50%  { background-color: #374151; opacity: 0.2; }
              70%  { background-color: #4ade80; opacity: 0.2; }
              100% { background-color: #4ade80; opacity: 1; }
            }
            .finish-fade {
              animation: finish-fade 1.2s ease-in-out forwards;
            }
            @keyframes fail-fade {
              0%   { background-color: #f87171; opacity: 1; }
              50%  { background-color: #f87171; opacity: 0.2; }
              70%  { background-color: #374151; opacity: 0.2; }
              100% { background-color: #374151; opacity: 1; }
            }
            .fail-fade {
              animation: fail-fade 1.2s ease-in-out forwards;
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
