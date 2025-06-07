import { useEffect, useState } from "react";
import { CellState } from "../../types";
import { Level } from "../../utils/level";
import { PlayableCell } from "./board-components/playable-cells";
import { LeftHintCell, TopHintCell, VoidCell } from "./board-components/hint-cells";

type BoardProps = {
  level: Level;
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;
};

export const Board = ({ level, isFinished, setIsFinished }: BoardProps) => {
  const hintSize = level.maxHintSize;
  const totalRows = level.size + hintSize;
  const totalCols = level.size + hintSize;

  const [boardKey, setBoardKey] = useState(0);
  const [board, setBoard] = useState<CellState[][]>(
    Array(level.size)
      .fill(null)
      .map(() => Array(level.size).fill("empty")),
  );

  useEffect(() => {
    setBoard(
      Array(level.size)
        .fill(null)
        .map(() => Array(level.size).fill("empty")),
    );
    setBoardKey((k) => k + 1); // Increment key to force remount
  }, [level]);

  function isGameFinished(board: CellState[][], boardMap: number[][]): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (boardMap[row][col] === 1 && board[row][col] !== "filled") return false;
        if (boardMap[row][col] === 0 && board[row][col] === "filled") return false;
      }
    }
    return true;
  }

  const toggleCell = (row: number, col: number, type: CellState) => {
    if (isFinished) return; // Prevent interaction if finished
    // console.log(`Toggling cell at (${row}, ${col}) to ${type}`);

    const newBoard = board.map((boardRow, rowIndex) =>
      boardRow.map((cellState, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return type;
        }
        return cellState;
      }),
    );

    if (isGameFinished(newBoard, level.boardMap)) {
      setIsFinished(true);
      setBoard(newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "correct" : cell))));
    } else {
      setBoard(newBoard);
    }
  };

  if (board.length !== level.size || board[0].length !== level.size) {
    console.error("Board size does not match level size");
    return null;
  }

  return (
    <div
      key={boardKey}
      style={{
        display: "grid",
        gridTemplateColumns: `${Array(hintSize).fill("auto").join(" ")} ${Array(level.size).fill("1fr").join(" ")}`,
        gridTemplateRows: `${Array(hintSize).fill("auto").join(" ")} ${Array(level.size).fill("1fr").join(" ")}`,
        width: "100%",
      }}
    >
      {/* Render grid cells */}
      {Array.from({ length: totalRows }).map((_, rowIdx) =>
        Array.from({ length: totalCols }).map((_, colIdx) => {
          // Top-left corner: void cells
          if (rowIdx < hintSize && colIdx < hintSize) {
            return <VoidCell key={`void-${rowIdx}-${colIdx}`} />;
          }
          // Top hints
          if (rowIdx < hintSize && colIdx >= hintSize) {
            const hints = level.topHints[colIdx - hintSize] ?? [];
            const hintValue = hints.length >= hintSize - rowIdx ? hints[hints.length - (hintSize - rowIdx)] : null;
            return <TopHintCell key={`top-${rowIdx}-${colIdx}`} value={hintValue} />;
          }
          // Left hints
          if (rowIdx >= hintSize && colIdx < hintSize) {
            const hints = level.leftHints[rowIdx - hintSize] ?? [];
            const hintValue = hints.length >= hintSize - colIdx ? hints[hints.length - (hintSize - colIdx)] : null;
            return <LeftHintCell key={`left-${rowIdx}-${colIdx}`} value={hintValue} />;
          }
          // Board cell: use board state for rendering
          if (rowIdx >= hintSize && colIdx >= hintSize) {
            const boardRow = rowIdx - hintSize;
            const boardCol = colIdx - hintSize;
            return (
              <PlayableCell
                key={`${rowIdx}-${colIdx}`}
                state={board[boardRow][boardCol]}
                fill={(type) => toggleCell(boardRow, boardCol, type)}
              />
            );
          }
          return null;
        }),
      )}
    </div>
  );
};
