"use client";

import { IoChevronForwardOutline } from "react-icons/io5";

const statusColors = {
  Processing:
    "bg-amber-100 text-amber-700",
  Delivered:
    "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

export default function OrderItem({
  order,
}) {
  return (
    <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-[#F9E34F] hover:shadow-md">
      <div className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">
          Order #{order.id}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>
            {order.items} Items
          </span>

          <span>•</span>

          <span>{order.total}</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusColors[order.status]
          }`}
        >
          {order.status}
        </span>

        <IoChevronForwardOutline
          size={22}
          className="text-gray-400"
        />
      </div>
    </button>
  );
}
