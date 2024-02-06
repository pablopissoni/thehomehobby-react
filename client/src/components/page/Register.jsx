// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import logoHomeHobby from "../../assets/logo The Home Hobby.svg";
import { Link } from "react-router-dom";
import { validateRegistration } from "./validationRegister";

export const Register = () => {
  //* Direciones URL LocalHost y Produccion
  const isLocalhost = window.location.href.includes("localhost");
  const urlHome = isLocalhost
    ? "http://localhost:5173/"
    : "https://thehomehobby.com";

  const urlLogin = isLocalhost
    ? "http://localhost:5173/login"
    : "https://thehomehobby.com/login";

  const urlUserConfirm = isLocalhost
    ? "http://localhost:3001/users/confirm"
    : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  const urlUserRegister = isLocalhost
    ? "http://localhost:3001/users/register"
    : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  //* ---- HOOKs ---------
  const [errors, setErrors] = useState({});
  const [userRegister, setUserRegister] = useState({
    // token: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [confirmationCode, setConfirmationCode] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [confirmationMessage, setConfirmationMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  // const [registrationSuccess, setRegistrationSuccess] = useState(false);

  //* -------- Validaciones de los Inputs en Form --------

  //* ----- HANDLEs ----------
  // Manejo los valores del formulario
  function handleInput(event) {
    const { name, value } = event.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  }

  // Funcion para enviar el formulario
  async function handleSubmit(event) {
    event.preventDefault();

    // Validación de formularios
    const errorsObj = validateRegistration(userRegister);
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length > 0) {
      console.log("✕✕✕ ERROR DE VALIDACIONES ****: ", errors);
      return;
    }

    try {
      // Realizar la solicitud HTTP con axios
      const response = await axios.post(urlUserRegister, userRegister);

      console.log("Respuesta del servidor:", response.data);

      // Set the flag for successful registration
      // setRegistrationSuccess(true);
      setShowConfirmationModal(true); // Abre modal para codigo de confirmacion

      // You can handle the response as needed
      // For example, redirect the user or display a success message
    } catch (error) {
      console.error("Error al enviar solicitud:", error);

      // Handle the error, e.g., show an error message to the user
    }
  }

  console.log("DATOS DE USUARIO: ", userRegister);

  // eslint-disable-next-line no-unused-vars
  const handleConfirmation = async () => {
    try {
      const confirmResponse = await axios.post(urlUserConfirm, {
        email: userRegister.email,
        confirmationCode: confirmationCode,
      });

      console.log("Confirmation Response:", confirmResponse.data);
      // Mostrar mensaje de éxito
      setConfirmationMessage(
        "Confirmation successful. Redirecting to login..."
      );
      // Cerrar el modal después de 3 segundos y redirigir al usuario
      setTimeout(() => {
        setShowConfirmationModal(false);
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Error confirming registration:", error);
      // Mostrar mensaje de error si el código es incorrecto
      setConfirmationMessage("Invalid confirmation code. Please try again.");
    }
  };
  // ----- HANDLEs ----------

  return (
    <main
      className="main-wrapper bg-slate-100 flex items-center justify-center h-screen"
      id="app"
    >
      <div className="bg-white">
        <div className="">
          <div className="">
            {/* <div className="flex items-center justify-content-center"> */}
            <div className="">
              {/* <div className="md:w-8/12 xl:w-6/12 mx-auto"> */}
              <div className="card  lg:w-[800px] w-[300px]  flex-col justify-center shadow-lg">
                {/* Logo img */}
                <div className="transition-transform duration-300 hover:scale-105">
                  <Link to={urlHome}>
                    <div className="auth-side-wrapper flex justify-center justify-content-center p-4">
                      <img src={logoHomeHobby} alt="imagen home hobby" />
                    </div>
                  </Link>
                </div>
                {/* Titulo y form */}
                {/* <div className=""> */}
                <div className="px-3 py-5 ">
                  <Link
                    to={urlHome}
                    // href="https://thehomehobby.com"
                    className="noble-ui-logo block mb-2 transition-transform duration-300 hover:scale-105"
                  >
                    <h2 className="text-2xl font-bold text-center">
                      The <span className="text-red-700">Home Hobby </span>
                    </h2>
                  </Link>
                  {/* Formulario */}
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center "
                    // method="post"
                    // action="https://thehomehobby.com/register"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      value="9H6SsrY2ZwuVG3vTc1LlMyioR9xl8XDh89IIuasX"
                      autoComplete="off"
                    />
                    {/* name */}
                    <div className="mb-3 ">
                      <label
                        htmlFor="userName"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Name
                      </label>
                      <input
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        type="text"
                        name="name"
                        id="userName"
                        placeholder="Name"
                        value={userRegister.name}
                        onChange={handleInput}
                        required=""
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span className="flex w-[200px] lg:w-auto text-red-600  text-sm">
                          {errors.name}
                        </span>
                      )}
                    </div>
                    {/* Last name */}
                    <div className="mb-3">
                      <label
                        htmlFor="lastname"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="lastname"
                        placeholder="Last Name"
                        value={userRegister.lastName}
                        required=""
                        autoComplete="name"
                      />
                      {errors.lastName && (
                        <span className="flex w-[200px] lg:w-auto text-red-600  text-sm">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                    {/* Phone */}
                    <div className="mb-3">
                      <label
                        htmlFor="phone"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userRegister.phone}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="phone"
                        placeholder="Phone"
                        required=""
                        autoComplete="name"
                      />
                    </div>
                    {/* Email Addres */}
                    <div className="mb-3">
                      <label
                        htmlFor="userEmail"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="userEmail"
                        value={userRegister.email}
                        onChange={handleInput}
                        placeholder="Email"
                        // require=""
                        // autofocus=""
                      />
                      {errors.email && (
                        <span className="flex w-[200px] lg:w-auto text-red-600  text-sm">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                      <label
                        htmlFor="userPassword"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={userRegister.password}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="userPassword"
                        placeholder="Password"
                        required=""
                      />
                      {errors.password && (
                        <span
                          className={`flex font-extralight w-[200px] lg:w-auto text-red-600 `}
                        >
                          {errors.password}
                        </span>
                      )}
                    </div>
                    {/* Password Confirm */}
                    <div className="mb-3 ">
                      <label
                        htmlFor="passwordConfirmation"
                        className="form-label block transition-transform duration-500 hover:translate-x-2"
                      >
                        Password Confirm
                      </label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        value={userRegister.passwordConfirmation}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                        id="passwordConfirmation"
                        // autoComplete="current-password"
                        placeholder="Password"
                        required=""
                      />
                      {errors.passwordConfirmation && (
                        <span
                          className={`flex font-extralight w-[200px] lg:w-auto text-red-600`}
                        >
                          {errors.passwordConfirmation}
                        </span>
                      )}
                    </div>
                    {showConfirmationModal && (
                      <div className="confirmation-modal flex flex-col items-center justify-center">
                        <div className="h-full w-full px-5 py-3 bg-slate-100 border border-gray-300 shadow-lg mt-4 rounded-lg">
                          <h3 className="text-lg font-medium mb-2">
                            Confirm email verification code
                          </h3>
                          <input
                            className="mt-2 w-full max-w-xs border border-gray-200 rounded-sm pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                            type="text"
                            placeholder="Code..."
                            value={confirmationCode}
                            onChange={(e) =>
                              setConfirmationCode(e.target.value)
                            }
                          />
                          {/* Mostrar mensaje de error o éxito */}
                          {confirmationMessage && (
                            <p
                              className={`text-center text-${
                                confirmationMessage.includes("successful")
                                  ? "green"
                                  : "red"
                              }-600 text-sm mt-2`}
                            >
                              {confirmationMessage}
                            </p>
                          )}
                          <div className="mt-4 flex justify-center">
                            <button
                              className="text-center text-white px-2 py-1 rounded-sm bg-red-600 transition-transform duration-200 hover:scale-105 hover:bg-red-700"
                              onClick={handleConfirmation}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Register */}
                    <button
                      type="submit"
                      className="text-center text-white px-6 mt-6 bg-red-600 py-1 rounded-sm cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      Register
                    </button>

                    {/* Codigo de Confirmacion */}

                    {/* I already have an account */}
                    <div className="text-center transition-transform duration-300 hover:scale-105 mt-3">
                      <Link
                        to={urlLogin}
                        className="text-dark hover:text-cyan-600 "
                      >
                        I already have an account
                      </Link>
                    </div>
                  </form>
                </div>
                {/* </div> */}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};
