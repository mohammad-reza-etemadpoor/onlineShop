"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/image.png",
    title: "Softness They Deserve",
    subtitle:
      "Premium baby clothing made for everyday comfort.",
    button: "Shop Collection",
  },
  {
    id: 2,
    image:
      "/summer-collection-hero.png",
    title: "New Summer Collection",
    subtitle:
      "Lightweight fabrics for little explorers.",
    button: "Explore Now",
  },
  {
    id: 3,
    image:
      "/spring-collection-hero.png",
    title: "Up to 30% OFF",
    subtitle:
      "Limited time offers on selected baby essentials.",
    button: "Shop Sale",
  },
];

export default function HeroSection() {
  return (
    <section className="bg-secondary mx-auto mt-0 w-full max-w-7xl px-0 mb-4">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
        ]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop
        className="overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[250px] overflow-hidden sm:h-[400px] lg:h-[600px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={
                  slide.id === 1
                }
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r to-white/85 via-white/55 from-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="max-w-xl px-8 md:px-14">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-500">
                    Little Loom
                  </p>

                  <h1 className="mb-4 text-3xl font-bold text-zinc-900 md:text-5xl">
                    {slide.title}
                  </h1>

                  <p className="mb-8 text-base leading-7 text-zinc-700 md:text-lg">
                    {slide.subtitle}
                  </p>

                  <Link
                    href="/shop"
                    className="inline-flex rounded-full bg-[#F9E34F] px-7 py-3 font-semibold text-zinc-900 transition hover:scale-105 hover:bg-yellow-300"
                  >
                    {slide.button}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
