import { BoardMap, Difficultty } from "../types";
import { easyLevels } from "./easy/easy";
import { hardLevels } from "./hard/hard";
import { mediumLevels } from "./medium/medium";

export type Level = {
  boardMap: (0 | 1)[][];
  topHints: number[][];
  leftHints: number[][];
  size: number;
  cellSize: number;
  maxHintSize: number;
};

export const levels: Record<Difficultty, Array<BoardMap>> = {
  easy: easyLevels,
  medium: mediumLevels,
  hard: hardLevels,
};

export const createLevelFromMap = (boardMap: (0 | 1)[][]): Level => {
  const size = boardMap.length;
  // Each element is an array of numbers (or nulls) for that column
  const topHints: number[][] = Array.from({ length: size }, () => []);
  const leftHints: number[][] = Array.from({ length: size }, () => []);

  // Calculate top hints (column-wise)
  for (let col = 0; col < size; col++) {
    let count = 0;
    for (let row = 0; row < size; row++) {
      if (boardMap[row][col] === 1) {
        count++;
      } else {
        if (count > 0) {
          topHints[col].push(count);
          count = 0;
        }
      }
    }
    if (count > 0) {
      topHints[col].push(count);
    }
  }

  // Calculate left hints (row-wise)
  for (let row = 0; row < size; row++) {
    let count = 0;
    for (let col = 0; col < size; col++) {
      if (boardMap[row][col] === 1) {
        count++;
      } else {
        if (count > 0) {
          leftHints[row].push(count);
          count = 0;
        }
      }
    }
    if (count > 0) {
      leftHints[row].push(count);
    }
  }

  const maxHintSize = Math.max(...topHints.map((hints) => hints.length), ...leftHints.map((hints) => hints.length));

  let cellSize: number;
  switch (size) {
    case 5:
      cellSize = 10;
      break;
    case 10:
      cellSize = 8;
      break;
    case 15:
      cellSize = 6;
      break;
    case 20:
      cellSize = 5;
      break;
    default:
      cellSize = 20;
  }

  console.log("Top hints:", topHints);
  console.log("Left hints:", leftHints);

  return {
    boardMap,
    topHints,
    leftHints,
    size,
    maxHintSize,
    cellSize,
  };
};

export const initialLevel = createLevelFromMap(levels.easy[0]);
