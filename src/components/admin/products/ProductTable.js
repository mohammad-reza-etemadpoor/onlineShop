"use client";

import { useAdminProductContext } from "@/src/context/AdminProductContext";
import Pagination from "./Pagination";
import ProductRow from "./ProductRow";
import { useEffect } from "react";

// const products = [
//   {
//     id: 1,
//     title: "Cute Bunny Romper",
//     slug: "cute-bunny-romper",
//     category: "Newborn",
//     price: 420000,
//     variants: 8,
//     stock: "In Stock",
//     featured: false,
//     active: true,
//     image: "https://picsum.photos/80?1",
//   },
//   {
//     id: 2,
//     title: "Floral Cotton Dress",
//     slug: "floral-cotton-dress",
//     category: "Girls",
//     price: 380000,
//     variants: 6,
//     stock: "Low Stock",
//     featured: true,
//     active: true,
//     image: "https://picsum.photos/80?2",
//   },
//   {
//     id: 3,
//     title: "Denim Overalls Set",
//     slug: "denim-overalls-set",
//     category: "Boys",
//     price: 450000,
//     variants: 5,
//     stock: "In Stock",
//     featured: false,
//     active: true,
//     image: "https://picsum.photos/80?3",
//   },
// ];
export default function ProductsTable() {
  const {
    products: { products },
    setProducts,
  } = useAdminProductContext();

  // useEffect(() => {
  //   console.log(
  //     "product table: ",
  //     products,
  //   );
  // }, [products]);

  return (
    <section className="mt-8 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      {products &&
        products?.length < 1 && (
          <p className="w-full uppercase mx-auto text-center py-4 text-2xl">
            no product found
          </p>
        )}
      {products &&
        products?.length > 0 && (
          <table className="w-full">
            <thead className="border-b bg-zinc-50">
              <tr className="text-left text-sm font-semibold text-zinc-600">
                <th className="px-6 py-5">
                  Product
                </th>
                <th>Category</th>
                <th>Price</th>
                <th>Variants</th>
                <th>Stock Status</th>
                <th>Featured</th>
                <th>Status</th>
                <th className="pr-6">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products?.map(
                (product) => (
                  <ProductRow
                    key={product._id}
                    product={product}
                  />
                ),
              )}
            </tbody>
          </table>
        )}
      <Pagination />
    </section>
  );
}
