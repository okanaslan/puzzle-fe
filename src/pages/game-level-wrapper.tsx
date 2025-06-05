import Game from "./game";
import { Difficultty } from "../types";
import { createLevelFromMap, randomBoardGenerator } from "../levels/levels";

export default function GameWrapper({ difficulty }: { difficulty: Difficultty }) {
  const level = parseInt(window.location.pathname.split("/").pop() || "0", 10) - 1;

  const board = randomBoardGenerator(difficulty, level);
  const selectedLevel = createLevelFromMap(board);
  return <Game level={selectedLevel} />;
}
