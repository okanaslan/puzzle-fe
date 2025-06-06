import { useState } from "react";

import { Level } from "../utils/level";
import { LevelGenerator } from "../utils/level-generator";
import { difficultyCalculator } from "../utils/difficulty-calculator";

import { Board } from "./game-components/board";
import { SizeButtons } from "./game-components/size-buttons";
import { DifficultyText } from "./game-components/difficulty";

export default function Game({ level: initialLevel }: { level: Level }) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleRandomLevel = (size: number) => {
    const randomSeed = Math.floor(Math.random() * 100000);
    const selectedLevel = LevelGenerator.generate(size, randomSeed);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6">
      <div className="w-full max-w-xl bg-gray-400 rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-xl font-bold m-2 text-gray-800 tracking-tight">Puzzle Game</h1>
        <SizeButtons onSelect={handleRandomLevel} />
        <DifficultyText score={difficultyCalculator(level)} />
        <Board level={level} isFinished={isFinished} setIsFinished={setIsFinished} />
      </div>
    </div>
  );
}
