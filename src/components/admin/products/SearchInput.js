"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchInput({
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="relative w-[40%] self-end">
      <FiSearch
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-md border border-zinc-200 bg-white pl-12 pr-4 outline-none transition focus:border-yellow-400"
      />
    </div>
  );
}
