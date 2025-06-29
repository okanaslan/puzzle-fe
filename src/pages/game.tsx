import { useEffect, useRef } from "react";

import { Board } from "./game-components/board";
import { SizeSlider } from "./game-components/size-slider";
import { DifficultyText } from "./game-components/difficulty";
import { ModeSwitch } from "./game-components/mode-switch";

const ALERT_INTERVAL_MINUTES = 15;

export default function Game() {
  const sessionStartRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastAlertRef = useRef<number>(0);

  useEffect(() => {
    // Prevent scroll
    document.body.style.overflow = "hidden";
    // Record session start time
    sessionStartRef.current = Date.now();
    lastAlertRef.current = 0;

    // Check every minute if 10, 20, 30... minutes have passed
    intervalRef.current = setInterval(() => {
      if (sessionStartRef.current) {
        const now = Date.now();
        const diffMinutes = Math.floor((now - sessionStartRef.current) / 1000 / 60);
        if (diffMinutes > 0 && diffMinutes % ALERT_INTERVAL_MINUTES === 0 && lastAlertRef.current !== diffMinutes) {
          alert(`${diffMinutes} minutes have passed!`);
          lastAlertRef.current = diffMinutes;
        }
      }
    }, 1000);

    return () => {
      // Restore scroll
      document.body.style.overflow = "";
      // Clear interval on unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className=" w-full bg-white flex flex-col items-center">
          {/* <DifficultySlider onSelect={handleRandomLevel} /> */}
          <DifficultyText />
        </div>
        <div className="w-full bg-white py-2 flex flex-col items-center gap-4">
          <Board />
          <ModeSwitch />
          <SizeSlider />
        </div>
      </div>
    </div>
  );
}
