import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../assets/Logo miniatura.svg";
export const ShoppingCartPage = () => {
  return (
    <section>
      <div class="banner-title-section container mx-auto my-5 px-2 sm:px-8">
        <div class="liner-container my-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
          <h1 class="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
            Shopping Cart
          </h1>
        </div>
      </div>
      <div class="shopping-cart-page container mx-auto my-5 px-2 sm:px-8">
        {/* <!-- If the Shopping Cart is empty (replace hidden with flex) --> */}
        <div class="shopping-cart-empty hidden flex-col items-center justify-center gap-4 p-5">
          <i class="bi bi-cart-x text-8xl text-gray-200"></i>
          <p class="text-lg font-semibold">
            There are no products in the cart.
          </p>
          <a
            class="btn-effect transition-all-300 flex items-center justify-center gap-2 rounded-lg bg-primary p-2"
            href="#"
          >
            <span class="font-bold uppercase text-white">Go to the store</span>
          </a>
        </div>
        {/* <!-- --> */}
        <form
          class="grid grid-cols-12 gap-5 rounded-lg bg-white p-2 xs:p-5"
          action="#"
        >
          <div class="col-span-12 lg:col-span-8">
            {/* <!-- Element Responsive --> */}
            <div class="transition-all-300 flex w-full flex-col gap-2 p-2 hover:bg-gray-100 xs:flex-row lg:hidden">
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
                      <span class="text-xs font-light lg:hidden">
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
                      <span class="text-xs font-light">Subtotal</span>
                      <span class="font-bold text-primary">$37.00</span>
                    </div>
                  </div>
                </div>
                <div class="content flex items-center">
                  <div class="flex items-center gap-x-4 gap-y-1">
                    <div class="flex flex-col">
                      <span class="text-xs font-light">Quantity</span>
                      <div class="quantity inline-flex rounded-lg bg-white shadow">
                        <input
                          class="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                          type="number"
                          value="0"
                        />
                        <div class="flex w-5 flex-col justify-between">
                          <button
                            class="quantity-btn increment text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-up-fill"></i>
                          </button>
                          <button
                            class="quantity-btn decrement text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-down-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="tippy tippy-remove transition-all-300 cursor-pointer text-slate-400 hover:text-primary">
                      <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="transition-all-300 flex w-full flex-col gap-2 p-2 hover:bg-gray-100 xs:flex-row lg:hidden">
              <div class="content flex items-center">
                <div class="flex items-center">
                  <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                    <a href="#">
                      <img
                        class="h-full w-full object-cover"
                        src="images/cards/mousepad.jpg"
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
                      <div>
                        <a class="clamp-2 break-all font-bold" href="#">
                          Mousepad Hyperx Fury S Pro Speed
                        </a>
                        <small class="block">
                          <span class="font-semibold">Size:</span> XL
                        </small>
                        <small class="block">
                          <span class="font-semibold">Color:</span> Black
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="content">
                    <div class="flex flex-col">
                      <span class="text-xs font-light lg:hidden">
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
                      <span class="text-xs font-light">Subtotal</span>
                      <span class="font-bold text-primary">$37.00</span>
                    </div>
                  </div>
                </div>
                <div class="content flex items-center">
                  <div class="flex items-center gap-x-4 gap-y-1">
                    <div class="flex flex-col">
                      <span class="text-xs font-light">Quantity</span>
                      <div class="quantity inline-flex rounded-lg bg-white shadow">
                        <input
                          class="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                          type="number"
                          value="0"
                        />
                        <div class="flex w-5 flex-col justify-between">
                          <button
                            class="quantity-btn increment text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-up-fill"></i>
                          </button>
                          <button
                            class="quantity-btn decrement text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-down-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="tippy tippy-remove transition-all-300 cursor-pointer text-slate-400 hover:text-primary">
                      <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Element Desktop --> */}
            <div class="hidden overflow-x-auto lg:block">
              <table class="w-full min-w-[800px] text-left">
                <thead>
                  <tr>
                    <th></th>
                    <th class="p-2">Product Name</th>
                    <th class="p-2">Unit Price</th>
                    <th class="p-2">Quantity</th>
                    <th class="p-2">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="hover:bg-gray-100">
                    <td class="p-2">
                      <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                        <a href="#">
                          <img
                            class="h-full w-full object-cover"
                            src="images/product/prod-1.jpg"
                            alt="product"
                          />
                        </a>
                      </div>
                    </td>
                    <td class="p-2">
                      <a class="clamp-2 break-all font-bold" href="#">
                        Ryzen 5 3600x
                      </a>
                    </td>
                    <td class="p-2">
                      <span class="font-bold text-primary">$37.00</span>
                    </td>
                    <td class="p-2">
                      <div class="quantity inline-flex rounded-lg bg-white shadow">
                        <input
                          class="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                          type="number"
                          value="0"
                        />
                        <div class="flex w-5 flex-col justify-between">
                          <button
                            class="quantity-btn increment text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-up-fill"></i>
                          </button>
                          <button
                            class="quantity-btn decrement text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-down-fill"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="p-2">
                      <span class="font-bold text-primary">$37.00</span>
                    </td>
                    <td class="p-2">
                      <button class="tippy tippy-remove btn-delete transition-all-300 text-slate-400 hover:text-primary">
                        <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                      </button>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-100">
                    <td class="p-2">
                      <div class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                        <a href="#">
                          <img
                            class="h-full w-full object-cover"
                            src="images/cards/mousepad.jpg"
                            alt="product"
                          />
                        </a>
                      </div>
                    </td>
                    <td class="p-2">
                      <div>
                        <a class="clamp-2 break-all font-bold" href="#">
                          Mousepad Hyperx Fury S Pro Speed
                        </a>
                        <small class="block">
                          <span class="font-semibold">Size:</span> XL
                        </small>
                        <small class="block">
                          <span class="font-semibold">Color:</span> Black
                        </small>
                      </div>
                    </td>
                    <td class="p-2">
                      <span class="font-bold text-primary">$37.00</span>
                    </td>
                    <td class="p-2">
                      <div class="quantity inline-flex rounded-lg bg-white shadow">
                        <input
                          class="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                          type="number"
                          value="0"
                        />
                        <div class="flex w-5 flex-col justify-between">
                          <button
                            class="quantity-btn increment text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-up-fill"></i>
                          </button>
                          <button
                            class="quantity-btn decrement text-primary"
                            type="button"
                          >
                            <i class="bi bi-caret-down-fill"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td class="p-2">
                      <span class="font-bold text-primary">$37.00</span>
                    </td>
                    <td class="p-2">
                      <button class="tippy tippy-remove btn-delete transition-all-300 text-slate-400 hover:text-primary">
                        <i class="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4">
            <div class="mb-5">
              <span class="text-lg font-semibold">Discount Coupon</span>
              <div class="my-3 flex">
                <input
                  class="input-rounded-l"
                  type="text"
                  placeholder="Your code here"
                />
                <button
                  class="btn-view-shopping-cart btn-effect transition-all-300 flex min-w-max items-center justify-center rounded-r-lg bg-primary px-3"
                  type="submit"
                >
                  <span class="font-bold uppercase text-white">Apply</span>
                </button>
              </div>
            </div>
            <div class="rounded-lg border-2 p-4">
              <span class="mb-10 inline-block text-center text-lg font-bold">
                Summary of your purchase:
              </span>
              <div class="py-4">
                <div class="my-2 flex justify-between">
                  <span>Subtotal:</span>
                  <span>$37.00</span>
                </div>
                <div class="my-2 flex justify-between">
                  <span>Vat:</span>
                  <span>$22.72</span>
                </div>
                <div class="my-2 flex justify-between">
                  <span>Shipping:</span>
                  <span>$0.00</span>
                </div>
              </div>
              <div class="flex justify-between border-t-2 border-gray-200 py-4 text-xl font-bold uppercase">
                <span>Total:</span>
                <span>$59.72</span>
              </div>
              <a
                class="btn-view-shopping-cart btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="/Checkout"
              >
                <span class="font-bold uppercase text-white">Continue</span>
              </a>
            </div>
            <a
              class="transition-all-300 my-5 flex items-center justify-center gap-2 hover:text-primary"
              href="shopping-cart.html"
            >
              <i class="bi bi-arrow-repeat flex text-xl"></i>
              <span>Update Cart</span>
            </a>
            <a
              class="transition-all-300 my-5 flex items-center justify-center gap-2 hover:text-primary"
              href="shopping-cart.html"
            >
              <i class="bi bi-cart-plus flex text-xl"></i>
              <span>Add more products</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};
