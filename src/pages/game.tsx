import { useState, useEffect } from "react";

import { Level } from "../utils/level";
import { LevelGenerator } from "../utils/level-generator";
import { difficultyCalculator } from "../utils/difficulty-calculator";

import { Board } from "./game-components/board";
import { SizeButtons } from "./game-components/size-buttons";
import { DifficultyText } from "./game-components/difficulty";
import { useGame } from "../contexts/game-context";
import { ModeSwitch } from "./game-components/mode-switch";

export default function Game({ level: initialLevel }: { level: Level }) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const { setIsMouseDown, setIsTouching } = useGame();

  useEffect(() => {
    // Prevent scroll
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      // Restore scroll
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

  const handleRandomLevel = (size?: number) => {
    const randomSeed = Math.floor(Math.random() * 100000);
    const selectedLevel = LevelGenerator.generate(size ?? level.size, randomSeed);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen bg-gray-300"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
    >
      <div className="w-full max-w-xl shadow-2xl rounded-2xl flex flex-col items-center">
        <div className="h-40 w-full bg-gray-200 px-4 rounded-t-2xl flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Puzzle Game</h1>
          <SizeButtons onSelect={handleRandomLevel} />
          <DifficultyText score={difficultyCalculator(level)} handleRandomLevel={handleRandomLevel} />
        </div>
        <div className="w-full bg-gray-400 py-2 flex flex-col items-center gap-4 rounded-2xl">
          <Board level={level} isFinished={isFinished} setIsFinished={setIsFinished} />
          <ModeSwitch />
        </div>
      </div>
    </div>
  );
}
