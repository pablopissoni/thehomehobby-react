import React, { useRef, useState } from "react";
import { SliderProducts } from "./SliderProducts";
// --- IMG ---
// import notebookBanner from '../assets/notebookBanner.jpg'

export const SliderComponents = ({img, titleImg, title, products}) => {
  return (
    <>
      {/* img + slider de Productos  */}
      <section>
        <div className="products-1-section container mx-auto my-5 px-2 sm:px-8">
          <div className="liner-container mt-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 className="mb-[-2px] inline-block border-b-2 border-primary-color pb-3 text-2xl font-bold uppercase">
              {title}
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-5">
            <div className="group relative col-span-3 my-5 hidden overflow-hidden rounded-l-lg xl:block">
              <div className="overlay-gradient absolute  z-[1] h-full w-full"></div>
              <img
                className="transition-all-300 h-full w-full object-cover hover:transform group-hover:scale-110"
                src={img}
                alt="banner-img"
              />
              <div className="absolute top-0 left-0 flex h-full w-full items-center">
                <div className="z-[2] p-5">
                  <h3 className="text-lg font-bold uppercase text-primary-color drop-shadow-xl">
                    {titleImg}
                  </h3>
                  <p className="my-5 text-white drop-shadow-md">
                    Choose your laptop now!
                  </p>
                  <a
                    className="btn-effect inline-block rounded-lg bg-primary-color py-2 px-3 text-white"
                    href="#"
                  >
                    <span>Show more</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="cards-slider-2 swiper-container col-span-12 xl:col-span-9">
              <div className="swiper swiper-cards-2 group relative flex items-center py-5 swiper-initialized swiper-horizontal swiper-free-mode swiper-backface-hidden">
                {/* <SliderProducts slidesToShow={3} /> */}
                <SliderProducts products={products}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
