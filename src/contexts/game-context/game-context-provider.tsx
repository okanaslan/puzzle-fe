import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { GameContext } from "./game-context";
import { CellAction, CellState } from "../../types";
import { Level } from "../../utils/level";
import { LevelGenerator } from "../../utils/level-generator";

export interface GameContextProps {
  level: Level;
  setLevel: React.Dispatch<React.SetStateAction<Level>>;
  isFinished: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  board: CellState[][];
  setBoard: React.Dispatch<React.SetStateAction<CellState[][]>>;
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
  clickMode: "fill" | "cross";
  setClickMode: React.Dispatch<React.SetStateAction<"fill" | "cross">>;
  lives: {
    max: number;
    current: number;
  };

  // Functions
  changeLevel: (size?: number) => void;
  fillCell: (row: number, col: number, action: CellAction) => void;
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clickMode, setClickMode] = useState<"fill" | "cross">("fill");
  // const [boardKey, setBoardKey] = useState(0);

  const initialLevel = useMemo(() => LevelGenerator.generate(5), []);
  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [board, setBoard] = useState<CellState[][]>(
    Array(level.size)
      .fill(null)
      .map(() => Array(level.size).fill("empty")),
  );

  const lives = useMemo(() => {
    return {
      max: 3,
      current: 3,
    };
  }, [level]);

  useEffect(() => {
    setBoard(
      Array(level.size)
        .fill(null)
        .map(() => Array(level.size).fill("empty")),
    );
    // setBoardKey((k) => k + 1); // Increment key to force remount
  }, [level]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const id = element?.id;
      if (!id) return;
      const [row, col] = id.split("-").slice(1).map(Number);
      if (isNaN(row) || isNaN(col)) return;

      // TODO: Sadece ayni dogrultudakileri işle
      if (clickMode === "fill") {
        fillCell(row, col, "select");
      } else if (clickMode === "cross") {
        fillCell(row, col, "cross");
      }
    };

    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [board, clickMode]);

  function isGameFinished(board: CellState[][], boardMap: number[][]): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (boardMap[row][col] === 1 && board[row][col] !== "correct") return false;
        if (boardMap[row][col] === 0 && board[row][col] === "correct") return false;
      }
    }
    return true;
  }

  const changeLevel = (size?: number) => {
    const selectedLevel = LevelGenerator.generate(size ?? level.size);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  const fillCell = (row: number, col: number, action: CellAction) => {
    if (isFinished) return; // Prevent interaction if finished

    const isCorrect = level.boardMap[row][col] === 1;

    const newBoard = board.map((boardRow, rowIndex) =>
      boardRow.map((cellState, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (isCorrect && action === "select") {
            return "correct";
          } else if (!isCorrect && action === "select") {
            lives.current -= 1;
            return "false-correct";
          } else if (!isCorrect && action === "cross") {
            return "crossed";
          } else if (isCorrect && action === "cross") {
            lives.current -= 1;
            return "false-crossed";
          }
        }
        return cellState;
      }),
    );

    if (lives.current <= 0) {
      setIsFinished(true);
      setBoard(newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "correct" : cell))));
      return;
    }

    if (isGameFinished(newBoard, level.boardMap)) {
      setIsFinished(true);
      setBoard(newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "correct" : cell))));
    } else {
      setBoard(newBoard);
    }
  };

  return (
    <GameContext.Provider
      value={{
        level,
        setLevel,
        isFinished,
        setIsFinished,
        board,
        setBoard,
        isMouseDown,
        setIsMouseDown,
        clickMode,
        setClickMode,
        lives,

        // Functions
        changeLevel,
        fillCell,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
