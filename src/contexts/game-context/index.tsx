import { useContext } from "react";

import { GameContext } from "./game-context";
import { GameContextProps } from "./game-context-provider";

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
