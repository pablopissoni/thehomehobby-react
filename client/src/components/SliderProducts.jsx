import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

// --- IMG ---
import sliderDesktop1 from "../assets/slider-desktop1.png";
import sliderDesktop2 from "../assets/slider-desktop2.png";
import sliderDesktop3 from "../assets/slider-desktop3.png";
import sliderMobile1 from "../assets/slider-mobile1.png";
import sliderMobile2 from "../assets/slider-mobile2.png";
import sliderMobile3 from "../assets/slider-mobile3.png";

export const SliderProducts = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div className="absolute top-[10px] right-[10px]">
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i className="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i className="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span className="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div className="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  className="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div className="my-2 flex justify-between">
              <div className="flex">
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span className="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div className="my-1">
              <a className="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div className="my-1">
              <p className="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div className="my-2 flex gap-2">
              <div className="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div className="block h-3 w-3 rounded-full bg-red-600"></div>
              <div className="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div className="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div className="my-2 flex gap-2">
              <span className="font-bold">Size:</span>
              <ul className="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div className="my-1">
              <span className="text-lg font-bold">$37.00</span>
              <span className="text-sm text-primary line-through">$50.00</span>
            </div>
            <div className="mt-auto">
              <a
                className="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span className="font-bold uppercase text-white">
                  View details
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div className="absolute top-[10px] right-[10px]">
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i className="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i className="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span className="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div className="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  className="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div className="my-2 flex justify-between">
              <div className="flex">
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span className="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div className="my-1">
              <a className="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div className="my-1">
              <p className="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div className="my-2 flex gap-2">
              <div className="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div className="block h-3 w-3 rounded-full bg-red-600"></div>
              <div className="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div className="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div className="my-2 flex gap-2">
              <span className="font-bold">Size:</span>
              <ul className="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div className="my-1">
              <span className="text-lg font-bold">$37.00</span>
              <span className="text-sm text-primary line-through">$50.00</span>
            </div>
            <div className="mt-auto">
              <a
                className="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span className="font-bold uppercase text-white">
                  View details
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div className="absolute top-[10px] right-[10px]">
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i className="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i className="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span className="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div className="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  className="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div className="my-2 flex justify-between">
              <div className="flex">
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span className="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div className="my-1">
              <a className="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div className="my-1">
              <p className="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div className="my-2 flex gap-2">
              <div className="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div className="block h-3 w-3 rounded-full bg-red-600"></div>
              <div className="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div className="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div className="my-2 flex gap-2">
              <span className="font-bold">Size:</span>
              <ul className="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div className="my-1">
              <span className="text-lg font-bold">$37.00</span>
              <span className="text-sm text-primary line-through">$50.00</span>
            </div>
            <div className="mt-auto">
              <a
                className="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span className="font-bold uppercase text-white">
                  View details
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div className="absolute top-[10px] right-[10px]">
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i className="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div className="p-[2px]">
                <a
                  className="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i className="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span className="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div className="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  className="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div className="my-2 flex justify-between">
              <div className="flex">
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span className="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div className="my-1">
              <a className="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div className="my-1">
              <p className="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div className="my-2 flex gap-2">
              <div className="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div className="block h-3 w-3 rounded-full bg-red-600"></div>
              <div className="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div className="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div className="my-2 flex gap-2">
              <span className="font-bold">Size:</span>
              <ul className="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div className="my-1">
              <span className="text-lg font-bold">$37.00</span>
              <span className="text-sm text-primary line-through">$50.00</span>
            </div>
            <div className="mt-auto">
              <a
                className="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span className="font-bold uppercase text-white">
                  View details
                </span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};
