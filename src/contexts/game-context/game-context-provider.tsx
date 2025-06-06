import React, { ReactNode, useEffect, useState } from "react";
import { GameContext } from "./game-context";

export interface GameContextProps {
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  isTouching: boolean;
  setIsTouching: React.Dispatch<React.SetStateAction<boolean>>;
  clickMode: "fill" | "cross";
  setClickMode: React.Dispatch<React.SetStateAction<"fill" | "cross">>;
  mouseDownState: "cross" | "fill" | "empty-cross" | "empty-fill" | null;
  setMouseDownState: React.Dispatch<React.SetStateAction<"cross" | "fill" | "empty-cross" | "empty-fill" | null>>;
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [mouseDownState, setMouseDownState] = useState<"cross" | "fill" | "empty-cross" | "empty-fill" | null>(null);

  useEffect(() => {
    setMouseDownState("fill");
  }, [setIsMouseDown, setIsTouching]);

  const [clickMode, setClickMode] = useState<"fill" | "cross">("fill");

  return (
    <GameContext.Provider
      value={{
        isMouseDown,
        setIsMouseDown,
        isTouching,
        setIsTouching,
        clickMode,
        setClickMode,
        mouseDownState,
        setMouseDownState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
