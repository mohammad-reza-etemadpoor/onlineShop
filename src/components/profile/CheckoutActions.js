"use client";

import { useState } from "react";

import { IoCheckmarkCircleOutline } from "react-icons/io5";

import ConfirmCheckoutModal from "./ConfirmCheckoutModal";

export default function CheckoutActions({
  address,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#F9E34F] px-6 py-4 text-lg font-semibold transition hover:brightness-95"
        >
          <IoCheckmarkCircleOutline
            size={24}
          />
          Confirm Information
        </button>
      </section>

      <ConfirmCheckoutModal
        open={open}
        address={address}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
