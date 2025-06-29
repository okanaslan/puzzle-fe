import React, { ReactNode, useMemo, useState } from "react";
import { GameContext } from "./game-context";
import { Level } from "../../utils/level";
import { LevelGenerator } from "../../utils/level-generator";

export interface GameContextProps {
  level: Level;
  isFinished: boolean;
  lives: {
    max: number;
    current: number;
  };

  // Functions
  newLevel: (size?: number) => void;
  finishLevel: () => void;
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialLevel = useMemo(() => LevelGenerator.generate(5), []);

  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const lives = useMemo(() => ({ max: 3, current: 3 }), []);

  // MARK: Functions
  const newLevel = (size?: number) => {
    const selectedLevel = LevelGenerator.generate(size ?? level.size);
    lives.current = lives.max; // Reset lives
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  const finishLevel = () => {
    setIsFinished(true);
  };

  return (
    <GameContext.Provider
      value={{
        level,
        isFinished,
        lives,

        // Functions
        newLevel,
        finishLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
