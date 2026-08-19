"use client";

import { topSellingProductsAction } from "@/src/actions/topSellingProductsAction";
import { useDashboard } from "@/src/context/DashBoardContext";
import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import { LuArrowRight } from "react-icons/lu";

const products = [
  {
    id: 1,
    name: "Cute Bunny Romper",
    image: "/baby-clothe-1.jpg",
    sold: 182,
    revenue: "$3,640",
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    image: "/baby-clothe-2.jpg",
    sold: 164,
    revenue: "$3,116",
  },
  {
    id: 3,
    name: "Baby Knit Sweater",
    image: "/baby-clothe-3.jpg",
    sold: 148,
    revenue: "$2,960",
  },
  {
    id: 4,
    name: "Classic Cotton Set",
    image: "/baby-clothe-4.jpg",
    sold: 133,
    revenue: "$2,660",
  },
  //   {
  //     id: 5,
  //     name: "Winter Hoodie",
  //     image: "/baby-clothe-5.jpg",
  //     sold: 120,
  //     revenue: "$2,400",
  //   },
];
// Array(6) [ {…}, {…}, {…}, {…}, {…}, {…} ]
// Object { sold: 6, revenue: 3840000, productId: "6a6aac3fc099184b362f3e8b", … }

const a = {
  images:
    Array["/products/overalls.jpg"],
  productId: "6a6aac3fc099184b362f3e8b",
  revenue: 3840000,
  sold: 6,
  title: "Baby Denim Overalls",
};

export default function TopSellingProducts() {
  const [products, setProducts] =
    useState();
  const { dateRange } = useDashboard();
  // console.log(
  //   "date range in top selling: ",
  //   dateRange,
  //   "\n",
  //   dateRange.startDate,
  //   "\n",
  //   dateRange.endDate,
  // );
  useEffect(() => {
    async function fetchTopSelling() {
      const res =
        await topSellingProductsAction(
          dateRange.startDate,
          dateRange.endDate,
        );

      console.log(res);
      setProducts(res);
    }
    fetchTopSelling();
  }, []);

  return (
    <section className="w-full h-72 overflow-hidden text-sm rounded-md mr-2 border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">
            Top Selling Products
          </h2>
        </div>

        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          View All
          <LuArrowRight size={16} />
        </Link>
      </div>

      <div className="">
        {products &&
          products.map(
            (product, index) => (
              <div
                key={product.productId}
                className="flex overflow-hidden border-b p-2 border-gray-200 items-center last:border-none gap-4"
              >
                <span className="w-5 text-sm font-semibold text-zinc-400">
                  {index + 1}
                </span>

                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src={
                      product.images[0]
                    }
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-zinc-800">
                    {product.title}
                  </h3>

                  <p className="text-xs text-zinc-500">
                    {product.sold} sold
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-800">
                    {product.revenue}
                  </p>

                  <p className="text-xs text-zinc-500">
                    Revenue
                  </p>
                </div>
              </div>
            ),
          )}
      </div>
    </section>
  );
}
