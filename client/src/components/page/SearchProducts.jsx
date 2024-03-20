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
  const [categories, setCategories] = useState([]);
  console.log("🚀 ~ SearchProducts ~ categories:", categories);
  const [producSearchs, setProducSearchs] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  const [categoria_id, setCategoryId] = useState("");
  const [sub_categoria_id, setSubCategoryId] = useState("");
  const [precio_base, setPriceBase] = useState("");
  const [order, setOrder] = useState("");

  // console.log("🚀 ~ SearchProducts ~ filteredProducts:", filteredProducts)
  // console.log("🚀 ~ SearchProducts ~ producSearchs:", producSearchs)
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalItems: null,
    totalPages: null,
  });

  // Estado para controlar la visibilidad de los filtros de categorías y subcategorías
  // const [showCategories, setShowCategories] = useState(false);
  // const [showSubcategories, setShowSubcategories] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isSubcategoryOpen, setSubcategoryOpen] = useState(true);
  const [isSortOpen, setSortOpen] = useState(true);
  // ---- HOOKs ----

  //* ---- USE EFFECTs ----
  useEffect(() => {
    setProducSearchs({});
    getProducts(id);
    getCategoriesAvailable(id);
  }, [id]);
  // ----- USE EFFECTs ----

  //* ---- Get Products by search ----
  async function getCategoriesAvailable(name) {
    try {
      const response = await axios(
        `${apiUrl}/categoriesbysearchproduct?name=${name}`
      );
      setCategories(response.data); // Se comporta como productos de una Marca
    } catch (error) {
      console.error("Error en getProduct ID >>> ", error);
    }
  }

  async function getProducts(
    id,
    page = 1,
    categoria_id = "",
    sub_categoria_id = "",
    precio_base = "",
    order = ""
  ) {
    try {
      const response = await axios(
        `${apiUrl}/productos?name=${id}&page=${page}&category=${categoria_id}&subCategory=${sub_categoria_id}&sortBy=${precio_base}&sortOrder=${order}`
      );
      setProducSearchs(response.data);
      setFilteredProducts(response.data);
      setPaginationData(response.data.info);
    } catch (error) {
      setProducSearchs({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  // ---- Get Products by search ----

  //* --- Sort y Filtros ---
  const toggleCategory = () => setCategoryOpen(!isCategoryOpen);
  const toggleSubcategory = () => setSubcategoryOpen(!isSubcategoryOpen);
  const toggleSort = () => setSortOpen(!isSortOpen);

  // Función para manejar el clic en el botón de ordenar por precio
  const handleSortPrice = (sortOrder) => {
    setFilteredProducts({}); // Limpio la lista de productos

    const precioBase = !sortOrder ? "" : "precio_base";

    getProducts(id, 1, categoria_id, sub_categoria_id, precioBase, sortOrder);
  };

  // // Función para manejar el clic en el botón de filtrar por categoría
  // const handleFilterCategory = (category) => {
  //   // Aquí puedes realizar la lógica para filtrar los productos por categoría
  // };

  // // Función para manejar el clic en el botón de filtrar por subcategoría
  // const handleFilterSubcategory = (subcategory) => {
  //   // Aquí puedes realizar la lógica para filtrar los productos por subcategoría
  // };

  //  --- Sort y Filtros ---

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
        <div className="bg-slate-200 h-auto m-2 lg:w-[300px] rounded-sm">
          {/* Categorías */}
          <div className="mb-6">
          <div
            className="border-b border-gray-400 p-2 cursor-pointer"
            onClick={toggleCategory}
          >
            <strong>Categorías</strong>
            {isCategoryOpen ? <span>&#9660;</span> : <span>&#9654;</span>}
          </div>
          {isCategoryOpen && (
            <ul className="pl-4">
              {categories &&
                categories?.categories?.map((cate, index) => (
                  <div key={index}>
                    <li className="cursor-pointer font-semibold" onClick={""}>
                      {cate?.contenido[0]?.nombre || cate?.contenido[1]?.nombre}{" "}
                    </li>
                    {cate?.subcategories && (
                      <ul className="pl-4 mb-2">
                        {cate?.subcategories.map((sub, index) => (
                          <li key={index} className="cursor-pointer font-light">
                            {sub?.contenido[0]?.nombre ||
                              sub?.contenido[1]?.nombre}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              {/* Agregar más categorías según corresponda */}
            </ul>
          )}
          </div>

          {/* Ordenar por Precio*/}
          <div
            className="border-b border-gray-400 p-2 cursor-pointer"
            onClick={toggleSort}
          >
            <strong>Ordenar por precio</strong>
            {isSortOpen ? <span>&#9660;</span> : <span>&#9654;</span>}
          </div>
          {isSortOpen && (
            <ul className="pl-4">
              <li
                className="cursor-pointer"
                onClick={() => handleSortPrice("DESC")}
              >
                mayor a menor
              </li>
              <li
                className="cursor-pointer"
                onClick={() => handleSortPrice("ASC")}
              >
                menor a mayor
              </li>
              <li className="cursor-pointer" onClick={() => handleSortPrice()}>
                Mas Relevante
              </li>
            </ul>
          )}
        </div>

        {/* Productos */}
        <div className=" h-auto w-full curs mt-2">
          {!filteredProducts.message && filteredProducts.data
            ? filteredProducts?.data?.map((product, index) => (
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
            : !filteredProducts.data &&
              !filteredProducts.message &&
              Array.from({ length: 5 }).map((_, index) => (
                <LoaderProduct
                  key={index}
                  className="border-b-2 border-gray-200"
                />
              ))}

          {/* No hay productos */}
          {filteredProducts.message && (
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
          categoria_id={categoria_id}
          sub_categoria_id={sub_categoria_id}
          precio_base={precio_base}
          order={order}
          paginationData={paginationData}
        />
      </div>
    </div>
  );
};
