import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import TestProdObj from "../TestProdObj";
import axios from "axios";
import { Paginado } from "../Paginado";
import { apiUrl } from "../../utils/config";

export const ProdByCards = () => {
  //* ---- HOOKs ----
  const { id } = useParams();
  const location = useLocation()
  console.log("🚀 ~ ProdByCards ~ location:", location)
  const [prodBySubCate, setProdBySubCate] = useState({});
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
    getProdBySubCategory(id)
  }, [id]);
  // ----- USE EFFECTs ----

  //* ---- Get Products by search ----
  async function getProdBySubCategory(id, page = 1) {
    try {
      const response = await axios(`${apiUrl}/prodbysubcategory?id=${id}&page=${page}`);
      // const response = await axios(urlGetProdBySubCate);
      setProdBySubCate(response.data);
      setPaginationData(response.data.info);
      
    } catch (error) {
      setProdBySubCate({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  // ---- Get Products by search ----
  
  console.log("🚀 ~ paginationData:", paginationData);
  console.log("🚀 ~ ProdByCards ~ prodBySubCate:", prodBySubCate)


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
          {!prodBySubCate.message &&
            prodBySubCate?.data?.map((product, index) => (
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
          {prodBySubCate.message && (
            <div className="flex border-b py-4 pl-4 border-gray-200 justify-center  xl:text-xl">
              No products found
            </div>
          )}
        </div>
      </div>
      <div>
        <Paginado
          getProducts={getProdBySubCategory}
          id={id}
          paginationData={paginationData}
        />
      </div>
    </div>
  );
};