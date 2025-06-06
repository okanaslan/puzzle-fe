import { createContext } from "react";
import { GameContextProps } from "./game-context-provider";

export const GameContext = createContext<GameContextProps | undefined>(undefined);
