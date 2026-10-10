"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

const AddProductContext =
  createContext(null);

// ======================================================
// Initial Product
// ======================================================

const initialProduct = {
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
};

// ======================================================
// Add Product Provider
// ======================================================

export function AddProductProvider({
  children,
}) {
  // ====================================================
  // Modal
  // ====================================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // ====================================================
  // Active Tab
  // ====================================================

  const [activeTab, setActiveTab] =
    useState("general");

  // ====================================================
  // Product
  // ====================================================

  const [product, setProduct] =
    useState(initialProduct);

  // ====================================================
  // Variant Errors
  //
  // Example:
  //
  // {
  //   1: "This color and size combination already exists."
  // }
  // ====================================================

  const [
    variantErrors,
    setVariantErrors,
  ] = useState({});

  // ====================================================
  // Update Product Field
  //
  // Example:
  //
  // updateProductField(
  //   "title",
  //   "Cute Bunny Romper"
  // );
  // ====================================================

  function updateProductField(
    field,
    value,
  ) {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // ====================================================
  // Check Duplicate Variant
  //
  // A product cannot have:
  //
  // Pink + 0-3M
  // Pink + 0-3M
  //
  // because ProductInventory has a unique index
  // on:
  //
  // product + color.name + size
  // ====================================================

  function isDuplicateVariant(
    variants,
    currentIndex,
    colorName,
    size,
  ) {
    if (!colorName || !size) {
      return false;
    }

    const normalizedColor = colorName
      .trim()
      .toLowerCase();

    return variants.some(
      (variant, index) => {
        // Don't compare the variant with itself
        if (index === currentIndex) {
          return false;
        }

        const existingColor =
          variant.color.name
            .trim()
            .toLowerCase();

        return (
          existingColor ===
            normalizedColor &&
          variant.size === size
        );
      },
    );
  }

  // ====================================================
  // Add Variant
  // ====================================================

  function addVariant() {
    setProduct((prev) => ({
      ...prev,

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
        ...prev.variants,
      ],
    }));
  }

  // ====================================================
  // Update Variant
  //
  // Used for:
  //
  // size
  // stock
  // barcode
  // ====================================================

  function updateVariant(
    index,
    field,
    value,
  ) {
    setProduct((prev) => {
      const variants = [
        ...prev.variants,
      ];

      const currentVariant =
        variants[index];

      if (!currentVariant) {
        return prev;
      }

      // ================================================
      // Check duplicate when SIZE changes
      // ================================================

      if (field === "size") {
        const duplicate =
          isDuplicateVariant(
            variants,
            index,
            currentVariant.color.name,
            value,
          );

        if (duplicate) {
          setVariantErrors(
            (prevErrors) => ({
              ...prevErrors,
              [index]:
                "This color and size combination already exists.",
            }),
          );

          return prev;
        }

        // Remove previous error
        setVariantErrors(
          (prevErrors) => {
            const errors = {
              ...prevErrors,
            };

            delete errors[index];

            return errors;
          },
        );
      }

      // ================================================
      // Update variant
      // ================================================

      variants[index] = {
        ...currentVariant,
        [field]: value,
      };

      return {
        ...prev,
        variants,
      };
    });
  }

  // ====================================================
  // Update Variant Color
  //
  // Used for:
  //
  // color.name
  // color.hex
  // ====================================================

  function updateVariantColor(
    index,
    field,
    value,
  ) {
    setProduct((prev) => {
      const variants = [
        ...prev.variants,
      ];

      const currentVariant =
        variants[index];

      if (!currentVariant) {
        return prev;
      }

      // ================================================
      // Check duplicate only when COLOR NAME changes
      // ================================================

      if (field === "name") {
        const duplicate =
          isDuplicateVariant(
            variants,
            index,
            value,
            currentVariant.size,
          );

        if (duplicate) {
          setVariantErrors(
            (prevErrors) => ({
              ...prevErrors,
              [index]:
                "This color and size combination already exists.",
            }),
          );

          return prev;
        }

        // Remove previous error
        setVariantErrors(
          (prevErrors) => {
            const errors = {
              ...prevErrors,
            };

            delete errors[index];

            return errors;
          },
        );
      }

      // ================================================
      // Update nested color object
      // ================================================

      variants[index] = {
        ...currentVariant,

        color: {
          ...currentVariant.color,

          [field]: value,
        },
      };

      return {
        ...prev,
        variants,
      };
    });
  }

  // ====================================================
  // Remove Variant
  // ====================================================

  function removeVariant(index) {
    setProduct((prev) => ({
      ...prev,

      variants: prev.variants.filter(
        (_, i) => i !== index,
      ),
    }));

    // ================================================
    // Remove its error
    // ================================================

    setVariantErrors((prev) => {
      const errors = {
        ...prev,
      };

      delete errors[index];

      // Re-index errors because variants shifted
      const reindexedErrors = {};

      Object.entries(errors).forEach(
        ([key, value]) => {
          const oldIndex = Number(key);

          if (oldIndex > index) {
            reindexedErrors[
              oldIndex - 1
            ] = value;
          } else {
            reindexedErrors[oldIndex] =
              value;
          }
        },
      );

      return reindexedErrors;
    });
  }

  // ====================================================
  // Reset Product
  // ====================================================

  function resetProduct() {
    setProduct({
      ...initialProduct,

      tags: [],
      images: [],
      variants: [],
    });

    setVariantErrors({});

    setActiveTab("general");
  }

  // ====================================================
  // Open Modal
  // ====================================================

  function openModal() {
    setIsModalOpen(true);
  }

  // ====================================================
  // Close Modal
  // ====================================================

  function closeModal() {
    setIsModalOpen(false);
  }

  // ====================================================
  // Close Modal + Reset
  //
  // Useful after successful product creation
  // ====================================================

  function closeAndReset() {
    resetProduct();

    setIsModalOpen(false);
  }

  // ====================================================
  // Context Value
  // ====================================================

  const value = {
    // -----------------------------------------------
    // Modal
    // -----------------------------------------------

    isModalOpen,
    setIsModalOpen,

    openModal,
    closeModal,
    closeAndReset,

    // -----------------------------------------------
    // Tabs
    // -----------------------------------------------

    activeTab,
    setActiveTab,

    // -----------------------------------------------
    // Product
    // -----------------------------------------------

    product,
    setProduct,

    updateProductField,

    // -----------------------------------------------
    // Variants
    // -----------------------------------------------

    addVariant,

    updateVariant,

    updateVariantColor,

    removeVariant,

    // -----------------------------------------------
    // Variant Errors
    // -----------------------------------------------

    variantErrors,

    setVariantErrors,

    // -----------------------------------------------
    // Reset
    // -----------------------------------------------

    resetProduct,
  };

  return (
    <AddProductContext.Provider
      value={value}
    >
      {children}
    </AddProductContext.Provider>
  );
}

// ======================================================
// useAddProduct Hook
// ======================================================

export function useAddProduct() {
  const context = useContext(
    AddProductContext,
  );

  if (!context) {
    throw new Error(
      "useAddProduct must be used inside AddProductProvider",
    );
  }

  return context;
}
