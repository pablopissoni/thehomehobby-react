import React, { useEffect, useState } from "react";
import demoPublicidad from "../../assets/pub_demo001Desktop_1420x150.png";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SubCategories = () => {
  //* ------- HOOKs ------------
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  // -------- HOOKs ------------
  console.log("🚀  ~ category:", category.length);
  console.log("🚀 ~ SubCategories ~ subCategory:", subCategory.length);
  console.log("🚀 ~ SubCategories ~ id:", id);

  //* ----- USE EFFECT ----------
  useEffect(() => {
    fetchProductsByCategory(id);
  }, []);
  //  ----- USE EFFECT ----------

  //* ----- GET SubCategory by ID Category ----------
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
  // ------ GET SubCategory by ID Category ----------
  //   console.log("imagen", category.category.image)

  return (
    <div className="SubCatecories flex flex-col justify-center px-8 border border-red-500 ">
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
        <div className="subCategoryList pl-2 max-w-[300px] min-w-[200px] border border-red-600">
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
        <div className="subCategoryList w-full border border-red-600">
            {/* imagen y titulo */}
          {category && (
            <div className="imgContainer flex">
              <h3 className="text-6xl">
                {category.category?.contenido[0]?.descripcion ||
                  category.category?.contenido[1]?.descripcion}
              </h3>
              <img
                className="ml-8"
                src={`https://thehomehobby.s3.amazonaws.com${category?.category?.image}`}
                alt=""
              />
            </div>
          )}
          {/* Lista de productos */}
          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
