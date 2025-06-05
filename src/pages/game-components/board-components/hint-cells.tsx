type HintCellProps = {
  value: number | null;
};

export const VoidCell = () => <div className="flex items-center justify-center bg-amber-500"> </div>;

export const HintCell = ({ value }: HintCellProps) => (
  <div className="flex items-center justify-center bg-amber-500">
    <p className="text-sm font-extrabold text-black-700">{value !== null ? value : ""}</p>
  </div>
);
