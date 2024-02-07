import React, { useState } from "react";

export const Wishlist = ({ setShow }) => {
  const [show, setLocalShow] = useState(true);
  return (
    <>
      <div>
        {show && (
          <div class="wishlist-modal modal transition-all-300 visible fixed inset-0 z-50 h-full w-full bg-overlay opacity-100">
            <div class="flex h-full w-full">
              <div class="modal-content transition-all-300 relative right-0 ml-auto flex h-full w-[400px] min-w-[250px] flex-col bg-white">
                <div class="w-full">
                  <div class="border-b-2 border-gray-200 p-5">
                    <h3 class="text-xl font-bold uppercase">Wishlist</h3>
                  </div>
                  <button
                    class="btn-close-modal transition-all-300 absolute top-5 right-5 p-[3px] hover:text-slate-400"
                    onClick={() => setShow(!show)}
                  >
                    <i class="bi bi-x-lg text-stroke-medium pointer-events-none flex text-xl"></i>
                  </button>
                </div>
                <div class="h-full overflow-auto">
                  <div class="hidden flex-col items-center justify-center gap-4 p-5">
                    <i class="bi bi-heart text-8xl text-gray-200"></i>
                    <p class="font-semibold">
                      There are no products in the wishlist.
                    </p>
                    <a
                      class="btn-effect transition-all-300 flex items-center justify-center gap-2 rounded-lg bg-primary p-2"
                      href="#"
                    >
                      <span class="font-bold uppercase text-white">
                        Go to the store
                      </span>
                    </a>
                  </div>
                  <a
                    class="transition-all-300 flex h-[100px] w-full items-center justify-between gap-5 bg-white p-2 hover:bg-gray-100"
                    href="#"
                  >
                    <div class="h-[80px] w-[80px] min-w-[80px] overflow-hidden rounded-lg border">
                      <img
                        class="h-full w-full object-cover"
                        src="images/product/prod-1.jpg"
                        alt="product"
                      />
                    </div>

                    <div class="flex w-full flex-col">
                      <h6 class="clamp-2 break-all text-lg font-semibold">
                        Ryzen 5 3600x
                      </h6>
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-primary">$37.00</span>
                        <small class="text-xs text-primary line-through">
                          $50.00
                        </small>
                      </div>
                    </div>

                    <div class="transition-all-300 flex text-slate-400 hover:text-primary">
                      <i class="bi bi-trash-fill pointer-events-none text-2xl"></i>
                    </div>
                  </a>
                </div>
                <div class="mt-auto border-t-2 border-gray-200 bg-white px-1 xs:px-5">
                  <a
                    class="btn-effect transition-all-300 my-5 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                    href="wishlist.html"
                  >
                    <span class="font-bold uppercase text-white">
                      View Wishlist
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
