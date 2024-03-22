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
  const [producSearchs, setProducSearchs] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  // console.log("🚀 ~ SearchProducts ~ filteredProducts:", filteredProducts);
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
  const [selectedFilter, setSelectedFilter] = useState(null); // Marca la seleccion en los filtros
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

  // Función para manejar el clic en el botón de filtrar por subcategoría
  const handleFilterSubcategory = (categoriaId, subcategoryId) => {
    setFilteredProducts({}); // Limpio la lista de productos

    if (subcategoryId === selectedFilter) {
      setSelectedFilter("");
      setCategoryId("");
      setSubCategoryId("");
      getProducts(id, 1, "", "", precio_base, order);
      
    } else {

    setSelectedFilter(subcategoryId); // Marca la seleccion en los filtros
    setCategoryId(categoriaId);
    setSubCategoryId(subcategoryId);
    getProducts(id, 1, categoriaId, subcategoryId, precio_base, order);
    }
  };

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
        <span className="ml-4">
          {filteredProducts?.info?.totalItems} resultados para:
        </span>
        <span className="text-2xl ml-2 font-semibold ">{id}</span>
      </div>
      {/* Container Filtro y productos */}
      <div className="flex">
        {/* Filtros */}
        <div className=" bg-slate-100 h-auto m-2 lg:w-[300px] rounded-sm">
          {/* Categorías */}
          {categories &&
            categories?.categories?.map((cate, index) => (
              <details
                key={index}
                name="acordeon"
                className="pl-2 py-1 transition duration-300 cursor-pointer hover:bg-slate-200"
              >
                <summary className="font-bold list-none">
                  {cate?.contenido[0]?.nombre || cate?.contenido[1]?.nombre}
                </summary>

                {cate?.subcategories && (
                  <ul className=" mb-2">
                    {cate?.subcategories.map((sub, index) => (
                      <li
                        key={index}
                        onClick={() => handleFilterSubcategory(cate.id, sub.id)}
                        className={`pl-4 mr-2 py-1 cursor-pointer font-normal transition duration-300 hover:scale-105 ${
                          selectedFilter === sub.id ? "bg-slate-300 rounded-sm" : "" // Clase de resaltado
                        }`}
                      >
                        {sub?.contenido[0]?.nombre || sub?.contenido[1]?.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            ))}

          {/* Ordenar por Precio*/}
          <details
            name="acordeon"
            className="pl-2 py-1 mt-4 transition duration-300 cursor-pointer hover:bg-slate-100"
            open
          >
            <summary className="font-bold list-none cursor-pointer">
              Ordenar por precio
            </summary>
            <ul>
              <li
                className="pl-6 cursor-pointer font-normal transition duration-300 hover:scale-105"
                onClick={() => handleSortPrice("DESC")}
              >
                Mayor a Menor
              </li>
              <li
                className="pl-6 cursor-pointer font-normal transition duration-300 hover:scale-105"
                onClick={() => handleSortPrice("ASC")}
              >
                Menor a Mayor
              </li>
              <li
                className="pl-6 cursor-pointer font-normal transition duration-300 hover:scale-105"
                onClick={() => handleSortPrice("")}
              >
                Mas Relevante
              </li>
            </ul>
          </details>
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
