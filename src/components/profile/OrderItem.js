"use client";

import Image from "next/image";

export default function OrderItem({
  item,
}) {
  console.log(
    "DataTransferItemList",
    item,
    item.quantity,
  );
  const images = item.product.images;
  const title = item.product.title;

  return (
    <div className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product Image */}

      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-600">
            <p>
              <span className="font-medium">
                Size:
              </span>{" "}
              {item.inventory.size}
            </p>

            <p>
              <span className="font-medium">
                Color:
              </span>{" "}
              {
                item.inventory.color
                  .name
              }
            </p>

            <p>
              <span className="font-medium">
                Quantity:
              </span>{" "}
              {item.quantity};
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            {item.product.finalPrice.toLocaleString()}{" "}
            Toman
          </p>

          <p className="text-sm text-gray-500">
            Total:{" "}
            {(
              item.product.finalPrice *
              item.quantity
            ).toLocaleString()}{" "}
            Toman
          </p>
        </div>
      </div>
    </div>
  );
}
