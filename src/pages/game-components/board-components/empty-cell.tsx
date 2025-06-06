import { useRef } from "react";
import { CellState } from "../../../types";

type EmptyCellProps = {
  onClick: (type: CellState) => void;
};

export const EmptyCell = ({ onClick }: EmptyCellProps) => {
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const doubleTapRef = useRef(false);

  const handleClick = () => {
    if (doubleTapRef.current) {
      doubleTapRef.current = false;
      return;
    }
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    clickTimeout.current = setTimeout(() => {
      onClick("filled");
      clickTimeout.current = null;
    }, 200);
  };

  const handleDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    onClick("crossed");
  };

  function useDoubleTap(onDoubleTap: () => void, delay = 250) {
    const lastTap = useRef<number | null>(null);

    function handleTouchEnd(e: React.TouchEvent) {
      const now = Date.now();
      if (lastTap.current && now - lastTap.current < delay) {
        if (clickTimeout.current) {
          clearTimeout(clickTimeout.current);
          clickTimeout.current = null;
        }
        doubleTapRef.current = true;
        onDoubleTap();
        lastTap.current = null;
        e.preventDefault();
      } else {
        lastTap.current = now;
      }
    }

    return { onTouchEnd: handleTouchEnd };
  }

  const { onTouchEnd } = useDoubleTap(() => onClick("crossed"));

  return (
    <div
      className="min-w-6 min-h-6 border flex items-center justify-center"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchEnd={onTouchEnd}
    />
  );
};
