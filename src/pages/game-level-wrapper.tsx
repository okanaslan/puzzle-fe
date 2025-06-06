import Game from "./game";
import { Difficultty } from "../types";
import { LevelGenerator } from "../utils/level-generator";

export default function GameWrapper({ difficulty }: { difficulty: Difficultty }) {
  const level = parseInt(window.location.pathname.split("/").pop() || "0", 10) - 1;

  const selectedLevel = LevelGenerator.generate(difficulty, level);
  return <Game level={selectedLevel} />;
}
