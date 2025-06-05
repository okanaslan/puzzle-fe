type HintCellProps = {
  value: number | null;
};

export const VoidCell = () => <div className="flex items-center justify-center "> </div>;

export const LeftHintCell = ({ value }: HintCellProps) => (
  <div className="m-0.5 flex items-center justify-center ">
    <p className="text-sm font-extrabold text-black-700">{value !== null ? value : ""}</p>
  </div>
);

export const TopHintCell = ({ value }: HintCellProps) => (
  <div className="m-0.5 flex items-center justify-center ">
    <p className="text-sm font-extrabold text-black-700">{value !== null ? value : ""}</p>
  </div>
);
