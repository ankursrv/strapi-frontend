import React from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const CustomSlider = ({
  children,
  slidesPerView = 1,
  spaceBetween = 20,
  onSlideChange,
  onSwiper,
  swiperContainer,
  autoplay,
  autoplayDelay = 1500, // Delay time
  disableOnInteraction = false, // Continue autoplay after interaction
  effect = "slide",
  speed = 1000,
  
}) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
      className={swiperContainer}
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      pagination={{ clickable: true }}
      autoplay={autoplay ? {
        delay: autoplayDelay,
        disableOnInteraction: disableOnInteraction,
      } : false}
      effect={effect}
      speed={speed}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSlider;
