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

import ContentLoader from "react-content-loader"; // Loader
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//? test img
import test_product1 from "../../assets/test_product1.png";
import test_product2 from "../../assets/test_product2.png";
import test_product3 from "../../assets/test_product3.png";
import { apiUrl } from "../../utils/config";
//----------------------------------------

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
  const [charactModalIsOpen, setCharactModalIsOpen] = useState(true);

  const [product, setProduct] = useState({
    contenido: [{ ficha: "Cargando" }],
  });
  console.log("🚀 ~ Details ~ product:", product)
  // ---- HOOKS ----

  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
        `${apiUrl}/users/get-token`,
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

  //* ----- GET Producto -------------
  async function getProductId() {
    try {
      const response = await axios.get(`${apiUrl}/productos/${id}`);
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
  // ----- GET Productos -------------

  //* ------- USE EFFECTS ------
  useEffect(() => {
    fetchToken();
    getProductId();
  }, []);
  // -------- USE EFFECTS ------

  //* ---- HANDLES ----

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
        `${apiUrl}/users/get-token`,
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
      const responseCart = await axios.post(`${apiUrl}/carrito/carrito`, {
        userId: userId,
        productId: id,
        quantity: count,
      });

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

  //? --- Loader ---
  const LoaderFicha = (props) => (
    <ContentLoader 
      speed={2}
      width={500}
      height={350}
      viewBox="0 0 500 350"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="16" y="34" rx="3" ry="3" width="98" height="11" /> 
      <rect x="17" y="7" rx="3" ry="3" width="161" height="11" /> 
      <rect x="200" y="7" rx="3" ry="3" width="298" height="11" /> 
      <rect x="17" y="59" rx="3" ry="3" width="161" height="11" /> 
      <rect x="19" y="86" rx="3" ry="3" width="98" height="11" /> 
      <rect x="197" y="34" rx="3" ry="3" width="298" height="11" /> 
      <rect x="197" y="59" rx="3" ry="3" width="298" height="11" /> 
      <rect x="195" y="86" rx="3" ry="3" width="298" height="11" /> 
      <rect x="19" y="153" rx="3" ry="3" width="98" height="11" /> 
      <rect x="20" y="126" rx="3" ry="3" width="161" height="11" /> 
      <rect x="203" y="126" rx="3" ry="3" width="298" height="11" /> 
      <rect x="20" y="178" rx="3" ry="3" width="161" height="11" /> 
      <rect x="22" y="205" rx="3" ry="3" width="98" height="11" /> 
      <rect x="200" y="153" rx="3" ry="3" width="298" height="11" /> 
      <rect x="200" y="178" rx="3" ry="3" width="298" height="11" /> 
      <rect x="198" y="205" rx="3" ry="3" width="298" height="11" /> 
      <rect x="22" y="267" rx="3" ry="3" width="98" height="11" /> 
      <rect x="23" y="240" rx="3" ry="3" width="161" height="11" /> 
      <rect x="206" y="240" rx="3" ry="3" width="298" height="11" /> 
      <rect x="23" y="292" rx="3" ry="3" width="161" height="11" /> 
      <rect x="25" y="319" rx="3" ry="3" width="98" height="11" /> 
      <rect x="203" y="267" rx="3" ry="3" width="298" height="11" /> 
      <rect x="203" y="292" rx="3" ry="3" width="298" height="11" /> 
      <rect x="201" y="319" rx="3" ry="3" width="298" height="11" />
    </ContentLoader>
  )

  const LoaderDescription = (props) => (
    <ContentLoader 
    speed={2}
    width={500}
    height={100}
    viewBox="0 0 500 100"
    backgroundColor="#dedede"
    foregroundColor="#919191"
    {...props}
  >
    <rect x="16" y="34" rx="3" ry="3" width="98" height="11" /> 
    <rect x="17" y="7" rx="3" ry="3" width="161" height="11" /> 
    <rect x="200" y="7" rx="3" ry="3" width="298" height="11" /> 
    <rect x="17" y="59" rx="3" ry="3" width="161" height="11" /> 
    <rect x="19" y="86" rx="3" ry="3" width="98" height="11" /> 
    <rect x="197" y="34" rx="3" ry="3" width="298" height="11" /> 
    <rect x="197" y="59" rx="3" ry="3" width="298" height="11" /> 
    <rect x="195" y="86" rx="3" ry="3" width="298" height="11" />
  </ContentLoader>
  )

  const LoaderTitle = (props) => (
    <ContentLoader 
      speed={2}
      width={400}
      height={30}
      viewBox="0 0 400 30"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="163" y="6" rx="3" ry="3" width="67" height="21" /> 
      <rect x="15" y="6" rx="3" ry="3" width="140" height="21" /> 
      <rect x="241" y="6" rx="3" ry="3" width="140" height="21" />
    </ContentLoader>
  )

  const LoaderImages = (props) => (
    <ContentLoader 
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="43" y="50" rx="2" ry="2" width="305" height="238" /> 
      <rect x="12" y="310" rx="0" ry="0" width="111" height="100" /> 
      <rect x="267" y="310" rx="0" ry="0" width="111" height="100" /> 
      <rect x="138" y="310" rx="0" ry="0" width="111" height="100" />
    </ContentLoader>
  )
  //  --- Loader ---

  return (
    <div className="flex min-h-full flex-col bg-body font-poppins text-txt bg-gray-100">
      <div className="product-details container mx-auto my-5 px-2 sm:px-8">
        {/* Mostrar el email del usuario logeado */}

        <div className="grid grid-cols-12 gap-5 rounded-lg bg-white p-2 xs:p-8">
          {/* SWIPER */}
          {product.id?<div className="col-span-12 h-auto md:col-span-6">
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
          :
          //? Loader Images
          <div className="col-span-12 h-auto md:col-span-6 ">
            <LoaderImages className='flex justify-center m-auto h-auto w-3/6 '/>
          </div>}
          
          <div className="col-span-12 md:col-span-6 ">
            {/* Titulo Producto */}
            <div className="my-1">
              <a
                className="clamp-2 transition-all-300 break-all text-2xl font-medium hover:text-primary"
                href="#"
              >
                {product?.nombre_ingles || product?.nombre_es || <LoaderTitle className='w-4/6'/>}
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
            {product.id? (
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
                </p>
              </div>
            ):
                    <LoaderDescription className='w-2/3 '/>
            }
            <div className="flex gap-1">
              <form action="#" onClick={handleFormSubmit}>
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
                      className={`btn-effect transition-all-300 flex h-full w-full items-center justify-center gap-2 rounded-lg p-2 ${
                        count === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-primary"
                      }`}
                      type="button"
                      onClick={addToCart}
                      disabled={count === 0}
                    >
                      <i className="bi bi-cart-fill flex text-xl text-white"></i>
                      <span className="font-bold uppercase text-white">
                        Add to cart
                      </span>
                    </button>
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
