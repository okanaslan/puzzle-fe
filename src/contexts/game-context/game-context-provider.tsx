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
  }, [board, clickMode]);

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
        // All cells that should be filled must be "correct" or "should-be-correct"
        if (boardMap[row][col] === 1 && board[row][col] !== "correct" && board[row][col] !== "should-be-correct") {
          return false;
        }
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

    const shouldSelect = level.boardMap[row][col] === 1;

    const newBoard = board.map((boardRow, rowIndex) =>
      boardRow.map((cellState, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (shouldSelect && action === "select") {
            return "correct";
          } else if (!shouldSelect && action === "cross") {
            return "crossed";
          } else if (!shouldSelect && action === "select") {
            lives.current -= 1;
            return "should-be-crossed";
          } else if (shouldSelect && action === "cross") {
            lives.current -= 1;
            return "should-be-correct";
          }
        }
        return cellState;
      }),
    );

    if (lives.current <= 0) {
      setIsFinished(true);
      setBoard(newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "failed" : cell))));
      return;
    }
    if (isGameFinished(newBoard, level.boardMap)) {
      setIsFinished(true);
      setBoard(newBoard.map((rowArr, i) => rowArr.map((cell, j) => (level.boardMap[i][j] === 1 ? "finished" : cell))));
      return;
    }

    setBoard(newBoard);
  };

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

  useEffect(() => {
    let lastShake = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;

    function handleMotion(event: DeviceMotionEvent) {
      if (
        event.accelerationIncludingGravity &&
        event.accelerationIncludingGravity.x !== null &&
        event.accelerationIncludingGravity.y !== null &&
        event.accelerationIncludingGravity.z !== null
      ) {
        const { x, y, z } = event.accelerationIncludingGravity;
        if (lastX !== null && lastY !== null && lastZ !== null) {
          const deltaX = Math.abs(x - lastX);
          const deltaY = Math.abs(y - lastY);
          const deltaZ = Math.abs(z - lastZ);

          // Simple shake detection threshold
          if (deltaX + deltaY + deltaZ > 25) {
            const now = Date.now();
            if (now - lastShake > 1000) {
              // prevent rapid toggling
              setClickMode((prev) => (prev === "fill" ? "cross" : "fill"));
              lastShake = now;
            }
          }
        }
        lastX = x;
        lastY = y;
        lastZ = z;
      }
    }

    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

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
