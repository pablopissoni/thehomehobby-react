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
          <div class="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div class="absolute top-[10px] right-[10px]">
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i class="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div class="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span class="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div class="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  class="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div class="my-2 flex justify-between">
              <div class="flex">
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span class="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div class="my-1">
              <a class="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div class="my-1">
              <p class="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div class="my-2 flex gap-2">
              <div class="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div class="block h-3 w-3 rounded-full bg-red-600"></div>
              <div class="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div class="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div class="my-2 flex gap-2">
              <span class="font-bold">Size:</span>
              <ul class="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div class="my-1">
              <span class="text-lg font-bold">$37.00</span>
              <span class="text-sm text-primary line-through">$50.00</span>
            </div>
            <div class="mt-auto">
              <a
                class="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span class="font-bold uppercase text-white">View details</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div class="absolute top-[10px] right-[10px]">
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i class="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div class="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span class="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div class="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  class="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div class="my-2 flex justify-between">
              <div class="flex">
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span class="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div class="my-1">
              <a class="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div class="my-1">
              <p class="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div class="my-2 flex gap-2">
              <div class="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div class="block h-3 w-3 rounded-full bg-red-600"></div>
              <div class="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div class="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div class="my-2 flex gap-2">
              <span class="font-bold">Size:</span>
              <ul class="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div class="my-1">
              <span class="text-lg font-bold">$37.00</span>
              <span class="text-sm text-primary line-through">$50.00</span>
            </div>
            <div class="mt-auto">
              <a
                class="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span class="font-bold uppercase text-white">View details</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div class="absolute top-[10px] right-[10px]">
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i class="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div class="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span class="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div class="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  class="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div class="my-2 flex justify-between">
              <div class="flex">
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span class="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div class="my-1">
              <a class="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div class="my-1">
              <p class="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div class="my-2 flex gap-2">
              <div class="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div class="block h-3 w-3 rounded-full bg-red-600"></div>
              <div class="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div class="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div class="my-2 flex gap-2">
              <span class="font-bold">Size:</span>
              <ul class="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div class="my-1">
              <span class="text-lg font-bold">$37.00</span>
              <span class="text-sm text-primary line-through">$50.00</span>
            </div>
            <div class="mt-auto">
              <a
                class="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span class="font-bold uppercase text-white">View details</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="card-container transition-all-300 translateY-2 relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow-md hover:z-[2] hover:shadow-xl">
            <div class="absolute top-[10px] right-[10px]">
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-wishlist btn-wishlist transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                >
                  <i class="bi bi-heart pointer-events-none flex text-white"></i>
                </a>
              </div>
              <div class="p-[2px]">
                <a
                  class="tippy tippy-left-card-view btn-open-modal transition-all-300 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-[rgba(0,0,0,.3)] hover:bg-primary-hover"
                  href="javascript:void(0)"
                  data-target=".quick-view-modal"
                >
                  <i class="bi bi-eye pointer-events-none flex text-xl text-white"></i>
                </a>
              </div>
            </div>
            <div class="absolute top-0 left-0 flex h-[35px] w-[90px] items-center justify-center rounded-br-lg bg-primary">
              <span class="text-md text-center font-semibold uppercase text-white">
                25% Off
              </span>
            </div>
            <div class="h-[190px] overflow-hidden rounded-lg">
              <a href="#">
                <img
                  class="card-object-fit h-full w-full"
                  src={sliderDesktop1}
                  alt="product"
                />
              </a>
            </div>
            <div class="my-2 flex justify-between">
              <div class="flex">
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-star"></i>
                <i class="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div>
                <span class="rounded-md bg-green-300 py-1 px-2 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div class="my-1">
              <a class="clamp break-all font-medium" href="#">
                Moto e7i Power
              </a>
            </div>
            <div class="my-1">
              <p class="clamp-2 text-sm text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
                culpa, odio, qui praesentium dignissimos eaque dolorum porro
                alias neque, eius animi ipsa voluptates. Optio repellat tempora
                voluptas, dolores ipsam ad!
              </p>
            </div>
            <div class="my-2 flex gap-2">
              <div class="block h-3 w-3 rounded-full bg-blue-600"></div>
              <div class="block h-3 w-3 rounded-full bg-red-600"></div>
              <div class="block h-3 w-3 rounded-full bg-yellow-600"></div>
              <div class="block h-3 w-3 rounded-full bg-black"></div>
            </div>
            <div class="my-2 flex gap-2">
              <span class="font-bold">Size:</span>
              <ul class="flex gap-3">
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
              </ul>
            </div>
            <div class="my-1">
              <span class="text-lg font-bold">$37.00</span>
              <span class="text-sm text-primary line-through">$50.00</span>
            </div>
            <div class="mt-auto">
              <a
                class="btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="#"
              >
                <span class="font-bold uppercase text-white">View details</span>
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
