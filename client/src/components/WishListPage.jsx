import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../assets/Logo miniatura.svg";
export const WishListPage = () => {
  return (
    <section>
      <div class="banner-title-section container mx-auto my-5 px-2 sm:px-8">
        <div class="liner-container my-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
          <h1 class="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
            Wishlist
          </h1>
        </div>
      </div>
      <div class="wishlist-page container mx-auto my-5 px-2 sm:px-8">
        {/* <!-- If the wishlist is empty (replace hidden with flex) --> */}
        <div class="wishlist-empty hidden flex-col items-center justify-center gap-4 p-5">
          <i class="bi bi-heart text-8xl text-gray-200"></i>
          <p class="text-lg font-semibold">
            There are no products in the wishlist.
          </p>
          <a
            class="btn-effect flex items-center justify-center gap-2 rounded-lg bg-primary p-2 transition-all duration-300"
            href="#"
          >
            <span class="font-bold uppercase text-white">Go to the store</span>
          </a>
        </div>

        <form class="wishlist-content rounded-lg bg-white p-5">
          <div class="mb-5 flex flex-col items-center justify-between border-b-2 border-gray-200 pb-5 sm:flex-row">
            <div class="flex gap-5 pb-4 sm:pb-0">
              <label
                class="flex cursor-pointer select-none items-center gap-2"
                for="check-all"
              >
                <input class="checkbox" type="checkbox" id="check-all" />
                <span>Select All</span>
              </label>
              <button
                class="btn-effect flex items-center gap-1 rounded-lg bg-primary p-2 font-semibold uppercase text-white"
                type="submit"
              >
                <i class="bi bi-trash-fill pointer-events-none flex text-xl"></i>
                <span>Delete</span>
              </button>
            </div>
            <ul class="pagination flex items-center">
              <li class="pointer-events-none py-2 px-3 text-gray-200">
                <i class="bi bi-arrow-left-short flex"></i>
              </li>
              <li class="active cursor-pointer py-2 px-3">1</li>
              <li class="cursor-pointer py-2 px-3">2</li>
              <li class="cursor-pointer py-2 px-3">3</li>
              <li class="hidden cursor-pointer py-2 px-3 tracking-wide sm:block">
                ...
              </li>
              <li class="hidden cursor-pointer py-2 px-3 sm:block">10</li>
              <li class="hidden cursor-pointer py-2 px-3 sm:block">11</li>
              <li class="cursor-pointer py-2 px-3 text-primary">
                <i class="bi bi-arrow-right-short flex"></i>
              </li>
            </ul>
          </div>
          {/* <!-- Product Responsive --> */}
          <div class="transition-all-300 flex gap-2 p-2 hover:bg-gray-100 lg:hidden">
            <div class="content flex items-center">
              <input
                class="checkbox check-product"
                type="checkbox"
                id="product-mobile-1"
              />
            </div>
            <div class="flex w-full flex-col gap-2 xs:flex-row">
              <div class="content flex items-center">
                <div class="flex items-center">
                  <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                    <a href="#">
                      <img
                        class="h-full w-full object-cover"
                        src="images/product/prod-1.jpg"
                        alt="product"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex w-full flex-col gap-2 sm:flex-row">
                <div class="flex w-full flex-col gap-2">
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light xs:hidden">
                        Product Name
                      </span>
                      <a class="clamp-2 break-all font-bold" href="#">
                        Ryzen 5 3600x
                      </a>
                    </div>
                  </div>
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light xs:hidden">
                        Unit Price
                      </span>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-primary">$37.00</span>
                        <small class="text-xs text-primary line-through">
                          $50.00
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light xs:hidden">
                        Stock Status
                      </span>
                      <span class="text-sm font-bold uppercase text-green-400">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
                <div class="content flex items-center">
                  <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 md:hidden">
                    <a
                      href="#"
                      class="flex text-primary hover:text-primary-hover"
                    >
                      View Details
                    </a>
                    <a
                      href="#"
                      class="flex text-primary hover:text-primary-hover"
                    >
                      Remove
                    </a>
                  </div>
                  <div class="hidden items-center gap-2 md:flex">
                    <a
                      href="#"
                      class="btn-effect transition-all-300 w-max rounded-lg bg-primary p-2 px-3"
                    >
                      <span class="font-bold uppercase text-white">
                        View Details
                      </span>
                    </a>
                    <div class="tippy tippy-remove transition-all-300 hidden cursor-pointer text-slate-400 hover:text-primary sm:inline">
                      <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="transition-all-300 flex gap-2 p-2 hover:bg-gray-100 lg:hidden">
            <div class="content flex items-center">
              <input
                class="checkbox check-product"
                type="checkbox"
                id="product-mobile-2"
              />
            </div>
            <div class="flex w-full flex-col gap-2 xs:flex-row">
              <div class="content flex items-center">
                <div class="flex items-center">
                  <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                    <a href="#">
                      <img
                        class="h-full w-full object-cover"
                        src="images/categories/peripherals/mouse.jpg"
                        alt="product"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="flex w-full flex-col gap-2 sm:flex-row">
                <div class="flex w-full flex-col gap-2">
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light xs:hidden">
                        Product Name
                      </span>
                      <a class="clamp-2 break-all font-bold" href="#">
                        Mouse Logitech g403
                      </a>
                    </div>
                  </div>
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light xs:hidden">
                        Unit Price
                      </span>
                      <span class="font-bold text-primary">$37.00</span>
                    </div>
                  </div>
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light xs:hidden">
                        Stock Status
                      </span>
                      <span class="text-sm font-bold uppercase text-green-400">
                        In Stock
                      </span>
                    </div>
                  </div>
                </div>
                <div class="content flex items-center">
                  <div class="flex flex-wrap justify-center gap-x-4 gap-y-1 md:hidden">
                    <a
                      href="#"
                      class="flex text-primary hover:text-primary-hover"
                    >
                      View Details
                    </a>
                    <a
                      href="#"
                      class="flex text-primary hover:text-primary-hover"
                    >
                      Remove
                    </a>
                  </div>
                  <div class="hidden items-center gap-2 md:flex">
                    <a
                      href="#"
                      class="btn-effect transition-all-300 w-max rounded-lg bg-primary p-2 px-3"
                    >
                      <span class="font-bold uppercase text-white">
                        View Details
                      </span>
                    </a>
                    <div class="tippy tippy-remove transition-all-300 hidden cursor-pointer text-slate-400 hover:text-primary sm:inline">
                      <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Product Desktop --> */}
          <div class="hidden overflow-x-auto lg:block">
            <table class="w-full min-w-[800px] text-left">
              <thead>
                <tr>
                  <th></th>
                  <th class="p-2">Product Name</th>
                  <th class="p-2">Unit Price</th>
                  <th class="p-2">Stock Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr class="transition-all-300 hover:bg-gray-50">
                  <td class="p-2">
                    <div class="flex items-center gap-5">
                      <input
                        class="checkbox check-product"
                        type="checkbox"
                        id="product-desktop-1"
                      />
                      <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                        <a href="#">
                          <img
                            class="h-full w-full object-cover"
                            src="images/product/prod-1.jpg"
                            alt="product"
                          />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="p-2">
                    <a class="clamp-2 break-all font-bold" href="#">
                      Ryzen 5 3600x
                    </a>
                  </td>
                  <td class="p-2">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-primary">$37.00</span>
                      <small class="text-xs text-primary line-through">
                        $50.00
                      </small>
                    </div>
                  </td>
                  <td class="p-2">
                    <span class="text-sm font-bold uppercase text-green-400">
                      In Stock
                    </span>
                  </td>
                  <td class="p-2">
                    <div class="flex items-center gap-4">
                      <a
                        class="btn-effect rounded-lg bg-primary p-2 text-white"
                        href="#"
                      >
                        <span class="font-bold uppercase">View Details</span>
                      </a>
                      <div class="tippy tippy-remove transition-all-300 hidden cursor-pointer text-slate-400 hover:text-primary sm:inline">
                        <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr class="transition-all-300 hover:bg-gray-50">
                  <td class="p-2">
                    <div class="flex items-center gap-5">
                      <input
                        class="checkbox check-product"
                        type="checkbox"
                        id="product-desktop-2"
                      />
                      <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                        <a href="#">
                          <img
                            class="h-full w-full object-cover"
                            src="images/categories/peripherals/mouse.jpg"
                            alt="product"
                          />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="p-2">
                    <a class="clamp-2 break-all font-bold" href="#">
                      Mouse Logitech g403
                    </a>
                  </td>
                  <td class="p-2">
                    <span class="font-bold text-primary">$37.00</span>
                  </td>
                  <td class="p-2">
                    <span class="text-sm font-bold uppercase text-green-400">
                      In Stock
                    </span>
                  </td>
                  <td class="p-2">
                    <div class="flex items-center gap-4">
                      <a
                        class="btn-effect rounded-lg bg-primary p-2 text-white"
                        href="#"
                      >
                        <span class="font-bold uppercase">View Details</span>
                      </a>
                      <div class="tippy tippy-remove transition-all-300 hidden cursor-pointer text-slate-400 hover:text-primary sm:inline">
                        <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </section>
  );
};
