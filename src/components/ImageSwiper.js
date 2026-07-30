"use client";
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
import Image from "next/image";

export default function ImageSwiper() {
  return (
    <section className="bg-secondary w-full px-4 py-4">
      <Swiper
        modules={[
          // Navigation,
          // Pagination,
          Autoplay,
        ]}
        grabCursor={true}
        slidesPerView={7}
        // navigation
        // pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        spaceBetween={24}
        className="rounded-xl h-40 w-full"
      >
        {Array.from({ length: 13 }).map(
          (_, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={`/baby-clothe-${i}.jpg`}
                  alt={`Baby clothes ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </section>
  );
}
