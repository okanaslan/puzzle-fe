import { useState } from "react";
import { CellState } from "../../types";
import { Level } from "../../levels/levels";
import { PlayableCell } from "./board-components/playable-cell";
import { HintCell, VoidCell } from "./board-components/hint-cells";

type BoardProps = {
  level: Level;
};

export const Board = ({ level }: BoardProps) => {
  const hintSize = level.maxHintSize;
  const totalRows = level.size + hintSize;
  const totalCols = level.size + hintSize;

  const [board, setBoard] = useState<CellState[][]>(
    Array(level.size)
      .fill(null)
      .map(() => Array(level.size).fill("empty")),
  );

  const toggleCell = (row: number, col: number, type: CellState) => {
    // 1 means filled, 0 means empty
    const isCorrect =
      (type === "filled" && level.boardMap[row][col] === 1) ||
      (type === "crossed" && level.boardMap[row][col] === 0) ||
      (type === "empty" && level.boardMap[row][col] === 0);

    console.log(`Cell at (${row}, ${col}) marked as "${type}". Correct: ${isCorrect ? "Yes" : "No"}`);

    const newBoard = board.map((boardRow, rowIndex) =>
      boardRow.map((cellState, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return type;
        }
        return cellState;
      }),
    );
    setBoard(newBoard);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
        aspectRatio: "1 / 1", // Ensures width and height are equal
        width: "100%",
      }}
      className="gap-1 w-full h-full p-2"
    >
      {Array.from({ length: totalRows }).map((_, rowIdx) =>
        Array.from({ length: totalCols }).map((_, colIdx) => {
          // Top-left corner: void cells
          if (rowIdx < hintSize && colIdx < hintSize) {
            return <VoidCell key={`void-${rowIdx}-${colIdx}`} />;
          }
          // Top hints
          if (rowIdx < hintSize && colIdx >= hintSize) {
            const hints = level.topHints[colIdx - hintSize] ?? [];
            // Show the correct hint for this row in the stack (from bottom up)
            const hintValue = hints.length >= hintSize - rowIdx ? hints[hints.length - (hintSize - rowIdx)] : null;
            return <HintCell key={`top-${rowIdx}-${colIdx}`} value={hintValue} />;
          }
          // Left hints
          if (rowIdx >= hintSize && colIdx < hintSize) {
            const hints = level.leftHints[rowIdx - hintSize] ?? [];
            // Show the correct hint for this column in the stack (from right to left)
            const hintValue = hints.length >= hintSize - colIdx ? hints[hints.length - (hintSize - colIdx)] : null;
            return <HintCell key={`left-${rowIdx}-${colIdx}`} value={hintValue} />;
          }
          // Board cell
          if (rowIdx >= hintSize && colIdx >= hintSize) {
            return (
              <PlayableCell
                key={`${rowIdx}-${colIdx}`}
                state={board[rowIdx - hintSize][colIdx - hintSize]}
                onClick={(type) => toggleCell(rowIdx - hintSize, colIdx - hintSize, type)}
              />
            );
          }
          return null;
        }),
      )}
    </div>
  );
};
