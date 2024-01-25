import React from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";

export const Login = () => {
  return (
    <div className=" bg-slate-100 flex items-center justify-center h-screen">
      <div className="mx-3">
        {/* Card Login central */}
        <div className="page-content flex items-center p-3 w-full lg:w-[800px] bg-white shadow-lg">
          <div className="w-full">
            <div className="card w-full lg:flex ">
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
                {/* Form */}
                <form className="forms-sample" method="post" action="/login">
                  {/* CSRF Token */}
                  {/* <input type="hidden" name="_token" value="your-csrf-token" /> */}

                  {/* Input y div titulo Email */}
                  <div className="mb-3 ">
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
                    />
                  </div>

                  {/* Input y div titulo Password */}
                  <div className="mb-3 ">
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
                    />
                  </div>
                  {/* Boton Login y Crear cuenta */}
                  <div className="lg:flex justify-between lg:w-2/3 mt-5  lg:px-2 ">
                    <div className="lg:w-1/3 hidden lg:flex items-center justify-center bg-blue-500 hover:bg-sky-700 h-10  rounded-sm">
                      <a href="/register" className="text-white ">
                        Crear cuenta
                      </a>
                    </div>
                    <div className="lg:w-1/3 flex items-center justify-center bg-blue-500  hover:bg-sky-700 h-10 rounded-sm">
                      <button className="boton text-white ">Login</button>
                    </div>
                  </div>

                  <div className="text-end mt-3 flex justify-center lg:w-2/3  ">
                    <a href="/password/reset" className="text-dark text-center hover:text-blue-600">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 lg:hidden">
          {" "}
          {/**Oculto en modo Desktop */}
          <div className="text-center">
            <hr style={{ marginBottom: "-10px" }} />
            <div className="separador-login">¿Eres nuevo en Home Hobby?</div>
          </div>
        </div>

        <div className="mt-3 bg-white lg:hidden border border-gray-300 rounded-md cursor-pointer text-center py-2">
          <a href="/register" className="text-dark ">
            Crear cuenta
          </a>
        </div>
      </div>
    </div>
  );
};
