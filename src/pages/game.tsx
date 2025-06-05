import { Level } from "../levels/levels";
import { Board } from "./game-components/board";

export default function Game({ level }: { level: Level }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-gray-100 to-gray-300 py-6">
      <div className="w-full max-w-xl bg-gray-400 rounded-xl shadow-lg py-4 pr-4 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 tracking-tight">Puzzle Game</h1>
        <Board level={level} />
      </div>
    </div>
  );
}
