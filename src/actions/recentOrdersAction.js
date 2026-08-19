"use server";

import connectToDb from "../configs/db";
import Order from "../models/Order";

export async function recentOrdersAction() {
  await connectToDb();
  const result = JSON.parse(
    JSON.stringify(
      await Order.aggregate([
        { $limit: 5 },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            id: "$_id",
            customer: "$user.phone",
            date: "$createdAt",
            total: "$totalPrice",
            paymentStatus:
              "$paymentStatus",

            status: 1,
          },
        },
      ]),
    ),
  );
  console.log(
    "recent orders: ",
    result,
  );
  return result;
}
//#100245	Sarah Johnson	2026-08-05	$124.00	Delivered

` Object { totalPrice: 3210000, status: "pending", paymentStatus: "paid", … }
​
​
__v: 0
​
​
_id: Object { buffer: Uint8Array(12) }
​
​
createdAt: Date Sat Aug 08 2026 18:37:28 GMT+0330 (Iran Standard Time)
​
​
items: Array(3) [ {…}, {…}, {…} ]
​
​
​
0: Object { product: {…}, quantity: 1, unitPrice: 420000, … }
​
​
​
​
_id: Object { buffer: Uint8Array(12) }
​
​
​
​
inventory: Object { buffer: Uint8Array(12) }
​
​
​
​
product: Object { buffer: Uint8Array(12) }
​
​
​
​
quantity: 1
​
​
​
​
unitPrice: 420000
​
​
​
​
<prototype>: Object { … }
​
​
​
1: Object { product: {…}, quantity: 2, unitPrice: 360000, … }
​
​
​
2: Object { product: {…}, quantity: 3, unitPrice: 690000, … }
​
​
​
length: 3
​
​
​
<prototype>: Array []
​
​
paymentStatus: "paid"
​
​
status: "pending"
​
​
totalPrice: 3210000
​
​
updatedAt: Date Sat Aug 08 2026 18:37:28 GMT+0330 (Iran Standard Time)
​
​
user: Object { buffer: Uint8Array(12) }`;
