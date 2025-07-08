import { CellState } from "../types";

export function isLevelFinished(board: CellState[][], boardMap: number[][]): boolean {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      // All cells that should be filled must be "correct" or "should-be-correct"
      if (boardMap[row][col] === 1 && board[row][col] !== "correct" && board[row][col] !== "should-be-correct") {
        return false;
      }
    }
  }
  return true;
}

export function isRowFinished(board: CellState[][], rowIndex: number, boardMap: number[][]): boolean {
  for (let col = 0; col < board[rowIndex].length; col++) {
    if (
      boardMap[rowIndex][col] === 1 &&
      board[rowIndex][col] !== "correct" &&
      board[rowIndex][col] !== "should-be-correct"
    ) {
      return false;
    }
  }
  return true;
}

export function isColumnFinished(board: CellState[][], colIndex: number, boardMap: number[][]): boolean {
  for (let row = 0; row < board.length; row++) {
    if (
      boardMap[row][colIndex] === 1 &&
      board[row][colIndex] !== "correct" &&
      board[row][colIndex] !== "should-be-correct"
    ) {
      return false;
    }
  }
  return true;
}
