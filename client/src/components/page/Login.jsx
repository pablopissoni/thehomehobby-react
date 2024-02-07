/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";
import axios from "axios";
import { Link } from "react-router-dom";

export const Login = () => {
  //* URL local o deploy
  const isLocal = window.location.href.includes("localhost");
  const urlLogin = isLocal
    ? "http://localhost:3001/users/login"
    : "XXXXXXXXXXX DEPLOY"; //! COLOCAR RUTA DEPLOY

  const url = isLocal ? "http://localhost:5173/" : "XXXXXXXXXXX DEPLOY"; //! COLOCAR RUTA DEPLOY
  // URL local o deploy

  //* ---- HOOKs --------
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  // ---- HOOKs --------

  //* --- HANDLES ----------------
  const handleInput = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(urlLogin, loginData);
      console.log("Login Response:", response.data);
      if (response.status === 201) {
        // Clear any previous error messages
        setErrorMessage("");
        // Redirect the user to the main page if authentication is successful
        setTimeout(() => {
          window.location.href = url;
        }, 5000);
      } else if (response.status === 202) {
        // Set error message for incorrect email or password
        setErrorMessage("Incorrect email or password.");
      } else if (response.status === 203) {
        // Show confirmation modal if account is unconfirmed
        setShowConfirmationModal(true);
      } else if (response.status === 404) {
        // Set error message for server error
        setErrorMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      // Set error message for any unexpected errors
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error during login:", error);
    }
  };

  const handleConfirmation = async () => {
    try {
      // Aquí iría la lógica para enviar el código de confirmación al servidor
      console.log("Confirmation code:", confirmationCode);
      // Suponiendo que el código de confirmación se envía correctamente al servidor
      // Se cierra el modal de confirmación
      setShowConfirmationModal(false);
      // Aquí podrías redirigir al usuario a la página de inicio de sesión u otra página según tu lógica
    } catch (error) {
      console.error("Error confirming account:", error);
      // Mostrar un mensaje de error al usuario si el código de confirmación es incorrecto
      setErrorMessage("Invalid confirmation code. Please try again.");
    }
  };

  // --- HANDLES ----------------

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="mx-3">
        {/* Card Login central */}
        <div className="page-content flex items-center p-3 w-full lg:w-[800px] bg-white shadow-lg">
          <div className="w-full">
            <div className="card w-full lg:flex">
              {/* Logo */}
              <Link
                to="/"
                className="flex p-4 lg:w-1/3 transition-transform duration-300 hover:scale-110"
              >
                <img className="" src={LogoGrande} alt="Logo" />
              </Link>
              {/* Text card */}
              <div className="p-4 lg:w-2/3">
                <Link to="/" className="noble-ui-logo block mb-2">
                  <h2 className="text-2xl font-bold transition-transform duration-300 hover:scale-105">
                    The <span className="text-red-700">Home Hobby </span>
                  </h2>
                </Link>
                {/* Form */}
                <form
                  className="forms-sample lg:w-[400px] lg:w-auto"
                  onSubmit={handleSubmit}
                >
                  {/* Input for Email */}
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
                      className="form-control mt-1 border border-gray-200 rounded-sm w-full pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                      id="userEmail"
                      placeholder="Email"
                      required
                      autoFocus
                      value={loginData.email}
                      onChange={handleInput}
                    />
                  </div>

                  {/* Input for Password */}
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
                      className="form-control mt-1 border border-gray-200 rounded-sm w-full pl-2  outline-none focus:border-2 focus:border-b-cyan-500"
                      id="userPassword"
                      autoComplete="current-password"
                      placeholder="Password"
                      required
                      value={loginData.password}
                      onChange={handleInput}
                    />
                  </div>
                  {/* Button for Login */}
                  <div className="lg:flex justify-between lg:w-2/3 mt-5 lg:px-2">
                    <div className="lg:w-2/5 hidden leading-none lg:flex items-center justify-center text-center bg-blue-500 hover:bg-sky-500 hover:shadow-xl h-10  rounded-sm">
                      <Link to="/register" className="text-white ">
                        Create an account
                      </Link>
                    </div>
                    {/* <div className="lg:w-1/3 flex items-center justify-center bg-blue-500  hover:bg-sky-500 hover:shadow-xl h-10 rounded-sm"> */}
                    <button
                      type="submit"
                      className="boton text-white w-full lg:w-1/3 flex items-center justify-center bg-blue-500  hover:bg-sky-500 hover:shadow-xl h-10 rounded-sm"
                    >
                      Login
                    </button>
                  </div>
                  {/* </div> */}
                  {/* Error Message */}
                  {errorMessage && (
                    <div className="text-red-600 mt-3 lg:ml-4">
                      {errorMessage}
                    </div>
                  )}

                  {/* Link for Forgot Password */}
                  <div className="text-end mt-3 flex justify-center lg:w-2/3">
                    <Link
                      to="/password/reset"
                      className="text-dark text-center hover:text-blue-600"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden in Desktop Mode */}
        <div className="mt-3 lg:hidden">
          <div className="text-center">
            <hr style={{ marginBottom: "-10px" }} />
            <div className="separador-login">New to Home Hobby?</div>
          </div>
        </div>

        {/* Link for Register - Hidden in Desktop Mode */}
        <div className="mt-3 bg-white lg:hidden border border-gray-300 hover:bg-sky-300 hover:shadow-xl rounded-md cursor-pointer text-center py-2">
          <Link to="/register" className="text-dark ">
            Create an account
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
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
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
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
    </div>
  );
};
