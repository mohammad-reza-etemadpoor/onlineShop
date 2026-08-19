"use client";

import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import FilterSelect from "../products/FilterSelect";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { LuDownload } from "react-icons/lu";

const dateOptions = [
  { value: "today", label: "Today" },
  {
    value: "yesterday",
    label: "Yesterday",
  },
  {
    value: "last7days",
    label: "Last 7 Days",
  },
  {
    value: "last30days",
    label: "Last 30 Days",
  },
  {
    value: "thisMonth",
    label: "This Month",
  },
  {
    value: "lastMonth",
    label: "Last Month",
  },
  {
    value: "thisYear",
    label: "This Year",
  },
  {
    value: "custom",
    label: "Custom Range",
  },
];
const statusOptions = [
  { value: "", label: "All Statuses" },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "shipped",
    label: "Shipped",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "returned",
    label: "Returned",
  },
];
const paymentOptions = [
  { value: "", label: "All Payments" },
  { value: "paid", label: "Paid" },
  {
    value: "pending",
    label: "Pending",
  },
  { value: "failed", label: "Failed" },
  {
    value: "refunded",
    label: "Refunded",
  },
  {
    value: "partially_refunded",
    label: "Partially Refunded",
  },
];

function OrdersFilters() {
  const [
    selectedDateRange,
    setSelectedDateRange,
  ] = useState([]);

  const [dateFilter, setDateFilter] =
    useState("last30days");
  const [status, setStatus] =
    useState("");
  const [payment, setPayment] =
    useState("all");

  return (
    <section className="flex justify-between items-end mt-8 rounded-md border border-zinc-200 text-sm bg-white text-zinc-600 p-6 shadow-sm">
      <div className="flex justify-between items-center gap-4">
        <FilterSelect
          label="Date"
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(
              e.target.value,
            )
          }
          options={dateOptions}
        />

        <FilterSelect
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          options={statusOptions}
        />

        <FilterSelect
          label="Payment"
          value={payment}
          onChange={(e) =>
            setPayment(e.target.value)
          }
          options={paymentOptions}
        />
        <div className="self-end">
          <DatePicker
            value={selectedDateRange}
            onChange={
              setSelectedDateRange
            }
            range
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            containerClassName="w-fit"
            inputClass="rounded-md cursor-pointer border border-gray-300 bg-white px-4 py-3 pl-11 text-sm outline-none transition focus:border-[#F9E34F]"
            placeholder="Select date range"
          />
        </div>
      </div>
      <button className="flex cursor-pointer gap-2 justify-between items-center h-11 rounded-md border border-zinc-200 px-5 font-medium hover:bg-zinc-50">
        <LuDownload />
        <p>Export</p>
      </button>
    </section>
  );
}

export default OrdersFilters;
