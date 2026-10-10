"use client";

import {
  IoAddOutline,
  IoTrashOutline,
} from "react-icons/io5";

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

  return (
    <div className="mt-10">
      {/* =================================================
          Header
      ================================================= */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Product Variants
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Add available colors, sizes
            and stock quantities.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddVariant}
          className="flex items-center gap-2 rounded-xl bg-[#F9E34F] px-4 py-2 font-medium"
        >
          <IoAddOutline />
          Add Variant
        </button>
      </div>

      {/* =================================================
          Variants
      ================================================= */}

      <div className="space-y-6">
        {variantList.map(
          (variant, index) => {
            // ============================================
            // Get fields inside this Variant
            // ============================================

            const variantFields =
              variant.getFieldset();

            return (
              <div
                key={variant.key}
                className="rounded-2xl border border-zinc-200 p-5"
              >
                {/* ======================================
                    Variant Header
                ====================================== */}

                <div className="mb-5 flex items-center justify-between">
                  <h4 className="font-semibold">
                    Variant {index + 1}
                  </h4>

                  {variantList.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        onRemoveVariant(
                          index,
                        )
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <IoTrashOutline
                        size={18}
                      />
                    </button>
                  )}
                </div>

                {/* ======================================
                    COLOR
                ====================================== */}

                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Color
                  </label>

                  <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                    {/* Color Name */}

                    <input
                      type="text"
                      key={
                        variantFields.color.getFieldset()
                          .name.key
                      }
                      name={
                        variantFields.color.getFieldset()
                          .name.name
                      }
                      defaultValue={
                        variantFields.color.getFieldset()
                          .name
                          .initialValue
                      }
                      placeholder="e.g. Pink"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3"
                    />

                    {/* Color Hex */}

                    <input
                      type="color"
                      key={
                        variantFields.color.getFieldset()
                          .hex.key
                      }
                      name={
                        variantFields.color.getFieldset()
                          .hex.name
                      }
                      defaultValue={
                        variantFields.color.getFieldset()
                          .hex
                          .initialValue ||
                        "#000000"
                      }
                      className="h-11 w-16 cursor-pointer rounded-xl border border-zinc-200"
                    />
                  </div>
                </div>

                {/* ======================================
                    SIZE
                ====================================== */}

                <div className="mb-5">
                  <label
                    htmlFor={
                      variantFields.size
                        .id
                    }
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    Size
                  </label>

                  <select
                    id={
                      variantFields.size
                        .id
                    }
                    key={
                      variantFields.size
                        .key
                    }
                    name={
                      variantFields.size
                        .name
                    }
                    defaultValue={
                      variantFields.size
                        .initialValue
                    }
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3"
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

                {/* ======================================
                    STOCK
                ====================================== */}

                <div className="mb-5">
                  <label
                    htmlFor={
                      variantFields
                        .stock.id
                    }
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    Stock
                  </label>

                  <input
                    type="number"
                    id={
                      variantFields
                        .stock.id
                    }
                    key={
                      variantFields
                        .stock.key
                    }
                    name={
                      variantFields
                        .stock.name
                    }
                    defaultValue={
                      variantFields
                        .stock
                        .initialValue ??
                      0
                    }
                    min="0"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3"
                  />
                </div>

                {/* ======================================
                    BARCODE
                ====================================== */}

                <div>
                  <label
                    htmlFor={
                      variantFields
                        .barcode.id
                    }
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    Barcode
                  </label>

                  <input
                    type="text"
                    id={
                      variantFields
                        .barcode.id
                    }
                    key={
                      variantFields
                        .barcode.key
                    }
                    name={
                      variantFields
                        .barcode.name
                    }
                    defaultValue={
                      variantFields
                        .barcode
                        .initialValue ??
                      ""
                    }
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3"
                  />
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
