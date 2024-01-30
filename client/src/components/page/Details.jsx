import React from "react";
// Importa react-modal
// import Modal from "react-modal";
import { useState } from "react";
//? test img
import test_product1 from "../../assets/test_product1.png";
import test_product2 from "../../assets/test_product2.png";
import test_product3 from "../../assets/test_product3.png";

export const Details = () => {
  // Define el estado para controlar la apertura/cierre de los modales
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);

  const handleCommentClick = () => {
    setCommentModalIsOpen(true);
    setReviewModalIsOpen(false);
    console.log("🚀 ~ Details ~ commentModalIsOpen:", commentModalIsOpen);
  };

  const handleReviewClick = () => {
    setCommentModalIsOpen(false);
    setReviewModalIsOpen(true);
    console.log("🚀 ~ Details ~ reviewModalIsOpen:", reviewModalIsOpen);
  };
  //? test array img
  const test_img = [test_product1, test_product2, test_product3];

  // handleSubmit Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="flex min-h-full flex-col bg-body font-poppins text-txt bg-gray-100">
      <div className="product-details container mx-auto my-5 px-2 sm:px-8">
        <div className="grid grid-cols-12 gap-5 rounded-lg bg-white p-2 xs:p-8">
          <div className="col-span-12 max-h-[500px] md:col-span-6">
            <div className="swiper swiper-top group relative flex items-center rounded-lg swiper-fade swiper-initialized swiper-horizontal swiper-watch-progress swiper-backface-hidden">
              {/* Imagen ampliada producto */}
              <div
                className="swiper-wrapper"
                id="swiper-wrapper-665e837d73bd3f06"
                aria-live="polite"
              >
                <div
                  className="swiper-slide swiper-slide-visible swiper-slide-fully-visible swiper-slide-active"
                  style={{
                    width: "438px",
                    opacity: 1,
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                  role="group"
                  aria-label="1 / 3"
                >
                  <div
                    className="swiper-zoom-container"
                    style={{
                      transitionDuration: "300ms",
                      transform: "translate3d(0px, 0px, 0px)",
                    }}
                  >
                    <img
                      src={test_img[0]}
                      alt="product"
                      style={{
                        transitionDuration: "300ms",
                        transform: "translate3d(0px, 0px, 0px) scale(1)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="swiper-slide swiper-slide-next"
                  style={{
                    width: "438px",
                    opacity: 0,
                    transform: "translate3d(-438px, 0px, 0px)",
                  }}
                  role="group"
                  aria-label="2 / 3"
                >
                  <div className="swiper-zoom-container">
                    <img src="images/product/prod-2.jpg" alt="product" />
                  </div>
                </div>
                <div
                  className="swiper-slide"
                  role="group"
                  aria-label="3 / 3"
                  style={{
                    width: "438px",
                    opacity: 0,
                    transform: "translate3d(-876px, 0px, 0px)",
                  }}
                >
                  <div className="swiper-zoom-container">
                    <img src="images/product/prod-3.jpg" alt="product" />
                  </div>
                </div>
              </div>
              {/* buttons slide img */}
              <div
                className="button-next btn-slider-1 transition-all-300 -right-16 group-hover:right-4"
                tabIndex="0"
                role="button"
                aria-label="Next slide"
                aria-controls="swiper-wrapper-665e837d73bd3f06"
                aria-disabled="false"
              >
                ❯
              </div>
              <div
                className="button-prev btn-slider-1 transition-all-300 -left-16 group-hover:left-4 swiper-button-disabled"
                tabIndex="-1"
                role="button"
                aria-label="Previous slide"
                aria-controls="swiper-wrapper-665e837d73bd3f06"
                aria-disabled="true"
              >
                ❮
              </div>
              {/* revisar span */}
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span>
            </div>
            {/* miniaturas del producto */}
            <div className="swiper swiper-thumbs swiper-initialized swiper-horizontal swiper-free-mode swiper-watch-progress swiper-backface-hidden">
              <div
                className="swiper-wrapper"
                id="swiper-wrapper-54b8d94b6b328c4d"
                aria-live="polite"
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
              >
                <div
                  className="swiper-slide cursor-pointer rounded-lg swiper-slide-visible swiper-slide-fully-visible swiper-slide-active swiper-slide-thumb-active"
                  style={{ width: "99.5px", marginRight: "10px" }}
                  role="group"
                  aria-label="1 / 3"
                >
                  <img src="images/product/prod-1.jpg" alt="product" />
                </div>
                <div
                  className="swiper-slide cursor-pointer rounded-lg swiper-slide-visible swiper-slide-fully-visible swiper-slide-next"
                  style={{ width: "99.5px", marginRight: "10px" }}
                  role="group"
                  aria-label="2 / 3"
                >
                  <img src="images/product/prod-2.jpg" alt="product" />
                </div>
                <div
                  className="swiper-slide cursor-pointer rounded-lg swiper-slide-visible swiper-slide-fully-visible"
                  role="group"
                  aria-label="3 / 3"
                  style={{ width: "99.5px", marginRight: "10px" }}
                >
                  <img src="images/product/prod-3.jpg" alt="product" />
                </div>
              </div>
              <div className="button-next btn-slider-1 transition-all-300 -right-16 group-hover:right-4">
                ❯
              </div>
              <div className="button-prev btn-slider-1 transition-all-300 -left-16 group-hover:left-4">
                ❮
              </div>
              <span
                className="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
              ></span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="my-1">
              <a
                className="clamp-2 transition-all-300 break-all text-2xl font-medium hover:text-primary"
                href="#"
              >
                Ryzen 5 3600x
              </a>
            </div>
            <div className="product-val-stock my-2 flex justify-between">
              <div className="flex">
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-star"></i>
                <i className="bi bi-star-fill flex text-base text-gray-200"></i>
              </div>
              <div className="ml-auto">
                <span className="rounded-md bg-green-300 px-2 py-1 text-xs font-bold uppercase text-white">
                  instock
                </span>
              </div>
            </div>
            <div className="my-5 flex items-center gap-5">
              <div className="flex rounded-lg bg-white px-3 py-2 text-primary shadow">
                <span className="text-sm">$</span>
                <span className="text-2xl font-semibold leading-7">37.00</span>
              </div>
              <div className="flex flex-col">
                <span className="text-md font-semibold uppercase text-green-400">
                  25% Off
                </span>
                <span className="prev-price text-sm text-primary line-through">
                  $50.00
                </span>
              </div>
            </div>
            <div className="my-4">
              <p className="clamp-5 break-all">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                cupiditate repellat magni exercitationem non, quaerat
                consequatur. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Earum cupiditate.
              </p>
            </div>
            <div className="flex gap-1">
              <form action="#" onClick={handleFormSubmit}>
                <div className="block">
                  <div className="my-3 flex flex-col gap-1">
                    <span className="font-bold">Size:</span>
                    <ul className="flex flex-wrap gap-3">
                      <li className="relative">
                        <input
                          className="peer sr-only"
                          type="radio"
                          // value=""
                          name="size"
                          id="size1"
                          checked=""
                        />
                        <label
                          className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-primary"
                          htmlFor="size1"
                        >
                          S
                        </label>
                      </li>
                      <li className="relative">
                        <input
                          className="peer sr-only"
                          type="radio"
                          // value=""
                          name="size"
                          id="size2"
                        />
                        <label
                          className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-primary"
                          htmlFor="size2"
                        >
                          M
                        </label>
                      </li>
                      <li className="relative">
                        <input
                          className="peer sr-only"
                          type="radio"
                          // value=""
                          name="size"
                          id="size3"
                        />
                        <label
                          className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-primary"
                          htmlFor="size3"
                        >
                          L
                        </label>
                      </li>
                      <li className="relative">
                        <input
                          className="peer sr-only"
                          type="radio"
                          // value=""
                          name="size"
                          id="size4"
                        />
                        <label
                          className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-primary"
                          htmlFor="size4"
                        >
                          XL
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="my-3 flex gap-2">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="radio bg-blue-600 text-blue-600 checked:ring-blue-300 focus:ring-blue-300"
                          name="radio"
                          value="0"
                          checked=""
                        />
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="radio bg-red-600 text-red-600 checked:ring-red-300 focus:ring-red-300"
                          name="radio"
                          value="1"
                        />
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="radio bg-yellow-600 text-yellow-600 checked:ring-yellow-300 focus:ring-yellow-300"
                          name="radio"
                          value="2"
                        />
                      </label>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="radio bg-black text-black checked:ring-gray-400 focus:ring-gray-400"
                          name="radio"
                          value="3"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start gap-5">
                  <div className="quantity inline-flex rounded-lg bg-white shadow">
                    <input
                      className="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                      type="number"
                      value="0"
                    />
                    <div className="flex w-5 flex-col justify-between">
                      <button
                        className="quantity-btn increment text-primary"
                        type="button"
                      >
                        <i className="bi bi-caret-up-fill"></i>
                      </button>
                      <button
                        className="quantity-btn decrement text-primary"
                        type="button"
                      >
                        <i className="bi bi-caret-down-fill"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn-effect transition-all-300 flex h-full w-full items-center justify-center gap-2 rounded-lg bg-primary p-2"
                      type="submit"
                    >
                      <i className="bi bi-cart-fill flex text-xl text-white"></i>
                      <span className="font-bold uppercase text-white">
                        Add to cart
                      </span>
                    </button>
                    <a
                      className="tippy tippy-wishlist btn-wishlist transition-all-300 flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-2 hover:bg-primary-hover"
                      // href="javascript:void(0)"
                    >
                      <i className="bi bi-heart pointer-events-none flex text-white"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
            <div className="my-5 flex flex-col gap-2">
              <a
                className="btn-open-modal transition-all-300 rounded-lg border bg-slate-100 p-2 hover:bg-slate-200"
                // href="javascript:void(0)"
                data-target=".calculate-shipping-modal"
              >
                <div className="pointer-events-none flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <i className="bi bi-truck flex text-2xl text-primary"></i>
                    <span>Calculate Shipping Cost</span>
                  </div>
                  <i className="bi bi-arrow-right-short flex text-2xl text-primary"></i>
                </div>
              </a>
            </div>
            <div className="mt-5 border-t border-gray-200 pt-5">
              <div>
                <b>Categories: </b>
                <span>
                  <a href="#" className="text-zinc-500">
                    Hardware
                  </a>
                  ,
                  <a href="#" className="text-zinc-500">
                    Processors
                  </a>
                </span>
              </div>
              <div className="flex gap-2">
                <b>Share:</b>
                <div className="flex items-center gap-[10px]">
                  <a href="#">
                    <i className="bi bi-facebook transition-all-300 flex text-zinc-500 hover:text-primary"></i>
                  </a>
                  <a href="#">
                    <i className="bi bi-twitter transition-all-300 flex text-zinc-500 hover:text-primary"></i>
                  </a>
                  <a href="#">
                    <i className="bi bi-whatsapp transition-all-300 flex text-zinc-500 hover:text-primary"></i>
                  </a>
                  <a href="#">
                    <i className="bi bi-link-45deg transition-all-300 flex text-zinc-500 hover:text-primary"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="liner-container mb-5 flex border-b-2 border-[rgba(119,119,119,.17)]">
              <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-xl font-bold uppercase">
                Specifications
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Aplication:</b> Desktop
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b># of CPU cores:</b> 3.8GHz
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Total L3 cache:</b> 32MB
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b># of threads:</b> 12
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Total L1 cache:</b> 384KB
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>TDP/Default TDP:</b> 95W
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>CPU Socket:</b> AM4
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Temp. max:</b> 95°C
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Product line:</b> AMD Ryzen™ 5 Desktop Processors
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Max Magnification Clock:</b> Up to 4.4GHz
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Total L2 cache:</b> 3MB
                </span>
              </div>
              <div className="col-span-12 sm:col-span-1">
                <span>
                  <b>Gamer:</b> Yes
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="liner-container mb-5 flex border-b-2 border-[rgba(119,119,119,.17)]">
              <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-xl font-bold uppercase">
                Description
              </h1>
            </div>
            <div className="see-more relative pb-5">
              <div className="see-more-container gradient-bottom max-h-[220px] overflow-hidden">
                <div className="see-more-content">
                  <p>
                    Lorem Unde sapiente quisquam placeat excepturi sunt mollitia
                    vero cumque, aliquam libero ipsum dolor sit amet consectetur
                    adipisicing elit. Unde sapiente quisquam placeat excepturi
                    sunt mollitia vero cumque, aliquam libero veniam odit
                    inventore totam quis! Hic quis perferendis quaerat enim
                    magni.
                  </p>
                  <p>
                    Lorem Unde sapiente quisquam placeat excepturi sunt mollitia
                    vero cumque, aliquam libero ipsum dolor sit amet consectetur
                    adipisicing elit. Repellat culpa quidem reprehenderit dolor
                    aperiam, eius consequatur est deserunt. Nisi nesciunt
                    repellendus dolorem quam obcaecati atque animi quas debitis
                    qui harum.
                  </p>
                  <p>
                    Lorem Unde sapiente quisquam placeat excepturi sunt mollitia
                    vero cumque, aliquam libero ipsum, dolor sit amet
                    consectetur adipisicing elit. Aut, veritatis. Ea
                    voluptatibus eveniet, quam dicta quisquam repellat maxime
                    libero. Enim omnis quis, cumque facilis doloremque doloribus
                    tempore expedita quia accusantium.
                  </p>
                  <p>
                    Lorem Unde sapiente quisquam placeat excepturi sunt mollitia
                    vero cumque, aliquam libero ipsum dolor sit amet consectetur
                    adipisicing elit. Unde sapiente quisquam placeat excepturi
                    sunt mollitia vero cumque, aliquam libero veniam odit
                    inventore totam quis! Hic quis perferendis quaerat enim
                    magni.
                  </p>
                  <p>
                    Lorem Unde sapiente quisquam placeat excepturi sunt mollitia
                    vero cumque, aliquam libero ipsum dolor sit amet consectetur
                    adipisicing elit. Repellat culpa quidem reprehenderit dolor
                    aperiam, eius consequatur est deserunt. Nisi nesciunt
                    repellendus dolorem quam obcaecati atque animi quas debitis
                    qui harum.
                  </p>
                  <p>
                    Lorem Unde sapiente quisquam placeat excepturi sunt mollitia
                    vero cumque, aliquam libero ipsum, dolor sit amet
                    consectetur adipisicing elit. Aut, veritatis. Ea
                    voluptatibus eveniet, quam dicta quisquam repellat maxime
                    libero. Enim omnis quis, cumque facilis doloremque doloribus
                    tempore expedita quia accusantium.
                  </p>
                </div>
              </div>
              <button className="btn-see-more absolute bottom-0 z-10 flex w-full justify-center hover:text-primary">
                <i className="bi bi-chevron-compact-down text-stroke-medium transition-all-300 flex text-xl"></i>
              </button>
            </div>
          </div>
          <div className="col-span-12">
            <div className="tabs-container">
              <ul className="flex justify-between">
                <li
                  className="btn-tabs tab-active-1 transition-all-300 active w-full cursor-pointer bg-gray-200 p-2 text-center text-gray-400"
                  onClick={handleCommentClick}
                >
                  Comments
                </li>
                <li
                  onClick={handleReviewClick}
                  className="btn-tabs tab-active-1 transition-all-300 w-full cursor-pointer bg-gray-200 p-2 text-center text-gray-400"
                >
                  Reviews
                </li>
              </ul>
              <div className="tabs-content mt-5">
                {/* Modal Comentarios */}
                {commentModalIsOpen && (
                  <div className="tab-content active absolute w-full ">
                    {/* <div className="tab-content active invisible absolute w-full opacity-0"> */}
                    <div className="flex gap-5">
                      <div className="hidden h-14 w-14 min-w-[3.5rem] overflow-hidden rounded-full shadow-md sm:block">
                        <img
                          className="h-full w-full object-cover"
                          src="images/comments/profile_1.png"
                          alt="profile_logo"
                        />
                      </div>
                      <form className="w-full">
                        <div className="h-20">
                          <textarea
                            className="input resize-none"
                            placeholder="Add a comment..."
                            required=""
                          ></textarea>
                        </div>
                        <button
                          className="btn-effect mt-2 rounded-lg bg-primary p-2 font-bold text-white"
                          type="submit"
                        >
                          <span>Comment</span>
                        </button>
                      </form>
                    </div>
                    <form className="my-5 flex flex-col xs:flex-row xs:items-center xs:justify-between">
                      <span className="text-lg font-bold uppercase">
                        Comments
                      </span>
                      <select
                        className="nice-select select order-by"
                        style={{ display: "none" }}
                      >
                        <option value="0">Most recent</option>
                        <option value="1">Oldest</option>
                      </select>
                      <div className="nice-select select order-by">
                        <span className="current">Order by</span>
                        <div className="nice-select-dropdown">
                          <ul className="list">
                            <li data-value="0" className="option null">
                              Most recent
                            </li>
                            <li data-value="1" className="option null">
                              Oldest
                            </li>
                          </ul>
                        </div>
                      </div>
                    </form>
                    <div className="mt-5 flex gap-5">
                      <div className="hidden h-14 w-14 min-w-[3.5rem] overflow-hidden rounded-full shadow-md sm:block">
                        <img
                          className="h-full w-full object-cover"
                          src="images/comments/profile_1.png"
                          alt="profile_logo"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <a className="font-bold hover:text-primary" href="#">
                            John Doe
                          </a>
                          <span className="text-xs text-slate-400">
                            2 feb. 11:28am
                          </span>
                        </div>
                        <p className="my-2">
                          Hello, how are you? I am interested in the product. Is
                          there stock available?
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex cursor-pointer items-center gap-1 text-sm text-slate-500 hover:text-primary">
                            <i className="bi bi-reply-fill flex"></i>
                            <span>Reply</span>
                          </div>
                          <div className="flex cursor-pointer items-center gap-1 text-sm text-slate-500 hover:text-primary">
                            <i className="bi bi-pencil-square flex"></i>
                            <span>Edit</span>
                          </div>
                        </div>
                        <div className="mt-5 flex gap-5">
                          <div className="hidden h-14 w-14 min-w-[3.5rem] overflow-hidden rounded-full shadow-md sm:block">
                            <img
                              className="h-full w-full object-cover"
                              src="images/comments/profile_2.png"
                              alt="profile_logo"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <a
                                className="font-bold text-blue-400 hover:text-primary"
                                href="#"
                              >
                                Megabyte
                              </a>
                              <span className="text-xs text-slate-400">
                                Just now
                              </span>
                            </div>
                            <small className="flex items-center gap-1 text-slate-400">
                              <i className="bi bi-reply-fill flex"></i>
                              Responding to
                              <a className="hover:text-primary" href="#">
                                John Doe
                              </a>
                            </small>
                            <p className="my-2">
                              Hi John Doe! If there is stock available, any
                              other questions please feel free to contact us,
                              have a nice day.
                            </p>
                            <div className="flex items-center gap-3">
                              <div className="flex cursor-pointer items-center gap-1 text-sm text-slate-500 hover:text-primary">
                                <i className="bi bi-reply-fill flex"></i>
                                <span>Reply</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Modal Reviews */}
                {reviewModalIsOpen && (
                  <div className="tab-content  absolute w-full bg-white">
                    <div className="my-5 flex flex-col items-center justify-center gap-5 sm:flex-row">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-5xl">4,0</span>
                        <div className="flex">
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-gray-200"></i>
                        </div>
                        <span className="flex items-center gap-1">
                          <i className="bi bi-chat-quote flex"></i> 93 Reviews
                        </span>
                      </div>
                      <div className="w-full max-w-[600px]">
                        <div className="my-2 flex items-center gap-2">
                          <span>5</span>
                          <div className="relative h-5 w-full overflow-hidden rounded bg-primary-rgba">
                            <div className="absolute left-0 top-0 h-full w-[50%] rounded bg-primary"></div>
                          </div>
                        </div>
                        <div className="my-2 flex items-center gap-2">
                          <span>4</span>
                          <div className="relative h-5 w-full overflow-hidden rounded bg-primary-rgba">
                            <div className="absolute left-0 top-0 h-full w-[40%] rounded bg-primary"></div>
                          </div>
                        </div>
                        <div className="my-2 flex items-center gap-2">
                          <span>3</span>
                          <div className="relative h-5 w-full overflow-hidden rounded bg-primary-rgba">
                            <div className="absolute left-0 top-0 h-full w-[30%] rounded bg-primary"></div>
                          </div>
                        </div>
                        <div className="my-2 flex items-center gap-2">
                          <span>2</span>
                          <div className="relative h-5 w-full overflow-hidden rounded bg-primary-rgba">
                            <div className="absolute left-0 top-0 h-full w-[20%] rounded bg-primary"></div>
                          </div>
                        </div>
                        <div className="my-2 flex items-center gap-2">
                          <span>1</span>
                          <div className="relative h-5 w-full overflow-hidden rounded bg-primary-rgba">
                            <div className="absolute left-0 top-0 h-full w-[10%] rounded bg-primary"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="hidden h-14 w-14 min-w-[3.5rem] overflow-hidden rounded-full shadow-md sm:block">
                        <img
                          className="h-full w-full object-cover"
                          src="images/comments/profile_1.png"
                          alt="profile_logo"
                        />
                      </div>
                      <form
                        className="form-review flex w-full flex-col gap-2"
                        method="GET"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm uppercase">
                            Your Valoration:
                          </span>
                          <div
                            id="rater"
                            className="star-rating"
                            style={{
                              width: "160px",
                              height: "32px",
                              backgroundSize: "32px",
                            }}
                          >
                            <div
                              className="star-value"
                              style={{ backgroundSize: "32px", width: "0px" }}
                            ></div>
                          </div>
                          <input
                            name="ratingvalue"
                            className="rating-value hidden"
                            type="number"
                            // value=""
                          />
                        </div>
                        <div className="h-20">
                          <textarea
                            name="reviewvalue"
                            className="input resize-none"
                            placeholder="Add a review..."
                            required=""
                          ></textarea>
                        </div>
                        <div>
                          <button
                            className="btn-effect rounded-lg bg-primary p-2 font-bold text-white"
                            type="submit"
                          >
                            <span>Post review</span>
                          </button>
                        </div>
                      </form>
                    </div>
                    <form className="my-5 flex flex-col xs:flex-row xs:items-center xs:justify-between">
                      <span className="text-lg font-bold uppercase">
                        Reviews
                      </span>
                      <select
                        className="nice-select select order-by"
                        style={{ display: "none" }}
                      >
                        <option value="0">Most recent</option>
                        <option value="1">Oldest</option>
                        <option value="2">5 ★</option>
                        <option value="3">4 ★</option>
                        <option value="4">3 ★</option>
                        <option value="5">2 ★</option>
                        <option value="6">1 ★</option>
                      </select>
                      <div className="nice-select select order-by" tabIndex="0">
                        <span className="current">Order by</span>
                        <div className="nice-select-dropdown">
                          <ul className="list">
                            <li data-value="0" className="option null">
                              Most recent
                            </li>
                            <li data-value="1" className="option null">
                              Oldest
                            </li>
                            <li data-value="2" className="option null">
                              5 ★
                            </li>
                            <li data-value="3" className="option null">
                              4 ★
                            </li>
                            <li data-value="4" className="option null">
                              3 ★
                            </li>
                            <li data-value="5" className="option null">
                              2 ★
                            </li>
                            <li data-value="6" className="option null">
                              1 ★
                            </li>
                          </ul>
                        </div>
                      </div>
                    </form>
                    <div className="mt-5 flex gap-5">
                      <div className="hidden h-14 w-14 min-w-[3.5rem] overflow-hidden rounded-full shadow-md sm:block">
                        <img
                          className="h-full w-full object-cover"
                          src="images/comments/profile_1.png"
                          alt="profile_logo"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <a className="font-bold hover:text-primary" href="#">
                            John Doe
                          </a>
                          <span className="text-xs text-slate-400">
                            2 feb. 11:28am
                          </span>
                        </div>
                        <div className="flex">
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-star"></i>
                          <i className="bi bi-star-fill flex text-base text-gray-200"></i>
                        </div>
                        <p className="my-2">
                          Everything perfect, the product arrived impeccable and
                          I had no problem, very satisfied.
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex cursor-pointer items-center gap-1 text-sm text-slate-500 hover:text-primary">
                            <i className="bi bi-pencil-square flex"></i>
                            <span>Edit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
