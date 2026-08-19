import OrderRow from "./OrderRow";
import Pagination from "../products/Pagination";
export const orders = [
  {
    id: "#ORD-1048",
    customer: "Sarah Johnson",
    items: 3,
    total: 120.5,
    payment: "Paid",
    status: "Processing",
    date: "Jun 20, 2025",
    selected: true,
  },
  {
    id: "#ORD-1047",
    customer: "Ali Rezaei",
    items: 2,
    total: 85,
    payment: "Paid",
    status: "Shipped",
    date: "Jun 19, 2025",
  },
  {
    id: "#ORD-1046",
    customer: "Fatemeh M.",
    items: 4,
    total: 210.8,
    payment: "Pending",
    status: "Confirming",
    date: "Jun 18, 2025",
  },
  {
    id: "#ORD-1045",
    customer: "David Smith",
    items: 1,
    total: 45,
    payment: "Paid",
    status: "Delivered",
    date: "Jun 18, 2025",
  },
  {
    id: "#ORD-1044",
    customer: "Nazanin A.",
    items: 2,
    total: 60,
    payment: "Refunded",
    status: "Cancelled",
    date: "Jun 17, 2025",
  },
  {
    id: "#ORD-1043",
    customer: "Emma Wilson",
    items: 3,
    total: 150.75,
    payment: "Paid",
    status: "Shipped",
    date: "Jun 17, 2025",
  },
  {
    id: "#ORD-1042",
    customer: "Mohammad H.",
    items: 1,
    total: 35,
    payment: "Paid",
    status: "Processing",
    date: "Jun 16, 2025",
  },
  {
    id: "#ORD-1041",
    customer: "Jessica Brown",
    items: 2,
    total: 98,
    payment: "Pending",
    status: "Confirming",
    date: "Jun 15, 2025",
  },
];

export default function OrdersTable() {
  return (
    <section className="rounded-md border border-zinc-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="border-b border-zinc-200 text-left text-sm text-zinc-500">
          <tr className="h-14">
            <th className="px-5 font-medium">
              Order ID
            </th>
            <th className="font-medium">
              Customer
            </th>
            <th className="font-medium">
              Items
            </th>
            <th className="font-medium">
              Total
            </th>
            <th className="font-medium">
              Payment
            </th>
            <th className="font-medium">
              Status
            </th>
            <th className="font-medium">
              Date
            </th>
            <th className="text-center font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
            />
          ))}
        </tbody>
      </table>

      <Pagination />
    </section>
  );
}
