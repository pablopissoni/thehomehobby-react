import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../assets/Logo miniatura.svg";
export const Footer = () => {
  return (
    <footer class="footer-section mt-auto w-full bg-[#0b0d17] text-gray-400">
      <div class="container mx-auto grid grid-cols-12 px-4 sm:px-8">
        <div class="col-span-12 py-[50px]">
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 sm:col-span-6 lg:col-span-4">
              <div class="pb-6">
                <img src={Logo} class="h-[40px]" alt="logo" />
              </div>
              <div>
                <div class="flex items-center gap-[10px] py-2">
                  <i class="bi bi-envelope-fill flex text-xl text-primary"></i>
                  <a class="break-all" href="#">
                    megabyte@example.com
                  </a>
                </div>
                <div class="flex items-center gap-[10px] py-2">
                  <i class="bi bi-telephone-fill flex text-xl text-primary"></i>
                  <a class="break-all" href="#">
                    0101-010101
                  </a>
                </div>
                <div class="flex items-center gap-[10px] py-2">
                  <i class="bi bi-geo-alt-fill flex text-xl text-primary"></i>
                  <span class="break-all">Colón 0101, Olavarría</span>
                </div>
              </div>
            </div>
            <div class="col-span-12 py-5 sm:col-span-6 sm:py-0 lg:col-span-4">
              <h3 class="pb-2 font-semibold text-gray-300">Useful Links</h3>
              <div>
                <ul class="flex flex-col flex-wrap gap-2 text-sm xs:max-h-[200px]">
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      New products
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Best sales
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Secure payment
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Services
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Delivery
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Legal Notice
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      About us
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Contact us
                    </a>
                  </li>
                  <li class="group relative flex items-center hover:text-primary">
                    <i class="bi bi-circle-fill invisible absolute -left-4 flex text-[6px] text-primary group-hover:visible"></i>
                    <a
                      href="#"
                      class="transition-all-300 group-hover:text-white"
                    >
                      Stores
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-4">
              <h3 class="pb-2 font-semibold text-gray-300">
                Be the first to know it
              </h3>
              <span class="py-2 text-sm">
                Subscribe to receive updates on our store and special offers
              </span>
              <form class="py-2">
                <div class="flex overflow-hidden rounded-lg bg-gray-300 p-2">
                  <input
                    class="w-full border-none bg-transparent pl-2 focus:border-none focus:ring-0 focus:ring-transparent"
                    type="text"
                    placeholder="Your email address"
                  />
                  <button class="p-1" type="submit">
                    <i class="bi bi-send flex text-lg text-white"></i>
                  </button>
                </div>
              </form>
              <div class="flex gap-2 py-2">
                <div class="relative h-8 w-8 overflow-hidden rounded-full">
                  <a
                    class="instagram-before flex h-8 w-8 items-center justify-center bg-gray-rgba text-center text-white"
                    href="#"
                  >
                    <i class="bi bi-instagram relative z-[2] flex"></i>
                  </a>
                </div>
                <div class="transition-all-300 h-8 w-8 rounded-full bg-gray-rgba hover:bg-facebook">
                  <a class="flex h-8 w-8 items-center justify-center" href="#">
                    <i class="bi bi-facebook flex text-white"></i>
                  </a>
                </div>
                <div class="transition-all-300 h-8 w-8 rounded-full bg-gray-rgba hover:bg-twitter">
                  <a class="flex h-8 w-8 items-center justify-center" href="#">
                    <i class="bi bi-twitter flex text-white"></i>
                  </a>
                </div>
                <div class="transition-all-300 h-8 w-8 rounded-full bg-gray-rgba hover:bg-youtube">
                  <a class="flex h-8 w-8 items-center justify-center" href="#">
                    <i class="bi bi-youtube flex text-white"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-12 pb-5">
          <p class="text-center">
            © <span class="current-year">2024</span> Example. All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
