import { createContext } from "react";
import { LevelContextProps } from "./level-context-provider";

export const LevelContext = createContext<LevelContextProps | undefined>(undefined);
