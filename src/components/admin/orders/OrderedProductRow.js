import Image from "next/image";

export default function OrderedProductRow({
  product,
}) {
  return (
    <tr className="border-b border-zinc-100 last:border-none">
      {/* Product */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-4">
          <Image
            src={product.image}
            alt={product.title}
            width={56}
            height={56}
            className="rounded-md border border-zinc-200 object-cover"
          />

          <div>
            <p className="font-medium text-zinc-900">
              {product.title}
            </p>

            <p className="text-sm text-zinc-500">
              {product.category}
            </p>
          </div>
        </div>
      </td>

      {/* Color */}
      <td>
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded-full border border-zinc-300"
            style={{
              backgroundColor:
                product.color.hex,
            }}
          />

          <span>
            {product.color.name}
          </span>
        </div>
      </td>

      {/* Size */}
      <td>{product.size}</td>

      {/* Quantity */}
      <td>{product.quantity}</td>

      {/* Price */}
      <td>
        ${product.price.toFixed(2)}
      </td>

      {/* Total */}
      <td className="pr-5 text-right font-semibold">
        $
        {(
          product.price *
          product.quantity
        ).toFixed(2)}
      </td>
    </tr>
  );
}
