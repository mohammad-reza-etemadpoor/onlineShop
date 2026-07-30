import mongoose from "mongoose";

const productInventorySchema =
  new mongoose.Schema(
    {
      product: {
        type: mongoose.Schema.Types
          .ObjectId,
        ref: "Product",
        required: true,
        index: true,
      },

      color: {
        name: {
          type: String,
          required: true,
          trim: true,
        },

        hex: {
          type: String,
          required: true,
        },
      },

      size: {
        type: String,
        required: true,
        enum: [
          "NB",
          "0-3M",
          "3-6M",
          "6-9M",
          "9-12M",
          "12-18M",
          "18-24M",
          "2Y",
          "3Y",
          "4Y",
        ],
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },

      //   sku: {
      //     type: String,
      //     required: true,
      //     unique: true,
      //     uppercase: true,
      //     trim: true,
      //   },

      barcode: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    },
  );

productInventorySchema.index(
  {
    product: 1,
    "color.name": 1,
    size: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.models
  .ProductInventory ||
  mongoose.model(
    "ProductInventory",
    productInventorySchema,
  );
