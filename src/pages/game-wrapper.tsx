import Game from "./game";
import { LevelGenerator } from "../utils/level-generator";
import { GameProvider } from "../contexts/game-context/game-context-provider";

export default function GameWrapper() {
  const initialLevel = LevelGenerator.generate(5, 0);

  return (
    <GameProvider>
      <Game level={initialLevel} />
    </GameProvider>
  );
}
