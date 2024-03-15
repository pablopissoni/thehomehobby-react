// components/HomePage.jsx
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import ContentLoader from "react-content-loader";
// Import Componentes
import { Footer } from "./Footer";
import { Slider } from "./Slider";
import { SliderComponents } from "./SliderComponent";
import { SliderProducts } from "./SliderProducts";

import TestProdObj from "./TestProdObj"; //* ----- OBJETO Productos test -----

// --- IMG ---
import sliderMobile3 from "../assets/slider-mobile3.png";
// import sliderMobile3 from "../assets/slider-mobile3.png";
import notebookBanner from "../assets/notebookBanner.jpg";
import hogarBanner from "../assets/Hogar-Banner.jpg";
import BoxE from "../assets/BoxE.jpg";
import { SliderCategory } from "./SliderCategory";
import { Link } from "react-router-dom";
import { apiUrl } from "../utils/config";

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../actions/productActions';
// import ProductList from './ProductList';

export const HomePage = () => {
  //* -- USE STATE --------
  const [products, setProducts] = useState([]); // Get Productos
  const [categories, setCategories] = useState([]); // Get Categories
  const [productsByCateg, setProductsByCateg] = useState([]); // Get Product by Category
  const [isLoadSubCate, setIsLoadSubCate] = useState(false);
  //* -- USE STATE --------

  //* ----- GET Categories -------------
  async function getCategories() {
    try {
      const response = await axios.get(`${apiUrl}/categories`);
      setCategories(response.data);
      setIsLoadSubCate(true);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("🚀 ~ .then ~ categories.data:", categories);
  // ----- GET Categories -------------

  //* ----- USE EFFECT -------------
  useEffect(() => {
    // getProducts();
    getCategories();
  }, []);
  //* ----- USE EFFECT -------------

  const Boxes = [
    {
      Title: "Deals in",
      Description: "Shop now",
      Link: "",
      Img: "BoxE",
    },
    {
      Title: "Home décor under $50",
      Description: "See more",
      Link: "",
      Img: "",
    },
    {
      Title: "Refresh your space",
      Description: "Shop now",
      Link: "",
      Img: "",
    },
    {
      Title: "Celebrate the women in your life",
      Description: "Shop now",
      Link: "",
      Img: "",
    },
    {
      Title: "Upgrade your office furniture",
      Description: "See more",
      Link: "",
      Img: "",
    },
    {
      Title: "International top sellers in Kitchen",
      Description: "Shop now",
      Link: "",
      Img: "",
    },
  ];

  //? ----- Loader ------
  const MyLoader = (props) => (        
        <div className="bg-white py-2 max-w-48 max-h-14 border border-gray-300 hover:shadow-lg cursor-pointer hover:text-red-500 font-medium">
          {
            <ContentLoader
            className="ml-4"
              speed={2}
              width={400}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#dedede"
              foregroundColor="#919191"
              {...props}
            >
              <rect x="30" y="7" rx="3" ry="3" width="88" height="6" />
              <rect x="46" y="21" rx="3" ry="3" width="52" height="6" />
            </ContentLoader>
          }
      </div>
  );
  //? ----- Loader ------

  console.log("categories>> ", categories);
  return (
    <div className="bg-fondo">
      {/* <ProductList products={products} /> */}
      {/* Sección de banners */}
      <section className="banners-section container mx-auto my-5 px-2 sm:px-8">
        <div className="grid grid-cols-12 gap-5">
          <div className="swiper-container col-span-12 overflow-hidden rounded-lg ">
            <Slider />
          </div>
        </div>
      </section>
      {/* Sección de información  */}
      <section>
        <div className="information-section container mx-auto my-5 px-2 sm:px-8">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3 transition-all duration-300 hover:-translate-y-1">
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
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3 transition-all duration-300 hover:-translate-y-1">
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
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3 transition-all duration-300 hover:-translate-y-1">
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
            <div className="col-span-12 flex sm:col-span-6 lg:col-span-3 transition-all duration-300 hover:-translate-y-1">
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
      {/* Slider categorias */}
      <section>
        <div className="container mx-auto my-10 px-2 sm:px-8">
          {" "}
          <div class="-mx-4 flex flex-wrap p-8 ">
            {Boxes.map((box, index) => (
              <div class="w-full px-4 md:w-1/2 lg:w-1/3 ">
                <div class="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9  duration-300 hover:-translate-y-1 bg-white">
                  <div>
                    <h3 class="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                      {box.Title}
                    </h3>
                    <img src={BoxE} />
                    <Link>
                      <p class="text-base font-medium text-body-color">
                        {box.Description}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto my-10 px-2 sm:px-8 bg-white">
          <div className=" mt-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
              Offers
            </h1>
          </div>
          <SliderCategory categories={categories} />
        </div>
      </section>

      {/* <section>
        <div className="offers-section container mx-auto my-5 px-2 sm:px-8">
          <div className="liner-container mt-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
              Offers
            </h1>
          </div>
          <div className="swiper-container">
            <div className="swiper swiper-cards group relative flex items-center py-5 swiper-initialized swiper-horizontal swiper-free-mode swiper-backface-hidden"> */}
      {/* <SliderProducts slidesToShow={4} /> */}
      {/* <SliderProducts products={TestProdObj} /> Productos test */}
      {/* </div>
          </div>
        </div>
      </section> */}
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
      {/* img + slider de Productos */}
      {/* -- Sliders Notebooks -- */}
      {/* <SliderComponents
        img={notebookBanner}
        titleImg={"Notebooks"}
        title={"Notebooks"}
        // products={products.data}
        prodCategoryId={5}
      /> */}

      {/* -- Sliders Map -- */}
      {/* {categories &&
        categories.map(
          (category) =>
            category.status === 1 && ( // filtro solo los que tienen STATUS 1 que deben ser los activos
              <SliderComponents
                key={category?.id}
                img={`https://thehomehobby.s3.amazonaws.com${category?.image}`}
                titleImg={
                  category?.contenido[0]?.nombre ||
                  category?.contenido[1]?.nombre
                }
                title={
                  category?.contenido[0]?.nombre ||
                  category?.contenido[1]?.nombre
                }
                // products={}
                prodCategoryId={category?.id}
              />
            )
        )} */}
      {/* Sección de categorías */}
      <section>
        <div className="categories-section container mx-auto my-5 px-2 sm:px-8">
          <div className="liner-container mb-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
            <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
              Shop by Category
            </h1>
          </div>
          <div className="swiper-container col-span-12 overflow-hidden rounded-lg md:col-span-8">
            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-4 mb-10">
              {categories.length > 0 ? (
                categories.map(
                  (category, index) =>
                    category.status == 1 && (
                      <Link
                        to={`/category/${category.id}`}
                        key={index}
                        className="bg-white p-4 max-w-60 border border-gray-300 hover:shadow-lg cursor-pointer hover:text-red-500 font-medium"
                      >
                        {category?.contenido[0]?.nombre ||
                          category?.contenido[1]?.nombre}
                      </Link>
                    )
                )
              ) : (
                // Loader de Carga de SubCategorias
                Array.from({ length: 8 }, (_, index) => <MyLoader key={index} />)
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
