export function Container(props: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const { onClick, children } = props;

  return (
    <div
      onClick={onClick}
      className="mx-0 border border-slate-200 rounded-md p-4 sm:w-full sm:mx-auto sm:grid sm:grid-cols-4 gap-2 cursor-pointer"
    >
      {children}
    </div>
  );
}
