import { Difficultty } from "../types";

export type Level = {
  difficulty: Difficultty;
  size: number;
  boardMap: (0 | 1)[][];
  topHints: number[][];
  leftHints: number[][];
  maxHintSize: number;
};
