"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { productSchema } from "@/src/lib/zodSchemas";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";
import connectToDb from "../configs/db";
import Product from "../models/Product";
import ProductInventory from "../models/ProductInventory";
export async function AddProduct(
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

  // =========================================
  // Upload images
  // =========================================

  const imagePaths = [];

  try {
    const images =
      formData.getAll("images");

    if (images.length === 0) {
      throw new Error(
        "Product doesn't have images",
      );
    }

    for (const img of images) {
      if (!(img instanceof File)) {
        throw new Error(
          "Invalid image",
        );
      }

      const buffer = Buffer.from(
        await img.arrayBuffer(),
      );

      const fileName = `${Date.now()}-${img.name}`;

      const filePath = path.join(
        process.cwd(),
        "public/uploads",
        fileName,
      );

      await writeFile(filePath, buffer);

      imagePaths.push(
        `/uploads/${fileName}`,
      );
    }
  } catch (err) {
    console.error(
      "Image upload failed:",
      err,
    );

    return {
      status: "error",
      message:
        "Failed to upload product images",
    };
  }

  // =========================================
  // Replace uploaded filenames with paths
  // =========================================

  submission.value.images = imagePaths;

  console.log(
    "Validated product:",
    submission.value,
  );

  await connectToDb();

  const {
    title,
    description,
    category,
    tags,
    images,
    price,
    discount,
    material,
    isActive,
    variants,
  } = submission.value;

  const slug =
    await generateUniqueSlug(title);

  const product = await Product.create({
    title,
    slug,
    description,
    category,
    tags,
    images,
    price,
    discount,
    material,
    isActive,
  });

  await Promise.all(
    variants.map(async (variant) => {
      const {
        color,
        size,
        stock,
        barcode,
      } = variant;

      await ProductInventory.create({
        product: product._id,

        color: {
          name: color.name,
          hex: color.hex,
        },

        size,
        stock,
        barcode,
      });
    }),
  );

  // const productData = {
  //   title: formData.get("title"),

  //   description: formData.get(
  //     "description",
  //   ),

  //   category: formData.get("category"),

  //   price: Number(
  //     formData.get("price"),
  //   ),

  //   discount: Number(
  //     formData.get("discount"),
  //   ),

  //   material: formData.get("material"),

  //   isActive: formData.get("isActive"),
  // };

  // productData.slug = slug;

  return {
    status: "success",
    product: submission.value,
  };
}
`Posted product form: [
  [ 'title', 'bunny' ],
  [ 'description', 'cute bunny cuuuute!' ],
  [ 'category', 'Girls' ],
  [ 'tags', 'baby, girl' ],
  [ 'images', 'ChatGPT Image Aug 8, 2026, 11_49_32 AM.png' ],
  [ 'images', 'ChatGPT Image Aug 8, 2026, 11_45_36 AM.png' ],
  [ 'images', 'admin-users.png' ],
  [ 'price', '300' ],
  [ 'discount', '1' ],
  [ 'material', '100% cotton' ],
  [ 'isActive', 'on' ],
  [ 'variants[0].color.name', 'pink' ],
  [ 'variants[0].color.hex', '#ff80c0' ],
  [ 'variants[0].size', '0-3M' ],
  [ 'variants[0].stock', '5' ],
  [ 'variants[0].barcode', '101010101' ]
]
Validated product: {
  title: 'bunny',
  description: 'cute bunny cuuuute!',
  category: 'Girls',
  tags: [ 'baby', 'girl' ],
  images: [
    'ChatGPT Image Aug 8, 2026, 11_49_32 AM.png',
    'ChatGPT Image Aug 8, 2026, 11_45_36 AM.png',
    'admin-users.png'
  ],
  price: 300,
  discount: 1,
  material: '100% cotton',
  isActive: false,
  variants: [ { color: [Object], size: '0-3M', stock: 5, barcode: '101010101' } ]
}`;
async function generateUniqueSlug(
  title,
) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  let slug = baseSlug;
  let counter = 1;

  while (
    await Product.exists({ slug })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
export async function imageUploader(
  formData,
) {
  //upload img
  const img = formData.get("img");
  if (!img) {
    throw new Error(
      "product doesn't have an image",
    );
  }
  const buffer = Buffer.from(
    img.arrayBuffer(),
  );
  const fileName =
    Date.now() + img.name;
  await writeFile(
    path.join(
      process.cwd(),
      "public/uploads",
    ),
    buffer,
  );
  console.log("IMG --> ", img);
  console.log("buffer --> ", buffer);
  console.log(
    "fileName --> ",
    fileName,
  );
  return img;
}

`Posted product form: [
  [ 'title', 'rompaa ompa' ],
  [ 'description', 'dfdfsas' ],
  [ 'category', 'Boys' ],
  [ 'tags', 'dfsdfsa' ],
  [
    'images',
    File {
      size: 2487510,
      type: 'image/jpeg',
      name: 'windmill.jpg',
      lastModified: 1787321238520
    }
  ],
  [
    'images',
    File {
      size: 241955,
      type: 'image/jpeg',
      name: 'yami-yami-15.jpg',
      lastModified: 1787321238528
    }
  ],
  [ 'price', '1200' ],
  [ 'discount', '1' ],
  [ 'material', 'cotton' ],
  [ 'isActive', 'on' ],
  [ 'variants[0].color.name', 'green' ],
  [ 'variants[0].color.hex', '#00ff00' ],
  [ 'variants[0].size', '18-24M' ],
  [ 'variants[0].stock', '12' ],
  [ 'variants[0].barcode', '8877713104' ]
]
Validated product: {
  title: 'rompaa ompa',
  description: 'dfdfsas',
  category: 'Boys',
  tags: [ 'dfsdfsa' ],
  images: [
    '/uploads/1787321238586-windmill.jpg',
    '/uploads/1787321238599-yami-yami-15.jpg'
  ],
  price: 1200,
  discount: 1,
  material: 'cotton',
  isActive: false,
  variants: [
    {
      color: [Object],
      size: '18-24M',
      stock: 12,
      barcode: '8877713104'
    }
  ]
}`;

//? kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

`Posted product form: [
  [ 'title', 'rompaa ompa' ],
  [ 'description', 'poola' ],
  [ 'category', 'Newborn' ],
  [ 'tags', 'baby,cotton' ],
  [
    'images',
    File {
      size: 79441,
      type: 'image/jpeg',
      name: 'baby-boy.jpg',
      lastModified: 1787403580205
    }
  ],
  [
    'images',
    File {
      size: 1320347,
      type: 'image/jpeg',
      name: 'new-born.jpg',
      lastModified: 1787403580217
    }
  ],
  [ 'price', '1200' ],
  [ 'discount', '1' ],
  [ 'material', 'e.g 100% cotton' ],
  [ 'variants[0].color.name', 'pink' ],
  [ 'variants[0].color.hex', '#ff80ff' ],
  [ 'variants[0].size', '18-24M' ],
  [ 'variants[0].stock', '15' ],
  [ 'variants[0].barcode', '01010101' ]
]
Validated product: {
  title: 'rompaa ompa',
  description: 'poola',
  category: 'Newborn',
  tags: [ 'baby', 'cotton' ],
  images: [
    '/uploads/1787403580263-baby-boy.jpg',
    '/uploads/1787403580271-new-born.jpg'
  ],
  price: 1200,
  discount: 1,
  material: 'e.g 100% cotton',
  isActive: true,
  variants: [
    { 
  color: [Object],
  size: '18-24M',
  stock: 15,
  barcode: '01010101' }
  ]
}`;
