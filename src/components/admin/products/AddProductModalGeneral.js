"use client";

import {
  IoImageOutline,
  IoCloudUploadOutline,
  IoCloseOutline,
} from "react-icons/io5";

import { useAddProduct } from "@/src/context/AddProductContext";

export default function AddProductModalGeneral({
  fields,
}) {
  const {
    product,
    updateProductField,
  } = useAddProduct();

  // =========================================
  // Handle image input
  // =========================================

  function handleImagesChange(e) {
    const files = Array.from(
      e.target.files || [],
    );

    if (files.length === 0) return;

    // فعلاً برای UI، اسم فایل‌ها را نگه می‌داریم.
    // بعداً این قسمت را به آپلود واقعی تصویر
    // و URLهای تصاویر وصل می‌کنیم.
    const imageNames = files.map(
      (file) => file.name,
    );

    updateProductField(
      "images",
      imageNames,
    );
  }

  // =========================================
  // Remove an image
  // =========================================
  function removeImage(index) {
    const newImages =
      product.images.filter(
        (_, i) => i !== index,
      );

    updateProductField(
      "images",
      newImages,
    );
  }

  // =========================================
  // Handle tags
  // =========================================
  function handleTagsChange(e) {
    const value = e.target.value;

    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    updateProductField("tags", tags);
  }

  return (
    <div className="space-y-8 mb-8">
      {/* =====================================
          Basic Information
      ====================================== */}

      <div>
        <h3 className="mb-5 text-lg font-semibold text-zinc-800">
          Basic Information
        </h3>

        <div className="grid gap-5">
          {/* Title */}

          <div>
            <label
              htmlFor="product-title"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Product Title
            </label>

            <input
              id="product-title"
              type="text"
              // value={product.title}
              // onChange={(e) =>
              //   updateProductField(
              //     "title",
              //     e.target.value,
              //   )
              // }
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={
                fields.title
                  .initialValue
              }
              placeholder="e.g. Cute Bunny Romper"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Description */}

          <div>
            <label
              htmlFor="product-description"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Description
            </label>

            <textarea
              id="product-description"
              rows={4}
              // value={
              //   product.description
              // }
              // onChange={(e) =>
              //   updateProductField(
              //     "description",
              //     e.target.value,
              //   )
              // }
              key={
                fields.description.key
              }
              name={
                fields.description.name
              }
              defaultValue={
                fields.description
                  .initialValue
              }
              placeholder="Describe the product..."
              className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Category */}

          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Category
            </label>

            <select
              id="product-category"
              // value={product.category}
              // onChange={(e) =>
              //   updateProductField(
              //     "category",
              //     e.target.value,
              //   )
              // }
              key={fields.category.key}
              name={
                fields.category.name
              }
              defaultValue={
                fields.category
                  .initialValue
              }
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            >
              <option value="">
                Select category
              </option>

              <option value="Girls">
                Girls
              </option>

              <option value="Boys">
                Boys
              </option>

              <option value="Newborn">
                Newborn
              </option>

              <option value="Maternity">
                Maternity
              </option>
            </select>
          </div>

          {/* Tags */}

          <div>
            <label
              htmlFor="product-tags"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Tags
            </label>

            <input
              id="product-tags"
              type="text"
              // value={product.tags.join(
              //   ", ",
              // )}
              // onChange={
              //   handleTagsChange
              // }
              key={fields.tags.key}
              name={fields.tags.name}
              defaultValue={
                fields.tags.initialValue
              }
              placeholder="baby, cotton, summer"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />

            <p className="mt-2 text-xs text-zinc-400">
              Separate tags with commas.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          Product Images
      ====================================== */}

      <div>
        <h3 className="mb-5 text-lg font-semibold text-zinc-800">
          Product Images
        </h3>

        <label
          htmlFor="product-images"
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 px-6 py-10 text-center transition hover:border-[#F9E34F] hover:bg-[#FFFDF0]"
        >
          <IoCloudUploadOutline
            size={38}
            className="mb-3 text-zinc-400"
          />

          <p className="font-medium text-zinc-700">
            Upload product images
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            PNG, JPG or WEBP
          </p>

          <input
            id="product-images"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            name={fields.images.name}
            onChange={
              handleImagesChange
            }
            className="hidden"
          />
        </label>

        {/* {product.images.map(
          (image, index) => (
            <input
              key={`${fields.images.key}-${index}`}
              type="hidden"
              name={fields.images.name}
              value={image}
              readOnly
            />
          ),
        )} */}

        {/* Image Preview */}

        {product.images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {product.images.map(
              (image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group relative flex min-h-28 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50"
                >
                  <IoImageOutline
                    size={32}
                    className="text-zinc-300"
                  />

                  <span className="absolute bottom-0 left-0 right-0 truncate bg-black/60 px-2 py-1 text-xs text-white">
                    {image}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-zinc-500 shadow-sm transition hover:text-red-500"
                  >
                    <IoCloseOutline
                      size={18}
                    />
                  </button>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* =====================================
          Pricing
      ====================================== */}

      <div>
        <h3 className="mb-5 text-lg font-semibold text-zinc-800">
          Pricing
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Price */}

          <div>
            <label
              htmlFor="product-price"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Price
            </label>

            <input
              id="product-price"
              type="number"
              min="0"
              // value={product.price}
              // onChange={(e) =>
              //   updateProductField(
              //     "price",
              //     e.target.value,
              //   )
              // }
              key={fields.price.key}
              name={fields.price.name}
              defaultValue={
                fields.price
                  .initialValue
              }
              placeholder="420000"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Discount */}

          <div>
            <label
              htmlFor="product-discount"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Discount (%)
            </label>

            <input
              id="product-discount"
              type="number"
              min="0"
              max="100"
              // value={product.discount}
              // onChange={(e) =>
              //   updateProductField(
              //     "discount",
              //     Number(
              //       e.target.value,
              //     ),
              //   )
              // }
              key={fields.discount.key}
              name={
                fields.discount.name
              }
              defaultValue={
                fields.discount
                  .initialValue
              }
              placeholder="0"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>
        </div>
      </div>

      {/* =====================================
          Additional Information
      ====================================== */}

      <div>
        <h3 className="mb-5 text-lg font-semibold text-zinc-800">
          Additional Information
        </h3>

        <div className="grid gap-5">
          {/* Material */}

          <div>
            <label
              htmlFor="product-material"
              className="mb-2 block text-sm font-medium text-zinc-700"
            >
              Material
            </label>

            <input
              id="product-material"
              type="text"
              // value={product.material}
              // onChange={(e) =>
              //   updateProductField(
              //     "material",
              //     e.target.value,
              //   )
              // }
              key={fields.material.key}
              name={
                fields.material.name
              }
              defaultValue={
                fields.material
                  .initialValue
              }
              placeholder="e.g. 100% Cotton"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Featured */}

          {/* <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={product.featured}
              onChange={(e) =>
                updateProductField(
                  "featured",
                  e.target.checked,
                )
              }
              key={fields.featured.key}
              name={
                fields.featured.name
              }
              defaultValue={
                fields.featured
                  .initialValue
              }
              className="h-4 w-4 accent-[#F9E34F]"
            />

            <span className="text-sm font-medium text-zinc-700">
              Featured product
            </span>
          </label> */}

          {/* Active */}

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              // checked={product.isActive}
              // onChange={(e) =>
              //   updateProductField(
              //     "isActive",
              //     e.target.checked,
              //   )
              // }
              key={fields.isActive.key}
              name={
                fields.isActive.name
              }
              defaultChecked
              className="h-4 w-4 accent-[#F9E34F]"
            />

            <span className="text-sm font-medium text-zinc-700">
              Product is active
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
