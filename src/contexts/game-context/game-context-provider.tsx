import React, { ReactNode, useEffect, useState } from "react";
import { GameContext } from "./game-context";
import { CellState } from "../../types";
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
  mouseDownState: "cross" | "fill" | "empty-cross" | "empty-fill" | null;
  setMouseDownState: React.Dispatch<React.SetStateAction<"cross" | "fill" | "empty-cross" | "empty-fill" | null>>;

  // Functions
  changeLevel: (size?: number) => void;
  fillCell: (row: number, col: number, type: CellState) => void;
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseDownState, setMouseDownState] = useState<"cross" | "fill" | "empty-cross" | "empty-fill" | null>(null);
  const [clickMode, setClickMode] = useState<"fill" | "cross">("fill");
  // const [boardKey, setBoardKey] = useState(0);

  const initialLevel = React.useMemo(() => LevelGenerator.generate(5), []);
  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [board, setBoard] = useState<CellState[][]>(
    Array(level.size)
      .fill(null)
      .map(() => Array(level.size).fill("empty")),
  );

  useEffect(() => {
    setBoard(
      Array(level.size)
        .fill(null)
        .map(() => Array(level.size).fill("empty")),
    );
    // setBoardKey((k) => k + 1); // Increment key to force remount
  }, [level]);

  useEffect(() => {
    setMouseDownState("fill");
  }, [setIsMouseDown]);

  // useEffect(() => {
  //   const onTouchMove = (event: TouchEvent) => {
  //     const touch = event.touches[0];
  //     console.log("Touch move detected:", touch.clientX, touch.clientY);
  //     const element = document.elementFromPoint(touch.clientX, touch.clientY);
  //     const id = element?.id;
  //     if (!id) return;

  //     const [row, col] = id.split("-").map(Number);
  //     const cell = board[row - 1][col - 1];

  //     if (touch && handleGlobalTouchMove.current) {
  //       handleGlobalTouchMove.current(touch.clientX, touch.clientY);
  //     }
  //   };
  //   document.addEventListener("touchmove", onTouchMove, { passive: false });
  //   return () => document.removeEventListener("touchmove", onTouchMove);
  // }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const id = element?.id;
      if (!id) return;
      const [row, col] = id.split("-").slice(1).map(Number);
      if (isNaN(row) || isNaN(col)) return;

      if (mouseDownState === "empty-fill") {
        fillCell(row, col, "empty");
      } else if (mouseDownState === "empty-cross") {
        fillCell(row, col, "empty");
      } else if (mouseDownState === "fill") {
        fillCell(row, col, "filled");
      } else if (mouseDownState === "cross") {
        fillCell(row, col, "crossed");
      }
    };

    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [board, mouseDownState]);

  function isGameFinished(board: CellState[][], boardMap: number[][]): boolean {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (boardMap[row][col] === 1 && board[row][col] !== "filled") return false;
        if (boardMap[row][col] === 0 && board[row][col] === "filled") return false;
      }
    }
    return true;
  }

  const changeLevel = (size?: number) => {
    const selectedLevel = LevelGenerator.generate(size ?? level.size);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  const fillCell = (row: number, col: number, type: CellState) => {
    if (isFinished) return; // Prevent interaction if finished
    // console.log(`Filling cell at (${row}, ${col}) with ${type}`);

    const newBoard = board.map((boardRow, rowIndex) =>
      boardRow.map((cellState, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return type;
        }
        return cellState;
      }),
    );

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
        mouseDownState,
        setMouseDownState,

        // Functions
        changeLevel,
        fillCell,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
