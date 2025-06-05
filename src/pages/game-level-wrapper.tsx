import Game from "./game";
import { Difficultty } from "../types";
import { randomLevelGenerator } from "../levels/levels";

export default function GameWrapper({ difficulty }: { difficulty: Difficultty }) {
  const level = parseInt(window.location.pathname.split("/").pop() || "0", 10) - 1;

  const selectedLevel = randomLevelGenerator(difficulty, level);
  return <Game level={selectedLevel} />;
}
