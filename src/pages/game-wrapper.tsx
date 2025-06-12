import Game from "./game";
import { GameProvider } from "../contexts/game-context/game-context-provider";
import { LevelProvider } from "../contexts/level-context/level-context-provider";

export default function GameWrapper() {
  return (
    <GameProvider>
      <LevelProvider>
        <Game />
      </LevelProvider>
    </GameProvider>
  );
}
