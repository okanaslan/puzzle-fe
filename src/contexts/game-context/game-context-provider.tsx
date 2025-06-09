import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
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
  clickMode: "fill" | "cross";
  setClickMode: React.Dispatch<React.SetStateAction<"fill" | "cross">>;
  lives: {
    max: number;
    current: number;
  };

  // Functions
  newLevel: (size?: number) => void;
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialLevel = useMemo(() => LevelGenerator.generate(5), []);

  const [clickMode, setClickMode] = useState<"fill" | "cross">("fill");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    setBoard(
      Array(level.size)
        .fill(null)
        .map(() => Array(level.size).fill("empty")),
    );
  }, [level]);

  // Track drag start position
  const dragStartRef = useRef<{ row: number; col: number } | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const id = element?.id;
      if (!id) return;
      const [row, col] = id.split("-").slice(1).map(Number);
      if (isNaN(row) || isNaN(col)) return;
      dragStartRef.current = { row, col };

      fillElement(element);
    };

    const handleTouchEnd = () => {
      dragStartRef.current = null;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [board, clickMode]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      fillElement(element);
    };

    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      // console.log("Removing touchmove listener");
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [board, clickMode]);

  function fillElement(element: Element | null) {
    const id = element?.id;
    if (!id) return;
    const [row, col] = id.split("-").slice(1).map(Number);
    if (isNaN(row) || isNaN(col)) return;

    // Only process cells in the same direction as drag start
    if (dragStartRef.current) {
      const { row: startRow, col: startCol } = dragStartRef.current;
      if (row !== startRow && col !== startCol) return; // Not same row or col
    } else {
      dragStartRef.current = { row, col };
    }

    if (clickMode === "fill") {
      fillCell(row, col, "select");
    } else if (clickMode === "cross") {
      fillCell(row, col, "cross");
    }
  }

  function isGameFinished(board: CellState[][], boardMap: number[][]): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (boardMap[row][col] === 1 && board[row][col] !== "correct") return false;
        if (boardMap[row][col] === 0 && board[row][col] === "correct") return false;
      }
    }
    return true;
  }

  // MARK: Functions
  const newLevel = (size?: number) => {
    const selectedLevel = LevelGenerator.generate(size ?? level.size);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  const fillCell = (row: number, col: number, action: CellAction) => {
    if (isFinished) return; // Prevent interaction if finished

    if (board[row][col] !== "empty") {
      return;
    }

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
      return;
    }

    setBoard(newBoard);
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
        clickMode,
        setClickMode,
        lives,

        // Functions
        newLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
