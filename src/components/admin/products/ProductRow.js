"use client";

import {
  FiEdit2,
  FiTrash2,
  FiStar,
} from "react-icons/fi";

export default function ProductRow({
  product,
}) {
  const stockColors = {
    "In Stock":
      "bg-green-100 text-green-700",
    "Low Stock":
      "bg-yellow-100 text-yellow-700",
    "Out of Stock":
      "bg-red-100 text-red-700",
  };

  const categoryColors = {
    Girls: "bg-pink-100 text-pink-600",
    Boys: "bg-blue-100 text-blue-600",
    Newborn:
      "bg-purple-100 text-purple-600",
    Maternity:
      "bg-orange-100 text-orange-600",
  };

  return (
    <tr className="border-t border-zinc-100 hover:bg-zinc-50 transition">
      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-16 w-16 rounded-md object-cover"
          />

          <div>
            <p className="font-semibold text-zinc-900">
              {product.title}
            </p>

            <p className="text-sm text-zinc-500">
              {product.slug}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td>
        <span
          className={`rounded-md px-3 py-1 text-sm font-medium ${categoryColors[product.category]}`}
        >
          {product.category}
        </span>
      </td>

      {/* Price */}
      <td className="font-medium">
        {product.price.toLocaleString(
          "fa-IR",
        )}{" "}
        IRT
      </td>

      {/* Variants */}
      <td>{product?.variants}</td>

      {/* Stock */}
      <td>
        <span
          className={`rounded-md px-3 py-1 text-sm font-medium ${stockColors[product.stock]}`}
        >
          {product?.stock}
        </span>
      </td>

      {/* Featured */}
      <td>
        <FiStar
          size={22}
          className={
            product.featured
              ? "fill-yellow-400 text-yellow-400"
              : "text-zinc-300"
          }
        />
      </td>

      {/* Status */}
      <td>
        <span
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            product.isActive
              ? "bg-green-100 text-green-700"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {product.isActive
            ? "Active"
            : "Inactive"}
        </span>
      </td>

      {/* Actions */}
      <td>
        <div className="flex gap-2">
          <button className="rounded-md border p-2 hover:bg-zinc-100">
            <FiEdit2 />
          </button>

          <button className="rounded-md border border-red-200 p-2 text-red-500 hover:bg-red-50">
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
}
