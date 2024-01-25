import React from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";

export const Login = () => {
  return (
    <div className=" bg-slate-100 flex items-center justify-center h-screen">
      {/* Card Login central */}
      <div className="page-content flex items-center justify-center w-[700px] bg-slate-300">
        <div className=" max-w-md">
          <div className="card w-full">
            {/* Logo */}
            <a href="/" className="flex justify-center p-4">
              <img src={LogoGrande} alt="Logo" />
            </a>

            <div className="p-4">
              <a href="/" className="noble-ui-logo block mb-2">
                <h2 className=" text-2xl">The Home Hobby </h2>
              </a>
              <form className="forms-sample" method="post" action="/login">
                {/* CSRF Token */}
                {/* <input type="hidden" name="_token" value="your-csrf-token" /> */}

                {/* Input y div titulo Email */}
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="userEmail"
                    placeholder="Email"
                    required
                    autoFocus
                  />
                </div>

                {/* Input y div titulo Email */}
                <div className="mb-3">
                  <label htmlFor="userPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="userPassword"
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="flex items-center justify-center bg-blue-500 h-10">
                  <button className="boton text-white">Login</button>
                </div>

                <div className="text-end mt-3">
                  <a href="/password/reset" className="text-dark">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-center">
              <hr style={{ marginBottom: "-10px" }} />
              <div className="separador-login">¿Eres nuevo en Home Hobby?</div>
            </div>
          </div>

          <div className="mt-3 bg-white border-boton-registro cursor-pointer text-center py-2">
            <a href="/register" className="text-dark">
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
