// components/HomePage.jsx
import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Footer } from "./Footer";
import { Slider } from "./Slider";

import { SliderProducts } from "./SliderProducts";
// --- IMG ---

import sliderMobile3 from "../assets/slider-mobile3.png";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../actions/productActions';
// import ProductList from './ProductList';

export const HomePage = () => {
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <div>
      {/* <ProductList products={products} /> */}
      {/* Sección de banners */}
      <section className="banners-section container mx-auto my-5 px-2 sm:px-8">
        <div className="grid grid-cols-12 gap-5">
          <div className="swiper-container col-span-12 overflow-hidden rounded-lg md:col-span-8">
            <Slider />
          </div>
          <div className="group relative col-span-4 hidden overflow-hidden rounded-lg md:block">
            <div className="overlay-gradient absolute z-[1] h-full w-full"></div>
            <img
              className="transition-all-300 h-full w-full object-cover hover:transform group-hover:scale-110"
              src={sliderMobile3}
              alt="banner-img"
            />
            <div className="absolute top-0 left-0 flex h-full w-full items-center">
              <div className="z-[2] p-5">
                <h3 className="text-lg font-bold uppercase text-primary drop-shadow-xl">
                  Armed pc gamer
                </h3>
                <p className="my-5 text-white drop-shadow-md">
                  Choose your pc and play!
                </p>
                <a
                  className="btn-effect inline-block rounded-lg bg-primary py-2 px-3 text-white"
                  href="#"
                >
                  <span>Shop now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sección de información  */}
      <section>
        <div className="information-section container mx-auto my-5 px-2 sm:px-8">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
              <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
                <div className="rounded-full border-2">
                  <i className="bi bi-truck flex p-3 text-[40px] text-primary"></i>
                </div>
                <div>
                  <h6 className="font-bold capitalize">Free shipping</h6>
                  <p className="break-all text-sm text-gray-400">
                    Orders over $100
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
              <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
                <div className="rounded-full border-2">
                  <i className="bi bi-cash-coin flex p-3 text-[40px] text-primary"></i>
                </div>
                <div>
                  <h6 className="font-bold capitalize">Money back</h6>
                  <p className="break-all text-sm text-gray-400">
                    With a 30 day
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
              <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
                <div className="rounded-full border-2">
                  <i className="bi bi-shield-check flex p-3 text-[40px] text-primary"></i>
                </div>
                <div>
                  <h6 className="font-bold capitalize">Secure payment</h6>
                  <p className="break-all text-sm text-gray-400">
                    Secured payment
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
              <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
                <div className="rounded-full border-2">
                  <i className="bi bi-headset flex p-3 text-[40px] text-primary"></i>
                </div>
                <div>
                  <h6 className="font-bold capitalize">Online support</h6>
                  <p className="break-all text-sm text-gray-400">
                    Support 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Slider con productos */}
      <section>
        <div className="offers-section container mx-auto my-5 px-2 sm:px-8">
          <div className="liner-container mt-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
              Offers
            </h1>
          </div>
          <div className="swiper-container">
            <div className="swiper swiper-cards group relative flex items-center py-5 swiper-initialized swiper-horizontal swiper-free-mode swiper-backface-hidden">
              <SliderProducts />
            </div>
          </div>
        </div>
      </section>
      {/* Sección de banners 2 */}
      <section>
        <div className="banners-section-2 container mx-auto my-5 px-2 sm:px-8">
          <div className="grid grid-cols-12 gap-5">
            <div className="group relative col-span-12 h-[300px] overflow-hidden rounded-lg sm:col-span-6">
              <div className="overlay-gradient absolute z-[1] h-full w-full"></div>
              <img
                className="transition-all-300 h-full w-full object-cover hover:transform group-hover:scale-110"
                src={sliderMobile3}
                alt="banner-img"
              />
              <div className="absolute top-0 left-0 flex h-full w-full items-center">
                <div className="z-[2] p-5">
                  <h3 className="text-lg font-bold uppercase text-primary drop-shadow-xl">
                    Notebooks
                  </h3>
                  <p className="my-5 text-white drop-shadow-md">
                    Choose the ideal laptop for you!
                  </p>
                  <a
                    className="btn-effect inline-block rounded-lg bg-primary py-2 px-3 text-white"
                    href="#"
                  >
                    <span>Show more</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="group relative col-span-12 h-[300px] overflow-hidden rounded-lg sm:col-span-6">
              <div className="overlay-gradient absolute z-[1] h-full w-full"></div>
              <img
                className="transition-all-300 h-full w-full object-cover hover:transform group-hover:scale-110"
                src={sliderMobile3}
                alt="banner-img"
              />
              <div className="absolute top-0 left-0 flex h-full w-full items-center">
                <div className="z-[2] p-5">
                  <h3 className="text-lg font-bold uppercase text-primary drop-shadow-xl">
                    Desktops
                  </h3>
                  <p className="my-5 text-white drop-shadow-md">
                    Build your PC at the best price!
                  </p>
                  <a
                    className="btn-effect inline-block rounded-lg bg-primary py-2 px-3 text-white"
                    href="#"
                  >
                    <span>Show more</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="products-1-section container mx-auto my-5 px-2 sm:px-8">
          <div class="liner-container mt-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 class="mb-[-2px] inline-block border-b-2 border-primary-color pb-3 text-2xl font-bold uppercase">
              Notebooks
            </h1>
          </div>
          <div class="grid grid-cols-12 gap-5">
            <div class="group relative col-span-3 my-5 hidden overflow-hidden rounded-l-lg xl:block">
              <div class="overlay-gradient absolute z-[1] h-full w-full"></div>
              <img
                class="transition-all-300 h-full w-full object-cover hover:transform group-hover:scale-110"
                src={sliderMobile3}
                alt="banner-img"
              />
              <div class="absolute top-0 left-0 flex h-full w-full items-center">
                <div class="z-[2] p-5">
                  <h3 class="text-lg font-bold uppercase text-primary-color drop-shadow-xl">
                    Notebooks
                  </h3>
                  <p class="my-5 text-white drop-shadow-md">
                    Choose your laptop now!
                  </p>
                  <a
                    class="btn-effect inline-block rounded-lg bg-primary-color py-2 px-3 text-white"
                    href="#"
                  >
                    <span>Show more</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="cards-slider-2 swiper-container col-span-12 xl:col-span-9">
              <div class="swiper swiper-cards-2 group relative flex items-center py-5 swiper-initialized swiper-horizontal swiper-free-mode swiper-backface-hidden"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Sección de categorías */}
      <section>
        <div className="categories-section container mx-auto my-5 px-2 sm:px-8">
          <div className="liner-container mb-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
              Categories
            </h1>
          </div>
          <div className="swiper-container col-span-12 overflow-hidden rounded-lg md:col-span-8">
            <div className="swiper swiper-default group relative flex items-center py-5 swiper-initialized swiper-horizontal swiper-backface-hidden"></div>
          </div>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
};
