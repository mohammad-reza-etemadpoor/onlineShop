"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Delivered",
    value: 524,
    fill: "#22c55e",
  },
  {
    name: "Processing",
    value: 163,
    fill: "#3b82f6",
  },
  {
    name: "Pending",
    value: 87,
    fill: "#f59e0b",
  },
  {
    name: "Cancelled",
    value: 26,
    fill: "#ef4444",
  },
];

const totalOrders = data.reduce(
  (sum, item) => sum + item.value,
  0,
);
const a =
  "rounded-md w-106 border border-gray-100 bg-white p-6 shadow-sm h-72";

export default function OrdersStatus() {
  const [activeIndex, setActiveIndex] =
    useState(null);
  return (
    <section className="border border-gray-100 bg-white p-6 shadow-sm rounded-md w-106 h-72">
      <div className="mb-6">
        <h2 className="text-md font-semibold text-zinc-800">
          Order Status
        </h2>

        <p className="text-sm text-zinc-500">
          Distribution of all orders
        </p>
      </div>
      <div className="flex justify-between items-start">
        <div className="relative h-40 w-40">
          <ResponsiveContainer className="">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="100%"
                strokeWidth={5}
                stroke="#fff"
                paddingAngle={0}
                activeIndex={
                  activeIndex
                }
                onMouseEnter={(
                  _,
                  index,
                ) =>
                  setActiveIndex(index)
                }
                onMouseLeave={() =>
                  setActiveIndex(null)
                }
              ></Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-zinc-800">
              <>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  {activeIndex ===
                  null ? (
                    <>
                      <span className="text-3xl font-bold text-zinc-800">
                        {totalOrders}
                      </span>

                      <span className="text-sm text-zinc-500">
                        Orders
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-zinc-800">
                        {
                          data[
                            activeIndex
                          ].value
                        }
                      </span>

                      <span className="text-sm text-zinc-500">
                        {
                          data[
                            activeIndex
                          ].name
                        }
                      </span>
                    </>
                  )}
                </div>
              </>
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      item.fill,
                  }}
                />

                <span className="text-sm text-zinc-600">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-zinc-700">
                  {item.value}
                </span>

                <span className="text-xs text-zinc-400">
                  {(
                    (item.value /
                      totalOrders) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
