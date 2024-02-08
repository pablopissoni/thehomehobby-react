// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import LogoGrande from "../../assets/logo The Home Hobby.svg";

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
      const response = await axios.post("http://localhost:3001/users/recover", {
        email: formData.email,
      });
      if (response.status === 200) {
        setEmailSent(true);
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(
          "El correo electrónico ingresado no se encuentra registrado."
        );
      } else {
        setErrorMessage(
          "Error al enviar el correo electrónico. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía la solicitud para restablecer la contraseña al backend
      const response = await axios.post(
        "http://localhost:3001/users/reset-password",
        formData
      );
      setResetSuccess(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error al restablecer la contraseña. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <img src={LogoGrande} alt="Logo" className="w-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
        {!emailSent ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="mb-3">
              <label htmlFor="email" className="block">
                Correo Electrónico:
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
              Enviar Correo de Restablecimiento
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block">
                Código de 6 dígitos:
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                pattern="[0-9]{6}"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block">
                Nueva Contraseña:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                minLength={8}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block">
                Confirmar Nueva Contraseña:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Restablecer Contraseña
            </button>
          </form>
        )}
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
