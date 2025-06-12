import { useRef } from "react";

export function useSound(url: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(url);
  }

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // rewind to start
      audioRef.current.play();
    }
  };

  return play;
}
