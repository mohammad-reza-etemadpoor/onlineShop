"use client";
// const { cartItems } = useCart();
// // console.log(cartItems);
// const [cart, setCart] = useState([]);
// // initialCart,
// const [isLoading, setIsLoading] =
//   useState(false);
// useEffect(() => {
//   const fetchProducts = async () => {
//     setIsLoading(true);
//     try {
//       const data =
//         await findProductsById(
//           cartItems,
//         );
//       setCart(data);
//     } catch (err) {
//       console.log("Error: ", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchProducts();
// }, []);

const context = {
  description:
    "Soft cotton romper with adorable bunny print.",

  id: "6a6aac3fc099184b362f3e84",

  images:
    Array[
      ("/baby-clothe-0.jpg",
      "/products/bunny-romper-2.jpg")
    ],

  price: 420000,

  quantity: 1,

  selectedColor: "",

  selectedInventoryId: "",

  selectedSize: "",

  slug: "cute-bunny-romper",

  title: "Cute Bunny Romper",

  // variants: Array [ {…}, {…} ],

  length: 1,
};

const orderFromDb = {
  // _id: new ObjectId(
  //   "6a6d8da88541aedb1d2c503a",
  // ),
  // user: new ObjectId(
  //   "6a67776ad19f0235792e6c7f",
  // ),
  items: [
    {
      //   product: new ObjectId(
      //     "6a6aac3fc099184b362f3e84",
      //   ),
      //   inventory: new ObjectId(
      //     "6a6aac3fc099184b362f3e98",
      //   ),
      //   quantity: 1,
      //   unitPrice: 420000,
      //   _id: new ObjectId(
      //     "6a6d8da88541aedb1d2c503b",
      //   ),
      // },
      // {
      //   product: new ObjectId(
      //     "6a6aac3fc099184b362f3e85",
      //   ),
      //   inventory: new ObjectId(
      //     "6a6aac3fc099184b362f3e9b",
      //   ),
      //   quantity: 2,
      //   unitPrice: 360000,
      //   _id: new ObjectId(
      //     "6a6d8da88541aedb1d2c503c",
      //   ),
      // },
      // {
      //   product: new ObjectId(
      //     "6a6aac3fc099184b362f3e86",
      //   ),
      //   inventory: new ObjectId(
      //     "6a6aac3fc099184b362f3e9d",
      //   ),
      //   quantity: 3,
      //   unitPrice: 690000,
      //   _id: new ObjectId(
      //     "6a6d8da88541aedb1d2c503d",
      //   ),
    },
  ],
  totalPrice: 3210000,
  status: "pending",
  paymentStatus: "unpaid",
  // createdAt: 2026-08-01T06:09:44.163Z,
  // updatedAt: 2026-08-01T06:09:44.163Z,
  // __v: 0
};

import {
  useEffect,
  useState,
} from "react";
import Image from "next/image";

import {
  IoAdd,
  IoRemove,
  IoTrashOutline,
} from "react-icons/io5";

import {
  findProductsById,
  getProductsOrder,
  mergeCartAction,
} from "@src/actions/productActions";
import { useCart } from "@src/context/CartContext";
import { checkoutAction } from "../actions";

export default function CartPage() {
  const { cartItems } = useCart();

  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const contextData =
          await findProductsById(
            cartItems,
          );
        const DbData =
          await getProductsOrder();

        setCart([
          ...contextData,
          ...DbData,
        ]);
        // console.log(
        //   // await getOrderProducts(),
        //   contextData,
        //   cartItems,
        //   "daaaaaaaaaataaaaaa666666666666666666666666666666666:",
        // );
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const increase = (id) => {
    setCart((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        const variant =
          item.variants.find(
            (v) =>
              v.inventoryId ===
              item.selectedInventoryId,
          );

        if (!variant) return item;

        if (
          item.quantity >= variant.stock
        )
          return item;

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  };

  const decrease = (id) => {
    setCart((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        if (item.quantity === 1)
          return item;

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }),
    );
  };

  const removeItem = (id) => {
    setCart((items) =>
      items.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const changeSize = (id, size) => {
    setCart((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          selectedSize: size,
          selectedColor: "",
          selectedInventoryId: "",
          quantity: 1,
        };
      }),
    );
  };

  const changeColor = (id, color) => {
    setCart((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        const variant =
          item.variants.find(
            (v) =>
              v.size ===
                item.selectedSize &&
              v.color === color,
          );

        if (!variant) return item;

        return {
          ...item,
          selectedColor: color,
          selectedInventoryId:
            variant.inventoryId,
          quantity: 1,
        };
      }),
    );
  };

  const subtotal = cart?.reduce(
    (total, item) => {
      return (
        total +
        item.price * item.quantity
      );
    },
    0,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 text-zinc-700">
      <h1 className="mb-10 text-4xl font-bold text-[#FFF9EB]">
        Shopping Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_380px]">
        {/* =========================
          Cart Items
      ========================== */}

        <div className="space-y-6">
          {cart?.map((item) => {
            const sizes = [
              ...new Set(
                item.variants.map(
                  (variant) =>
                    variant.size,
                ),
              ),
            ];

            const colors = [
              ...new Set(
                item.variants
                  .filter(
                    (variant) =>
                      variant.size ===
                      item.selectedSize,
                  )
                  .map(
                    (variant) =>
                      variant.color,
                  ),
              ),
            ];

            const selectedVariant =
              item.variants.find(
                (variant) =>
                  variant.inventoryId ===
                  item.selectedInventoryId,
              );

            return (
              <div
                key={item.id}
                className="flex flex-col gap-6 rounded-3xl border bg-gray-200 p-6 shadow-sm md:flex-row"
              >
                {/* Image */}

                <div className="relative aspect-square h-40 overflow-hidden rounded-2xl">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-2xl font-bold">
                        $
                        {item.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(
                          item.id,
                        )
                      }
                      className="ml-2 text-zinc-400 transition hover:text-red-500"
                    >
                      <IoTrashOutline
                        size={24}
                      />
                    </button>
                  </div>

                  {/* Size */}

                  <div className="mt-6">
                    <p className="mb-2 text-sm font-medium">
                      Size
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {sizes.map(
                        (size) => (
                          <button
                            key={size}
                            onClick={() =>
                              changeSize(
                                item.id,
                                size,
                              )
                            }
                            className={`rounded-xl border px-4 py-2 transition ${
                              item.selectedSize ===
                              size
                                ? "border-[#F9E34F] bg-[#F9E34F]"
                                : "border-gray-300 bg-white hover:border-[#F9E34F]"
                            }`}
                          >
                            {size}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Color */}

                  {item.selectedSize && (
                    <div className="mt-6">
                      <p className="mb-2 text-sm font-medium">
                        Color
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {colors.map(
                          (color) => (
                            <button
                              key={
                                color
                              }
                              onClick={() =>
                                changeColor(
                                  item.id,
                                  color,
                                )
                              }
                              className={`rounded-xl border px-4 py-2 transition ${
                                item.selectedColor ===
                                color
                                  ? "border-[#F9E34F] bg-[#F9E34F]"
                                  : "border-gray-300 bg-white hover:border-[#F9E34F]"
                              }`}
                            >
                              {color}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stock */}

                  {selectedVariant && (
                    <p className="mt-5 text-sm text-green-600">
                      {
                        selectedVariant.stock
                      }{" "}
                      in stock
                    </p>
                  )}

                  {/* Quantity */}

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      disabled={
                        !item.selectedInventoryId
                      }
                      onClick={() =>
                        decrease(
                          item.id,
                        )
                      }
                      className="rounded-full border bg-white p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <IoRemove />
                    </button>

                    <span className="w-8 text-center text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      disabled={
                        !item.selectedInventoryId
                      }
                      onClick={() =>
                        increase(
                          item.id,
                        )
                      }
                      className="rounded-full border bg-white p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <IoAdd />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* =========================
          Order Summary
      ========================== */}

        <div className="h-fit rounded-3xl border bg-[#FFF9EB] p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                $
                {subtotal?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>
                $
                {subtotal?.toLocaleString()}
              </span>
            </div>
          </div>

          <form action={checkoutAction}>
            <input
              type="hidden"
              name="cart"
              value={JSON.stringify(
                cart?.map((item) => ({
                  inventoryId:
                    item.selectedInventoryId,
                  quantity:
                    item.quantity,
                })),
              )}
            />
            <button
              type="submit"
              disabled={cart?.some(
                (item) =>
                  !item.selectedInventoryId,
              )}
              className="mt-8 w-full rounded-full bg-[#F9E34F] py-4 font-semibold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          </form>

          {cart?.some(
            (item) =>
              !item.selectedInventoryId,
          ) && (
            <p className="mt-4 text-center text-sm text-red-500">
              Please select a size and a
              color for all products.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
