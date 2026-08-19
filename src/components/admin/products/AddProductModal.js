"use client";

import { useState } from "react";
import {
  IoCloseOutline,
  IoCloudUploadOutline,
  IoImageOutline,
  IoAddOutline,
  IoTrashOutline,
} from "react-icons/io5";
import AddProductModalGeneral from "./AddProductModalGeneral";
import { useAddProduct } from "@/src/context/AddProductContext";
import AddProductModalVariants from "./AddProductModalVariants";

export default function AddProductModal({
  onClose,
}) {
  //   const [activeTab, setActiveTab] =
  //     useState("general");

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
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
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
            Tabs
            ================================= */}
          <div className="border-b px-7">
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "general",
                  )
                }
                className={`relative py-4 text-sm font-medium transition ${
                  activeTab ===
                  "general"
                    ? "text-[#D4AF00]"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                General
                {activeTab ===
                  "general" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#F9E34F]" />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveTab(
                    "variants",
                  )
                }
                className={`relative py-4 text-sm font-medium transition ${
                  activeTab ===
                  "variants"
                    ? "text-[#D4AF00]"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                Variants
                {activeTab ===
                  "variants" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#F9E34F]" />
                )}
              </button>
            </div>
          </div>

          {/* ================================
                        Scrollable Content
                        ================================= */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            {/* =================================
            GENERAL TAB
            ================================== */}
            {activeTab ===
              "general" && (
              <AddProductModalGeneral />
            )}

            {/* =================================
                VARIANTS TAB
                ================================== */}
            {activeTab ===
              "variants" && (
              <AddProductModalVariants />
            )}
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
              type="button"
              className="cursor-pointer rounded-xl bg-[#F9E34F] px-7 py-3 font-semibold text-zinc-800 transition hover:brightness-95"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    )
  );
}
