import { useRef } from "react";
import { X } from "lucide-react";
import { CellState } from "../../../types";

type PlayableCellProps = {
  state: CellState;
  onClick: (type: CellState) => void;
};

type CellProps = {
  onClick: (type: CellState) => void;
};

const CorrectCell = () => <div className="min-w-6 min-h-6 border flex items-center justify-center bg-green-500" />;

export const FilledCell = ({ onClick }: CellProps) => (
  <div className="min-w-6 min-h-6 border flex items-center justify-center bg-black" onClick={() => onClick("empty")} />
);

export const CrossedCell = ({ onClick }: CellProps) => (
  <div className="min-w-6 min-h-6 border flex items-center justify-center bg-gray-300" onClick={() => onClick("empty")}>
    <X className="w-4 h-4 text-gray-600" />
  </div>
);

export const EmptyCell = ({ onClick }: CellProps) => {
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

export const PlayableCell = ({ state, onClick }: PlayableCellProps) => {
  if (state === "correct") return <CorrectCell />;
  if (state === "filled") return <FilledCell onClick={onClick} />;
  if (state === "crossed") return <CrossedCell onClick={onClick} />;
  return <EmptyCell onClick={onClick} />;
};
