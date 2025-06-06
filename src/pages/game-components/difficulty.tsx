export function DifficultyText({ score }: { score: number }) {
  let text = "";
  let color = "";
  let emoji = "";

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
    <div className={`flex gap-2 mb-4 items-center font-bold text-lg ${color}`}>
      <span>{emoji}</span>
      <span>{`${text}`}</span>
      <span>{emoji}</span>
    </div>
  );
}
