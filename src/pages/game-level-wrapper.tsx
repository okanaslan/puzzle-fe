import Game from "./game";
import { Difficultty } from "../types";
import { levels } from "../levels/levels";
import { createLevelFromMap } from "../levels/levels";

export default function GameWrapper({ difficulty }: { difficulty: Difficultty }) {
  const level = parseInt(window.location.pathname.split("/").pop() || "0", 10) - 1;

  const board = levels[difficulty][level];
  const selectedLevel = createLevelFromMap(board);
  return <Game level={selectedLevel} />;
}
