import { useState, useEffect } from "react";

import { Level } from "../utils/level";
import { LevelGenerator } from "../utils/level-generator";
import { difficultyCalculator } from "../utils/difficulty-calculator";

import { Board } from "./game-components/board";
import { SizeSlider } from "./game-components/size-slider";
import { DifficultyText } from "./game-components/difficulty";
import { useGame } from "../contexts/game-context";
import { ModeSwitch } from "./game-components/mode-switch";

export default function Game({ level: initialLevel }: { level: Level }) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const { setIsMouseDown } = useGame();

  useEffect(() => {
    // Prevent scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scroll
      document.body.style.overflow = "";
    };
  }, []);

  const handleRandomLevel = (config: { size?: number; difficulty?: number } | undefined) => {
    const selectedLevel = LevelGenerator.generate(config?.size ?? level.size);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onTouchStart={() => setIsMouseDown(true)}
      onTouchEnd={() => setIsMouseDown(false)}
    >
      <div className="w-full h-full shadow-2xl rounded-2xl flex flex-col items-center">
        <div className=" w-full bg-gray-200 px-4 rounded-t-2xl flex flex-col items-center gap-2">
          <p className="text-2xl font-bold text-gray-800 tracking-tight p-2 pt-10">Puzzle Game</p>
          <SizeSlider onSelect={handleRandomLevel} />
          {/* <DifficultySlider onSelect={handleRandomLevel} /> */}
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
