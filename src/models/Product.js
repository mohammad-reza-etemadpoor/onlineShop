import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
        enum: [
          "Girls",
          "Boys",
          "Newborn",
          "Maternity",
        ],
      },

      tags: [
        {
          type: String,
          trim: true,
        },
      ],

      images: [
        {
          type: String,
          required: true,
        },
      ],

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      material: {
        type: String,
        trim: true,
        default: "",
      },

      // featured: {
      //   type: Boolean,
      //   default: false,
      // },

      isActive: {
        type: Boolean,
        default: true,
        enum: [true, false],
      },
    },
    {
      timestamps: true,
    },
  );

productSchema
  .virtual("finalPrice")
  .get(function () {
    return (
      this.price -
      (this.price * this.discount) / 100
    );
  });

productSchema.set("toJSON", {
  virtuals: true,
});

productSchema.set("toObject", {
  virtuals: true,
});

export default mongoose.models
  .Product ||
  mongoose.model(
    "Product",
    productSchema,
  );
