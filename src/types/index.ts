export type CellAction = "cross" | "select";
export type CellState = "empty" | "crossed" | "correct" | "false-correct" | "false-crossed" | "finished";
export type BoardMap = (0 | 1)[][];
