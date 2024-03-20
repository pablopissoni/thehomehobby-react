/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import Logo from "../assets/Logo miniatura.svg";

export const ShoppingCartPage = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null); // Agregar estado para el ID del usuario

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3001/users/get-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userId = response.data.data.mysqlUsers[0].id;
        setUserId(userId); // Almacenar el ID del usuario

        const cartResponse = await axios.get(
          `http://localhost:3001/carrito/carrito/${userId}`
        );
        setProducts(
          cartResponse.data.map((item) => ({
            ...item,
            product: {
              ...item.product,
              imagen: item.product.imagen,
            },
          }))
        );
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchUserData();
  }, []);

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3001/carrito/carrito/${cartItemId}`);
      setProducts(products.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const quantity = Math.max(0, parseInt(newQuantity));
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, quantity } : product
      )
    );
  };

  const subtotal = products
    .reduce(
      (total, item) => total + item.product.precio_base * item.quantity,
      0
    )
    .toFixed(2);

  const handleContinue = async () => {
    try {
      await axios.put(
        `http://localhost:3001/carrito/carrito/${userId}`,
        products
      );
      // Redirigir al usuario a la página de Checkout
      window.location.href = "/Checkout";
    } catch (error) {
      console.error("Error al actualizar productos en el carrito:", error);
    }
  };

  return (
    <section>
      <div className="banner-title-section container mx-auto my-5 px-2 sm:px-8">
        <div className="liner-container my-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
          <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
            Shopping Cart
          </h1>
        </div>
      </div>
      <div className="shopping-cart-page container mx-auto my-5 px-2 sm:px-8">
        {products.length === 0 && (
          <div className="shopping-cart-empty flex-col items-center justify-center gap-4 p-5">
            <i className="bi bi-cart-x text-8xl text-gray-200"></i>
            <p className="text-lg font-semibold">
              There are no products in the cart.
            </p>
            <a
              className="btn-effect transition-all-300 flex items-center justify-center gap-2 rounded-lg bg-primary p-2"
              href="#"
            >
              <span className="font-bold uppercase text-white">
                Go to the store
              </span>
            </a>
          </div>
        )}
        <div className="flex justify-between">
          <div className="col-span-12 lg:col-span-8">
            <form
              className="grid grid-cols-12 gap-5 rounded-lg bg-white p-2 xs:p-5"
              action="#"
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="transition-all-300 flex w-full flex-col gap-2 p-2 hover:bg-gray-100 xs:flex-row lg:hidden"
                >
                  <div className="content flex items-center">
                    <div className="flex items-center">
                      <div className="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                        <a href="#">
                          <img
                            className="h-full w-full object-cover"
                            src={product.product.imagen}
                            alt="product"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:flex-row">
                    <div className="flex w-full flex-col gap-2">
                      <div className="content">
                        <div className="flex flex-col">
                          <span className="text-xs font-light xs:hidden">
                            Product Name
                          </span>
                          <a className="clamp-2 break-all font-bold" href="#">
                            {product.product.nombre_ingles}
                          </a>
                        </div>
                      </div>
                      <div className="content">
                        <div className="flex flex-col">
                          <span className="text-xs font-light lg:hidden">
                            Unit Price
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">
                              ${product.product.precio_base}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <div className="flex flex-col">
                          <span className="text-xs font-light">Subtotal</span>
                          <span className="font-bold text-primary">
                            $
                            {(
                              product.product.precio_base * product.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="content flex items-center">
                      <div className="flex items-center gap-x-4 gap-y-1">
                        <div className="flex flex-col">
                          <span className="text-xs font-light">Quantity</span>
                          <div className="quantity inline-flex rounded-lg bg-white shadow">
                            <input
                              className="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                              type="number"
                              value={product.quantity}
                              onChange={(e) =>
                                updateQuantity(product.id, e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div
                          className="tippy tippy-remove transition-all-300 cursor-pointer text-slate-400 hover:text-primary"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <i className="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </form>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[800px] text-left">
                <thead>
                  <tr>
                    <th></th>
                    <th className="p-2">Product Name</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-100">
                      <td className="p-2">
                        <div className="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border">
                          <a href="#">
                            <img
                              className="h-full w-full object-cover"
                              src={product.product.imagen}
                              alt="product"
                            />
                          </a>
                        </div>
                      </td>
                      <td className="p-2">
                        <a className="clamp-2 break-all font-bold" href="#">
                          {product.product.nombre_ingles}
                        </a>
                      </td>
                      <td className="p-2">
                        <span className="font-bold text-primary">
                          ${product.product.precio_base}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="quantity inline-flex rounded-lg bg-white shadow">
                          <input
                            className="quantity-value input-number w-12 border-none bg-transparent p-1 text-center text-lg text-gray-400 focus:border-none focus:ring-0"
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              updateQuantity(product.id, e.target.value)
                            }
                          />
                        </div>
                      </td>
                      <td className="p-2">
                        <span className="font-bold text-primary">
                          $
                          {(
                            product.product.precio_base * product.quantity
                          ).toFixed(2)}
                        </span>
                      </td>
                      <td className="p-2">
                        <div
                          className="tippy tippy-remove btn-delete transition-all-300 text-slate-400 hover:text-primary"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <i className="bi bi-trash-fill pointer-events-none inline text-xl"></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-span-12 lg:col-span-4">
            <div class="rounded-lg border-2 p-4">
              <span class="mb-10 inline-block text-center text-lg font-bold">
                Summary of your purchase:
              </span>
              <div class="py-4">
                <div class="my-2 flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                {/*
                <div class="my-2 flex justify-between">
                  <span>Vat:</span>
                  <span>$22.72</span>
                </div>
                <div class="my-2 flex justify-between">
                  <span>Shipping:</span>
                  <span>$0.00</span>
                </div>
                */}
              </div>
              <div class="flex justify-between border-t-2 border-gray-200 py-4 text-xl font-bold uppercase">
                <span>Total:</span>
                <span>${subtotal}</span>
              </div>
              <a
                onClick={handleContinue}
                className="btn-view-shopping-cart btn-effect transition-all-300 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                href="/Checkout"
              >
                <span className="font-bold uppercase text-white">Continue</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
