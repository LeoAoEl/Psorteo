import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "@styles/winnersSwiper.css";

interface Winner {
  id: number;
  name: string;
  prize: string;
  image: string;
  ticketNumber: string;
}

const winners: Winner[] = [
  {
    id: 1,
    name: "Ana García",
    prize: "iPhone 13",
    image:
      "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1736380768/sorteo/kka7wiipuqwlxxilwivw.png",
    ticketNumber: "A12345",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    prize: "MacBook Air",
    image:
      "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1736380768/sorteo/hwescdgd0brfce3coysw.png",
    ticketNumber: "B67890",
  },
  {
    id: 3,
    name: "María López",
    prize: "PlayStation 5",
    image:
      "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1736380768/sorteo/kka7wiipuqwlxxilwivw.png",
    ticketNumber: "C11111",
  },
  {
    id: 4,
    name: "Juan Martínez",
    prize: "Nintendo Switch",
    image:
      "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1736380768/sorteo/hwescdgd0brfce3coysw.png",
    ticketNumber: "D22222",
  },
  {
    id: 5,
    name: "Laura Sánchez",
    prize: "iPad Pro",
    image:
      "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1736380768/sorteo/kka7wiipuqwlxxilwivw.png",
    ticketNumber: "E33333",
  },
];

const WinnersSwiperCarousel: React.FC = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {domLoaded && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          navigation
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper"
        >
          {winners.map((winner) => (
            <SwiperSlide key={winner.id}>
              <div className="bg-detalle rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out transform cursor-pointer hover:scale-105">
                <div className="relative">
                  <img
                    src={winner.image}
                    alt={winner.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-slate-800 font-bold py-2 px-4 rounded-full shadow-lg">
                    Ticket: {winner.ticketNumber}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className=" font-thin text-2xl mb-2 text-slate-200">
                    {winner.name}
                  </h3>
                  <p className="text-slate-200 text-lg">Ganó: {winner.prize}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="swiper-pagination mt-8"></div>
    </div>
  );
};

export default WinnersSwiperCarousel;
