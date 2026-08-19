"use client";

import {
  useEffect,
  useState,
} from "react";
import AreaChartExample from "./AreaChartExample";
import getSalesOverviewAction from "../actions/salesOverviewAction";

// import AreaChartExample from "@components/AreaChartExample";

export default function SalesOverview() {
  const [salesData, setSalesData] =
    useState();

  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    async function fetchSalesOverview() {
      const oneYearAgo = new Date();
      oneYearAgo.setDate(
        oneYearAgo.getDate() - 365,
      );
      const data =
        await getSalesOverviewAction(
          oneYearAgo,
        );
      // console.log(
      //   "sales overview data: ",
      //   data,
      // );
      const modifiedData = data.map(
        (cur) => {
          return {
            month:
              monthsShort[cur.month],
            sales: cur.sales,
          };
        },
      );
      setSalesData(modifiedData);
    }
    fetchSalesOverview();
  }, []);
  // #region Sample data

  // const data0 = [
  //   {
  //     month: "Jan",
  //     sales: 4000,
  //     lastYearSales: 2400,
  //     expenses: 2400,
  //   },
  //   {
  //     month: "Feb",
  //     sales: 3000,
  //     lastYearSales: 1398,
  //     expenses: 2210,
  //   },
  //   {
  //     month: "Mar",
  //     sales: 4200,
  //     lastYearSales: 2500,
  //     expenses: 2300,
  //   }, // Fixed
  //   {
  //     month: "Apr",
  //     sales: 3800,
  //     lastYearSales: 1800,
  //     expenses: 2000,
  //   }, // Fixed
  //   {
  //     month: "May",
  //     sales: 5000,
  //     lastYearSales: 3000,
  //     expenses: 2000,
  //   }, // Fixed
  //   {
  //     month: "Jun",
  //     sales: 4500,
  //     lastYearSales: 2800,
  //     expenses: 1700,
  //   }, // Fixed
  // ];
  return (
    <div className="rounded-md w-full border border-gray-100 bg-white p-4 shadow-sm h-72">
      <div className="mb-6 flex flex-col items-center justify-between">
        <div className="flex mb-4 justify-between items-center w-full">
          <div>
            <h2 className="text-md font-semibold">
              Sales Overview
            </h2>

            <p className="text-sm text-gray-500">
              Revenue in the selected
              period
            </p>
          </div>

          <button className="rounded-lg cursor-pointer hover:bg-zinc-200 border px-3 py-2 text-xs">
            This Year
          </button>
        </div>
        <div className="text-sm w-full">
          <AreaChartExample
            data={salesData}
          />
        </div>
      </div>
    </div>
  );
}
