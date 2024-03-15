import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TestProdObj from "../TestProdObj";
import axios from "axios";
import { Paginado } from "../Paginado";
import { apiUrl } from "../../utils/config";
import ContentLoader from "react-content-loader";

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
    setProducSearchs({})
    getProducts(id);
  }, [id]);
  // ----- USE EFFECTs ----

  //* ---- Get Products by search ----
  async function getProducts(id, page = 1) {
    try {
      const response = await axios(
        `${apiUrl}/productos?name=${id}&page=${page}`
      );
      setProducSearchs(response.data);
      setPaginationData(response.data.info);
    } catch (error) {
      setProducSearchs({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  // ---- Get Products by search ----
  console.log("🚀 ~ SearchProducts ~ paginationData:", paginationData);

  //? --- Loader ---
  const LoaderProduct = (props) => (
    <ContentLoader
      speed={2}
      width={700}
      height={130}
      viewBox="-4 -20 700 130"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="140" y="55" rx="3" ry="3" width="52" height="20" />
      <rect x="1" y="1" rx="2" ry="2" width="97" height="85" />
      <rect x="114" y="55" rx="3" ry="3" width="22" height="20" />
      <rect x="113" y="4" rx="4" ry="4" width="283" height="18" />
      <rect x="113" y="27" rx="4" ry="4" width="159" height="14" />
    </ContentLoader>
  );
  //  --- Loader ---

  return (
    <div className="m-20 max-w-[1500px] ">
      {/* encabezado */}
      <div className="bg-gray-100 transition-colors bg-gradient-to-r from-slate-100 to-white ml-2">
        <span className="text-3xl ml-4 font-semibold ">{id}</span>
      </div>
      {/* Container Filtro y productos */}
      <div className="flex">
        {/* Filtros */}
        <div className="bg-gray-300 h-[800px] m-2 lg:w-[300px] rounded-sm">
          Filtros
        </div>

        {/* Productos */}
        <div className=" h-auto w-full curs mt-2">
          {!producSearchs.message && producSearchs.data
            ? producSearchs?.data?.map((product, index) => (
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
              ))
            : !producSearchs.data && !producSearchs.message && 
              Array.from({ length: 5 }).map((_, index) => (
                <LoaderProduct
                  key={index}
                  className="border-b-2 border-gray-200"
                />
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
