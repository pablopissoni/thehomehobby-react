import React, { useEffect, useState } from "react";
import demoPublicidad from "../../assets/pub_demo001Desktop_1420x150.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const SubCategories = () => {
  //* ------- HOOKs ------------
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [marcas, setMarcas] = useState([]);
  // -------- HOOKs ------------
  console.log("🚀  ~ category:", category.length);
  console.log("🚀 ~ SubCategories ~ subCategory:", subCategory);
  console.log("🚀 ~ SubCategories ~ marcas:", marcas);

  //* ----- USE EFFECT ----------
  useEffect(() => {
    fetchProductsByCategory(id);
    fetchMarcas();
  }, []);
  //  ----- USE EFFECT ----------

  //* --------------- GETs -----------------------
  //* ----- GET SubCategory by ID Category -------
  async function fetchProductsByCategory(id) {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlCategories = isLocalhost
        ? `http://localhost:3001/categories/${id}`
        : `https://thehomehobby-react.onrender.com/categories/${id}`;

      const response = await axios.get(urlCategories);
      setSubCategory(response.data.subcategories);
      setCategory(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  }
  // ------ GET SubCategory by ID Category ------

  //* ----- GET Marcas -------
  async function fetchMarcas() {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlMarcas = isLocalhost
        ? `http://localhost:3001/marcas`
        : `https://thehomehobby-react.onrender.com/marcas`;

      const response = await axios.get(urlMarcas);
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  }
  // ------ GET Marcas ------
  // --------------- GETs -----------------------
  //   console.log("imagen", category.category.image)

  return (
    <div className="SubCatecories flex flex-col justify-center px-8 ">
      <div className=" mx-auto my-4">
        <img src={demoPublicidad} alt="" />
      </div>
      <h1 className="text-4xl mb-6 font-bold uppercase text-black">
        {category &&
          (category.category?.contenido[0]?.nombre ||
            category.category?.contenido[1]?.nombre)}
      </h1>
      {/* <h1 className="text-4xl mb-6 font-bold uppercase text-black">
        Appliances
      </h1> */}

      <div className="containerCateSubCate flex">
        {/* Listas SubCategorias */}
        <div className="subCategoryList pl-2 max-w-[300px] min-w-[200px] bg-gradient-to-r from-slate-100  to-white hidden  md:block ">
          {subCategory &&
            subCategory.map((sub) => (
              <div
                key={sub.id}
                className="subCategoryItem mb-2 font-medium text-gray-600 "
              >
                <p className="cursor-pointer hover:font-bold">
                  {sub?.contenido[0]?.nombre || sub?.contenido[1]?.nombre}
                </p>
              </div>
            ))}
        </div>
        {/* Cards SubCategorias */}
        <div className="subCategoryList w-full ">
          {/* imagen y titulo */}
          {category && (
            <div className="imgContainer flex justify-center mx-auto w-[60rem] border border-slate-200">
              <h3 className="text-5xl my-auto ">
                {category.category?.contenido[0]?.descripcion ||
                  category.category?.contenido[1]?.descripcion}
              </h3>
              <img
                className="ml-8 max-h-96 "
                src={`https://thehomehobby.s3.amazonaws.com${category?.category?.image}`}
                alt=""
              />
            </div>
          )}

          <h2 className="text-3xl mt-6 mb-4 ml-5 font-bold uppercase text-black">
            Explore Our Categories
          </h2>
          {/* Lista de productos */}
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mb-10 ml-4 ">
            {subCategory &&
              subCategory.map((sub) => (
                <Link
                to={`/prodbycategory/${sub.id}`}
                  key={sub.id}
                  className="border p-4 cursor-pointer hover:shadow-xl"
                >
                  <img
                    src={`https://thehomehobby.s3.amazonaws.com${sub.image}`}
                    alt=""
                    className="max-h-40"
                  />
                  <h1>
                    {sub?.contenido[0]?.nombre || sub?.contenido[1]?.nombre}
                  </h1>
                </Link>
              ))}
          </div>

          {/* Titulo de Marcas */}
          <h2 className="text-3xl mt-6 mb-4 ml-5 font-bold uppercase text-black">
            Explore Our brands
          </h2>
          {/* Marcas */}
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mb-10 ml-4 ">
            {marcas &&
              marcas.map(
                (marca) =>
                  marca.status === 1 && (
                    <div
                      key={marca.id}
                      className="border p-4 cursor-pointer hover:shadow-xl flex flex-col justify-center text-center"
                    >
                      <img
                        src={`https://thehomehobby.s3.amazonaws.com${marca?.logo}`}
                        alt=""
                        className="max-h-28 mx-auto"
                      />
                      {/* <h1 className="font-medium mt-2">{marca?.nombre}</h1> */}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
