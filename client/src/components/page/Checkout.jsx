/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";
import { validateEmail } from "../../utils/validationRegister";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { Axios } from "axios";
import axios from "axios";
import { apiUrl, frontUrl } from "../../utils/config";

export const Checkout = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [errorsForm, setErrorsForm] = useState({
    email: false,
    cardHolder: false,
    billingAddress: false,
    zip: false,
  });
  const [paymentDetails, setPaymentDetails] = useState({
    email: "",
    cardHolder: "",
    billingAddress: "",
    zip: "",
  });

  //* URL local o deploy
  const urlLogin = `${apiUrl}/users/login`;
  const url = `${frontUrl}`;

  const stripe = useStripe();
  const elements = useElements();

  //* ---- HANDLEs ----

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (products.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Error al procesar el pago:", error.message);
      // Mostrar mensaje de error al usuario
      alert("Error al procesar el pago: " + error.message);
      return;
    }

    const { id } = paymentMethod;

    const totalFormatted = parseFloat(subtotal) + 8; // Total calculado en el frontend
    const totalAmount = Math.round(totalFormatted * 100); // Convertir el total a centavos y redondearlo
    const totalAmountWithoutDecimals = Math.floor(totalAmount); // Eliminar decimales del total

    console.log("Total enviado al backend:", totalAmountWithoutDecimals);

    try {
      const stripeResponse = await axios.post(`${apiUrl}/orders/${userId}`, {
        id,
        amount: totalAmount,
        email: paymentDetails.email, // Agregar el campo email al cuerpo de la solicitud
        total: totalAmountWithoutDecimals, // Enviar el total sin decimales
      });

      console.log("Respuesta de Stripe:", stripeResponse.data);

      if (
        stripeResponse.data &&
        stripeResponse.data.message === "Payment successful"
      ) {
        // Procesar la respuesta de Stripe y del backend aquí
        // Mostrar mensaje de éxito al usuario
        alert("El pago se realizó correctamente");
      } else {
        // Mostrar mensaje de error al usuario
        alert("Error al procesar el pago. Inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      // Mostrar mensaje de error al usuario
      alert("Error al procesar el pago. Inténtalo de nuevo más tarde.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }

      try {
        const response = await axios.post(
          `${apiUrl}/users/get-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userId = response.data.data.mysqlUsers[0].id;
        setUserId(userId); // Guardar el userId en el estado
        const cartResponse = await axios.get(
          `${apiUrl}/carrito/carrito/${userId}`
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

  const subtotal = products
    .reduce(
      (total, item) => total + item.product.precio_base * item.quantity,
      0
    )
    .toFixed(2);

  return (
    <section>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {products.map((product) => (
              <div
                className="flex flex-col rounded-lg bg-white sm:flex-row"
                key={product.id}
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={product.product.imagen}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    {product.product.nombre_ingles}
                  </span>

                  <p className="text-lg font-bold">{`$${(
                    product.product.precio_base * product.quantity
                  ).toFixed(2)}`}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <form
          className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
          onSubmit={handleSubmit}
        >
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                required
                type="email"
                id="email"
                name="email"
                value={paymentDetails.email}
                onChange={(e) => handleInput(e)}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                required
                type="text"
                id="card-holder"
                name="cardHolder" //se cambio de card-holder
                value={paymentDetails.cardHolder}
                onChange={(e) => handleInput(e)}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <CardElement className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" />
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  required
                  type="text"
                  id="billing-address"
                  name="billingAddress" //se cambio de billing-address
                  value={paymentDetails.billingAddress}
                  onChange={(e) => handleInput(e)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <select
                type="text"
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="State">State</option>
              </select>
              <input
                required
                type="text"
                name="zip" // se cambio de billing-zip
                value={paymentDetails.zip}
                onChange={(e) => handleInput(e)}
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{`$${subtotal}`}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{`$${(
                parseFloat(subtotal) + 8
              ).toFixed(2)}`}</p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            type="submit"
            disabled={!stripe}
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};
