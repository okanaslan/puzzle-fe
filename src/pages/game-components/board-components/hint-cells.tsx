type HintCellProps = {
  value: number | null;
};

export const VoidCell = () => <div className="flex items-center justify-center select-none"> </div>;

export const LeftHintCell = ({ value }: HintCellProps) => (
  <div className="m-0.5 flex items-center justify-center select-none">
    <p className="text-xs font-extrabold text-black-700 select-none">{value !== null ? value : ""}</p>
  </div>
);

export const TopHintCell = ({ value }: HintCellProps) => (
  <div className="m-0.5 flex items-center justify-center select-none">
    <p className="text-xs font-extrabold text-black-700 select-none">{value !== null ? value : ""}</p>
  </div>
);
