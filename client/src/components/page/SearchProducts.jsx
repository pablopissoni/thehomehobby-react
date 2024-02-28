import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TestProdObj from "../TestProdObj";
import axios from "axios";
import { Paginado } from "../Paginado";

export const SearchProducts = () => {
  //* ---- HOOKs ----
  const { id } = useParams();
  const [producSearchs, setProducSearchs] = useState({});
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalItems: null,
    totalPages: null,
  });

  // ---- HOOKs ----

  //* ---- USE EFFECTs ----
  useEffect(() => {
    getProducts(id);
  }, [id]);
  // ----- USE EFFECTs ----

  //* ---- Get Products by search ----
  async function getProducts(id, page = 1) {
    const isLocal = window.location.href.includes("localhost");
    const urlGetProductsId = isLocal
      ? `http://localhost:3001/productos?name=${id}&page=${page}`
      : `https://thehomehobby-react.onrender.com/productos?name=${id}&page=${page}`;
    try {
      const response = await axios(urlGetProductsId);
      setProducSearchs(response.data);
      setPaginationData(response.data.info);
    } catch (error) {
      setProducSearchs({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  console.log("🚀 ~ SearchProducts ~ paginationData:", paginationData);

  // ---- Get Products by search ----
  return (
    <div className="m-20 max-w-[1500px] border border-red-400">
      {/* encabezado */}
      <div className="bg-gray-200 ml-2">
        <span>Lavarropas</span>
      </div>
      {/* Container Filtro y productos */}
      <div className="flex">
        {/* Filtros */}
        <div className="bg-gray-300 h-[800px] m-2 lg:w-[300px] rounded-sm">
          Filtros
        </div>
        {/* Productos */}
        <div className=" h-auto w-full curs mt-2">
          {!producSearchs.message &&
            producSearchs?.data?.map((product, index) => (
              <div
                className="flex py-4 pl-4 border-b-2 border-gray-200 transition-transform duration-300 hover:scale-[1.02]"
                key={index}
              >
                <div className="w-[160px] h-[160px]">
                  <Link to={`/details/${product.id}`}>
                    <img
                      className="w-[160px] h-[160px] object-contain cursor-pointer"
                      src={product.imagen}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="ml-4 flex flex-col w-full">
                  <Link to={`/details/${product.id}`}>
                    <h3 className="lg:text-2xl font-light">
                      {product?.nombre_ingles || product?.nombre_es}
                    </h3>
                  </Link>
                  <span className="lg:text-lg font-semibold mt-3">
                    $ {product?.precio_base}
                  </span>
                  <span className="bg-green-200 text-green-800 w-[100px] mt-3 text-center rounded-md">
                    Envio gratis
                  </span>
                  {/* <span className="text-sm font-extralight flex justify-end mr-8">
                    stock: 999
                  </span> */}
                </div>
              </div>
            ))}

          {/* No hay productos */}
          {producSearchs.message && (
            <div className="flex border-b py-4 pl-4 border-gray-200 justify-center  xl:text-xl">
              No products found
            </div>
          )}
        </div>
      </div>
      <div>
        <Paginado
          getProducts={getProducts}
          id={id}
          paginationData={paginationData}
        />
      </div>
    </div>
  );
};
