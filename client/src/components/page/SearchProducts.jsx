import React from "react";
import { useLocation } from "react-router-dom";
import TestProdObj from "../TestProdObj";

export const SearchProducts = () => {
  const location = useLocation();
  console.log("🚀 ~ SearchProducts ~ location:", location);
  const searchPathName = new URLSearchParams(location.pathname);
  const searchTerm = searchPathName.get("product");
  console.log("🚀 ~ SearchProducts ~ searchTerm:", searchTerm);

  return (
    <div className="m-20 max-w-[1500px]">
      {/* encabezado */}
      <div className="bg-gray-200 ">
        <span>Lavarropas</span>
      </div>
      {/* Container Filtro y productos */}
      <div className="flex">
        {/* Filtros */}
        <div className="bg-gray-300 h-[800px] lg:w-[300px]">Filtros</div>
        {/* Productos */}
        <div className=" h-auto w-full shadow-xl">
          {TestProdObj.map((product, index) => (
            <div
              className="flex border-b py-4 pl-4 border-gray-200 "
              key={index}
            >
                <div className="w-[160px] h-[160px]">
              <img
                className="w-[160px] h-[160px] object-contain"
                src={product.img}
                alt=""
              />
                </div>
              <div className="ml-4 flex flex-col w-full ">
                <h3 className="lg:text-2xl font-light">
                    {product.title}
                </h3>
                <span className="lg:text-lg font-semibold mt-3">
                  $ {product.price}
                </span>
                <span className="bg-green-200 text-green-800 w-[100px] mt-3 text-center rounded-md">
                  Envio gratis
                </span>
                <span className="text-sm font-extralight flex justify-end mr-8">
                  stock: 999
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
