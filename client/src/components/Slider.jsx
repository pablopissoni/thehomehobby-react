import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import Swiper required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// --- IMG ---
import sliderDesktop1 from "../assets/slider-desktop1.png";
import sliderDesktop2 from "../assets/slider-desktop2.png";
import sliderDesktop3 from "../assets/slider-desktop3.png";
import sliderMobile1 from "../assets/slider-mobile1.png";
import sliderMobile2 from "../assets/slider-mobile2.png";
import sliderMobile3 from "../assets/slider-mobile3.png";

export const Slider = () => {
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
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* -- Slider Desktop -- */}
        <SwiperSlide>
          <img className="hidden sm:block" src={sliderDesktop1} alt="" />
          <img className="sm:hidden" src={sliderMobile1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="hidden sm:block" src={sliderDesktop2} alt="" />
          <img className="sm:hidden" src={sliderMobile2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="hidden sm:block" src={sliderDesktop3} alt="" />
          <img className="sm:hidden" src={sliderMobile3} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
