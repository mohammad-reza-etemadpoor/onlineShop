"use client";

import {
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import {
  IoFilterOutline,
  IoStar,
  IoStarHalf,
} from "react-icons/io5";
import { useCart } from "@src/context/CartContext";

// const products = [
//   {
//     id: 1,
//     title: "Soft Cotton Dress",
//     price: 29.99,
//     image: "/product-1.jpg",
//     tag: "Girls",
//   },
//   {
//     id: 2,
//     title: "Classic Denim Set",
//     price: 34.99,
//     image: "/images/product-2.jpg",
//     tag: "Boys",
//   },
//   {
//     id: 3,
//     title: "Newborn Romper",
//     price: 19.99,
//     image: "/images/product-3.jpg",
//     tag: "Newborn",
//   },
//   {
//     id: 4,
//     title: "Maternity Hoodie",
//     price: 39.99,
//     image: "/images/product-4.jpg",
//     tag: "Maternity",
//   },
//   {
//     id: 5,
//     title: "Floral Dress",
//     price: 27.99,
//     image: "/images/product-5.jpg",
//     tag: "Girls",
//   },
//   {
//     id: 6,
//     title: "Baby Overall",
//     price: 22.99,
//     image: "/images/product-6.jpg",
//     tag: "Newborn",
//   },
// ];

const filters = [
  "All",
  "Girls",
  "Boys",
  "Newborn",
  "Maternity",
];

export default function AllProducts({
  products,
}) {
  const { cartItems, setCartItems } =
    useCart();

  const [selected, setSelected] =
    useState("All");

  const filteredProducts =
    useMemo(() => {
      if (selected === "All")
        return products;

      return products.filter(
        (item) => item.tag === selected,
      );
    }, [selected]);

  return (
    <section className="mx-auto text-zinc-900 max-w-7xl px-4 py-20">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
            Collection
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            All Products
          </h2>
        </div>

        <IoFilterOutline size={28} />
      </div>

      {/* Filters */}

      <div className="mb-10 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setSelected(filter)
            }
            className={`rounded-full border px-5 py-2 transition
            ${
              selected === filter
                ? "bg-[#F9E34F] border-[#F9E34F]"
                : "border-zinc-300 hover:border-zinc-900"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Products */}

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-8">
        {products.map((product, i) => (
          <div
            key={product._id}
            id={`${product._id}`}
            // key={i}
            className="border-zinc-300 relative overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-square">
              <Image
                //   src={product.image}
                src={`/${i > 14 ? "newborn-" + (i - 15) : "baby-clothe-" + i}.jpg`}
                alt={product.title}
                // alt={i}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <span className="text-xs uppercase tracking-widest text-zinc-400">
                {product.tags}
              </span>

              <h3 className="mt-2 min-h-14 text-lg font-semibold">
                {product.title}
                {/* {"title" + i} */}
              </h3>

              {/* <div className="mt-3 flex items-center gap-1 text-yellow-500">
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStar />
                  <IoStarHalf />
                </div> */}

              <p className="mt-4 text-2xl font-bold">
                ${product.price}
                {/* ${"1"} */}
              </p>

              <button
                id={`${product._id}`}
                onClick={(e) => {
                  // console.log(
                  //   e.target.id,
                  // );
                  setCartItems([
                    ...cartItems,
                    e.target.id,
                  ]);
                }}
                className="mt-5 w-full cursor-pointer bottom-5 rounded-full bg-[#F9E34F] py-3 font-semibold transition hover:brightness-95"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
