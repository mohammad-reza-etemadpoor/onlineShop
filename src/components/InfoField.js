export default function InfoField({
  label,
  value,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-zinc-600">
        {label}
      </label>

      <div className="flex h-11 items-center rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-800">
        {value || "-"}
      </div>
    </div>
  );
}
