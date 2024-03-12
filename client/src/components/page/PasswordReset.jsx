/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import LogoGrande from "../../assets/logo The Home Hobby.svg";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/config";

export const PasswordReset = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía la solicitud para verificar si el correo existe y enviar el código
      const response = await axios.post(`${apiUrl}/users/recover`, {
        email: formData.email,
      });
      if (response.status === 200) {
        setEmailSent(true);
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("The entered email is not registered.");
      } else {
        setErrorMessage("Error sending the email. Please try again.");
      }
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword, code } = formData;

    // Verificar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      setErrorMessage("The passwords do not match.");
      return;
    }

    try {
      // Envía la solicitud para restablecer la contraseña al backend
      const response = await axios.post(
        `${apiUrl}/users/reset-password`,
        { email: formData.email, newPassword, code }
      );
      setResetSuccess(true);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          "The verification code is incorrect or has expired. Please request another code."
        );
      } else {
        setErrorMessage("Error resetting the password. Please try again.");
      }
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* <img src={LogoGrande} alt="Logo" className="w-24 mx-auto mb-4" /> */}
        <Link
          to="http://thehomehobby.com.s3-website.us-east-2.amazonaws.com"
          className="flex justify-center p-4 transition-transform duration-300 hover:scale-105"
        >
          <img className="" src={LogoGrande} alt="Logo" />
        </Link>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {!emailSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="mb-3">
              <label htmlFor="email" className="block">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mt-1 border border-gray-200 rounded-sm w-full pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                style={{ height: "1.6rem" }}
                required
              />
            </div>
            <button
              type="submit"
              className="text-center text-white px-6 mt-6 bg-blue-600 py-1 rounded-sm cursor-pointerhover:shadow-lg"
            >
              Send Reset Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block">
                6-digit Code:
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                pattern="[0-9]{6}"
                className="form-control mt-1 border border-gray-200 rounded-sm w-full pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                minLength={8}
                className="form-control mt-1 border border-gray-200 rounded-sm w-full pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block">
                Confirm New Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                className="form-control mt-1 border border-gray-200 rounded-sm w-full pl-2 outline-none focus:border-2 focus:border-b-cyan-500"
                required
              />
            </div>
            <button
              type="submit"
              className="text-center text-white px-6 mt-6 bg-blue-600 py-1 rounded-sm cursor-pointerhover:shadow-lg"
            >
              Reset Password
            </button>
          </form>
        )}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        {resetSuccess && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <p className="font-bold">Password successfully reset.</p>
            <p className="text-sm">
              Por favor,{" "}
              <Link
                to="/login"
                className="text-green-800 hover:text-green-900 font-semibold"
              >
                log in
              </Link>
              .
            </p>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1 1 0 0 1-1.414 1.414L10 11.414l-2.93 2.93a1 1 0 1 1-1.414-1.414L8.586 10 5.656 7.071a1 1 0 0 1 1.414-1.414L10 8.586l2.93-2.93a1 1 0 0 1 1.414 1.414L11.414 10l2.93 2.929z" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
