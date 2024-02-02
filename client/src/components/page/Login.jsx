// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";
import axios from "axios";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

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
      // Send login request to the backend
      const response = await axios.post(
        "http://localhost:3001/users/login",
        loginData
      );

      console.log("Login Response:", response.data);

      // Set success message
      setSuccessMessage("Login successful!");

      // Redirect user after 5 seconds
      setTimeout(() => {
        window.location.href = "http://localhost:5173/";
      }, 5000);
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error, display a message, etc.
    }
  };

  // Clear success message after component unmounts
  useEffect(() => {
    return () => {
      setSuccessMessage("");
    };
  }, []);

  return (
    <div className="bg-slate-100 flex items-center justify-center h-screen">
      <div className="mx-3">
        {/* Card Login central */}
        <div className="page-content flex items-center p-3 w-full lg:w-[800px] bg-white shadow-lg">
          <div className="w-full">
            <div className="card w-full lg:flex">
              {/* Logo */}
              <a href="/" className="flex p-4 lg:w-1/3">
                <img src={LogoGrande} alt="Logo" />
              </a>
              {/* Text card */}
              <div className="p-4 lg:w-2/3">
                <a href="/" className="noble-ui-logo block mb-2">
                  <h2 className="text-2xl font-bold">
                    The <span className="text-red-700">Home Hobby </span>
                  </h2>
                </a>
                {/* Form */}
                <form className="forms-sample" onSubmit={handleSubmit}>
                  {/* Input for Email */}
                  <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label block">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control mt-2 border border-gray-200 rounded-sm lg:w-2/3"
                      id="userEmail"
                      placeholder="  Email"
                      required
                      autoFocus
                      value={loginData.email}
                      onChange={handleInput}
                    />
                  </div>

                  {/* Input for Password */}
                  <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label block">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control mt-2 border border-gray-200 rounded-sm lg:w-2/3"
                      id="userPassword"
                      autoComplete="current-password"
                      placeholder="  Password"
                      required
                      value={loginData.password}
                      onChange={handleInput}
                    />
                  </div>

                  {/* Button for Login */}
                  <div className="lg:flex justify-between lg:w-2/3 mt-5 lg:px-2">
                    <div className="lg:w-1/3 hidden lg:flex items-center justify-center bg-blue-500 hover:bg-sky-700 h-10  rounded-sm">
                      <a href="/register" className="text-white ">
                        Create an account
                      </a>
                    </div>
                    <div className="lg:w-1/3 flex items-center justify-center bg-blue-500  hover:bg-sky-700 h-10 rounded-sm">
                      <button type="submit" className="boton text-white ">
                        Login
                      </button>
                    </div>
                  </div>

                  {/* Link for Forgot Password */}
                  <div className="text-end mt-3 flex justify-center lg:w-2/3">
                    <a
                      href="/password/reset"
                      className="text-dark text-center hover:text-blue-600"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  {/* Success Message */}
                  {successMessage && (
                    <div className="text-green-600 text-center mt-3">
                      {successMessage}
                    </div>
                  )}
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
        <div className="mt-3 bg-white lg:hidden border border-gray-300 rounded-md cursor-pointer text-center py-2">
          <a href="/register" className="text-dark ">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};
