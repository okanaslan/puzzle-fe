import { useState } from "react";
import { randomLevelGenerator, Level } from "../levels/levels";
import { Board } from "./game-components/board";
import { Difficultty } from "../types";

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
        <div className="flex gap-2 mb-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => handleRandomLevel("easy")}
          >
            Easy
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
            onClick={() => handleRandomLevel("medium")}
          >
            Medium
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => handleRandomLevel("hard")}
          >
            Hard
          </button>
        </div>
        <Board level={level} />
      </div>
    </div>
  );
}
