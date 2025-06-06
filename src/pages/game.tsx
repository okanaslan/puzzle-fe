import { useState } from "react";
import { LevelGenerator } from "../utils/level-generator";
import { Board } from "./game-components/board";
import { Difficultty } from "../types";
import { LevelButtons } from "./game-components/level-buttons";
import { difficultyCalculator } from "../utils/difficulty-calculator";
import { Level } from "../utils/level";

export default function Game({ level: initialLevel }: { level: Level }) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleRandomLevel = (difficulty: Difficultty) => {
    const randomSeed = Math.floor(Math.random() * 100000);
    const selectedLevel = LevelGenerator.generate(difficulty, randomSeed);
    setLevel(selectedLevel);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6">
      <div className="w-full max-w-xl bg-gray-400 rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-xl font-bold m-2 text-gray-800 tracking-tight">Puzzle Game</h1>
        <LevelButtons onSelect={handleRandomLevel} />
        <p className="text-sm text-gray-600 mt-4">{`Difficulty: ${difficultyCalculator(level)}`}</p>
        <Board level={level} isFinished={isFinished} setIsFinished={setIsFinished} />
      </div>
    </div>
  );
}
