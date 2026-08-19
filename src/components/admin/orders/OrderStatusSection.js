const products = [
  {
    id: 1,
    image:
      "/images/products/bunny-romper.jpg",
    title: "Cute Bunny Romper",
    category: "Girls",

    color: {
      name: "Pink",
      hex: "#F9A8D4",
    },

    size: "0-3M",

    quantity: 2,

    price: 35,
  },

  {
    id: 2,
    image:
      "/images/products/bear-set.jpg",
    title: "Bear Cotton Set",
    category: "Newborn",

    color: {
      name: "Beige",
      hex: "#D6C5A4",
    },

    size: "NB",

    quantity: 1,

    price: 50,
  },
];

export const selectedOrder = {
  id: "#ORD-1048",

  status: "Processing",

  date: "Jun 20, 2025 • 10:24 AM",

  total: 120.5,

  customer: {
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah@example.com",
    address:
      "742 Evergreen Terrace, Springfield",
  },
};

export default function OrderStatusSection({
  order = selectedOrder,
}) {
  return (
    <section>
      <h3 className="mb-5 text-lg font-semibold text-zinc-900">
        Order Details
      </h3>

      <div className="grid grid-cols-3 gap-5">
        {/* Payment Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-600">
            Payment Status
          </label>

          <select
            defaultValue={order.payment}
            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-yellow-400"
          >
            <option value="Paid">
              Paid
            </option>
            <option value="Pending">
              Pending
            </option>
            <option value="Failed">
              Failed
            </option>
            <option value="Refunded">
              Refunded
            </option>
          </select>
        </div>

        {/* Order Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-600">
            Order Status
          </label>

          <select
            defaultValue={order.status}
            className="h-11 w-full rounded-md border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-yellow-400"
          >
            <option value="Pending">
              Pending
            </option>
            <option value="Processing">
              Processing
            </option>
            <option value="Confirming">
              Confirming
            </option>
            <option value="Shipped">
              Shipped
            </option>
            <option value="Delivered">
              Delivered
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <h4 className="mb-3 font-medium text-zinc-900">
            Order Summary
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">
                Subtotal
              </span>

              <span className="font-medium text-zinc-900">
                {order?.summary?.subtotal.toLocaleString()}{" "}
                IRT
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Shipping
              </span>

              <span className="font-medium text-zinc-900">
                {order?.summary?.shipping.toLocaleString()}{" "}
                IRT
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Discount
              </span>

              <span className="font-medium text-red-500">
                -
                {order?.summary?.discount.toLocaleString()}{" "}
                IRT
              </span>
            </div>

            <div className="my-3 border-t border-zinc-200" />

            <div className="flex justify-between">
              <span className="font-semibold text-zinc-900">
                Total
              </span>

              <span className="text-lg font-bold text-zinc-900">
                {order?.summary?.total.toLocaleString()}{" "}
                IRT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
