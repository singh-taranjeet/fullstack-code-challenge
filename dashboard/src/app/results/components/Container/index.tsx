export function Container(props: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const { onClick, children } = props;

  return (
    <div
      onClick={onClick}
      className="border border-slate-200 rounded-md p-4 w-full mx-auto grid grid-cols-4 gap-2 cursor-pointer"
    >
      {children}
    </div>
  );
}
