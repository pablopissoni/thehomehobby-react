import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// --- imgages ---
import Logo from "../assets/Logo miniatura.svg";
import LogoGrande from "../assets/logo The Home Hobby.svg";
import Perfil from "../assets/perfil.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ShoppingCart } from "./ShoppingCart";

export const NavBar = () => {
  // Direciones URL LocalHost y Produccion
  const isLocalhost = window.location.href.includes("localhost");
  const urlLogin = isLocalhost
    ? "http://localhost:5173/login"
    : "https://thehomehobby/login";
  const urlRegister = isLocalhost
    ? "http://localhost:5173/register"
    : "https://thehomehobby/register";

  const home = isLocalhost ? "http://localhost:5173" : "https://thehomehobby";
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  //--------------------

  const [searchTerm, setSearchTerm] = useState('');
  console.log("🚀 ~ NavBar ~ searchTerm:", searchTerm)
  const navigate = useNavigate ();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm == '') {
      return
    } else {
      navigate(`/${searchTerm}`)
    }
  }

  return (
    <header className="header-section relative z-30 shadow-custom1">
      <div className="hidden bg-secondary sm:flex">
        <div className="container mx-auto grid h-full grid-cols-12 px-2 py-[6px] sm:px-8">
          <div className="col-span-8 self-center">
            <div className="flex gap-[15px]">
              <div className="flex items-center gap-2">
                <i className="bi bi-envelope flex text-2xl text-primary"></i>
                <a href="#" className="font-light text-white">
                  Ejemplo@example.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <i className="bi bi-telephone flex text-xl text-primary"></i>
                <a href="#" className="font-light text-white">
                  0101-010101
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-4 self-center justify-self-end">
            <div className="flex items-center gap-[10px]">
              <a href="#">
                <i className="bi bi-instagram transition-all-300 flex text-icon hover:text-white"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook transition-all-300 flex text-icon hover:text-white"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter transition-all-300 flex text-icon hover:text-white"></i>
              </a>
              <a href="#">
                <i className="bi bi-youtube transition-all-300 flex text-icon hover:text-white"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary">
        <div className="container mx-auto grid h-full grid-cols-4 gap-1 px-2 py-5 sm:px-8 lg:grid-cols-12 lg:gap-0">
          <div className="order-1 col-span-2 self-center lg:order-1 lg:col-span-3">
            <a href={home}>
              <img
                className="inline bg-white rounded-md"
                src={LogoGrande}
                alt="logo"
              />
            </a>
          </div>
          {/* SearchBar  */}
          <div className="header-search transition-all-300 order-3 col-span-4 mt-[10px] hidden self-center lg:order-2 lg:col-span-6 lg:mt-0 lg:block">
            <form className="search" onSubmit={handleSearch}>
              <div className="flex h-[40px] overflow-hidden rounded-[50px] bg-white">
                <input
                  className="search w-full border-none bg-transparent py-[5px] pl-5 text-black focus:border-none focus:ring-0 focus:ring-transparent"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                />
                <button className="btn-search px-3 text-red-600" type="submit">
                  <i className="bi bi-search flex text-xl"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="order-2 col-span-2 flex gap-2 self-center justify-self-end lg:order-3 lg:col-span-3 xl:gap-5">
            <div className="flex items-center lg:hidden">
              <button className="btn-search-mob p-[5px] text-white">
                <i className="bi bi-search pointer-events-none flex text-2xl"></i>
              </button>
            </div>
            <div className="flex items-center lg:hidden">
              <button
                className="btn-open-modal text-white"
                data-target=".menu-mob"
              >
                <i className="bi bi-list pointer-events-none flex text-3xl"></i>
              </button>
            </div>
            <div className="group-items hidden items-center gap-5 text-white lg:flex">
              <div className="relative">
                <a className="btn-open-modal" data-target=".wishlist-modal">
                  <i className="bi bi-heart pointer-events-none flex translate-y-1 transform text-[32px] text-white"></i>
                </a>
                <span className="badge absolute top-0 right-[-6px] h-[15px] min-w-[15px] px-[2px]">
                  0
                </span>
              </div>

              <button
                className="relative"
                onClick={() => setShowShoppingCart(true)}
              >
                <a
                  className="btn-open-modal"
                  data-target=".shopping-cart-modal"
                >
                  <i className="bi bi-cart2 pointer-events-none flex text-[35px] text-white"></i>
                </a>
                <span className="badge absolute top-0 right-[-6px] h-[15px] min-w-[15px] px-[2px]">
                  0
                </span>
              </button>
            </div>
            <div className="group relative hidden lg:flex">
              <div className="flex cursor-pointer select-none items-center gap-1">
                <span className="font-semibold text-white">My account</span>
                <i className="bi bi-caret-down-fill transition-all-300 flex rotate-0 text-sm text-white group-hover:rotate-180"></i>
              </div>
              <div className="transition-all-300 invisible absolute top-full z-30 w-[120%] pt-[10px] opacity-0 group-hover:visible group-hover:opacity-100">
                <div className="arrow relative">
                  <ul className="overflow-hidden rounded-md bg-white p-[6px] shadow-custom1">
                    <li className="hover:font-semibold">
                      <a
                        href={urlLogin} //LocalHost y Url de produccion
                        className="btn-open-modal"
                        data-tab="0"
                        data-target=".entry-modal"
                      >
                        <div className="pointer-events-none flex items-center gap-2 p-1">
                          <i className="bi bi-box-arrow-in-right flex text-xl text-primary"></i>
                          <span>Login</span>
                        </div>
                      </a>
                    </li>
                    <li className="hover:font-semibold">
                      <a
                        href={urlRegister} //LocalHost y Url de produccion
                        className="btn-open-modal"
                        data-tab="1"
                        data-target=".entry-modal"
                      >
                        <div className="pointer-events-none flex items-center gap-2 p-1">
                          <i className="bi bi-person flex text-xl text-primary"></i>
                          <span>Sign up</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-white lg:block">
        <nav className="container mx-auto px-2 sm:px-8">
          <ul className="menu flex flex-wrap items-center justify-between py-[10px] text-lg">
            <li className="underlined-animated group relative">
              <a
                href="#"
                className="btn-open flex items-center gap-1 font-semibold"
              >
                <span>Products</span>
                <i className="bi bi-caret-down-fill transition-all-300 flex rotate-0 text-xs text-primary group-hover:rotate-180"></i>
              </a>
              <div className="submenu transition-all-300 invisible absolute left-0 pt-[10px] opacity-0 group-hover:visible group-hover:opacity-100">
                <ul className="relative w-[250px] bg-white text-base shadow-custom1">
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Pc components</span>
                      <i className="bi bi-caret-right-fill group-1-hover-visible invisible ml-auto flex text-xs text-primary"></i>
                    </a>
                    <div className="submenu group-1-hover-visible transition-all-300 invisible absolute top-0 left-full min-h-full min-w-[680px] opacity-0">
                      <div className="bg-white shadow-custom-2">
                        <div className="border-b-2 border-primary py-[10px]">
                          <span className="px-5 text-3xl font-bold uppercase text-primary">
                            Pc components
                          </span>
                        </div>
                        <div className="submenu-categories flex flex-wrap">
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/motherboards.jpg"
                                  alt="motherboard"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Motherboards
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/processors.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Processors
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/rams.jpg"
                                  alt="rams"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                RAMS
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/video_cards.jpg"
                                  alt="video cards"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Video Cards
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/power_supplys.jpg"
                                  alt="video cards"
                                />
                              </div>
                              <span className="group-2-hover-font block object-contain text-center">
                                Power Supplys
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/hard_drives.jpg"
                                  alt="video cards"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Hard Drives
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/ssd_disk.jpg"
                                  alt="video cards"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                SSD Disk
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/pc_components/computer_case.jpg"
                                  alt="video cards"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Case
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Peripherals</span>
                      <i className="bi bi-caret-right-fill group-1-hover-visible invisible ml-auto flex text-xs text-primary"></i>
                    </a>
                    <div className="submenu group-1-hover-visible transition-all-300 invisible absolute top-0 left-full min-h-full min-w-[680px] opacity-0">
                      <div className="bg-white shadow-custom-2">
                        <div className="border-b-2 border-primary py-[10px]">
                          <span className="px-5 text-3xl font-bold uppercase text-primary">
                            Peripherals
                          </span>
                        </div>
                        <div className="submenu-categories flex flex-wrap">
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/peripherals/keywords.jpg"
                                  alt="motherboard"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Keywords
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/peripherals/mouse.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Mouses
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/peripherals/mic.jpg"
                                  alt="rams"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Mics
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/peripherals/webcam.jpg"
                                  alt="rams"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Webcam
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Computers</span>
                      <i className="bi bi-caret-right-fill group-1-hover-visible invisible ml-auto flex text-xs text-primary"></i>
                    </a>
                    <div className="submenu group-1-hover-visible transition-all-300 invisible absolute top-0 left-full min-h-full min-w-[680px] opacity-0">
                      <div className="bg-white shadow-custom-2">
                        <div className="border-b-2 border-primary py-[10px]">
                          <span className="px-5 text-3xl font-bold uppercase text-primary">
                            Computers
                          </span>
                        </div>
                        <div className="submenu-categories flex flex-wrap">
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/computers/desktops.jpg"
                                  alt="motherboard"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Desktops
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/computers/notebooks.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Notebooks
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Monitors</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Printers</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Gaming</span>
                      <i className="bi bi-caret-right-fill group-1-hover-visible invisible ml-auto flex text-xs text-primary"></i>
                    </a>
                    <div className="submenu group-1-hover-visible transition-all-300 invisible absolute top-0 left-full min-h-full min-w-[680px] opacity-0">
                      <div className="bg-white shadow-custom-2">
                        <div className="border-b-2 border-primary py-[10px]">
                          <span className="px-5 text-3xl font-bold uppercase text-primary">
                            Gaming
                          </span>
                        </div>
                        <div className="submenu-categories flex flex-wrap">
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/gaming/consoles.jpg"
                                  alt="motherboard"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Consoles
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/gaming/games.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Games
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/gaming/accessories.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Accessories
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Tablets</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Smartphones</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a href="#" className="flex items-center gap-2 p-2">
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Software</span>
                      <i className="bi bi-caret-right-fill group-1-hover-visible invisible ml-auto flex text-xs text-primary"></i>
                    </a>
                    <div className="submenu group-1-hover-visible transition-all-300 invisible absolute top-0 left-full min-h-full min-w-[680px] opacity-0">
                      <div className="bg-white shadow-custom-2">
                        <div className="border-b-2 border-primary py-[10px]">
                          <span className="px-5 text-3xl font-bold uppercase text-primary">
                            Software
                          </span>
                        </div>
                        <div className="submenu-categories flex flex-wrap">
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/software/os.jpg"
                                  alt="motherboard"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Operating System
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/software/office.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Office Package
                              </span>
                            </a>
                          </div>
                          <div className="group-2 p-[10px]">
                            <a
                              className="categorie-container inline-block"
                              href="#"
                            >
                              <div className="categorie-img h-[150px] w-[150px]">
                                <img
                                  className="img-product group-2-hover-img"
                                  src="images/categories/software/antivirus.jpg"
                                  alt="processors"
                                />
                              </div>
                              <span className="group-2-hover-font block text-center">
                                Antivirus
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="underlined-animated">
              <a href="index.html">Home</a>
            </li>
            <li className="underlined-animated">
              <a href="#">Desktops</a>
            </li>
            <li className="underlined-animated">
              <a href="#">Notebooks</a>
            </li>
            <li className="underlined-animated">
              <a href="#">Smartphones</a>
            </li>
            <li className="underlined-animated group">
              <a href="#" className="btn-open flex items-center gap-1">
                <span>Shop</span>
                <i className="bi bi-caret-down-fill transition-all-300 flex rotate-0 text-xs text-primary group-hover:rotate-180"></i>
              </a>
              <div className="submenu transition-all-300 invisible absolute left-0 pt-[10px] opacity-0 group-hover:visible group-hover:opacity-100">
                <ul className="relative w-[250px] bg-white text-base shadow-custom1">
                  <li className="group-1">
                    <a
                      href="shop-mixed.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Shop - Mixed</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="shop-listed.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Shop - Listed</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="shop-grid.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Shop - Grid</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="underlined-animated group">
              <a href="#" className="flex items-center gap-1">
                <span>Pages</span>
                <i className="bi bi-caret-down-fill transition-all-300 flex rotate-0 text-xs text-primary group-hover:rotate-180"></i>
              </a>
              <div className="transition-all-300 invisible absolute left-0 pt-[10px] opacity-0 group-hover:visible group-hover:opacity-100">
                <ul className="relative w-[250px] bg-white text-base shadow-custom1">
                  <li className="group-1">
                    <a
                      href="wishlist.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Wishlist</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="shopping-cart.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Shopping Cart</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="product-details.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">
                        Product Details
                      </span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="checkout.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Checkout</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="about-us.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">About Us</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="my-account.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">My Account</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="login.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Login</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="sign-up.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Sign Up</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="forgot-password.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">
                        Forgot Password
                      </span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="error404.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Error 404</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="purchase-completed.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">
                        Purchase Completed
                      </span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="purchase-failed.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">
                        Purchase Failed
                      </span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="message-sent.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Message Sent</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="verification.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Verification</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="privacy-policy.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Privacy Policy</span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="terms-and-conditions.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">
                        Terms &amp; Conditions
                      </span>
                    </a>
                  </li>
                  <li className="group-1">
                    <a
                      href="maintenance.html"
                      className="flex items-center gap-2 p-2"
                    >
                      <i className="bi bi-circle-fill group-1-hover-visible invisible flex text-[6px] text-primary"></i>
                      <span className="group-1-hover-font">Maintenance</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="underlined-animated">
              <a href="faqs.html">FAQ's</a>
            </li>
            <li className="underlined-animated">
              <a href="contact-us.html">Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
      {showShoppingCart && <ShoppingCart setShow={setShowShoppingCart} />}
    </header>
  );
};
