import { useEffect } from "react";

import { Board } from "./game-components/board";
import { SizeSlider } from "./game-components/size-slider";
import { DifficultyText } from "./game-components/difficulty";
import { ModeSwitch } from "./game-components/mode-switch";

export default function Game() {
  useEffect(() => {
    // Prevent scroll
    document.body.style.overflow = "hidden";
    return () => {
      // Restore scroll
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-300">
      <div className="w-full max-w-[500px] shadow-2xl rounded-2xl flex flex-col items-center">
        <div className=" w-full bg-gray-200 px-4 rounded-t-2xl flex flex-col items-center gap-2">
          <p className="text-2xl font-bold text-gray-800 tracking-tight pt-10">Puzzle Game</p>
          <SizeSlider />
          {/* <DifficultySlider onSelect={handleRandomLevel} /> */}
          <DifficultyText />
        </div>
        <div className="w-full bg-gray-400 py-2 flex flex-col items-center gap-4 rounded-2xl">
          <Board />
          <ModeSwitch />
        </div>
      </div>
    </div>
  );
}
