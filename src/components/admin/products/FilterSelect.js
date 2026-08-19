"use client";

import { FiChevronDown } from "react-icons/fi";

export default function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="flex w-[20%] flex-col gap-2">
      <label className="text-sm font-medium text-zinc-500">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-12 w-full cursor-pointer appearance-none rounded-md border border-zinc-200 bg-white px-4 pr-10 outline-none transition focus:border-yellow-400"
        >
          {options.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

        <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      </div>
    </div>
  );
}
