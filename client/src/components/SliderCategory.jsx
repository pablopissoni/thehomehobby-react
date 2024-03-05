import React, { useEffect, useState } from "react";
import { SliderProducts } from "./SliderProducts";

export const SliderCategory = ({ categories }) => {
  //* -- USE STATE --------
  const [productsByCateg, setProductsByCateg] = useState([]); // Get Product by Category
  const [selectedCategory, setSelectedCategory] = useState(null)
  //* ----- GET Product by Category ----------
  const fetchProductsByCategory = async (prodCategoryId) => {
    try {
      const response = await fetch(
        `https://thehomehobby-react.onrender.com/productos?category=${prodCategoryId}`
      );
      if (response.ok) {
        const data = await response.json();
        setProductsByCateg(data);
      } else {
        throw new Error("Error al obtener los productos");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // ------ GET Product by Category ----------

  //* ------ USE EFFECT ----------
  useEffect(() => {
    fetchProductsByCategory("");
  }
    , []); // eslint-disable-line react-hooks/exhaustive-deps
  //  ------ USE EFFECT ----------
  
  //*  ------ Handle Category ----------
  const handleCategoryClick = (categoryId) => {
    fetchProductsByCategory(categoryId); // Fetch products when category is clicked
    setSelectedCategory(categoryId); // Update selected category
  };
  //   ------ Handle Category ----------

  console.log("🚀 productsByCateg:", productsByCateg);

  return (
    <div className="shadow-lg min-h-[300px]">

      <div className="flex ">
        {categories &&
          categories?.map((category) => (
            category.status === 1 &&
           ( <button
            className={`border border-gray-100 font-bold px-2 hover:bg-slate-200 ${
              selectedCategory === category.id ? "border-b-2 border-b-primary" : ""
            }`}
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category?.contenido[0]?.nombre || category?.contenido[1]?.nombre}
            </button>)
          ))}
      </div>

      <div className="h-full">
        <SliderProducts productsByCategProp={productsByCateg} />
      </div>
    </div>
  );
};
