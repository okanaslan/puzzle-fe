import { Difficultty } from "../types";

export type Level = {
  difficulty: Difficultty;
  size: number;
  boardMap: (0 | 1)[][];
  topHints: number[][];
  leftHints: number[][];
  maxHintSize: number;
};

export const difficultyLevels: Record<Difficultty, number> = {
  beginner: 5,
  easy: 10,
  medium: 15,
  hard: 20,
  expert: 25,
};

export const difficultyFillLevel: Record<Difficultty, number> = {
  beginner: 50,
  easy: 45,
  medium: 40,
  hard: 35,
  expert: 40,
};
