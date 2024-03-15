import React, { useEffect, useState } from "react";
import demoPublicidad from "../../assets/pub_demo001Desktop_1420x150.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utils/config";
import ContentLoader from "react-content-loader";

export const SubCategories = () => {
  //* ------- HOOKs ------------
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [marcas, setMarcas] = useState([]);
  // -------- HOOKs ------------
  console.log("🚀  ~ category:", category);
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
      const response = await axios.get(`${apiUrl}/categories/${id}`);
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
      const response = await axios.get(`${apiUrl}/marcas`);
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  }
  // ------ GET Marcas ------
  // --------------- GETs -----------------------
  //   console.log("imagen", category.category.image)
  //? --- Loader ---
  const LoaderListSub = (props) => (
    <ContentLoader 
      speed={2}
      width={180}
      height={300}
      viewBox="0 0 180 300"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="12" y="15" rx="2" ry="2" width="150" height="9" /> 
      <rect x="13" y="33" rx="2" ry="2" width="110" height="9" /> 
      <rect x="11" y="61" rx="2" ry="2" width="150" height="9" /> 
      <rect x="12" y="79" rx="2" ry="2" width="110" height="9" />
    </ContentLoader>
  )

  const LoaderCard = (props) => (
    <ContentLoader
      speed={2}
      width={170}
      height={200}
      viewBox="0 0 170 200"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="15" y="16" rx="2" ry="2" width="117" height="109" />
      <rect x="36" y="134" rx="2" ry="2" width="78" height="9" />
    </ContentLoader>
  );

  const LoaderTitleImg = (props) => (
    <ContentLoader
      speed={2}
      width={650}
      height={270}
      viewBox="0 0 650 270"
      backgroundColor="#dedede"
      foregroundColor="#919191"
      {...props}
    >
      <rect x="39" y="107" rx="2" ry="2" width="200" height="15" />
      <rect x="65" y="137" rx="2" ry="2" width="140" height="15" />
      <rect x="293" y="23" rx="2" ry="2" width="316" height="218" />
    </ContentLoader>
  );
  //  --- Loader ---

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
          {subCategory.length > 0? 
            (subCategory.map((sub) => (
              <div
                key={sub.id}
                className="subCategoryItem mb-2 font-medium text-gray-600 "
              >
                <p className="cursor-pointer hover:font-bold">
                  {sub?.contenido[0]?.nombre || sub?.contenido[1]?.nombre}
                </p>
              </div>
            )))
            :
              <LoaderListSub/>
            }
        </div>
        {/* Cards SubCategorias */}
        <div className="subCategoryList w-full ">
          {/* imagen y titulo */}
          {category.category ? (
            <div className="imgContainer flex justify-center mx-auto mb-10 w-[60rem] border-b-2 border-slate-200">
              <h3 className="text-5xl my-auto ">
                {category.category?.contenido[0]?.descripcion ||
                  category.category?.contenido[1]?.descripcion}
              </h3>
              <img
                className="ml-8 max-h-64 "
                src={`https://thehomehobby.s3.amazonaws.com${category?.category?.image}`}
                alt=""
              />
            </div>
          ) : (
            <LoaderTitleImg className="w-[300px] sm:w-auto mx-auto border-b-2 border-slate-200" />
          )}

          <h2 className="text-3xl mt-6 mb-4 ml-5 font-bold uppercase text-black">
            Explore Our Categories
          </h2>
          {/* Lista de productos */}
          <div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mb-10 ml-4 ">
            {subCategory.length > 0 ? (
              subCategory.map((sub) => (
                <Link
                  to={`/prodbycategory/${sub.id}?subcate=${encodeURIComponent(
                    sub?.contenido[0]?.nombre || sub?.contenido[1]?.nombre
                  )}`}
                  key={sub.id}
                  className="border p-4 cursor-pointer hover:shadow-xl  flex flex-col "
                >
                  <img
                    src={`https://thehomehobby.s3.amazonaws.com${sub.image}`}
                    alt=""
                    className="max-h-36 object-contain"
                  />
                  <h2 className="font-bold text-center">
                    {sub?.contenido[0]?.nombre || sub?.contenido[1]?.nombre}
                  </h2>
                </Link>
              ))
            ) : (
              <LoaderCard className="w-[110px] sm:w-auto mx-auto " />
            )}
          </div>

          {/* Titulo de Marcas */}
          <h2 className="text-3xl mt-6 mb-4 ml-5 font-bold uppercase text-black">
            Explore Our brands
          </h2>
          {/* Marcas */}
          <div className="grid xl:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 gap-2 mb-10 mx-4 ">
            {marcas.length > 0?
              (marcas.map(
                (marca) =>
                  marca.status === 1 && (
                    <Link
                      to={`/prodbybrand/${marca.id}?brand=${encodeURIComponent(
                        marca?.nombre
                      )}`}
                      key={marca.id}
                      className="border p-2 cursor-pointer hover:shadow-xl flex flex-col justify-center text-center"
                    >
                      <img
                        src={`https://thehomehobby.s3.amazonaws.com${marca?.logo}`}
                        alt=""
                        className="max-h-20 mx-auto"
                      />
                      {/* <h1 className="font-medium mt-2">{marca?.nombre}</h1> */}
                    </Link>
                  )
              )): (
                <LoaderCard className="w-[110px] sm:w-auto mx-auto " />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
