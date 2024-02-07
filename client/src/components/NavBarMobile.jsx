import React, { useState } from "react";

export const NavBarMobile = ({ setShow }) => {
  const [show, setLocalShow] = useState(true);
  return (
    <>
      <div>
        {show && (
          <div class="menu-mob modal transition-all-300 visible fixed inset-0 z-50 h-full w-full bg-overlay opacity-100">
            <div class="flex h-full w-full">
              <div class="modal-content transition-all-300 relative left-0 mr-auto flex h-full w-[288px] min-w-[250px] flex-col bg-white">
                <div class="w-full bg-secondary">
                  <button
                    class="btn-close-modal transition-all-300 absolute top-5 right-5 p-[3px] text-white"
                    onClick={() => setShow(!show)}
                  >
                    <i class="bi bi-x-lg text-stroke-medium pointer-events-none flex text-xl"></i>
                  </button>
                  <div class="py-12">
                    <img
                      src="images/logo.png"
                      class="mx-auto h-[40px]"
                      alt="logo"
                    />
                  </div>
                </div>
                <nav class="h-full w-full overflow-auto bg-white">
                  <ul class="metismenu">
                    <li class="border-b border-gray-200">
                      <a
                        class="flex select-none items-center p-2"
                        href="index.html"
                      >
                        <i class="bi bi-house-door mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Home</span>
                      </a>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="metismenu-btn has-arrow flex cursor-pointer select-none items-center p-2"
                        aria-expanded="false"
                        role="menu"
                      >
                        <i class="bi bi-person mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">My Account</span>
                      </div>
                      <div class="metismenu-content mm-collapse">
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="#"
                          data-tab="0"
                          data-target=".entry-modal"
                        >
                          Login
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="#"
                          data-tab="1"
                          data-target=".entry-modal"
                        >
                          Sign Up
                        </a>
                      </div>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="btn-open-modal cursor-pointer p-2"
                        data-target=".wishlist-modal"
                      >
                        <div class="pointer-events-none flex cursor-pointer select-none items-center">
                          <i class="bi bi-heart mr-3 flex text-xl text-primary"></i>
                          <span class="font-semibold">Wishlist</span>
                          <span class="badge ml-auto h-[22px] min-w-[22px] px-[6px]">
                            0
                          </span>
                        </div>
                      </div>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="btn-open-modal cursor-pointer p-2"
                        data-target=".shopping-cart-modal"
                      >
                        <div class="pointer-events-none flex cursor-pointer select-none items-center">
                          <i class="bi bi-cart mr-3 flex text-xl text-primary"></i>
                          <span class="font-semibold">Shopping Cart</span>
                          <span class="badge ml-auto h-[22px] min-w-[22px] px-[6px]">
                            0
                          </span>
                        </div>
                      </div>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="metismenu-btn has-arrow flex cursor-pointer select-none items-center p-2"
                        aria-expanded="false"
                        role="menu"
                      >
                        <i class="bi bi-motherboard mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Hardware</span>
                      </div>
                      <div class="metismenu-content mm-collapse">
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Motherboards
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Processors
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Rams
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Video Cards
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Power Supplys
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Hard Drives
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          SSD Disk
                        </a>
                      </div>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="metismenu-btn has-arrow flex cursor-pointer select-none items-center p-2"
                        aria-expanded="false"
                        role="menu"
                      >
                        <i class="bi bi-mouse mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Peripherals</span>
                      </div>
                      <div class="metismenu-content mm-collapse">
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Keywords
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Mouses
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Mics
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Webcam
                        </a>
                      </div>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="metismenu-btn has-arrow flex cursor-pointer select-none items-center p-2"
                        aria-expanded="false"
                        role="menu"
                      >
                        <i class="bi bi-pc-display mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Computers</span>
                      </div>
                      <div class="metismenu-content mm-collapse">
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Notebooks
                        </a>
                        <a class="btn-open-modal ml-10 block p-1" href="#">
                          Desktops
                        </a>
                      </div>
                    </li>
                    <li class="border-b border-gray-200">
                      <a
                        class="flex cursor-pointer select-none items-center p-2"
                        href="#"
                      >
                        <i class="bi bi-tv mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Monitors</span>
                      </a>
                    </li>
                    <li class="border-b border-gray-200">
                      <a
                        class="flex cursor-pointer select-none items-center p-2"
                        href="#"
                      >
                        <i class="bi bi-printer mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Printers</span>
                      </a>
                    </li>
                    <li class="border-b border-gray-200">
                      <a
                        class="flex cursor-pointer select-none items-center p-2"
                        href="#"
                      >
                        <i class="bi bi-phone mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Smartphones</span>
                      </a>
                    </li>
                    <li class="border-b border-gray-200">
                      <a
                        class="flex select-none items-center p-2"
                        href="faqs.html"
                      >
                        <i class="bi bi-question-circle mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">FAQ's</span>
                      </a>
                    </li>
                    <li class="border-b border-gray-200">
                      <a
                        class="flex select-none items-center p-2"
                        href="contact-us.html"
                      >
                        <i class="bi bi-telephone mr-3 flex text-xl text-primary"></i>
                        <span class="font-semibold">Contact Us</span>
                      </a>
                    </li>
                    <li class="border-b border-gray-200">
                      <div
                        class="metismenu-btn has-arrow flex cursor-pointer select-none items-center p-2"
                        aria-expanded="false"
                        role="menu"
                      >
                        <span class="font-semibold">Pages</span>
                      </div>
                      <div class="metismenu-content mm-collapse">
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="wishlist.html"
                        >
                          Wishlist
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="shopping-cart.html"
                        >
                          Shopping Cart
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="product-details.html"
                        >
                          Product Details
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="checkout.html"
                        >
                          Checkout
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="shop-mixed.html"
                        >
                          Shop - Mixed
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="shop-listed.html"
                        >
                          Shop - Listed
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="shop-grid.html"
                        >
                          Shop - Grid
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="about-us.html"
                        >
                          About Us
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="my-account.html"
                        >
                          My Account
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="forgot-password.html"
                        >
                          Forgot Password
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="login.html"
                        >
                          Login
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="sign-up.html"
                        >
                          Sign Up
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="verification.html"
                        >
                          Verification
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="terms-and-conditions.html"
                        >
                          Terms &amp; Conditions
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="privacy-policy.html"
                        >
                          Privacy Policy
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="error404.html"
                        >
                          Error 404
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="message-sent.html"
                        >
                          Message Sent
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="purchase-completed.html"
                        >
                          Purchase Completed
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="purchase-failed.html"
                        >
                          Purchase Failed
                        </a>
                        <a
                          class="btn-open-modal ml-10 block p-1"
                          href="maintenance.html"
                        >
                          Maintenance
                        </a>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
