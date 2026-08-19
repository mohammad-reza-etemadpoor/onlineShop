"use client";

import { recentOrdersAction } from "@/src/actions/recentOrdersAction";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import { LuArrowRight } from "react-icons/lu";

// const orders = [
//   {
//     id: "#100245",
//     customer: "Sarah Johnson",
//     date: "2026-08-05",
//     total: "$124.00",
//     status: "Delivered",
//   },
//   {
//     id: "#100246",
//     customer: "Michael Brown",
//     date: "2026-08-05",
//     total: "$89.50",
//     status: "Processing",
//   },
//   {
//     id: "#100247",
//     customer: "Emma Wilson",
//     date: "2026-08-04",
//     total: "$46.00",
//     status: "Pending",
//   },
//   {
//     id: "#100248",
//     customer: "James Miller",
//     date: "2026-08-04",
//     total: "$215.75",
//     status: "Cancelled",
//   },
//   {
//     id: "#100249",
//     customer: "Olivia Davis",
//     date: "2026-08-03",
//     total: "$61.90",
//     status: "Delivered",
//   },
// ];

`_id: Object { buffer: Uint8Array(12) }
buffer: Uint8Array(12) [ 106, 119, 70, … ]
<prototype>: Object { … }
createdAt: Date Sat Aug 08 2026 18:37:28 GMT+0330 (Iran Standard Time)
paymentStatus: "paid"
phone: "09382025303"
status: "pending"
totalPrice: 3210000`;

function StatusBadge({ status }) {
  const styles = {
    delivered:
      "bg-green-100 text-green-700",
    processing:
      "bg-blue-100 text-blue-700",
    pending:
      "bg-yellow-100 text-yellow-700",
    cancelled:
      "bg-red-100 text-red-700",
    unpaid:
      "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
  };

  console.log(
    "status badge: ",
    status,
    "\n",
    status[styles],
  );
  // const styles = {
  //   unpaid:
  //     "bg-yellow-100 text-yellow-700",
  //   paid: "bg-green-100 text-green-700",
  //   failed: "bg-red-100 text-red-700",
  // };
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

export default function RecentOrders() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchRecentOrders() {
      const res =
        await recentOrdersAction();
      setData(res);
    }
    fetchRecentOrders();
  }, []);

  return (
    <section className="rounded-md w-full mb-4 border border-gray-100 bg-white p-6 mr-2 h-70 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">
            Recent Orders
          </h2>
        </div>

        <Link
          href="/admin/orders"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          View All
          <LuArrowRight />
        </Link>
      </div>

      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-left text-sm text-zinc-500">
            <th className="pb-4 font-medium">
              Order ID
            </th>

            <th className="pb-2 font-medium">
              Customer
            </th>

            <th className="pb-2 font-medium">
              Date
            </th>

            <th className="pb-2 font-medium">
              Total
            </th>
            <th className="pb-2 font-medium">
              Payment status
            </th>
            <th className="pb-2 font-medium">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {!data && (
            <p className="m-auto">
              no recent order found!
            </p>
          )}
          {data &&
            data?.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 last:border-none"
              >
                <td className="py-2 font-medium text-zinc-800">
                  {order.id}
                </td>

                <td className="py-2">
                  {order?.customer}
                </td>

                <td className="py-2 text-zinc-500">
                  {new Date(
                    order.date,
                  ).toLocaleDateString(
                    "fa-IR",
                  )}
                </td>

                <td className="py-2 font-medium">
                  {order.total}
                </td>

                <td className="py-2">
                  <StatusBadge
                    status={
                      order.paymentStatus
                    }
                  />
                </td>
                <td className="py-2">
                  <StatusBadge
                    status={
                      order.status
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
