"use client";

export default function Field({
  label,
  field,
  type = "text",
  editing,
  readOnly = false,
  defaultValue = "",
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>

      {editing && !readOnly ? (
        <>
          <input
            id={field.id}
            name={field.name}
            type={type}
            defaultValue={defaultValue}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#F9E34F]"
          />

          {field.errors && (
            <p className="text-sm text-red-500">
              {field.errors[0]}
            </p>
          )}
        </>
      ) : (
        <div className="rounded-xl bg-gray-100 px-4 py-3">
          {defaultValue || "-"}
        </div>
      )}
    </div>
  );
}
