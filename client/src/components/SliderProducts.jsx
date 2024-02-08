import React, { useEffect, useState } from "react";
import { CardProduct } from "./CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export const SliderProducts = ({ products }) => {
  const [slidesPerView, setSlidesPerView] = useState(4); // Valor predeterminado para dispositivos no móviles

  useEffect(() => {
    const handleResize = () => {
      // Ajusta slidesPerView dependiendo del ancho de la ventana
      if (window.innerWidth < 768) {
        setSlidesPerView(1); // Para dispositivos móviles, muestra solo una imagen por vista
      } else {
        setSlidesPerView(4); // Para otros dispositivos, muestra 4 imágenes por vista
      }
    };

    // Agregar event listener para detectar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Llama a handleResize una vez para ajustar el valor inicial
    handleResize();

    // Eliminar event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={false}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      slidesPerView={slidesPerView} // Usa el estado slidesPerView
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper px-10"
    >
      {products?.map((prod, index) => (
        <SwiperSlide key={index}>
          <CardProduct
            id={prod?.id}
            off={prod?.oferta_id}
            img={prod?.imagen}
            stars={prod?.stars}
            stock={prod?.stock}
            title={prod?.nombre_ingles ? prod?.nombre_ingles : prod?.nombre_es}
            description={prod?.description}
            price={prod?.precio_base}
            priceOff={prod?.priceOff}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
