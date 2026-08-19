import { FiMoreHorizontal } from "react-icons/fi";

export default function OrderRow({
  order,
}) {
  const paymentColors = {
    Paid: "bg-green-100 text-green-700",
    Pending:
      "bg-orange-100 text-orange-700",
    Refunded:
      "bg-zinc-100 text-zinc-700",
    Failed: "bg-red-100 text-red-700",
  };

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
      "bg-zinc-100 text-zinc-600",
  };

  return (
    <tr className="border-b border-zinc-100 hover:bg-zinc-50">
      {/* Order ID */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="font-medium text-zinc-900">
            {order.id}
          </span>
        </div>
      </td>

      {/* Customer */}
      <td>{order.customer}</td>

      {/* Items */}
      <td>{order.items} items</td>

      {/* Total */}
      <td className="font-medium">
        ${order.total.toFixed(2)}
      </td>

      {/* Payment */}
      <td>
        <span
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            paymentColors[order.payment]
          }`}
        >
          {order.payment}
        </span>
      </td>

      {/* Status */}
      <td>
        <span
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            statusColors[order.status]
          }`}
        >
          {order.status}
        </span>
      </td>

      {/* Date */}
      <td className="text-zinc-500">
        {order.date}
      </td>

      {/* Actions */}
      <td>
        <div className="flex justify-center">
          <button className="rounded-md p-2 hover:bg-zinc-100">
            <FiMoreHorizontal
              size={18}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
