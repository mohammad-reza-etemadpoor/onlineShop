"use client";
import { LuBell } from "react-icons/lu";

import {
  useEffect,
  useState,
} from "react";

import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { useDashboard } from "../context/DashBoardContext";
function AdminDashboardHeader() {
  const [
    selectedDateRange,
    setSelectedDateRange,
  ] = useState([]);

  useEffect(() => {
    if (
      selectedDateRange[0] &&
      selectedDateRange[1]
    ) {
      setDateRange({
        startDate: selectedDateRange[0]
          .toDate
          ? selectedDateRange[0].toDate()
          : new Date(
              selectedDateRange[0],
            ),
        endDate: selectedDateRange[1]
          .toDate
          ? selectedDateRange[1].toDate()
          : new Date(
              selectedDateRange[1],
            ),
      });
    }
  }, [selectedDateRange]);
  const {
    dateRange,
    setDateRange,
    data,
    loading,
  } = useDashboard();

  // console.log(
  //   "admin Dashboard header: ",
  //   data,
  // );

  return (
    <div className="py-4 pr-6 flex justify-between items-center">
      <div className="">
        <h1 className="text-xl font-bold">
          Dashboard
        </h1>
        <p>
          Overview of your store
          performance
        </p>
      </div>
      <div className="flex gap-8 justify-between items-center">
        <>
          <div className="flex items-center gap-5">
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
              inputClass="rounded-md border border-gray-300 bg-white px-4 py-3 pl-11 text-sm outline-none transition focus:border-[#F9E34F]"
              placeholder="Select date range"
            />
            <button className="relative rounded-md border border-gray-300 bg-white p-3 shadow-sm transition hover:bg-gray-50">
              <LuBell className="text-xl" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                5
              </span>
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default AdminDashboardHeader;
