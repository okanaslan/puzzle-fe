import { BoardMap, Difficultty } from "../types";
import { difficultyLevels, Level } from "./level";
import { createLevelFromMap } from "./map-to-level";
import { Random } from "./random";

export class LevelGenerator {
  static generate = (difficulty: Difficultty, seed: number): Level => {
    if (!difficultyLevels[difficulty]) {
      throw new Error(`Invalid difficulty level: ${difficulty}`);
    }
    let boardMap = this.randomBoardGenerator(difficulty, seed);
    // Rotate and increase segment sizes 3 times to add complexity
    for (let i = 0; i < 3; i++) {
      const rotatedMap = this.rotateBoardMap(boardMap);
      const increasedMap = this.increaseSegmentSizes(rotatedMap);
      boardMap = increasedMap;
    }

    const level = createLevelFromMap(boardMap);

    return level;
  };

  private static randomBoardGenerator = (difficulty: Difficultty, seed: number): BoardMap => {
    const size = difficultyLevels[difficulty];
    // Simple seeded random number generator (Linear Congruential Generator)

    const boardMap: BoardMap = Array.from({ length: size }, () => Array(size).fill(0));
    for (let row = 0; row < size; row++) {
      const randomRow = this.createRandomFilledRow(size, seed + row);
      boardMap[row] = randomRow;
    }

    return boardMap;
  };

  private static createRandomFilledRow = (size: number, seed: number) => {
    let array = Array(size).fill(0);

    let currentIndex = 0;
    while (currentIndex < size) {
      const shouldFill = Random.shouldFillSegment(seed + currentIndex);
      if (shouldFill) {
        const segmentSize = Random.getRandomSegmentSize(size - currentIndex);
        // Ensure segment size does not exceed remaining space
        if (currentIndex + segmentSize > size) {
          currentIndex += Random.getRandomGapSize(); // Randomly skip 1-3 cells
        } else {
          array = this.addSegmentToArray(currentIndex, segmentSize, array);
          currentIndex += segmentSize + Random.getRandomGapSize(); // Random gap of 0-2 cells
        }
      } else {
        currentIndex += Random.getRandomGapSize(); // Randomly skip 1-3 cells
      }
    }

    return array;
  };

  private static addSegmentToArray = (index: number, segmentSize: number, array: (0 | 1)[]) => {
    for (let i = index; i < index + segmentSize && i < array.length; i++) {
      array[i] = 1; // Fill the segment with 1s
    }
    return array;
  };

  private static rotateBoardMap = (boardMap: BoardMap): BoardMap => {
    const size = boardMap.length;
    const rotatedMap: BoardMap = Array.from({ length: size }, () => Array(size).fill(0));

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        rotatedMap[col][size - 1 - row] = boardMap[row][col];
      }
    }

    return rotatedMap;
  };

  private static increaseSegmentSizes = (boardMap: BoardMap): BoardMap => {
    const size = boardMap.length;
    const newBoardMap: BoardMap = Array.from({ length: size }, () => Array(size).fill(0));

    for (let row = 0; row < size; row++) {
      newBoardMap[row] = this.increaseSegmentSizesInRow(boardMap[row], size);
    }

    return newBoardMap;
  };

  private static increaseSegmentSizesInRow = (row: (0 | 1)[], size: number): (0 | 1)[] => {
    const updatedRow = [...row];
    let idx = 0;

    while (idx < size) {
      if (updatedRow[idx] === 1) {
        let originalSegmentLength = 0;
        while (idx + originalSegmentLength < size && updatedRow[idx + originalSegmentLength] === 1) {
          originalSegmentLength++;
        }
        const extraLength = Random.getLogDistributedRandom(0, 2); // Increase segment size by 1-3 cells
        if (originalSegmentLength < size - idx) {
          for (let offset = 0; offset < originalSegmentLength + extraLength && idx + offset < size; offset++) {
            updatedRow[idx + offset] = 1;
          }
        }
        idx += originalSegmentLength + 1; // Move to the next segment
      } else {
        idx++;
      }
    }

    return updatedRow;
  };
}
