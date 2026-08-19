export default function StatusBadge({
  children,
  color,
}) {
  const colors = {
    green:
      "bg-green-100 text-green-700",

    red: "bg-red-100 text-red-700",

    yellow:
      "bg-yellow-100 text-yellow-700",

    blue: "bg-blue-100 text-blue-700",

    gray: "bg-zinc-100 text-zinc-600",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
}
