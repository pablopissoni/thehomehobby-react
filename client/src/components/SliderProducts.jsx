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

export const SliderProducts = ({ products }) => {
  // const propsTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const productos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const productos = products;

  return (
    <>
      {/* <div className=""> */}
      <Swiper
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={4}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper px-10"
      >
        {products?.map((prod, index) => (
          // <div key={index}>
          <SwiperSlide key={index}>
            <CardProduct
              id={prod?.id}
              off={prod?.oferta_id}
              img={prod?.imagen}
              stars={prod?.stars}
              stock={prod?.stock}
              title={prod?.nombre_ingles ? prod?.nombre_ingles : prod?.nombre_es}
              description={prod?.description}
              price={prod?.precio_base}
              priceOff={prod?.priceOff}
            />
          </SwiperSlide>
          // </div>
        ))}
      </Swiper>
      {/* </div> */}
    </>
  );
};
