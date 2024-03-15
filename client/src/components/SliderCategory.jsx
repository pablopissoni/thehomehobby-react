import React, { useEffect, useState } from "react";
import { SliderProducts } from "./SliderProducts";
import { apiUrl } from "../utils/config";
import ContentLoader from "react-content-loader";

export const SliderCategory = ({ categories }) => {
  //* -- USE STATE --------
  const [productsByCateg, setProductsByCateg] = useState([]); // Get Product by Category
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  //* ----- GET Product by Category ----------
  const fetchProductsByCategory = async (prodCategoryId) => {
    try {
      const response = await fetch(
        `${apiUrl}/productos?category=${prodCategoryId}`
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //  ------ USE EFFECT ----------

  //*  ------ Handle Category ----------
  const handleCategoryClick = (categoryId) => {
    fetchProductsByCategory(categoryId); // Fetch products when category is clicked
    setSelectedCategory(categoryId); // Update selected category
  };
  //   ------ Handle Category ----------

  //? --- Loader ---
const MyLoader = (props) => (        
  <div className="bg-white py-2 max-w-32 max-h-14 border border-gray-300 hover:shadow-lg cursor-pointer hover:text-red-500 font-medium">
    {
      <ContentLoader
      className=""
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#dedede"
        foregroundColor="#919191"
        {...props}
      >
        <rect x="20" y="7" rx="3" ry="3" width="88" height="6" />
        <rect x="26" y="21" rx="3" ry="3" width="52" height="6" />
      </ContentLoader>
    }
</div>
);
  // --- Loader ---

  console.log("🚀 productsByCateg:", productsByCateg);

  return (
    <div className="shadow-lg min-h-[300px]">
      <div className="flex ">
        {categories.length > 0?
          categories?.map(
            (category) =>
              category.status === 1 && (
                <button
                  className={`border border-gray-100 font-bold px-2 hover:bg-slate-200 ${
                    selectedCategory === category.id
                      ? "border-b-2 border-b-primary"
                      : ""
                  }`}
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category?.contenido[0]?.nombre ||
                    category?.contenido[1]?.nombre}
                </button>
              )
          ):
          Array.from({ length: 8 }, (_, index) => <MyLoader key={index} />)
          }
      </div>

      <div className="h-full">
        <SliderProducts productsByCategProp={productsByCateg} />
      </div>
    </div>
  );
};
