import { Board } from "./game-components/board";
import { TopBar } from "./game-components/top-bar";
import { BottomBar } from "./game-components/bottom-bar";

export default function Game() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="w-full bg-white flex flex-col items-center">
          <TopBar />
          <Board />
          <BottomBar />
        </div>
      </div>
    </div>
  );
}
