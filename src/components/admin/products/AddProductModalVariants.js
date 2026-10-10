"use client";

import {
  IoAddOutline,
  IoTrashOutline,
} from "react-icons/io5";

import { useAddProduct } from "@/src/context/AddProductContext";

export default function AddProductModalVariants({
  fields,
  onAddVariant,
  onRemoveVariant,
}) {
  // =====================================================
  // Get the list of variants from Conform
  // =====================================================

  const variantList =
    fields.variants.getFieldList();

  // const {
  //   product,
  //   addVariant,
  //   updateVariant,
  //   updateVariantColor,
  //   removeVariant,
  // } = useAddProduct();

  return (
    <div className="space-y-6">
      {/* =========================================
          Header
      ========================================= */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">
            Product Variants
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            Add the available colors,
            sizes, and stock for this
            product.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddVariant}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-[#F9E34F] px-4 py-2.5 text-sm font-semibold text-zinc-800 transition hover:brightness-95"
        >
          <IoAddOutline size={20} />
          Add Variant
        </button>
      </div>

      {/* =========================================
          Empty State
      ========================================= */}

      {/* {product.variants.length === */}
      {variantList.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-zinc-200 px-6 py-12 text-center">
          <p className="font-medium text-zinc-600">
            No variants added yet.
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Add at least one variant for
            this product.
          </p>

          <button
            type="button"
            onClick={onAddVariant}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            <IoAddOutline size={18} />
            Add First Variant
          </button>
        </div>
      )}

      {/* =========================================
          Variants
      ========================================= */}

      {/* {product.variants.map( */}
      {variantList.map(
        (variant, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-5"
          >
            {/* =====================================
                Variant Header
            ====================================== */}

            <div className="mb-5 flex items-center justify-between">
              <h4 className="font-semibold text-zinc-800">
                Variant {index + 1}
              </h4>

              <button
                type="button"
                onClick={() =>
                  onRemoveVariant(index)
                }
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <IoTrashOutline
                  size={18}
                />
                Remove
              </button>
            </div>

            {/* =====================================
                Color
            ====================================== */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Color
              </label>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                {/* Color Name */}

                <input
                  type="text"
                  // value={
                  //   variant.color.name
                  // }
                  // onChange={(e) =>
                  //   updateVariantColor(
                  //     index,
                  //     "name",
                  //     e.target.value,
                  //   )
                  // }
                  key={
                    fields.variants[
                      index
                    ].color.name.key
                  }
                  name={
                    fields.variants[
                      index
                    ].color.name.name
                  }
                  defaultValue={
                    fields.variants[
                      index
                    ].color.name
                      .initialValue
                  }
                  placeholder="e.g. Pink"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
                />

                {/* Color Picker */}

                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3">
                  <input
                    type="color"
                    // value={
                    //   variant.color
                    //     .hex ||
                    //   "#000000"
                    // }
                    // onChange={(e) =>
                    //   updateVariantColor(
                    //     index,
                    //     "hex",
                    //     e.target.value,
                    //   )
                    // }
                    key={
                      fields.variants[
                        index
                      ].color.hex.key
                    }
                    name={
                      fields.variants[
                        index
                      ].color.hex.name
                    }
                    defaultValue={
                      fields.variants[
                        index
                      ].color.hex
                        .initialValue
                    }
                    className="h-9 w-9 cursor-pointer border-0 bg-transparent p-0"
                  />

                  <span className="min-w-20 text-sm text-zinc-500">
                    {variant.color.hex}
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================
                Size / Stock / Barcode
            ====================================== */}

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Size */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Size
                </label>

                <select
                  // value={variant.size}
                  // onChange={(e) =>
                  //   updateVariant(
                  //     index,
                  //     "size",
                  //     e.target.value,
                  //   )
                  // }
                  key={
                    fields.variants[
                      index
                    ].size.key
                  }
                  name={
                    fields.variants[
                      index
                    ].size.name
                  }
                  defaultValue={
                    fields.variants[
                      index
                    ].size.initialValue
                  }
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
                >
                  <option value="">
                    Select size
                  </option>

                  <option value="NB">
                    NB
                  </option>

                  <option value="0-3M">
                    0-3M
                  </option>

                  <option value="3-6M">
                    3-6M
                  </option>

                  <option value="6-9M">
                    6-9M
                  </option>

                  <option value="9-12M">
                    9-12M
                  </option>

                  <option value="12-18M">
                    12-18M
                  </option>

                  <option value="18-24M">
                    18-24M
                  </option>

                  <option value="2Y">
                    2Y
                  </option>

                  <option value="3Y">
                    3Y
                  </option>

                  <option value="4Y">
                    4Y
                  </option>
                </select>
              </div>

              {/* Stock */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  // value={variant.stock}
                  // onChange={(e) =>
                  //   updateVariant(
                  //     index,
                  //     "stock",
                  //     Number(
                  //       e.target.value,
                  //     ),
                  //   )
                  // }
                  key={
                    fields.variants[
                      index
                    ].stock.key
                  }
                  name={
                    fields.variants[
                      index
                    ].stock.name
                  }
                  defaultValue={
                    fields.variants[
                      index
                    ].stock.initialValue
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
                />
              </div>

              {/* Barcode */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Barcode
                </label>

                <input
                  type="text"
                  // value={
                  //   variant.barcode
                  // }
                  // onChange={(e) =>
                  //   updateVariant(
                  //     index,
                  //     "barcode",
                  //     e.target.value,
                  //   )
                  // }
                  key={
                    fields.variants[
                      index
                    ].barcode.key
                  }
                  name={
                    fields.variants[
                      index
                    ].barcode.name
                  }
                  defaultValue={
                    fields.variants[
                      index
                    ].barcode
                      .initialValue
                  }
                  placeholder="Optional"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
                />
              </div>
            </div>

            {/* =====================================
                Variant Summary
            ====================================== */}

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm">
              <div
                className="h-5 w-5 rounded-full border border-zinc-200"
                style={{
                  backgroundColor:
                    variant.color.hex ||
                    "#ffffff",
                }}
              />

              <span className="text-zinc-600">
                {variant.color.name ||
                  "No color"}
              </span>

              <span className="text-zinc-300">
                •
              </span>

              <span className="text-zinc-600">
                {variant.size ||
                  "No size"}
              </span>

              <span className="text-zinc-300">
                •
              </span>

              <span className="text-zinc-600">
                {variant.stock} in stock
              </span>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
