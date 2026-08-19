import AdminDashboardHeader from "@/src/components/AdminDashboardHeader";
import RecentOrders from "@src/components/admin/RecentOrders";
import SalesOverview from "@src/components/SalesOverview";
import TopSellingProducts from "./TopSellingProducts";

import { getUsersStats } from "@/src/actions/userDataAction";
import StatCardsParent from "@/src/components/admin/StatCardsParent";
import connectToDb from "@/src/configs/db";
import User from "@/src/models/User";
import { recentOrdersAction } from "@/src/actions/recentOrdersAction";

async function AdminPage() {
  const from = new Date("2026-07-11");
  const to = new Date("2026-08-10");
  const a = await getUsersStats(
    from,
    to,
  );

  await connectToDb();
  const b = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: from,
          $lte: to,
        },
      },
    },
    {
      $count: "count",
    },
  ]);

  // console.log(
  //   "admin page a is : ",
  //   a,
  //   b,
  // );

  // const a =
  //   await getLast30DaysOrdersRevenueAndNumber();
  // // console.log(a);
  // const d = getDashboardStats();
  // const b =
  //   await getTodayPendingOrders();
  // const c = { ...a, ...b };
  // console.log(c);

  // console.log(b);
  // useEffect(() => {
  //   if (
  //     selectedDateRange.length === 2
  //   ) {
  //     console.log({
  //       start: selectedDateRange[0]
  //         .toDate()
  //         .toISOString(),
  //       end: selectedDateRange[1]
  //         .toDate()
  //         .toISOString(),
  //     });
  //   }
  // }, [selectedDateRange]);
  const g = await recentOrdersAction();
  return (
    <div className="w-full h-screen overflow-scroll pl-6 bg-[#f6f9fd] text-zinc-600 flex flex-col">
      <AdminDashboardHeader />
      <StatCardsParent />
      <div className="flex mb-4 justify-between gap-4 mr-2 items-start">
        <SalesOverview />
        <TopSellingProducts />
        {/* <OrdersStatus /> */}
      </div>
      <div className="flex justify-between items-start">
        <RecentOrders />
      </div>
    </div>
  );
}

export default AdminPage;
