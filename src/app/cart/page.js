"use client";

import { findProductsById } from "@src/actions/productActions";
import { useCart } from "@src/context/CartContext";
import Image from "next/image";
import {
  useEffect,
  useState,
} from "react";
import {
  IoAdd,
  IoRemove,
  IoTrashOutline,
} from "react-icons/io5";

// const initialCart = [
//   {
//     id: 1,
//     title: "Soft Cotton Romper",
//     image: "/baby-clothe-0.jpg",

//     price: 24.99,

//     quantity: 2,

//     selectedColor: "Pink",

//     colors: [
//       {
//         name: "Pink",
//         hex: "#F8BBD0",
//       },
//       {
//         name: "White",
//         hex: "#FFFFFF",
//       },
//       {
//         name: "Beige",
//         hex: "#E6D3B3",
//       },
//     ],
//   },

//   {
//     id: 2,
//     title: "Baby Hoodie",

//     image: "/baby-clothe-1.jpg",

//     price: 31.99,

//     quantity: 1,

//     selectedColor: "Blue",

//     colors: [
//       {
//         name: "Blue",
//         hex: "#90CAF9",
//       },
//       {
//         name: "Gray",
//         hex: "#BDBDBD",
//       },
//     ],
//   },
// ];
// {
//     _id: '6a5fa6971512f7e841b70e8c',
//     title: 'Floral Summer Dress',
//     description: 'Soft floral cotton dress for girls, perfect for warm summer days.',
//     category: 'Girls',
//     tags: [ 'dress', 'summer', 'cotton' ],
//     images: [ '/baby-clothe-0.jpg' ],
//     price: 39.99,
//     discount: 10,
//     colors: [ [Object], [Object] ],
//     sizes: [ '2Y', '3Y', '4Y' ],
//     totalStock: 20,
//     material: '100% Cotton',
//     __v: 0,
//     createdAt: '2026-07-21T17:04:23.943Z',
//     updatedAt: '2026-07-21T17:04:23.943Z',
//     quantity: 1
//   },

[
  {
    product: {
      _id: "6a6aac3fc099184b362f3e84",
      title: "Cute Bunny Romper",
      slug: "cute-bunny-romper",
      description:
        "Soft cotton romper with adorable bunny print.",
      category: "Newborn",
      tags: [Array],
      images: [Array],
      price: 420000,
      discount: 10,
      material: "100% Cotton",
      featured: true,
      isActive: true,
      __v: 0,
      createdAt:
        "2026-07-30T01:43:27.798Z",
      updatedAt:
        "2026-07-30T01:43:27.798Z",
    },
    color: {
      name: "Pink",
      hex: "#FFC0CB",
    },
    size: "NB",
    stock: 9,
    barcode: "",
    __v: 0,
    createdAt:
      "2026-07-30T01:43:27.874Z",
    updatedAt:
      "2026-07-30T01:43:27.874Z",
    quantity: 1,
    id: "6a6aac3fc099184b362f3e98",
  },
  {
    product: {
      _id: "6a6aac3fc099184b362f3e84",
      title: "Cute Bunny Romper",
      slug: "cute-bunny-romper",
      description:
        "Soft cotton romper with adorable bunny print.",
      category: "Newborn",
      tags: [Array],
      images: [Array],
      price: 420000,
      discount: 10,
      material: "100% Cotton",
      featured: true,
      isActive: true,
      __v: 0,
      createdAt:
        "2026-07-30T01:43:27.798Z",
      updatedAt:
        "2026-07-30T01:43:27.798Z",
    },
    color: {
      name: "Pink",
      hex: "#FFC0CB",
    },
    size: "0-3M",
    stock: 4,
    barcode: "",
    __v: 0,
    createdAt:
      "2026-07-30T01:43:27.874Z",
    updatedAt:
      "2026-07-30T01:43:27.874Z",
    quantity: 1,
    id: "6a6aac3fc099184b362f3e99",
  },
  {
    product: {
      _id: "6a6aac3fc099184b362f3e85",
      title: "Little Bear Bodysuit",
      slug: "little-bear-bodysuit",
      description:
        "Comfortable everyday baby bodysuit.",
      category: "Newborn",
      tags: [Array],
      images: [Array],
      price: 360000,
      discount: 0,
      material: "Cotton",
      featured: false,
      isActive: true,
      __v: 0,
      createdAt:
        "2026-07-30T01:43:27.802Z",
      updatedAt:
        "2026-07-30T01:43:27.802Z",
    },
    color: {
      name: "Pink",
      hex: "#FFC0CB",
    },
    size: "NB",
    stock: 1,
    barcode: "",
    __v: 0,
    createdAt:
      "2026-07-30T01:43:27.875Z",
    updatedAt:
      "2026-07-30T01:43:27.875Z",
    quantity: 1,
    id: "6a6aac3fc099184b362f3e9a",
  },
];
export default function CartPage() {
  const { cartItems } = useCart();
  // console.log(cartItems);
  const [cart, setCart] = useState([]);
  // initialCart,
  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data =
          await findProductsById(
            cartItems,
          );
        setCart(data);
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const increase = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decrease = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((items) =>
      items.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const changeColor = (id, color) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              selectedColor: color,
            }
          : item,
      ),
    );
  };

  cart.map((item) => {
    console.log(item.price);
  });

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity),
    0,
  );
  console.log(
    "0000000000",
    cartItems[0]?.price,
    subtotal,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 text-zinc-600">
      <h1 className="mb-10 text-4xl font-bold text-[#FFF9EB]">
        Shopping Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_380px]">
        {/* Cart Items */}

        <div className="space-y-6">
          {cart.map((item) => (
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
              {console.log(item)}
              {/* Content */}

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-2xl font-bold">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(
                        item.id,
                      )
                    }
                    className="text-zinc-400 transition ml-2 hover:text-red-500"
                  >
                    <IoTrashOutline
                      size={24}
                    />
                  </button>
                </div>

                {/* Colors */}

                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium">
                    Color
                  </p>

                  <div className="flex gap-3">
                    {item.colorAndSizes.map(
                      (color) => (
                        <button
                          key={color[0]}
                          onClick={() =>
                            changeColor(
                              item.id,
                              color[0],
                            )
                          }
                          className={`h-8 w-8 rounded-full border-2 transition ${
                            item.selectedColor ===
                            color[0]
                              ? "border-zinc-900"
                              : "border-transparent"
                          }`}
                          style={{
                            backgroundColor:
                              color[1],
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>

                {/* Quantity */}

                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() =>
                      decrease(item.id)
                    }
                    className="rounded-full border p-2"
                  >
                    <IoRemove />
                  </button>

                  <span className="w-8 text-center text-lg font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increase(item.id)
                    }
                    className="rounded-full border p-2"
                  >
                    <IoAdd />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="h-fit rounded-3xl border bg-[#FFF9EB] p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Order Summary
          </h2>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                ${subtotal.toFixed(2)}
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
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button className="cursor-pointer mt-8 w-full rounded-full bg-[#F9E34F] py-4 font-semibold transition hover:brightness-95">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
