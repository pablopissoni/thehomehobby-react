import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import TestProdObj from "../TestProdObj";
import axios from "axios";
import { Paginado } from "../Paginado";
import { apiUrl } from "../../utils/config";

export const ProdByCards = ({resourceType}) => {
  console.log("🚀 ~ ProdByCards ~ resourceType:", resourceType)
  //* ---- HOOKs ----
  const { id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nameSubCategory = query.get("subcate"); // obtengo el valor de la query "subcate"
  const nameBrand = query.get("brand"); // obtengo el valor de la query "brand"
  console.log("🚀 ~ ProdByCards ~ nameBrand:", nameBrand)

  const [products, setProducts] = useState({});
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
    if (resourceType === "brand") {
      getProdByMarca(id);
    } else if (resourceType === "category") {
      getProdBySubCategory(id);
    }
  }, [id]);
  // ----- USE EFFECTs ----

  //* ----------- GETs ------------
  async function getProdByMarca(id, page = 1) {
    try {
      const response = await axios(
        `${apiUrl}/prodbymarca?id=${id}&page=${page}`
        );
        setProducts(response.data); // Se comporta como productos de una Marca
        setPaginationData(response.data.info);

    } catch (error) {
      setProducts({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  //* Get Products by SubCategory
  async function getProdBySubCategory(id, page = 1) {
    try {
      const response = await axios(
        `${apiUrl}/prodbysubcategory?id=${id}&page=${page}`
        );
        // const response = await axios(urlGetProdBySubCate);
        setProducts(response.data);
        setPaginationData(response.data.info);
    } catch (error) {
      setProducts({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  // Get Products by SubCategory
  //* ----------- GETs ------------

  // console.log("🚀 ~ paginationData:", paginationData);
  // console.log("🚀 ~ ProdByCards ~ products:", products)

  return (
    <div className="m-20 max-w-[1500px]">
      {/* encabezado */}
      <div className=" ml-2">
        <h3 className="text-4xl my-4 font-medium">{nameSubCategory || nameBrand}</h3>
      </div>
      {/* Container Filtro y productos */}
      <div className="flex">
        {/* Filtros */}
        <div className="bg-gray-300 h-[800px] m-2 lg:w-[300px] rounded-sm">
          Filtros
        </div>
        {/* Productos */}
        <div className=" h-auto w-full curs mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {!products.message &&
            products?.data?.map((product, index) => (
              <div
                className="py-4 border border-gray-200 transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between"
                key={index}
              >
                <div className="w-[160px] h-[160px] mx-auto">
                  <Link to={`/details/${product.id}`}>
                    <img
                      className="w-[160px] h-[160px] object-contain cursor-pointer"
                      src={product.imagen}
                      alt=""
                    />
                  </Link>
                </div>

                <div className="px-2 flex flex-col w-full">
                  <Link to={`/details/${product.id}`}>
                    <h3 className="lg:text-lg font-light text-center">
                      {product?.nombre_ingles || product?.nombre_es}
                    </h3>
                  </Link>
                  <span className="text-center lg:text-xl font-semibold mt-3">
                    $ {product?.precio_base}
                  </span>
                </div>

                <button className="mt-2 border-2 mx-6 border-orange-500 h-10 uppercase hover:bg-orange-700 transition-colors duration-300 hover:border-0 hover:text-white ">
                  add to cart
                  <i className="bi bi-cart4 ml-2"></i>
                </button>
              </div>
            ))}

          {/* No hay productos */}
          {products.message && (
            <div className="flex border-b py-4 pl-4 border-gray-200 justify-center  xl:text-xl">
              No products found
            </div>
          )}
        </div>
      </div>
      <div>
        <Paginado
          getProducts={resourceType === "brand" ? getProdByMarca : getProdBySubCategory}
          id={id}
          paginationData={paginationData}
        />
      </div>
    </div>
  );
};
