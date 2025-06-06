// This function calculates the difficulty of a given level based on the number fiscributions of the filled cells,
// If for a given row it is obvious that with cells will be filled, it will not count towards the difficulty.
// Same for columns.
// If a Row or Column has few filled cells, it will be considered more difficult.
// Whe should first calculate difficulty of each row and column, then take the sum of those values.
// Ex: if a row has 15 cells and cells 1-7, 8-10, 11-15 are filled, it will be considered easy. Because all fills are obvious.
// Ex: IF a row has 15 cells and cells 1-5, 9-12 are filled, it will be considered more difficult.
// Ex: If a row has 15 cells and cells 4-7, it will be considered very difficult, because it is not obvious where the filled cells are.

import { Level } from "./level";

// Returns a score between 0 and 100, where higher scores indicate more difficult boards.
export const difficultyCalculator = (level: Level): number => {
  const { topHints, leftHints, size } = level;

  // Helper: score a hint array (more segments and smaller segments = harder)
  const scoreHints = (hints: number[][]) => {
    return hints.reduce((sum, hintArr) => {
      const isEmpty = hintArr.length === 0 || (hintArr.length === 1 && hintArr[0] === 0);
      if (isEmpty) return sum;

      const filledCellCount = hintArr.reduce((a, b) => a + b, 0);
      const hintCount = hintArr.length;
      const isFull = filledCellCount + hintCount - 1 === size;
      if (isFull) return sum;

      const closenessToFull = filledCellCount / size;

      const segments = hintArr.length;
      const avgSegment = hintArr.reduce((a, b) => a + b, 0) / segments;
      const segmentScore = (segments / size) * 30;
      const avgScore = (1 - avgSegment / size) * 70;

      // Apply closenessToFull as a multiplier (less filled = higher impact)
      const rowScore = (segmentScore + avgScore) * (1 - closenessToFull);

      return sum + rowScore;
    }, 0);
  };

  // Score all rows and columns
  const rowScore = scoreHints(leftHints);
  const colScore = scoreHints(topHints);

  // Normalize to 0-100
  const maxScore = 2 * size * 100;
  const totalScore = ((rowScore + colScore) / maxScore) * 100;

  // Clamp between 0 and 100
  return Math.round(Math.max(0, Math.min(100, totalScore)));
};
