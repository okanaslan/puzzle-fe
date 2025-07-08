import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { LevelContext } from "./level-context";
import { CellAction, CellState } from "../../types";
import { useGame } from "../game-context";
import { useSound } from "../../hooks/sound";
import { isColumnFinished, isLevelFinished, isRowFinished } from "../../utils/board-utils";

export interface LevelContextProps {
  board: CellState[][];
  clickMode: "fill" | "cross";
  setClickMode: React.Dispatch<React.SetStateAction<"fill" | "cross">>;
}

export const LevelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { level, lives, isFinished, finishLevel } = useGame();

  const [clickMode, setClickMode] = useState<"fill" | "cross">("fill");
  const [board, setBoard] = useState<CellState[][]>(
    Array(level.size)
      .fill(null)
      .map(() => Array(level.size).fill("empty")),
  );
  const dragStartRef = useRef<{ row: number; col: number } | null>(null);
  const correctClickSound = useSound("/sounds/click-select.wav");
  const correctCrossSound = useSound("/sounds/click-cross.wav");
  const wrongClickSound = useSound("/sounds/wrong-click.wav");

  useEffect(() => {
    setBoard(
      Array(level.size)
        .fill(null)
        .map(() => Array(level.size).fill("empty")),
    );
  }, [level]);

  const fillCell = useCallback(
    (row: number, col: number, action: CellAction) => {
      if (isFinished) return; // Prevent interaction if finished

      if (board[row][col] !== "empty") {
        return;
      }

      const shouldSelect = level.boardMap[row][col] === 1;

      const newBoard = board.map((boardRow, rowIndex) =>
        boardRow.map((cellState, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            if (shouldSelect && action === "select") {
              correctClickSound();
              return "correct";
            } else if (!shouldSelect && action === "cross") {
              correctCrossSound();
              return "crossed";
            } else if (!shouldSelect && action === "select") {
              wrongClickSound();
              lives.current -= 1;
              return "should-be-crossed";
            } else if (shouldSelect && action === "cross") {
              wrongClickSound();
              lives.current -= 1;
              return "should-be-correct";
            }
          }
          return cellState;
        }),
      );

      if (isRowFinished(newBoard, row, level.boardMap)) {
        level.boardMap[row].forEach((value, colIndex) => {
          if (value === 0) {
            newBoard[row][colIndex] = "crossed";
          }
        });
      }
      if (isColumnFinished(newBoard, col, level.boardMap)) {
        for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
          if (level.boardMap[rowIndex][col] === 0) {
            newBoard[rowIndex][col] = "crossed";
          }
        }
      }
      if (lives.current <= 0) {
        setBoard(newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "failed" : cell))));
        finishLevel();
        return;
      }
      if (isLevelFinished(newBoard, level.boardMap)) {
        setBoard(
          newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "finished" : cell))),
        );
        finishLevel();
        return;
      }

      setBoard(newBoard);
    },
    [board, finishLevel, isFinished, level.boardMap, lives, correctClickSound, correctCrossSound, wrongClickSound],
  );

  const fillElement = useCallback(
    (element: Element | null) => {
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
    },
    [clickMode, fillCell],
  );

  // MARK: Event Listeners
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

    const handleMouseDown = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
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

    const handleMouseUp = () => {
      dragStartRef.current = null;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [board, clickMode, fillElement]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      fillElement(element);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragStartRef.current) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        fillElement(element);
      }
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // console.log("Removing touchmove listener");
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [board, clickMode, fillElement]);

  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        setClickMode((prev) => (prev === "fill" ? "cross" : "fill"));
        // Prevent page scroll on space
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, []);

  return (
    <LevelContext.Provider
      value={{
        board,
        clickMode,
        setClickMode,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
};
