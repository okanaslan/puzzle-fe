import Game from "./game";
import { GameProvider } from "../contexts/game-context/game-context-provider";

export default function GameWrapper() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
