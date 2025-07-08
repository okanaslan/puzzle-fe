import { BoardCell } from "./board-components/board-cell";
import { LeftHintCell, TopHintCell, VoidCell } from "./board-components/hint-cells";
import { useGame } from "../../contexts/game-context";
import { useLevel } from "../../contexts/level-context";

export const Board = () => {
  const { level } = useGame();
  const { board } = useLevel();

  const hintSize = level.maxHintSize;
  const totalRows = level.size + hintSize;
  const totalCols = level.size + hintSize;

  if (board.length !== level.size || board[0].length !== level.size) {
    return null;
  }

  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `repeat(${level.maxHintSize}, auto) repeat(${level.size}, minmax(2px, 50px))`,
      }}
    >
      {Array.from({ length: totalRows }).map((_, rowIdx) =>
        Array.from({ length: totalCols }).map((_, colIdx) => {
          if (rowIdx < hintSize && colIdx < hintSize) {
            return <VoidCell key={`void-${rowIdx}-${colIdx}`} />;
          }
          if (rowIdx < hintSize && colIdx >= hintSize) {
            const hints = level.topHints[colIdx - hintSize] ?? [];
            const hintValue = hints.length >= hintSize - rowIdx ? hints[hints.length - (hintSize - rowIdx)] : null;
            return <TopHintCell key={`top-${rowIdx}-${colIdx}`} value={hintValue} />;
          }
          if (rowIdx >= hintSize && colIdx < hintSize) {
            const hints = level.leftHints[rowIdx - hintSize] ?? [];
            const hintValue = hints.length >= hintSize - colIdx ? hints[hints.length - (hintSize - colIdx)] : null;
            return <LeftHintCell key={`left-${rowIdx}-${colIdx}`} value={hintValue} />;
          }
          if (rowIdx >= hintSize && colIdx >= hintSize) {
            const boardRow = rowIdx - hintSize;
            const boardCol = colIdx - hintSize;
            return (
              <BoardCell
                key={`${boardRow}-${boardCol}`}
                row={boardRow}
                col={boardCol}
                state={board[boardRow][boardCol]}
              />
            );
          }
        }),
      )}
    </div>
  );
};
