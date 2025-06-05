import { BoardMap, Difficultty } from "../types";

export type Level = {
  difficulty: Difficultty;
  size: number;
  boardMap: (0 | 1)[][];
  topHints: number[][];
  leftHints: number[][];
  cellSize: number;
  maxHintSize: number;
};

const difficultyLevels: Record<Difficultty, number> = {
  easy: 5,
  medium: 9,
  hard: 12,
};

export const randomLevelGenerator = (difficulty: Difficultty, seed: number): Level => {
  if (!difficultyLevels[difficulty]) {
    throw new Error(`Invalid difficulty level: ${difficulty}`);
  }
  const boardMap = randomBoardGenerator(difficulty, seed);
  const level = createLevelFromMap(boardMap);

  console.log(level);
  return level;
};

const randomBoardGenerator = (difficulty: Difficultty, seed: number): BoardMap => {
  const size = difficultyLevels[difficulty];
  // Simple seeded random number generator (Linear Congruential Generator)
  let s = seed;
  function seededRandom() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }

  const maxFilledCells = Math.floor((size * size * 2) / 3); // Fill up to 67% of the cells
  let filledCells = 0;

  const boardMap: BoardMap = Array.from({ length: size }, () => Array(size).fill(0));
  while (filledCells < maxFilledCells) {
    const row = Math.floor(seededRandom() * size);
    const col = Math.floor(seededRandom() * size);
    if (boardMap[row][col] === 0) {
      boardMap[row][col] = 1; // Place a single filled cell randomly
      filledCells++;
    }
  }

  return boardMap;
};

const createLevelFromMap = (boardMap: (0 | 1)[][]): Level => {
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

  const difficulty = Object.keys(difficultyLevels).find(
    (key) => difficultyLevels[key as Difficultty] === size,
  ) as Difficultty;
  return {
    boardMap,
    topHints,
    leftHints,
    difficulty,
    maxHintSize,
    cellSize,
    size,
  };
};

export const initialLevel = randomLevelGenerator("easy", 0);
