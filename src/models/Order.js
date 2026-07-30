import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types
        .ObjectId,
      ref: "User",
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types
            .ObjectId,
          ref: "Product",
        },

        quantity: Number,
      },
    ],

    totalPrice: Number,
  },
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
