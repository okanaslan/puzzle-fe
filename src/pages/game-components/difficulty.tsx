import { Shuffle } from "lucide-react";
import { useGame } from "../../contexts/game-context";
import { difficultyCalculator } from "../../utils/difficulty-calculator";

export function DifficultyText() {
  const { level, newLevel, lives } = useGame();

  let text = "";
  let color = "";
  let emoji = "";

  const score = difficultyCalculator(level);
  if (score <= 10) {
    text = "Beginner";
    color = "text-green-600";
    emoji = "🟢";
  } else if (score <= 20) {
    text = "Easy";
    color = "text-lime-600";
    emoji = "😊";
  } else if (score <= 30) {
    text = "Medium";
    color = "text-yellow-500";
    emoji = "😐";
  } else if (score <= 40) {
    text = "Hard";
    color = "text-orange-600";
    emoji = "😅";
  } else {
    text = "Expert";
    color = "text-red-600";
    emoji = "🔥";
  }

  return (
    <div className="relative flex flex-row items-center justify-center w-full p-4 bg-gray-200">
      <div className="absolute text-gray-600 text-md left-4">
        {lives.current > 0 ? `${"❤️".repeat(lives.current)}${"🤍".repeat(lives.max - lives.current)}` : "Game Over"}
      </div>
      <div className={`flex gap-2 items-center font-bold text-lg ${color} px-10`}>
        <span>{emoji}</span>
        <span>{`${text}`}</span>
        <span>{emoji}</span>
      </div>
      <Shuffle
        className="absolute right-4 w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition"
        onClick={() => newLevel()}
        role="button"
        tabIndex={0}
        aria-label="Shuffle Level"
      />
    </div>
  );
}
