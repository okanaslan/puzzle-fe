import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { CellState } from "../../../types";

type CellProps = {
  row: number;
  col: number;
  state: CellState;
};

const createClassName = (bgColor: string, animation?: string) =>
  `min-w-4 aspect-square border flex items-center justify-center transition-colors duration-300 ${bgColor} ${animation ?? ""}`;

export const BoardCell = ({ row, col, state }: CellProps) => {
  const cellRef = useRef<HTMLDivElement>(null);

  // Animation for should-be-crossed and should-be-correct
  useEffect(() => {
    if (state === "should-be-crossed" || state === "should-be-correct") {
      const cell = cellRef.current;
      if (cell) {
        cell.classList.add("should-be-crossed-fade");
        const timeout = setTimeout(() => {
          cell.classList.remove("bg-rose-400");
          cell.classList.add("bg-gray-300");
        }, 800); // match animation duration
        return () => clearTimeout(timeout);
      }
    }
  }, [state]);

  let content = null;
  const extraBorder = [row % 5 === 0 ? "border-t-2" : "", col % 5 === 0 ? "border-l-2" : ""].join(" ").trim();

  let className = "min-w-4 aspect-square border flex items-center justify-center transition-colors duration-300";

  switch (state) {
    case "empty":
      break;
    case "correct":
      className = createClassName("bg-gray-700");
      break;
    case "crossed":
      className = createClassName("bg-gray-300");
      content = <X className="w-4 h-4 text-gray-600" />;
      break;
    case "should-be-crossed":
      className = createClassName("bg-rose-400", "should-be-crossed-fade");
      content = <X className="w-4 h-4 text-gray-600" />;
      break;
    case "should-be-correct":
      className = createClassName("bg-green-400", "should-be-correct-fade");
      break;
    case "finished":
      className = createClassName("bg-green-400", "finish-fade");
      break;
    case "failed":
      className = createClassName("bg-rose-400", "fail-fade");
      break;
    default:
      break;
  }

  return (
    <>
      {(state === "should-be-crossed" ||
        state === "should-be-correct" ||
        state === "finished" ||
        state === "failed") && (
        <style>
          {`
            @keyframes should-be-crossed-fade {
              0%, 50% { background-color: #f87171; opacity: 1; }
              50%     { opacity: 0.2; }
              70%     { background-color: #d1d5db; opacity: 0.2; }
              100%    { background-color: #d1d5db; opacity: 1; }
            }
            .should-be-crossed-fade {
              animation: should-be-crossed-fade 1.2s ease-in-out forwards;
            }
            @keyframes should-be-correct-fade {
              0%, 50% { background-color: #f87171; opacity: 1; }
              50%     { opacity: 0.2; }
              70%     { background-color: #4ade80; opacity: 0.2; }
              100%    { background-color: #4ade80; opacity: 1; }
            }
            .should-be-correct-fade {
              animation: should-be-correct-fade 1.2s ease-in-out forwards;
            }
            @keyframes finish-fade {
              0%, 50% { background-color: #374151; opacity: 1; }
              50%     { opacity: 0.2; }
              70%     { background-color: #4ade80; opacity: 0.2; }
              100%    { background-color: #4ade80; opacity: 1; }
            }
            .finish-fade {
              animation: finish-fade 1.2s ease-in-out forwards;
            }
            @keyframes fail-fade {
              0%, 50% { background-color: #f87171; opacity: 1; }
              50%     { opacity: 0.2; }
              70%     { background-color: #374151; opacity: 0.2; }
              100%    { background-color: #374151; opacity: 1; }
            }
            .fail-fade {
              animation: fail-fade 1.2s ease-in-out forwards;
            }
          `}
        </style>
      )}
      <div
        ref={cellRef}
        id={`cell-${row}-${col}`}
        className={`${className} border-[0.5px] border-black ${extraBorder}`}
      >
        {content}
      </div>
    </>
  );
};
