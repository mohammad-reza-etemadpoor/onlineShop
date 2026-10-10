"use client";

import {
  useActionState,
  useState,
} from "react";
import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoImageOutline,
  IoAddOutline,
  IoTrashOutline,
} from "react-icons/io5";
import AddProductModalGeneral from "./AddProductModalGeneral";
import { useAddProduct } from "@/src/context/AddProductContext";
import { AddProduct } from "@/src/actions/addProductDashboard";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { productSchema } from "@/src/lib/zodSchemas";
import AddProductModalVariants from "./AddProductVariant1";

export default function AddProductModal({
  onClose,
}) {
  //   const [activeTab, setActiveTab] =
  //     useState("general");

  const [lastResult, action] =
    useActionState(
      AddProduct,
      undefined,
    );

  const [form, fields] = useForm({
    lastResult: lastResult?.submission,

    defaultValue: {
      variants: [
        {
          color: {
            name: "",
            hex: "#000000",
          },
          size: "",
          stock: 0,
          barcode: "",
        },
      ],
    },

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: productSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const {
    isModalOpen,
    setIsModalOpen,
    activeTab,
    setActiveTab,
  } = useAddProduct();

  function handleClose() {
    setIsModalOpen(false);
  }

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        {/* Modal */}
        <form
          className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          {/* ================================
            Header
        ================================= */}
          <div className="flex items-center justify-between border-b px-7 py-5">
            <h2 className="text-2xl font-semibold text-zinc-800">
              Add New Product
            </h2>

            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            >
              <IoCloseOutline
                size={26}
              />
            </button>
          </div>

          {/* ================================
                  Scrollable Content
          ================================= */}

          <div className="flex-1 overflow-y-auto px-7 py-6">
            <>
              <AddProductModalGeneral
                fields={fields}
              />
              {/* <AddProductModalVariant
                variantCount={
                  variantCount
                }
                fields={fields}
                onAddVariant={
                  addVariant
                }
                onRemoveVariant={
                  removeVariant
                }
              /> */}
              <AddProductModalVariants
                fields={fields}
                onAddVariant={() =>
                  form.insert({
                    name: fields.variants.name,
                    defaultValue: {
                      color: {
                        name: "",
                        hex: "#000000",
                      },
                      size: "",
                      stock: 0,
                      barcode: "",
                    },
                  })
                }
                onRemoveVariant={(index) =>
                  form.remove({
                    name: fields.variants.name,
                    index,
                  })
                }
              />
            </>
          </div>

          {/* ================================
                    Footer
                    ================================= */}
          <div className="flex items-center justify-end gap-3 border-t bg-white px-7 py-5">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer rounded-xl border border-zinc-200 px-6 py-3 font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-[#F9E34F] px-7 py-3 font-semibold text-zinc-800 transition hover:brightness-95"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    )
  );
}
