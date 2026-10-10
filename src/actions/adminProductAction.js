"use server";

import connectToDb from "../configs/db";
import Product from "../models/Product";
import ProductInventory from "../models/ProductInventory";
//todo delete this later...
export async function getProducts11({
  search = "",
  category = "all",
  status = "all",
  sort = "newest",
  page = 1,
  pageSize = 10,
} = {}) {
  // console.log(
  //   search,
  //   category,
  //   status,
  //   sort,
  // );
  //todo get from context
  // const page = 1;
  // const pageSize = 10;
  await connectToDb();
  let pipeLine = [];

  if (category !== "all")
    pipeLine.push({
      $match: {
        category,
      },
    });

  if (status !== "all") {
    const isActive =
      status === "active"
        ? true
        : false;

    pipeLine.push({
      $match: {
        isActive: isActive,
      },
    });
  }

  switch (sort) {
    case "high":
      pipeLine.push({
        $sort: {
          price: -1,
        },
      });
      break;

    case "low":
      pipeLine.push({
        $sort: {
          price: 1,
        },
      });
      break;

    case "oldest":
      pipeLine.push({
        $sort: {
          createdAt: 1,
        },
      });
      break;

    case "newest":
    default:
      pipeLine.push({
        $sort: {
          createdAt: -1,
        },
      });
      break;
  }

  // -------------------------
  // GET INVENTORY
  // -------------------------

  pipeLine.push({
    $lookup: {
      from: ProductInventory.collection
        .name,
      localField: "_id",
      foreignField: "product",
      as: "inventory",
    },
  });

  // -------------------------
  // CALCULATE INVENTORY DATA
  // -------------------------

  pipeLine.push({
    $addFields: {
      stock: {
        $sum: "$inventory.stock",
      },

      variants: {
        $size: "$inventory",
      },
    },
  });

  // -------------------------
  // PAGINATION
  // -------------------------

  pipeLine.push({
    $skip: (page - 1) * pageSize,
  });

  pipeLine.push({
    $limit: pageSize,
  });

  // -------------------------
  // REMOVE INVENTORY ARRAY
  // -------------------------

  pipeLine.push({
    $project: {
      inventory: 0,
    },
  });

  if (search) {
    pipeLine.push({
      $match: {
        title: {
          $regex: search,
          $options: "i",
        },
      },
    });
  }

  const result = JSON.parse(
    JSON.stringify(
      await Product.aggregate(pipeLine),
    ),
  );
  console.log(
    "admin product action: ",
    pipeLine,
    "\n",
    result,
  );
  return result;
}

//#region products
export async function getProducts({
  search = "",
  category = "all",
  status = "all",
  sort = "newest",
  page = 1,
  pageSize = 10,
} = {}) {
  await connectToDb();

  const pipeLine = [];

  // -------------------------
  // CATEGORY FILTER
  // -------------------------

  if (category !== "all") {
    pipeLine.push({
      $match: {
        category,
      },
    });
  }

  // -------------------------
  // STATUS FILTER
  // -------------------------

  if (status !== "all") {
    const isActive =
      status === "active";

    pipeLine.push({
      $match: {
        isActive,
      },
    });
  }

  // -------------------------
  // SEARCH
  // -------------------------

  if (search) {
    pipeLine.push({
      $match: {
        title: {
          $regex: search,
          $options: "i",
        },
      },
    });
  }

  // -------------------------
  // SORT
  // -------------------------

  switch (sort) {
    case "high":
      pipeLine.push({
        $sort: {
          price: -1,
        },
      });
      break;

    case "low":
      pipeLine.push({
        $sort: {
          price: 1,
        },
      });
      break;

    case "oldest":
      pipeLine.push({
        $sort: {
          createdAt: 1,
        },
      });
      break;

    case "newest":
    default:
      pipeLine.push({
        $sort: {
          createdAt: -1,
        },
      });
      break;
  }

  // -------------------------
  // GET INVENTORY
  // -------------------------

  pipeLine.push({
    $lookup: {
      from: ProductInventory.collection
        .name,
      localField: "_id",
      foreignField: "product",
      as: "inventory",
    },
  });

  // -------------------------
  // CALCULATE INVENTORY DATA
  // -------------------------

  pipeLine.push({
    $addFields: {
      stock: {
        $sum: "$inventory.stock",
      },

      variants: {
        $size: "$inventory",
      },
    },
  });

  // -------------------------
  // PAGINATION + TOTAL COUNT
  // -------------------------

  pipeLine.push({
    $facet: {
      products: [
        {
          $skip: (page - 1) * pageSize,
        },

        {
          $limit: pageSize,
        },

        {
          $project: {
            inventory: 0,
          },
        },
      ],

      totalCount: [
        {
          $count: "count",
        },
      ],
    },
  });

  const result =
    await Product.aggregate(pipeLine);

  // -------------------------
  // EXTRACT PRODUCTS
  // -------------------------

  const products =
    result[0]?.products || [];

  // -------------------------
  // EXTRACT TOTAL COUNT
  // -------------------------

  const totalCount =
    result[0]?.totalCount[0]?.count ||
    0;

  // -------------------------
  // RETURN
  // -------------------------

  return JSON.parse(
    JSON.stringify({
      products,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(
        totalCount / pageSize,
      ),
    }),
  );
}
//#endregion

export async function getProductById(
  prodId,
) {
  if (!prodId) {
    return {
      success: false,
      product: null,
      variants: [],
    };
  }

  await connectToDb();

  const product =
    await Product.findById(
      prodId,
    ).lean();

  if (!product) {
    return {
      success: false,
      product: null,
      variants: [],
    };
  }

  const variants =
    await ProductInventory.find({
      product: product._id,
    }).lean();

  return {
    success: true,
    product,
    variants,
  };
}

export async function updateProduct(
  prodId,
  previousState,
  formData,
) {
  console.log("Posted product form:", [
    ...formData.entries(),
  ]);

  const submission = parseWithZod(
    formData,
    {
      schema: productSchema,
    },
  );

  if (submission.status !== "success") {
    console.log(
      "Product validation failed:",
      submission.error,
    );

    return {
      submission: submission.reply(),
    };
  }

  if (!prodId) {
    return {
      success: false,
      error: "Product ID is required",
    };
  }

  await connectToDb();

  try {
    const { variants, ...productData } =
      submission.value;

    // =========================================
    // 1. Update Product
    // =========================================

    const product =
      await Product.findByIdAndUpdate(
        prodId,
        productData,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    // =========================================
    // 2. Update Product Inventory
    // =========================================

    await Promise.all(
      variants.map(async (variant) => {
        const {
          _id,
          color,
          size,
          stock,
          barcode,
        } = variant;

        if (!_id) {
          throw new Error(
            "Inventory ID is missing",
          );
        }

        const inventory =
          await ProductInventory.findOneAndUpdate(
            {
              _id,
              product: prodId,
            },
            {
              color: {
                name: color.name,
                hex: color.hex,
              },
              size,
              stock,
              barcode,
            },
            {
              new: true,
              runValidators: true,
            },
          );

        if (!inventory) {
          throw new Error(
            `Inventory ${_id} not found`,
          );
        }

        return inventory;
      }),
    );

    return {
      success: true,
      product: product.toObject(),
    };
  } catch (error) {
    console.error(
      "Update product error:",
      error,
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update product",
    };
  }
}
