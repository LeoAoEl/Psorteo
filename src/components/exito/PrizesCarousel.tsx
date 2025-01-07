import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface PrizesCarouselProps {
  items: { name: string; image: string }[];
}

export default function PrizesCarousel({ items }: PrizesCarouselProps) {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Premios Increíbles
        </h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group relative cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full object-cover  h-60  transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-white">
                    {item.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
