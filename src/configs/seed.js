import Product from "@src/models/Product";
import ProductInventory from "@src/models/ProductInventory";
import connectToDb from "./db";

const va = [
  {
    title: "Cute Bunny Romper",
    slug: "cute-bunny-romper",
    description:
      "Soft cotton romper with adorable bunny print.",
    category: "Newborn",
    tags: ["newborn", "romper"],
    images: [
      "/products/bunny-romper-1.jpg",
      "/products/bunny-romper-2.jpg",
    ],
    price: 420000,
    discount: 10,
    material: "100% Cotton",
    featured: true,
    isActive: true,
  },
  {
    title: "Little Bear Bodysuit",
    slug: "little-bear-bodysuit",
    description:
      "Comfortable everyday baby bodysuit.",
    category: "Newborn",
    tags: ["newborn", "bodysuit"],
    images: [
      "/products/bear-body-1.jpg",
    ],
    price: 360000,
    discount: 0,
    material: "Cotton",
    featured: false,
    isActive: true,
  },
  {
    title: "Pink Floral Dress",
    slug: "pink-floral-dress",
    description:
      "Beautiful floral dress for baby girls.",
    category: "Girls",
    tags: ["girl", "dress"],
    images: [
      "/products/floral-dress.jpg",
    ],
    price: 690000,
    discount: 15,
    material: "Cotton",
    featured: true,
    isActive: true,
  },
  {
    title: "Princess Party Dress",
    slug: "princess-party-dress",
    description:
      "Elegant party dress with soft lining.",
    category: "Girls",
    tags: ["girl", "party"],
    images: ["/products/princess.jpg"],
    price: 990000,
    discount: 20,
    material: "Polyester Blend",
    featured: true,
    isActive: true,
  },
  {
    title: "Blue Dino T-Shirt",
    slug: "blue-dino-tshirt",
    description:
      "Funny dinosaur print t-shirt.",
    category: "Boys",
    tags: ["boy", "tshirt"],
    images: [
      "/products/dino-shirt.jpg",
    ],
    price: 320000,
    discount: 5,
    material: "Cotton",
    featured: false,
    isActive: true,
  },
  {
    title: "Adventure Hoodie",
    slug: "adventure-hoodie",
    description:
      "Warm hoodie for cool weather.",
    category: "Boys",
    tags: ["boy", "hoodie"],
    images: [
      "/products/adventure-hoodie.jpg",
    ],
    price: 790000,
    discount: 10,
    material: "Fleece",
    featured: true,
    isActive: true,
  },
  {
    title: "Rainbow Leggings",
    slug: "rainbow-leggings",
    description:
      "Stretchy colorful leggings.",
    category: "Girls",
    tags: ["girl", "leggings"],
    images: [
      "/products/rainbow-leggings.jpg",
    ],
    price: 290000,
    discount: 0,
    material: "Cotton",
    featured: false,
    isActive: true,
  },
  {
    title: "Baby Denim Overalls",
    slug: "baby-denim-overalls",
    description:
      "Classic denim overalls.",
    category: "Boys",
    tags: ["boy", "overall"],
    images: ["/products/overalls.jpg"],
    price: 640000,
    discount: 10,
    material: "Denim",
    featured: false,
    isActive: true,
  },
  {
    title: "Warm Winter Jacket",
    slug: "warm-winter-jacket",
    description:
      "Insulated jacket for winter.",
    category: "Boys",
    tags: ["boy", "winter"],
    images: [
      "/products/winter-jacket.jpg",
    ],
    price: 1450000,
    discount: 25,
    material: "Polyester",
    featured: true,
    isActive: true,
  },
  {
    title: "Soft Cotton Pajamas",
    slug: "soft-cotton-pajamas",
    description:
      "Breathable pajamas for bedtime.",
    category: "Newborn",
    tags: ["newborn", "sleep"],
    images: ["/products/pajamas.jpg"],
    price: 430000,
    discount: 5,
    material: "Cotton",
    featured: false,
    isActive: true,
  },
  {
    title: "Tiny Star Hat",
    slug: "tiny-star-hat",
    description: "Warm knit baby hat.",
    category: "Newborn",
    tags: ["hat", "newborn"],
    images: ["/products/star-hat.jpg"],
    price: 180000,
    discount: 0,
    material: "Wool Blend",
    featured: false,
    isActive: true,
  },
  {
    title: "Baby Sneakers",
    slug: "baby-sneakers",
    description:
      "Lightweight everyday sneakers.",
    category: "Boys",
    tags: ["shoes", "boy"],
    images: ["/products/sneakers.jpg"],
    price: 760000,
    discount: 15,
    material: "Synthetic",
    featured: true,
    isActive: true,
  },
  {
    title: "Butterfly Skirt",
    slug: "butterfly-skirt",
    description:
      "Cute skirt with butterfly pattern.",
    category: "Girls",
    tags: ["girl", "skirt"],
    images: ["/products/skirt.jpg"],
    price: 390000,
    discount: 10,
    material: "Cotton",
    featured: false,
    isActive: true,
  },
  {
    title: "Little Gentleman Set",
    slug: "little-gentleman-set",
    description:
      "Formal outfit for boys.",
    category: "Boys",
    tags: ["boy", "set"],
    images: [
      "/products/gentleman-set.jpg",
    ],
    price: 1200000,
    discount: 20,
    material: "Cotton Blend",
    featured: true,
    isActive: true,
  },
  {
    title: "Fluffy Baby Blanket",
    slug: "fluffy-baby-blanket",
    description: "Ultra soft blanket.",
    category: "Newborn",
    tags: ["blanket"],
    images: ["/products/blanket.jpg"],
    price: 550000,
    discount: 0,
    material: "Microfiber",
    featured: false,
    isActive: true,
  },
  {
    title: "Maternity Nursing Dress",
    slug: "maternity-nursing-dress",
    description:
      "Comfortable nursing dress.",
    category: "Maternity",
    tags: ["maternity"],
    images: [
      "/products/nursing-dress.jpg",
    ],
    price: 980000,
    discount: 15,
    material: "Cotton",
    featured: true,
    isActive: true,
  },
  {
    title: "Maternity Leggings",
    slug: "maternity-leggings",
    description:
      "Stretch maternity leggings.",
    category: "Maternity",
    tags: ["maternity", "leggings"],
    images: [
      "/products/maternity-leggings.jpg",
    ],
    price: 620000,
    discount: 10,
    material: "Cotton Blend",
    featured: false,
    isActive: true,
  },
  {
    title: "Baby Socks Pack",
    slug: "baby-socks-pack",
    description:
      "Pack of five colorful socks.",
    category: "Newborn",
    tags: ["socks"],
    images: ["/products/socks.jpg"],
    price: 240000,
    discount: 0,
    material: "Cotton",
    featured: false,
    isActive: true,
  },
  {
    title: "Summer Sunshine Dress",
    slug: "summer-sunshine-dress",
    description:
      "Lightweight summer dress.",
    category: "Girls",
    tags: ["girl", "summer"],
    images: [
      "/products/summer-dress.jpg",
    ],
    price: 580000,
    discount: 10,
    material: "Linen Blend",
    featured: true,
    isActive: true,
  },
  {
    title: "Baby Knitted Sweater",
    slug: "baby-knitted-sweater",
    description:
      "Soft knitted sweater for chilly days.",
    category: "Newborn",
    tags: ["newborn", "sweater"],
    images: [
      "/products/knitted-sweater.jpg",
    ],
    price: 670000,
    discount: 5,
    material: "Wool Blend",
    featured: false,
    isActive: true,
  },
];

const inventory = [];

const colors = [
  {
    name: "Pink",
    hex: "#FFC0CB",
  },
  {
    name: "Blue",
    hex: "#87CEEB",
  },
  {
    name: "White",
    hex: "#FFFFFF",
  },
  {
    name: "Beige",
    hex: "#F5F5DC",
  },
];

const sizes = [
  "NB",
  "0-3M",
  "3-6M",
  "6-9M",
];

await connectToDb();

await Product.deleteMany({});
await ProductInventory.deleteMany({});
const products =
  await Product.insertMany(va);

for (const product of products) {
  for (let j = 0; j < 2; j++) {
    inventory.push({
      product: product._id,

      color:
        colors[
          Math.floor(
            Math.random() *
              colors.length,
          )
        ],

      size: sizes[j],

      stock:
        Math.floor(Math.random() * 12) +
        1,
    });
  }
}

await ProductInventory.insertMany(
  inventory,
);

console.log(
  "Database seeded successfully ✅",
);
