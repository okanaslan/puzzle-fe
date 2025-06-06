import { useState } from "react";
import { randomLevelGenerator, Level } from "../levels/levels";
import { Board } from "./game-components/board";
import { Difficultty } from "../types";
import { LevelButtons } from "./game-components/level-buttons";

export default function Game({ level: initialLevel }: { level: Level }) {
  const [level, setLevel] = useState<Level>(initialLevel);

  const handleRandomLevel = (difficulty: Difficultty) => {
    const randomSeed = Math.floor(Math.random() * 100000);
    const selectedLevel = randomLevelGenerator(difficulty, randomSeed);
    setLevel(selectedLevel);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6">
      <div className="w-full max-w-xl bg-gray-400 rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-xl font-bold m-2 text-gray-800 tracking-tight">Puzzle Game</h1>
        <LevelButtons onSelect={handleRandomLevel} />
        <Board level={level} />
      </div>
    </div>
  );
}
