import { useContext } from "react";

import { LevelContext } from "./level-context";
import { LevelContextProps } from "./level-context-provider";

export const useLevel = (): LevelContextProps => {
  const context = useContext(LevelContext);
  if (!context) {
    throw new Error("useLevel must be used within a LevelProvider");
  }
  return context;
};
