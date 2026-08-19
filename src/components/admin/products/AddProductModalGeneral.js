import { useState } from "react";
import {
  IoCloudUploadOutline,
  IoTrashOutline,
} from "react-icons/io5";
function AddProductModalGeneral() {
  const [images, setImages] = useState(
    [],
  );
  // --------------------------------
  // Handle image selection
  // --------------------------------
  const handleImagesChange = (e) => {
    const files = Array.from(
      e.target.files || [],
    );

    setImages((prev) => [
      ...prev,
      ...files,
    ]);
  };

  // --------------------------------
  // Remove selected image
  // --------------------------------
  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index,
      ),
    );
  };
  return (
    <div className="space-y-7">
      {/* Product Information */}
      <div>
        <h3 className="mb-5 text-lg font-semibold text-zinc-800">
          Product Information
        </h3>

        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Product Name
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Organic Cotton Romper"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              placeholder="Describe your product..."
              className="w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Category + Status */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Category
              </label>

              <select
                name="category"
                defaultValue=""
                className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
              >
                <option
                  value=""
                  disabled
                >
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

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Status
              </label>

              <select
                name="isActive"
                defaultValue="true"
                className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
              >
                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>
              </select>
            </div>
          </div>

          {/* Price + Discount */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                min="0"
                placeholder="420000"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Discount
              </label>

              <div className="relative">
                <input
                  type="number"
                  name="discount"
                  min="0"
                  max="100"
                  placeholder="10"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 pr-10 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Material */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Material
            </label>

            <input
              type="text"
              name="material"
              placeholder="e.g. 100% Cotton"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#F9E34F] focus:ring-2 focus:ring-[#F9E34F]/20"
            />
          </div>

          {/* Featured */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              value="true"
              className="h-4 w-4 accent-[#F9E34F]"
            />

            <div>
              <p className="text-sm font-medium text-zinc-700">
                Featured Product
              </p>

              <p className="text-xs text-zinc-400">
                Show this product in
                featured sections.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* ================================
                  Product Images
              ================================= */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-zinc-800">
          Product Images
        </h3>

        <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-5">
          {/* Upload area */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl py-6 transition hover:bg-zinc-50">
            <IoCloudUploadOutline
              size={38}
              className="mb-2 text-zinc-400"
            />

            <p className="font-medium text-zinc-700">
              Upload images
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              PNG, JPG up to 5MB
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg"
              multiple
              onChange={
                handleImagesChange
              }
              className="hidden"
            />
          </label>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map(
                (file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border bg-zinc-50"
                  >
                    <img
                      src={URL.createObjectURL(
                        file,
                      )}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeImage(
                          index,
                        )
                      }
                      className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-red-500 opacity-0 shadow transition group-hover:opacity-100"
                    >
                      <IoTrashOutline
                        size={16}
                      />
                    </button>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProductModalGeneral;
