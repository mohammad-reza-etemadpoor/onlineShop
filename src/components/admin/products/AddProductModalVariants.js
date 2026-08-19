import {
  IoAddOutline,
  IoImageOutline,
} from "react-icons/io5";
function AddProductModalVariants() {
  return (
    <div className="flex min-h-[400px] flex-col">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">
            Product Variants
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Manage available colors,
            sizes and stock.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-[#F9E34F] px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-[#FFF9EB]"
        >
          <IoAddOutline size={19} />
          Add Variant
        </button>
      </div>

      {/* Empty state */}
      <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-zinc-200">
        <div className="text-center">
          <IoImageOutline
            size={42}
            className="mx-auto mb-3 text-zinc-300"
          />

          <p className="font-medium text-zinc-600">
            No variants added yet
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Add colors, sizes and stock
            for this product.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddProductModalVariants;
