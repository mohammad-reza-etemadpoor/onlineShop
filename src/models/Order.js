import mongoose from "mongoose";
import "@src/models/Product";
import "@src/models/ProductInventory";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types
        .ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types
            .ObjectId,
          ref: "Product",
          required: true,
        },

        inventory: {
          type: mongoose.Schema.Types
            .ObjectId,
          ref: "ProductInventory",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        unitPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: Number,

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "unpaid",
        "paid",
        "failed",
      ],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
