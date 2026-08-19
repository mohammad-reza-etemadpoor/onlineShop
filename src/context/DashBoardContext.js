"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDashboardStats } from "../actions/adminDashboardAction";
const DashboardContext =
  createContext(null);
export function DashboardProvider({
  children,
}) {
  const [dateRange, setDateRange] =
    useState(() => {
      const end = new Date();
      const start = new Date();
      start.setDate(
        start.getDate() - 30,
      );
      return {
        startDate: start,
        endDate: end,
      };
    });

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const result =
          await getDashboardStats(
            dateRange.startDate,
            dateRange.endDate,
          );
        console.log("kkkkk", result);

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // console.log(
    //   "context dateRange: ",
    //   dateRange,
    // );
  }, [dateRange]);

  return (
    <DashboardContext.Provider
      value={{
        dateRange,
        setDateRange,
        data,
        loading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(
    DashboardContext,
  );

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider",
    );
  }

  return context;
}
