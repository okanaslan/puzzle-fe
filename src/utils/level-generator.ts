import { BoardMap } from "../types";
import { Level } from "./level";
import { createLevelFromMap } from "./map-to-level";
import { Random } from "./random";

export class LevelGenerator {
  static readonly DEFAULT_MAX_RETRIES = 5;

  static generate = (size: number): Level => {
    let boardMap = this.randomBoardGenerator(size);

    // Rotate and increase segment sizes 3 times to add complexity
    let level = createLevelFromMap(boardMap);
    let maxHintSize = Math.max(
      ...level.topHints.map((hints) => hints.length),
      ...level.leftHints.map((hints) => hints.length),
    );
    let minHintSize = Math.min(
      ...level.topHints.map((hints) => hints.length),
      ...level.leftHints.map((hints) => hints.length),
    );

    let retryCount = 0;
    while (maxHintSize > size / 5 + 1 || minHintSize === 0) {
      const rotatedMap = this.rotateBoardMap(boardMap);
      boardMap = this.increaseSegmentSizes(rotatedMap);
      level = createLevelFromMap(boardMap);

      maxHintSize = Math.max(
        ...level.topHints.map((hints) => hints.length),
        ...level.leftHints.map((hints) => hints.length),
      );
      minHintSize = Math.min(
        ...level.topHints.map((hints) => hints.length),
        ...level.leftHints.map((hints) => hints.length),
      );

      const maxRetries = this.DEFAULT_MAX_RETRIES;
      if (++retryCount >= maxRetries) {
        // console.warn(`Max retries reached (${maxRetries}). Generating a new random board.`);
        boardMap = this.randomBoardGenerator(size);
      }
    }

    return level;
  };

  private static randomBoardGenerator = (size: number): BoardMap => {
    const boardMap: BoardMap = Array.from({ length: size }, () => Array(size).fill(0));
    for (let row = 0; row < size; row++) {
      const randomRow = this.createRandomFilledRow(size);
      boardMap[row] = randomRow;
    }

    return boardMap;
  };

  private static createRandomFilledRow = (size: number) => {
    let array = Array(size).fill(0);

    let currentIndex = 0;
    while (currentIndex < size) {
      const shouldFill = Random.shouldFillSegment();
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

  private static increaseSegmentSizes = (boardMap: BoardMap): BoardMap => {
    const size = boardMap.length;
    const newBoardMap: BoardMap = Array.from({ length: size }, () => Array(size).fill(0));

    for (let row = 0; row < size; row++) {
      newBoardMap[row] = this.increaseSegmentSizesInRow(boardMap[row], size);
    }

    return newBoardMap;
  };
}
