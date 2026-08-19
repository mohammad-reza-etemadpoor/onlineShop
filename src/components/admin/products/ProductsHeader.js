"use client";

import { useAddProduct } from "@/src/context/AddProductContext";
import Link from "next/link";
import {
  FiBell,
  FiChevronDown,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import {
  LuBell,
  LuChevronRight,
} from "react-icons/lu";

export default function ProductsHeader() {
  const {
    isModalOpen,
    setIsModalOpen,
  } = useAddProduct();
  function handleClick() {
    setIsModalOpen((isOpen) => !isOpen);
  }
  //todo synthesize it to the AdminHeader with breadCrumb, title, add[user/prod/order] prop
  return (
    <header className="text-zinc-600 flex items-start justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Products
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <Link
            href={"/admin"}
            className="text-zinc-500"
          >
            Dashboard
          </Link>

          <span className="text-zinc-300">
            <LuChevronRight />
          </span>

          <span className="font-medium text-blue-600">
            Products
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        {/* <div className="relative">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="h-12 w-80 rounded-md border border-zinc-200 bg-white pl-12 pr-4 outline-none transition focus:border-yellow-400"
          />
        </div> */}

        {/* Notification */}
        <button className="cursor-pointer relative rounded-md border border-gray-300 bg-white p-3 shadow-sm transition hover:bg-gray-50">
          <LuBell className="text-xl" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
            5
          </span>
        </button>
        {/* Admin
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-zinc-100">
          <img
            src="https://i.pravatar.cc/80"
            alt="admin"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div className="text-left">
            <p className="font-semibold text-zinc-900">
              Admin
            </p>

            <p className="text-sm text-zinc-500">
              Super Admin
            </p>
          </div>

          <FiChevronDown className="text-zinc-500" />
        </button> */}

        {/* Add Product */}
        <button
          onClick={handleClick}
          className="cursor-pointer flex h-12 items-center gap-2 rounded-md bg-[#F9E34F] px-6 font-semibold text-zinc-900 transition hover:brightness-95"
        >
          <FiPlus size={20} />
          Add Product
        </button>
      </div>
    </header>
  );
}
