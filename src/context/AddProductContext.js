"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const AddProductContext =
  createContext();

export function AddProductProvider({
  children,
}) {
  // =========================================
  // Modal state
  // =========================================

  const [isModalOpen, setIsModalOpen] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("general");

  // =========================================
  // Product form state
  // =========================================

  const [product, setProduct] =
    useState({
      title: "",
      description: "",
      category: "",
      tags: [],
      images: [],
      price: "",
      discount: 0,
      material: "",
      featured: false,
      isActive: true,

      variants: [],
    });

  // =========================================
  // Update a single product field
  // =========================================

  function updateProductField(
    field,
    value,
  ) {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // =========================================
  // Add a new variant
  // =========================================

  function addVariant() {
    setProduct((prev) => ({
      ...prev,

      variants: [
        ...prev.variants,

        {
          color: {
            name: "",
            hex: "",
          },

          size: "",

          stock: 0,

          barcode: "",
        },
      ],
    }));
  }

  // =========================================
  // Update a variant
  // =========================================

  function updateVariant(
    index,
    field,
    value,
  ) {
    setProduct((prev) => {
      const variants = [
        ...prev.variants,
      ];

      variants[index] = {
        ...variants[index],
        [field]: value,
      };

      return {
        ...prev,
        variants,
      };
    });
  }

  // =========================================
  // Update a nested color field
  // =========================================

  function updateVariantColor(
    index,
    field,
    value,
  ) {
    setProduct((prev) => {
      const variants = [
        ...prev.variants,
      ];

      variants[index] = {
        ...variants[index],

        color: {
          ...variants[index].color,

          [field]: value,
        },
      };

      return {
        ...prev,
        variants,
      };
    });
  }

  // =========================================
  // Remove a variant
  // =========================================

  function removeVariant(index) {
    setProduct((prev) => ({
      ...prev,

      variants: prev.variants.filter(
        (_, i) => i !== index,
      ),
    }));
  }

  // =========================================
  // Reset everything
  // =========================================

  function resetProduct() {
    setProduct({
      title: "",
      description: "",
      category: "",
      tags: [],
      images: [],
      price: "",
      discount: 0,
      material: "",
      featured: false,
      isActive: true,

      variants: [],
    });

    setActiveTab("general");
  }

  return (
    <AddProductContext.Provider
      value={{
        // Modal
        isModalOpen,
        setIsModalOpen,

        // Tabs
        activeTab,
        setActiveTab,

        // Product
        product,
        setProduct,
        updateProductField,

        // Variants
        addVariant,
        updateVariant,
        updateVariantColor,
        removeVariant,

        // Reset
        resetProduct,
      }}
    >
      {children}
    </AddProductContext.Provider>
  );
}

export function useAddProduct() {
  const context = useContext(
    AddProductContext,
  );

  if (!context) {
    throw new Error(
      "AddProduct was used out of context provider!",
    );
  }

  return context;
}
