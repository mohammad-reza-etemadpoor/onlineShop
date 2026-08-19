"use server";

import connectToDb from "@src/configs/db";
import Order from "@src/models/Order";

export async function getSalesOverviewAction(
  startDate,
  // endDate,
) {
  await connectToDb();

  const start = new Date(startDate);
  // const end = new Date(endDate);

  // if (
  //   isNaN(start.getTime()) ||
  //   isNaN(end.getTime()) ||
  //   start >= end
  // ) {
  //   throw new Error(
  //     "Invalid date range",
  //   );
  // }

  const sales = await Order.aggregate([
    // Only orders inside the selected range
    {
      $match: {
        createdAt: {
          $gte: start,
        },
        // Only successful payments count as sales
        // paymentStatus: "paid",
      },
    },

    // Group orders by year + month
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },

          month: {
            $month: "$createdAt",
          },
        },

        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },

    // Sort chronologically
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  return sales.map((item) => ({
    year: item._id.year,
    month: item._id.month,
    sales: item.totalSales,
  }));
}

export default getSalesOverviewAction;
