import StatusBadge from "@src/components/StatusBadge";

export const order1 = {
  id: "#ORD-1041",
  customer: "Jessica Brown",
  items: 2,
  total: 98,
  payment: "Pending",
  status: "Confirming",
  date: "Jun 15, 2025",
};

import { FiPackage } from "react-icons/fi";

export default function OrderHeader({
  order = order1,
}) {
  console.log("order is : ", order);
  const statusColors = {
    Processing:
      "bg-yellow-100 text-yellow-700",
    Confirming:
      "bg-orange-100 text-orange-700",
    Shipped:
      "bg-blue-100 text-blue-700",
    Delivered:
      "bg-green-100 text-green-700",
    Cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-yellow-100">
          <FiPackage
            size={22}
            className="text-yellow-600"
          />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-zinc-900">
              {order.id}
            </h2>

            <span
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                statusColors[
                  order.status
                ]
              }`}
            >
              {order.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Placed on {order.date}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-zinc-500">
          Total Amount
        </p>

        <p className="text-xl font-semibold text-zinc-900">
          {/* ${order.total.toFixed(2)} */}
          ${order.total}
        </p>
      </div>
    </header>
  );
}
