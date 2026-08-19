"use server";

import connectToDb from "../configs/db";
import ProductInventory from "../models/ProductInventory";
import User from "../models/User";

export async function getUsersStats(
  start,
  end,
) {
  await connectToDb();
  const from = new Date(start);
  const to = new Date(end);
  //   console.log(from, to);
  const result = await User.aggregate([
    {
      $match: {
        createdAt: {
          $gte: from,
          $lt: to,
        },
      },
    },
    { $count: "count" },
  ]);

  const stats = result?.[0];

  // console.log("stats", stats);

  return stats ? stats : { count: 0 };
}

export async function getTotalInventoryStats(
  start,
  end,
) {
  await connectToDb();
  const from = new Date(start);
  const to = new Date(end);
  //console.log(from, to);
  const result =
    await ProductInventory.aggregate([
      {
        $group: {
          _id: null,
          totalCount: {
            $sum: "$stock",
          },
        },
      },
      {
        $project: {
          totalCount: 1,
          _id: 0,
        },
      },
    ]);

  const stats = result?.[0];

  // console.log(
  //   "total inventory stats: ",
  //   stats,
  // );

  return stats
    ? stats
    : { totalcount: 0 };
}
