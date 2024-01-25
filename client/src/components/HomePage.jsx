// components/HomePage.jsx
import React, { useEffect } from "react";
import { Footer } from "./Footer";
import { Slider } from "./Slider";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../actions/productActions';
// import ProductList from './ProductList';

export const HomePage = () => {
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return (
    <div>
      <h1>Home Page</h1>
      <Slider/>
      {/* <ProductList products={products} /> */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
        <Footer />
      </div>
    </div>
  );
};
