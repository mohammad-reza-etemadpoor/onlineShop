"use server";

import connectToDb from "../configs/db";
import Order from "../models/Order";

export async function topSellingProductsAction(
  start,
  end,
) {
  const from = new Date(start);
  const to = new Date(end);

  await connectToDb();
  const result = JSON.parse(
    JSON.stringify(
      await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: from,
              $lte: to,
            },
          },
        },
        // 1. Turn each item in the order into its own document
        {
          $unwind: "$items",
        },
        // 2. Group items by product
        {
          $group: {
            _id: "$items.product",

            sold: {
              $sum: "$items.quantity",
            },

            revenue: {
              $sum: {
                $multiply: [
                  "$items.quantity",
                  "$items.unitPrice",
                ],
              },
            },
          },
        },

        // 3. Get the product information
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },

        // 4. Convert product array into object
        {
          $unwind: "$product",
        },

        // 5. Shape the final result
        {
          $project: {
            _id: 0,

            productId: "$_id",

            title: "$product.title",

            images: "$product.images",

            sold: 1,

            revenue: 1,
          },
        },
        // 6. Highest-selling products first
        {
          $sort: {
            sold: -1,
          },
        },
        { $limit: 4 },
      ]),
    ),
  );
  return result;
}
