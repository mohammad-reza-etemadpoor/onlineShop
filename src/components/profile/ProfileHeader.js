"use client";

import { logOutAction } from "@src/app/actions";
import { IoLogOutOutline } from "react-icons/io5";

export default function ProfileHeader() {
  return (
    <header className="flex gap-4 rounded-2xl border justify-between border-gray-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your personal
          information and orders.
        </p>
      </div>
      <div>
        <LogoutButton />
      </div>
    </header>
  );
}

function LogoutButton() {
  return (
    <form action={logOutAction}>
      <button
        type="submit"
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-500 transition hover:bg-red-50"
      >
        <IoLogOutOutline size={20} />
        Logout
      </button>
    </form>
  );
}
