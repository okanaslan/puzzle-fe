import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useGame } from "@/contexts/game-context";

export const DifficultySelector = () => {
  // const { newLevel } = useGame();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSize = Number(e.target.value);
  //   newLevel(newSize);
  // };

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Difficulty" />
      </SelectTrigger>
      <SelectContent className="w-[180px]">
        <SelectItem value="1">Easy</SelectItem>
        <SelectItem value="2">Medium</SelectItem>
        <SelectItem value="3">Hard</SelectItem>
      </SelectContent>
    </Select>
  );
};
