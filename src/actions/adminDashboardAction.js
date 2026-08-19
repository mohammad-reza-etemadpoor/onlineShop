"use server";

import connectToDb from "../configs/db";
import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";
import {
  getTotalInventoryStats,
  getUsersStats,
} from "./userDataAction";

function calcChangesPercent(
  newValue = 0,
  oldValue = 0,
) {
  if (oldValue === 0) return 0;
  return Math.floor(
    ((newValue - oldValue) / oldValue) *
      100,
  );
}
export async function getLast30DaysOrders() {
  await connectToDb();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30,
  );
  const lastThirtyDaysAgo = new Date(
    thirtyDaysAgo,
  );
  lastThirtyDaysAgo.setDate(
    thirtyDaysAgo.getDate() - 30,
  );

  const thisPeriodOrders =
    await Order.find({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    }).lean();
  const thisPeriodProducts =
    await Product.find({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    }).lean();
  const thisPeriodCustomers =
    await User.find({
      createdAt: {
        $gte: thirtyDaysAgo,
      },
    }).lean();
  const pastPeriodOrders =
    await Order.find({
      createdAt: {
        $gte: lastThirtyDaysAgo,
        $lte: thirtyDaysAgo,
      },
    }).lean();
  const pastPeriodProducts =
    await Product.find({
      createdAt: {
        $gte: lastThirtyDaysAgo,
        $lte: thirtyDaysAgo,
      },
    }).lean();
  const pastPeriodCustomers =
    await User.find({
      createdAt: {
        $gte: lastThirtyDaysAgo,
        $lte: thirtyDaysAgo,
      },
    }).lean();
  //
  const thisPeriodTotalRevenue =
    thisPeriodOrders
      .filter(
        (cur) =>
          cur.paymentStatus === "paid",
      )
      .reduce((acc, cur) => {
        return (acc += cur.totalPrice);
      }, 0);
  const lastPeriodTotalRevenue =
    thisPeriodOrders
      .filter(
        (cur) =>
          cur.paymentStatus === "paid",
      )
      .reduce((acc, cur) => {
        return (acc += cur.totalPrice);
      }, 0);

  const thisPeriodTotalOrders =
    thisPeriodOrders.length;
  const thisPeriodTotalCustomers =
    thisPeriodCustomers.length;
  const thisPeriodTotalProducts =
    thisPeriodProducts.length;
  //
  const lastPeriodTotalOrders =
    pastPeriodOrders.length;
  const lastPeriodTotalCustomers =
    pastPeriodCustomers.length;
  const lastPeriodTotalProducts =
    pastPeriodProducts.length;
  // console.log({
  //   thisPeriodTotalCustomers,
  //   thisPeriodTotalProducts,
  //   thisPeriodTotalOrders,
  //   thisPeriodTotalRevenue,
  // });
  return {
    totalOrdersChange:
      calcChangesPercent(
        thisPeriodTotalOrders,
        lastPeriodTotalOrders,
      ),
    totalProductsChange:
      calcChangesPercent(
        thisPeriodTotalProducts,
        lastPeriodTotalProducts,
      ),

    totalCustomersChange:
      calcChangesPercent(
        thisPeriodTotalCustomers,
        lastPeriodTotalCustomers,
      ),
    totalRevenueChange:
      calcChangesPercent(
        thisPeriodTotalRevenue,
        lastPeriodTotalRevenue,
      ),
    thisPeriodTotalOrders,
    thisPeriodTotalRevenue,
    thisPeriodTotalProducts,
    thisPeriodTotalCustomers,
  };
}

export async function getTodayPendingOrders() {
  await connectToDb();
  const todayOrders = await Order.find({
    createdAt: {
      $gte: new Date(),
    },
  }).lean();

  const { totalRevenue } =
    await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
      { $unwind: "$totalRevenue" },
      {
        $project: {
          totalRevenue: 1,
          _id: 0,
        },
      },
    ]);

  // const yesterday = new Date();
  // yesterday.setDate(
  //   yesterday.getDate() - 1,
  // );
  // const YesterdayOrders =
  //   await Order.find({
  //     createdAt: {
  //       $lte: new Date(),
  //       $gte: yesterday,
  //     },
  //   }).lean();

  const totalPendingOrders =
    todayOrders?.filter(
      (cur) =>
        cur.paymentStatus === "paid" &&
        cur.status === "pending",
    ).length;
  // console.log(
  //   "pending orders: ",
  //   totalPendingOrders,
  // );
  if (totalPendingOrders) {
    return { totalPendingOrders };
  } else {
    return {
      totalRevenue,
      totalPendingOrders: 0,
    };
  }
}

export async function getDashboardStats(
  startDate,
  endDate,
) {
  await connectToDb();

  const start = new Date(startDate);
  const end = new Date(endDate);

  /*
   * اگر تاریخ نامعتبر بود
   */
  if (
    isNaN(start.getTime()) ||
    isNaN(end.getTime()) ||
    start.getTime() >= end.getTime()
  ) {
    throw new Error(
      `Invalid date range ::: start=${isNaN(start.getTime()) ? "invalid" : start.toISOString()} (${isNaN(start.getTime()) ? "NaN" : start.getTime()}) && end=${isNaN(end.getTime()) ? "invalid" : end.toISOString()} (${isNaN(end.getTime()) ? "NaN" : end.getTime()}) && start>=end=${start.getTime() >= end.getTime()}`,
    );
  }

  /*
   * طول بازه انتخاب‌شده
   */
  const rangeLength =
    end.getTime() - start.getTime();

  /*
   * بازه قبلی با همان طول
   */
  const previousEnd = new Date(start);

  const previousStart = new Date(
    start.getTime() - rangeLength,
  );

  /*
   * یک تابع کوچک برای گرفتن آمار
   */

  async function getStats(from, to) {
    const result =
      await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: from,
              $lt: to,
            },
          },
        },
        {
          $facet: {
            /*
             * تعداد سفارش‌ها
             */
            orders: [
              {
                $count: "count",
              },
            ],
            /*
             * فروش
             *
             * فقط سفارش‌های پرداخت شده
             */
            sales: [
              {
                $match: {
                  paymentStatus: "paid",
                },
              },
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$totalPrice",
                  },
                },
              },
            ],

            /*
             * سفارش‌های در انتظار
             */
            pending: [
              {
                $match: {
                  status: "pending",
                },
              },
              {
                $count: "count",
              },
            ],
          },
        },
      ]);
    const stats = result[0];

    return {
      orders:
        stats.orders[0]?.count ?? 0,

      sales: stats.sales[0]?.total ?? 0,

      pending:
        stats.pending[0]?.count ?? 0,
    };
  }

  /*
   * آمار بازه فعلی
   */
  const current = await getStats(
    start,
    end,
  );

  const a = await getUsersStats(
    start,
    end,
  );

  const b =
    await getTotalInventoryStats(
      start,
      end,
    );
  current.customers = a.count;
  current.inventory = b.totalCount;

  // console.log(
  //   "a a a a a a a a: ",
  //   a,
  //   "\n bbbbbb",
  //   b,

  //   current,
  // );

  /*
   * آمار بازه قبلی
   */
  const previous = await getStats(
    previousStart,
    previousEnd,
  );

  /*
   * محاسبه درصد تغییر
   */
  function percentageChange(
    current,
    previous,
  ) {
    if (previous === 0) {
      return current === 0 ? 0 : null;
    }

    return (
      ((current - previous) /
        previous) *
      100
    );
  }

  return {
    current,

    previous,

    comparison: {
      orders: percentageChange(
        current.orders,
        previous.orders,
      ),

      sales: percentageChange(
        current.sales,
        previous.sales,
      ),

      pending: percentageChange(
        current.pending,
        previous.pending,
      ),
    },
  };
}

// async function a() {
//   await connectToDb();
//   await Order.aggregate([
//     {
//       $group: {
//         _id: "$city",
//         totalNumber: { $sum: 1 },
//       },
//     },
//   ]);

//   order.aggregate([
//     {
//       $group: {
//         _id: "$city",
//         avgAge: { $avg: "$age" },
//       },
//     },
//   ]);

//   db.orders.aggregate([
//     {
//       $lookup: {
//         from: "products",
//         localField: "productId",
//         foreignField: "_id",
//         as: "productDetails",
//       },
//     },
//     { $unwind: "$productDetails" },
//     {
//       $group: {
//         _id: "$productDetails.category",
//         totalSales: { $sum: "$amount" },
//       },
//     },
//   ]);

//   db.sales.aggregate([
//     {
//       $facet: {
//         totalSales: [
//           {
//             $group: {
//               _id: null,
//               total: {
//                 $sum: "$amount",
//               },
//             },
//           },
//         ],
//         salesByRegion: [
//           {
//             $group: {
//               _id: "$region",
//               total: {
//                 $sum: "$amount",
//               },
//             },
//           },
//         ],
//         salesByCategory: [
//           {
//             $group: {
//               _id: "$category",
//               total: {
//                 $sum: "$amount",
//               },
//             },
//           },
//         ],
//       },
//     },
//   ]);
// }
