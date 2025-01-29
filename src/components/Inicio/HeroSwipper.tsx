import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "@styles/stylesPag.css";

interface SlideData {
  imgSrc: string;
}

interface Props {
  slides: SlideData[];
}

const HeroSwipper: React.FC<Props> = ({ slides }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      effect="fade"
      className="w-full h-[50vh] md:h-[75vh] transition-all ease-in-out"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <div
            className="absolute inset-0 z-10 bg-center bg-cover bg-no-repeat md:bg-fixed"
            style={{
              backgroundImage: `url(${slide.imgSrc})`,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSwipper;
