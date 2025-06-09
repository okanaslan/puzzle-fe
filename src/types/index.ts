export type CellAction = "cross" | "select";
export type CellState =
  | "empty"
  | "crossed"
  | "correct"
  | "should-be-crossed"
  | "should-be-correct"
  | "finished"
  | "failed";
export type BoardMap = (0 | 1)[][];
