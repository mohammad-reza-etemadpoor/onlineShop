"use server";

import connectToDb from "@src/configs/db";
import ProductInventory from "@src/models/ProductInventory";
import Product from "@src/models/Product";
export async function findProductsById() {
  await connectToDb();

  const cartItems = JSON.parse(
    JSON.stringify(
      await Product.find({
        _id: {
          $in: [
            "6a6aac3fc099184b362f3e84",
          ],
        },
      }),
    ),
  );

  const inventory =
    await ProductInventory.find({
      product: String(
        "6a6aac3fc099184b362f3e84",
      ),
    }).lean();

  // const variants = inventory.map(
  //   (cur, i) => [
  //     cur._id,
  //     cur.color.name,
  //     cur.size,
  //     cur.stock,
  //   ],
  // );

  const b = inventory.map((cur, i) => ({
    inventoryId: cur._id;
    color: cur.color.name;
    size: cur.size;
    stock: cur.stock;
  }));

  // console.log("popoopp", colorAndSizes);

  if (cartItems.length < 1) {
    // throw new Error("cart is empty!");
    console.log("cart is empty!");
  }

  cartItems.map((item, i) => {
    item.quantity = 1;
    item.variants = b;
    item.id = item._id;
    delete item._id;
  });

  // console.log(cartItems);
  return cartItems;
}
