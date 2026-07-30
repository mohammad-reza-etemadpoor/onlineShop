"use client";

import Image from "next/image";
import { useState } from "react";
import {
  IoAdd,
  IoRemove,
  IoTrashOutline,
} from "react-icons/io5";

const initialCart = [
  {
    id: 1,
    title: "Soft Cotton Romper",
    image: "/baby-clothe-0.jpg",

    price: 24.99,

    quantity: 2,

    selectedColor: "Pink",

    colors: [
      {
        name: "Pink",
        hex: "#F8BBD0",
      },
      {
        name: "White",
        hex: "#FFFFFF",
      },
      {
        name: "Beige",
        hex: "#E6D3B3",
      },
    ],
  },

  {
    id: 2,
    title: "Baby Hoodie",

    image: "/baby-clothe-1.jpg",

    price: 31.99,

    quantity: 1,

    selectedColor: "Blue",

    colors: [
      {
        name: "Blue",
        hex: "#90CAF9",
      },
      {
        name: "Gray",
        hex: "#BDBDBD",
      },
    ],
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(
    initialCart,
  );

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

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="mb-10 text-4xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_380px]">
        {/* Cart Items */}

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 rounded-3xl border bg-white p-6 shadow-sm md:flex-row"
            >
              {/* Image */}

              <div className="relative aspect-square h-40 overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
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
                      ${item.price}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(
                        item.id,
                      )
                    }
                    className="text-zinc-400 transition hover:text-red-500"
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
                    {item.colors.map(
                      (color) => (
                        <button
                          key={
                            color.name
                          }
                          onClick={() =>
                            changeColor(
                              item.id,
                              color.name,
                            )
                          }
                          className={`h-8 w-8 rounded-full border-2 transition ${
                            item.selectedColor ===
                            color.name
                              ? "border-zinc-900"
                              : "border-transparent"
                          }`}
                          style={{
                            backgroundColor:
                              color.hex,
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

          <button className="mt-8 w-full rounded-full bg-[#F9E34F] py-4 font-semibold transition hover:brightness-95">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
