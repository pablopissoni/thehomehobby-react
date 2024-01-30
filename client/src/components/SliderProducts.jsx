import React, { useRef, useState } from "react";
import { CardProduct } from "./CardProduct";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

// --- IMG ---
import sliderDesktop1 from "../assets/slider-desktop1.png";
// import sliderDesktop2 from "../assets/slider-desktop2.png";
// import sliderDesktop3 from "../assets/slider-desktop3.png";
// import sliderMobile1 from "../assets/slider-mobile1.png";
// import sliderMobile2 from "../assets/slider-mobile2.png";
// import sliderMobile3 from "../assets/slider-mobile3.png";

export const SliderProducts = () => {
  const propsTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const off = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"

        // slidesPerView={4}
        // spaceBetween={30}
        // navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination, Navigation]}
        // className="mySwiper"
      >
        {off.map((off, index) => (
          <SwiperSlide key={index}>
            <CardProduct></CardProduct>
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide>
        <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide>
        <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide>
        <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide>
        <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide>
        <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide>
        <SwiperSlide>
          <CardProduct></CardProduct>
        </SwiperSlide> */}
      </Swiper>
    </>
  );
};
