import { BoardCell } from "./board-components/board-cell";
import { LeftHintCell, TopHintCell, VoidCell } from "./board-components/hint-cells";
import { useGame } from "../../contexts/game-context";

export const Board = () => {
  const { board, level } = useGame();

  const hintSize = level.maxHintSize;
  const totalRows = level.size + hintSize;
  const totalCols = level.size + hintSize;

  if (board.length !== level.size || board[0].length !== level.size) {
    // console.error("Board size does not match level size");
    return null;
  }

  return (
    <div
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

            // Add a wider border every 5 rows/columns

            return (
              <BoardCell
                key={`${boardRow}-${boardCol}`}
                row={boardRow}
                col={boardCol}
                state={board[boardRow][boardCol]}
              />
            );
          }
          return null;
        }),
      )}
    </div>
  );
};
