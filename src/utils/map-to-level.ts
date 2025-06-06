import { Level } from "./level";

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

  const difficulty = "easy"; // Placeholder, you can implement a difficulty calculation function if needed
  return {
    boardMap,
    topHints,
    leftHints,
    difficulty,
    maxHintSize,
    size,
  };
};
