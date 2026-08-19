"use client";

import { useAdminProductContext } from "@/src/context/AdminProductContext";
import {
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

export default function Pagination() {
  const {
    products,
    setProducts,
    setPage,
  } = useAdminProductContext();

  `products: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      totalPages: 0,`;

  const {
    products: productsList,
    totalCount,
    page,
    pageSize,
    totalPages,
  } = products;

  // setPage(1);

  return (
    <div className="flex items-center justify-between border-t px-6 py-5">
      <p className="text-sm text-zinc-500">
        {`Showing ${(page - 1) * pageSize + 1} to ${
          totalCount -
            (page - 1) * pageSize <
          pageSize
            ? totalCount
            : page * pageSize
        } of ${totalCount} products`}
      </p>

      <div className="flex items-center gap-2">
        <button
          className={`rounded-lg border ${page === 1 ? "cursor-not-allowed" : "cursor-pointer"} p-2 hover:bg-zinc-100`}
          onClick={() => {
            // console.log(p);
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          <LuChevronLeft />
        </button>

        {Array.from({
          length: totalPages,
        }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => {
              setPage(i + 1);
            }}
            className={`h-10 w-10 cursor-pointer rounded-md border ${
              i + 1 === page
                ? "bg-[#F9E34F] font-semibold hover:bg-yellow-500"
                : "hover:bg-zinc-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => {
            // console.log(p);
            if (page < totalPages) {
              setPage(page + 1);
            }
          }}
          className={`rounded-md border p-2 ${page === totalPages ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-zinc-100`}
        >
          <LuChevronRight />
        </button>
      </div>
    </div>
  );
}
