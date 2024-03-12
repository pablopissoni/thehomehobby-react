import React from "react";

import Quill from "quill/core"; // Quill JS
import "quill/dist/quill.snow.css"; // Quill JS

import ReactQuill from "react-quill"; // Quill React
import "react-quill/dist/quill.snow.css"; // Quill React
import "react-quill/dist/quill.bubble.css"; // Quill React
import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";
import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";

// Dompurify
import DOMPurify from "dompurify";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

// Importa react-modal
// import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//? test img
import test_product1 from "../../assets/test_product1.png";
import test_product2 from "../../assets/test_product2.png";
import test_product3 from "../../assets/test_product3.png";

export const Details = () => {
  //* ---- HOOKS ----
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const [valueHTML, setValueHTML] = useState({
    descripcion: "Cargando",
    ficha: "Cargando",
  });
  const [thumbsSwiper, setThumbsSwiper] = useState(null); //Swiper

  // Define el estado para controlar la apertura/cierre de los modales
  const [commentModalIsOpen, setCommentModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [charactModalIsOpen, setCharactModalIsOpen] = useState(false);

  const [product, setProduct] = useState({
    contenido: [{ ficha: "Cargando" }],
  });
  // product?.contenido[0]?.ficha
  // ---- HOOKS ----

  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log(
          "No se encontró un token de acceso en el almacenamiento local."
        );
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3001/users/get-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Extraer el email del usuario de la respuesta
        const userEmail = response.data?.data?.UserAttributes.find(
          (attr) => attr.Name === "email"
        )?.Value;
        console.log("Email del usuario logeado:", userEmail);
        // Actualizar el estado con el email del usuario
        setUserEmail(userEmail);
      } catch (error) {
        console.error("Error al obtener el token del servidor:", error);
      }
    };

    fetchToken();
  }, []);

  //* ----- GET Producto -------------
  async function getProductId() {
    try {
      const isLocalhost = window.location.href.includes("localhost");
      const urlDetailsId = isLocalhost
        ? `http://localhost:3001/productos/${id}`
        : `https://thehomehobby-react.onrender.com/productos/${id}`;

      const response = await axios.get(urlDetailsId);
      setProduct(response.data[0]); // Solo el primer objeto encontrado
      {
        /*console.log("response.data[0]", response.data[0]);*/
      }

      // Ficha y Descripcion HTML en Español e Ingles
      //! la base de datos no respeta el orden de idioma
      const fichaES = response.data[0]?.contenido[0]?.ficha;
      const fichaEN = response.data[0]?.contenido[1]?.ficha;
      const descripcionES = response.data[0]?.contenido[0]?.descripcion;
      const descripcionEN = response.data[0]?.contenido[1]?.descripcion;
      setValueHTML({
        spanish: {
          ficha: fichaES,
          descripcion: descripcionES,
        },
        english: {
          ficha: fichaEN,
          descripcion: descripcionEN,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  // console.log("🚀 ~ PRODUCT: >>", product);

  // ----- GET Productos -------------

  //* ------- USE EFFECTS ------
  useEffect(() => {
    getProductId();
    // console.log("🚀 ~ Details ~ product:", product);
  }, []);
  // -------- USE EFFECTS ------

  {
    /*console.log("🚀 valueHTML:>> ", valueHTML); */
  }

  //* ---- HANDLES ----
  const handleCommentClick = () => {
    setCommentModalIsOpen(true);
    setReviewModalIsOpen(false);
    //console.log("🚀 ~ Details ~ commentModalIsOpen:", commentModalIsOpen);
  };

  const handleReviewClick = () => {
    setCommentModalIsOpen(false);
    setReviewModalIsOpen(true);
    //console.log("🚀 ~ Details ~ reviewModalIsOpen:", reviewModalIsOpen);
  };
  //? test array img
  // const test_img = [test_product1, test_product2, test_product3];

  // handleSubmit Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log("Form Submitted");
  };
  // ---- HANDLES ----

  // Limpio con Dompurify
  const fichaEnHTML = DOMPurify.sanitize(valueHTML?.english?.ficha, {
    USE_PROFILES: { html: true },
  });
  const fichaEsHTML = DOMPurify.sanitize(valueHTML?.spanish?.ficha, {
    USE_PROFILES: { html: true },
  });
  const descripcionEnHTML = DOMPurify.sanitize(
    valueHTML?.english?.descripcion,
    { USE_PROFILES: { html: true } }
  );
  const descripcionEsHTML = DOMPurify.sanitize(
    valueHTML?.spanish?.descripcion,
    { USE_PROFILES: { html: true } }
  );

  //* ---- QUILL REACT ----

  // ---- QUILL REACT ----

  //* ---- QUILL HTML ----
  // Quill.register({
  //   "modules/toolbar": Toolbar,
  //   "themes/snow": Snow,
  //   "formats/bold": Bold,
  //   "formats/italic": Italic,
  //   "formats/header": Header,
  // });

  // var quill = new Quill("#editor", {
  //   theme: "snow",
  // });

  // Pasar el contenido HTML al editor Quill
  // quill.root.innerHTML = product?.contenido[0]?.ficha; //! al agregar se rompe porque parece leerlo antes de cargar la peticion
  // ---- QUILL HTML ----

  const addToCart = async () => {
    try {
      // Obtener el userId del usuario logeado
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log(
          "No se encontró un token de acceso en el almacenamiento local."
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/users/get-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userId = response.data?.data?.mysqlUsers[0]?.id;

      // Si no se puede obtener el userId, mostrar un mensaje de error
      if (!userId) {
        console.error("No se pudo obtener el userId del usuario logeado.");
        return;
      }

      // Enviar la solicitud al servidor
      const responseCart = await axios.post(
        "http://localhost:3001/carrito/carrito",
        {
          userId: userId,
          productId: id,
        }
      );

      // Mostrar mensaje en la consola indicando si el producto se agregó correctamente al carrito
      console.log(
        "Producto agregado al carrito exitosamente:",
        responseCart.data
      );

      // Mostrar un alert informando al usuario que el producto se agregó al carrito exitosamente
      alert("¡El producto se ha agregado al carrito exitosamente!");
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      console.error("Error al agregar el producto al carrito:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-body font-poppins text-txt bg-gray-100">
      <div className="product-details container mx-auto my-5 px-2 sm:px-8">
        {/* Mostrar el email del usuario logeado */}
        <p>Email del usuario logeado: {userEmail}</p>

        <div className="grid grid-cols-12 gap-5 rounded-lg bg-white p-2 xs:p-8">
          {/* SWIPER */}
          <div className="col-span-12 h-auto md:col-span-6">
            {/* Swiper Grande */}
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2 w-auto h-72 mb-2"
            >
              {/* img principal */}
              <SwiperSlide>
                <img
                  className=" w-full h-full object-contain  "
                  src={product?.imagen}
                />
              </SwiperSlide>
              {/* video */}
              {product?.video && (
                <SwiperSlide>
                  <video className="w-full h-full object-cover" controls>
                    <source src={product?.video} type="video/mp4" />
                    Tu navegador no admite el elemento de video.
                  </video>
                </SwiperSlide>
              )}
              {/* galeria img */}
              {product?.galeria?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="w-full h-full object-contain "
                    src={img.url}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Swiper Miniaturas */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              // navigation={true}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper max-w-[400px]"
            >
              <SwiperSlide>
                <img src={product?.imagen} />
              </SwiperSlide>
              {/* video */}
              {product?.video && (
                <SwiperSlide>
                  <video
                    className="w-full h-full object-contain "
                    controls={false}
                  >
                    <source src={product?.video} type="video/mp4" />
                    Tu navegador no admite el elemento de video.
                  </video>
                </SwiperSlide>
              )}
              {product?.galeria?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img.url} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-span-12 md:col-span-6">
            {/* Titulo Producto */}
            <div className="my-1">
              <a
                className="clamp-2 transition-all-300 break-all text-2xl font-medium hover:text-primary"
                href="#"
              >
                {product?.nombre_ingles || product?.nombre_es}
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
            {/* --- Precios --- */}
            <div className="my-5 flex items-center gap-5">
              <div className="flex rounded-lg bg-white px-3 py-2 text-primary shadow">
                <span className="text-sm">$</span>
                <span className="text-2xl font-semibold leading-7">
                  {product?.precio_base}
                </span>
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
            {/* --- Mini Descripcion --- */}
            {product && (
              <div className="my-4">
                <p
                  // dangerouslySetInnerHTML={{ __html: product?.contenido[0]?.descripcion }}
                  className="clamp-5 break-all"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: descripcionEnHTML || descripcionEsHTML,
                    }}
                  />
                  {/* Mini Descripcion aqui con dangerouslySetInnerHTML */}
                  {/* <ReactQuill
                    theme="bubble"
                    value={valueHTML?.english?.descripcion || valueHTML?.espanish?.descripcion}
                    placeholder="loading description..."
                    readOnly={true}
                    // onChange={setValueHTML}
                    className="h-full"
                  /> */}
                </p>
              </div>
            )}
            <div className="flex gap-1">
              <form action="#" onClick={handleFormSubmit}>
                <div className="block">
                  {/* <div className="my-3 flex flex-col gap-1">
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
                  </div> */}
                  {/* <div className="my-3 flex gap-2">
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
                  </div> */}
                </div>
                <div className="flex flex-wrap justify-start gap-5">
                  <div className="quantity inline-flex rounded-lg bg-white shadow">
                    <input
                      className="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                      type="number"
                      value={count}
                    />
                    <div className="flex w-5 flex-col justify-between">
                      <button
                        className="quantity-btn increment text-primary"
                        type="button"
                        onClick={() => setCount(count + 1)}
                      >
                        <i className="bi bi-caret-up-fill"></i>
                      </button>
                      <button
                        className="quantity-btn decrement text-primary"
                        type="button"
                        onClick={count > 0 ? () => setCount(count - 1) : null}
                      >
                        <i className="bi bi-caret-down-fill"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn-effect transition-all-300 flex h-full w-full items-center justify-center gap-2 rounded-lg bg-primary p-2"
                      type="button"
                      onClick={addToCart}
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
                characteristic
              </h1>
            </div>
            <div className="see-more relative pb-5 h-auto bg-slate-50">
              {charactModalIsOpen && (
                <div className="see-more-container gradient-bottom h-auto ">
                  <div className="h-auto ">
                    {/* VARIABLE DESCRIPCION AQUI CON dangerouslySetInnerHTML */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: fichaEnHTML || fichaEsHTML,
                      }}
                    />
                  </div>
                </div>
              )}
              <button
                className="btn-see-more absolute bottom-0 z-10 flex w-full justify-center hover:text-primary"
                onClick={() => setCharactModalIsOpen(!charactModalIsOpen)}
              >
                <i
                  className={`bi bi-chevron-compact-down transition-transform duration-300 flex text-3xl  ${
                    charactModalIsOpen ? "rotate-180" : "animate-bounce"
                  }`}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
