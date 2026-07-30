import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Girls",
    image: "/cat-girl.jpg",
    //290 * 362
    href: "/shop/girls",
  },
  {
    id: 2,
    title: "Boys",
    image: "/baby-boy.jpg",
    href: "/shop/boys",
  },
  {
    id: 3,
    title: "Newborn",
    image: "/new-born.jpg",
    href: "/shop/newborn",
  },
  {
    id: 4,
    title: "Maternity",
    image: "/pregnant-mom.jpg",
    href: "/shop/maternity",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-secondary mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          Shop by Category
        </p>

        <h2 className="mt-2 text-4xl font-bold text-zinc-900">
          Find What You Need
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>

                <span className="mt-2 inline-block text-sm text-white/90">
                  Shop Now →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
