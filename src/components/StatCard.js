"use client";
import {
  LuBox,
  LuDollarSign,
  LuShoppingBag,
  LuShoppingCart,
  LuUsers,
} from "react-icons/lu";
export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
  hexColor,
}) {
  return (
    <div className="rounded-md bg-white p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div
          className={`mb-0 mr-0 flex h-12 w-12 items-center justify-center rounded-full
         bg-indigo-50 text-2xl text-indigo-600`}
          style={{
            backgroundColor: `${hexColor}20`,
            color: hexColor,
          }}
        >
          <Icon />
        </div>
        <div>
          <p className="text-sm w-20 text-gray-500">
            {title}
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            {value}
          </h2>
        </div>
      </div>
      {title !== "Pending Orders" &&
        title !==
          "total inventory stock" && (
          <p
            className={`mt-3  text-sm ${
              positive
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {change}
          </p>
        )}
    </div>
  );
}
