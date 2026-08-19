"use server";

import connectToDb from "@src/configs/db";
import { auth } from "@src/lib/auth";
import Order from "@src/models/Order";
import Product from "@src/models/Product";
import ProductInventory from "@src/models/ProductInventory";
import User from "@src/models/User";
// export async function findProductsById() {
//   await connectToDb();

//   const cartItems = JSON.parse(
//     JSON.stringify(
//       await Product.find({
//         _id: {
//           $in: [
//             "6a6aac3fc099184b362f3e84",
//             "6a6aac3fc099184b362f3e85",
//           ],
//         },
//       }),
//     ),
//   );

//   const inventory = JSON.parse(
//     JSON.stringify(
//       await ProductInventory.find({
//         product: {
//           $in: [
//             "6a6aac3fc099184b362f3e84",
//             "6a6aac3fc099184b362f3e85",
//           ],
//         },
//       }).lean(),
//     ),
//   );

//   // const variants = inventory.map(
//   //   (cur, i) => [
//   //     cur._id,
//   //     cur.color.name,
//   //     cur.size,
//   //     cur.stock,
//   //   ],
//   // );

//   const variants = inventory.map(
//     (cur, i) => ({
//       inventoryId: cur._id,
//       color: cur.color.name,
//       size: cur.size,
//       stock: cur.stock,
//     }),
//   );

//   // console.log("popoopp", colorAndSizes);

//   if (cartItems.length < 1) {
//     // throw new Error("cart is empty!");
//     console.log("cart is empty!");
//   }

//   cartItems.forEach((item) => {
//     item.quantity = 1;
//     item.selectedSize = "";
//     item.selectedColor = "";
//     item.selectedInventoryId = "";
//     item.variants = variants;

//     item.id = item._id;
//     delete item._id;
//   });
//   // console.log(cartItems);
//   return cartItems;
// }

export async function findProductsById(
  productIds,
) {
  await connectToDb();

  if (
    !Array.isArray(productIds) ||
    productIds.length === 0
  ) {
    return [];
  }

  const products = await Product.find({
    _id: {
      $in: productIds,
    },
  }).lean();

  const inventories =
    await ProductInventory.find({
      product: {
        $in: productIds,
      },
    }).lean();

  // گروه‌بندی Variantها بر اساس ProductId
  const inventoryMap = {};

  for (const inventory of inventories) {
    const productId = String(
      inventory.product,
    );

    if (!inventoryMap[productId]) {
      inventoryMap[productId] = [];
    }

    inventoryMap[productId].push({
      inventoryId: String(
        inventory._id,
      ),

      color: inventory.color.name,

      size: inventory.size,

      stock: inventory.stock,
    });
  }

  const cart = products.map(
    (product) => ({
      id: String(product._id),

      title: product.title,

      slug: product.slug,

      description: product.description,

      images: product.images,

      price:
        product.finalPrice ??
        product.price,

      quantity: 1,

      selectedSize: "",

      selectedColor: "",

      selectedInventoryId: "",

      variants:
        inventoryMap[
          String(product._id)
        ] ?? [],
    }),
  );

  return JSON.parse(
    JSON.stringify(cart),
  );
}

export async function getProductsOrder() {
  const session = await auth();
  await connectToDb();
  // console.log(await auth());
  if (!session)
    throw new Error(
      "user is not logged in!",
    );
  let b;
  if (session?.user) {
    const userId = await User.findOne(
      { phone: session.user.phone },
      { _id: 1 },
    );
    const order = JSON.parse(
      JSON.stringify(
        await Order.findOne({
          user: userId._id,
        })
          .populate("items.inventory")
          .populate("items.product")
          .lean(),
      ),
    );

    // Array [ {…} ]
    // ​
    // 0: Object { id: "6a6aac3fc099184b362f3e84", title: "Cute Bunny Romper", slug: "cute-bunny-romper", … }
    // ​
    // ​
    // description: "Soft cotton romper with adorable bunny print."
    // ​
    // ​
    // id: "6a6aac3fc099184b362f3e84"
    // ​
    // ​
    // images: Array [ "/baby-clothe-0.jpg", "/products/bunny-romper-2.jpg" ]
    // ​
    // ​
    // price: 420000
    // ​
    // ​
    // quantity: 1
    // ​
    // ​
    // selectedColor: ""
    // ​
    // ​
    // selectedInventoryId: ""
    // ​
    // ​
    // selectedSize: ""
    // ​
    // ​
    // slug: "cute-bunny-romper"
    // ​
    // ​
    // title: "Cute Bunny Romper"
    // ​
    // ​
    // variants: Array [ {…}, {…} ]
    // ​
    // ​
    // <prototype>: Object { … }
    // ​
    // _debugInfo: Array [ {…}, {…} ]
    // ​
    // length: 1
    const prodIds = [];
    const items = order?.items?.map(
      (item) => {
        prodIds.push(item.product._id);
        return {
          id: item.product._id,
          quantity: item.quantity,
          size: item.inventory.size,
          color:
            item.inventory.color.name,
          inventoryId:
            item.inventory._id,
        };
      },
    );
    const a =
      await findProductsById(prodIds);

    b = a.map((item) => {
      const selectedProd = items.filter(
        (obj) => obj.id === item.id,
      );
      // console.log(selectedProd[0].size);
      return {
        ...item,
        quantity:
          selectedProd[0].quantity,

        selectedSize:
          selectedProd[0].size,
        selectedColor:
          selectedProd[0].color,
        selectedInventoryId:
          selectedProd[0].inventoryId,
      };
    });
    const temp = [
      {
        id: "6a6aac3fc099184b362f3e84",
        title: "Cute Bunny Romper",
        slug: "cute-bunny-romper",
        description:
          "Soft cotton romper with adorable bunny print.",
        images: [
          "/baby-clothe-0.jpg",
          "/products/bunny-romper-2.jpg",
        ],
        price: 420000,
        quantity: 1,
        selectedSize: "",
        selectedColor: "",
        selectedInventoryId: "",
        variants: [[Object], [Object]],
      },
    ];

    // console.log("items", items);

    // const cart = products.map(
    //   (product) => ({
    //     id: String(product._id),

    //     title: product.title,

    //     slug: product.slug,

    //     description:
    //       product.description,

    //     images: product.images,

    //     price:
    //       product.finalPrice ??
    //       product.price,

    //     quantity: 1,

    //     selectedSize: "",

    //     selectedColor: "",

    //     selectedInventoryId: "",

    //     variants:
    //       inventoryMap[
    //         String(product._id)
    //       ] ?? [],
    //   }),
    // );

    // console.log(b);
    // console.log(
    //   // session,
    //   items,
    //   "<====items",
    //   b,
    //   // userId,
    //   // "hoho",
    //   // order,
    //   "9999999999999999999999999999",
    // );
  }
  return b;
}

export async function mergeCartAction(
  contextProducts,
) {
  const session = await auth();

  // اگر کاربر لاگین نیست
  if (!session) {
    return contextProducts;
  }
  //پیدا کردن یوزر
  const user = await User.findOne({
    phone: session.user.phone,
  });
  //early return
  if (!user) {
    return contextProducts;
  }

  const order = await Order.findOne({
    user: user._id,
    paymentStatus: "unpaid",
  });

  // اگر سفارش پرداخت نشده‌ای وجود ندارد
  if (!order) {
    return contextProducts;
  }

  // ===========================
  // ساخت Map برای دسترسی سریع
  // ===========================

  const contextMap = new Map();

  contextProducts.forEach((product) => {
    contextMap.set(
      String(product.id),
      product,
    );
  });

  // ===========================
  // Merge سفارش با Context
  // ===========================

  for (const orderItem of order.items) {
    const productId = String(
      orderItem.product,
    );
    // console.log(
    //   "productAction prodId:",
    //   productId,
    // );
    // productAction prodId: 6a6aac3fc099184b362f3e86
    const contextItem =
      contextMap.get(productId);

    // console.log(
    //   "productAction contextItem:",
    //   contextItem,
    // );
    // productAction contextItem: undefined

    // --------------------------------------------------
    // محصول داخل Context وجود دارد
    // --------------------------------------------------

    if (contextItem) {
      contextItem.quantity =
        orderItem.quantity;

      contextItem.selectedInventoryId =
        String(orderItem.inventory);

      contextItem.selectedColor = "";
      contextItem.selectedSize = "";

      const variant =
        contextItem.variants.find(
          (variant) =>
            variant.inventoryId ===
            String(orderItem.inventory),
        );

      if (variant) {
        contextItem.selectedColor =
          variant.color;

        contextItem.selectedSize =
          variant.size;
      }

      continue;
    }

    // --------------------------------------------------
    // محصول داخل Context وجود ندارد
    // --------------------------------------------------

    const products =
      await findProductsById([
        productId,
      ]);

    if (products.length === 0) {
      continue;
    }

    const newItem = products[0];

    newItem.quantity =
      orderItem.quantity;

    newItem.selectedInventoryId =
      String(orderItem.inventory);

    newItem.selectedColor = "";
    newItem.selectedSize = "";

    const variant =
      newItem.variants.find(
        (variant) =>
          variant.inventoryId ===
          String(orderItem.inventory),
      );

    if (variant) {
      newItem.selectedColor =
        variant.color;

      newItem.selectedSize =
        variant.size;
    }

    contextProducts.push(newItem);

    contextMap.set(productId, newItem);
  }

  return contextProducts;
}
