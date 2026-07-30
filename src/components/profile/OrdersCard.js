import { IoReceiptOutline } from "react-icons/io5";

import OrderItem from "./OrderItem";

export default function OrdersCard({
  orders,
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <IoReceiptOutline size={28} />

        <h2 className="text-2xl font-semibold">
          My Orders
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-14 text-center">
          <p className="text-lg font-medium">
            No orders yet
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your orders will appear
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </section>
  );
}
