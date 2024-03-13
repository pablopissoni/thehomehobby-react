import React, { useState, useEffect } from "react";
import axios from "axios";

export const ShoppingCart = ({ setShow }) => {
  const [show, setLocalShow] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      // Obtener el token del localStorage
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // Manejar el caso en que no se disponga de un token de acceso
        return;
      }

      try {
        // Obtener los datos del usuario
        const response = await axios.post(
          "http://localhost:3001/users/get-token",
          {}, // Enviar un cuerpo vacío, si es necesario
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userId = response.data.data.mysqlUsers[0].id;

        // Obtener los productos del carrito del usuario
        const cartResponse = await axios.get(
          `http://localhost:3001/carrito/carrito/${userId}`
        );
        setProducts(cartResponse.data);
      } catch (error) {
        // Manejar el error al obtener los datos
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

  return (
    <>
      <div>
        {show && (
          <div className="shopping-cart-modal modal transition-all-300 visible fixed inset-0 z-50 h-full w-full bg-overlay opacity-100">
            <div className="flex h-full w-full">
              <div className="modal-content transition-all-300 relative right-0 ml-auto flex h-full w-[400px] min-w-[250px] flex-col bg-white">
                <div className="w-full">
                  <div className="border-b-2 border-gray-200 p-5">
                    <h3 className="text-xl font-bold uppercase">
                      Shopping Cart
                    </h3>
                  </div>
                  <button
                    className="btn-close-modal transition-all-300 absolute top-5 right-5 p-[3px] hover:text-slate-400 "
                    onClick={() => setShow(!show)}
                  >
                    <i className="bi bi-x-lg text-stroke-medium pointer-events-none flex text-xl"></i>
                  </button>
                </div>
                <div className="h-full overflow-auto">
                  {products.length === 0 ? (
                    <div className="hidden flex-col items-center justify-center gap-4 p-5">
                      <i className="bi bi-cart-x text-8xl text-gray-200"></i>
                      <p className="font-semibold">
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
                  ) : (
                    products.map((item) => (
                      <div
                        key={item.id}
                        className="transition-all-300 flex h-[100px] w-full items-center justify-between gap-5 bg-white p-2 hover:bg-gray-100"
                      >
                        <div className="h-[80px] w-[80px] min-w-[80px] overflow-hidden rounded-lg border">
                          <img
                            className="h-full w-full object-cover"
                            src={item.imagen}
                            alt={item.nombre}
                          />
                        </div>
                        <div className="flex w-full flex-col">
                          <h6 className="clamp-2 break-all text-lg font-semibold">
                            {item.nombre}
                          </h6>
                          <div className="flex gap-2">
                            {/* Aquí puedes mostrar más información del producto si lo deseas */}
                            <div className="flex gap-1 leading-7 text-gray-400">
                              <span>1</span>
                              <span>X</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">
                                $37.00
                              </span>
                              <small className="text-xs text-primary line-through">
                                $50.00
                              </small>
                            </div>
                          </div>
                        </div>
                        <div
                          className="transition-all-300 flex text-slate-400 hover:text-primary"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash-fill pointer-events-none text-2xl"></i>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-auto border-t-2 border-gray-200 bg-white px-1 pt-5 xs:px-5">
                  <div className="flex justify-between">
                    <span className="text-lg uppercase">Subtotal:</span>
                    <span className="text-lg font-semibold text-primary">
                      $37.00
                    </span>
                  </div>
                  <a
                    className="btn-effect transition-all-300 my-5 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                    href="shopping-cart.html"
                  >
                    <span className="font-bold uppercase text-white">
                      View Shopping Cart
                    </span>
                  </a>
                  <a
                    className="btn-effect transition-all-300 my-5 flex w-full items-center justify-center rounded-lg bg-primary p-2"
                    href="checkout.html"
                  >
                    <span className="font-bold uppercase text-white">
                      Checkout now
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
