/* eslint-disable react/prop-types */
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
    : "https://thehomehobby-react.onrender.com/users/login"; //! COLOCAR RUTA DEPLOY

  const url = isLocal
    ? "http://localhost:5173/"
    : "http://thehomehobby.com.s3-website.us-east-2.amazonaws.com"; //! COLOCAR RUTA DEPLOY
  // URL local o deploy

  //* ---- HOOKs --------
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // --- HANDLES ----------------
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
        window.location.href = url;
      } else if (response.status === 202) {
        // Set error message for incorrect email or password
        setErrorMessage("Incorrect email or password.");
      } else if (response.status === 203) {
        // Set an error message specifically for unconfirmed accounts
        setErrorMessage(
          "Your account has not been confirmed. Please check your email for the confirmation link."
        );
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

  const [confirmationResent, setConfirmationResent] = useState(false);

  const handleResendConfirmation = async () => {
    try {
      await axios.post(
        "http://localhost:3001/users/resend_confirmation_email",
        {
          email: loginData.email,
        }
      );
      setSuccessMessage("Confirmation email resent successfully!");
      setErrorMessage(""); // Limpiar el mensaje de error después de un éxito
      setConfirmationResent(true); // Indicar que se reenvió el correo de confirmación
    } catch (error) {
      console.error("Error resending confirmation email:", error);
      if (error.response && error.response.status === 404) {
        // Aquí, si se recibe el código de estado 404, significa que el usuario no está confirmado.
        // En lugar de mostrar un mensaje de error, simplemente limpiamos los mensajes existentes.
        setSuccessMessage(""); // Limpiar el mensaje de éxito
      } else {
        // Si hay algún otro error, mostramos el mensaje de error.
        setErrorMessage(
          "Failed to resend confirmation email. Please try again later."
        );
      }
    }
  };

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
                      {/* Botón para reenviar el correo de confirmación */}
                      {errorMessage ===
                        "Your account has not been confirmed. Please check your email for the confirmation link." && (
                        <button
                          onClick={handleResendConfirmation}
                          className="text-blue-600 hover:underline ml-2 focus:outline-none"
                        >
                          Resend confirmation email
                        </button>
                      )}
                    </div>
                  )}
                  {confirmationResent && (
                    <div className="text-green-600 text-center mt-3 lg:ml-4">
                      Confirmation email resent successfully!
                    </div>
                  )}
                  {/* Link for Forgot Password */}
                  <div className="text-end mt-3 flex justify-center lg:w-2/3">
                    <Link
                      to="/password-reset"
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
    </div>
  );
};
