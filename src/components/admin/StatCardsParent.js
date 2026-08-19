"use client";
import {
  LuBox,
  LuDollarSign,
  LuShoppingBag,
  LuShoppingCart,
  LuUsers,
} from "react-icons/lu";
import StatCard from "../StatCard";
import { useDashboard } from "@/src/context/DashBoardContext";

function StatCardsParent() {
  const {
    dateRange,
    setDateRange,
    data,
    loading,
  } = useDashboard();

  // console.log(
  //   "statcardparent: ",
  //   dateRange,
  //   "\n",
  //   data,
  // );

  //[ comparison: Object { orders: null, sales: null, pending: null }​,
  // current: Object { orders: 2, sales: 6500000, pending: 2 },
  // previous: Object { orders: 0, sales: 0, pending: 0 }]

  const statistics = [
    {
      title: "Total Orders",
      value: data?.current.orders,
      change: data?.comparison.orders,
      positive:
        data?.comparison.orders >= 0,
      icon: LuShoppingBag,
      hexColor: "#988ce2",
    },
    {
      title: "Total Sales",
      value: data?.current.sales,
      change: data?.comparison.sales,
      positive:
        data?.comparison.sales >= 0,
      icon: LuDollarSign,
      hexColor: "#22c55e",
    },
    {
      title: "Pending Orders",
      value: data?.current.pending,
      icon: LuShoppingCart,
      hexColor: "#f59e0b",
    },
    {
      title: "total inventory stock",
      value: data?.current.inventory,
      // change:
      //   data.thisPeriodTotalProducts,
      // positive:
      //   data.thisPeriodTotalProducts,
      icon: LuBox,
      hexColor: "#3b82f6",
    },
    {
      title: "Customers",
      value: data?.current.customers,
      change:
        data?.comparison.customers,
      positive:
        data?.comparison.customers >= 0,
      icon: LuUsers,
      hexColor: "#ef4444",
    },
  ];
  return (
    <div className="mr-2 mb-6 grid grid-cols-5 gap-4">
      {loading ? (
        <p>loading...</p>
      ) : (
        statistics.map((item) => (
          <StatCard
            key={item.title}
            {...item}
          />
        ))
      )}
    </div>
  );
}

export default StatCardsParent;
