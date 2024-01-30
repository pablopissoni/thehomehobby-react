import React, { useState } from "react";

export const Register = () => {
  // Hooks
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

  // Manejo los valores del formulario
  function handleInput(event) {
    const { name, value } = event.target;
    setUserRegister({
      ...userRegister,
      [name]: value,
    });
  }

  // -------- Validaciones de los Inputs en Form --------
  function validation() {
    const regexEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const errorsObj = {};
    setErrors(errorsObj);

    // Validacion Name
    if (userRegister.name === "") {
      errorsObj.name = "El nombre es obligatorio";
      console.log("!!!!! Name", errors);
    }

    // Validacion LastName
    if (userRegister.lastName === "") {
      errorsObj.lastName = "El apellido es obligatorio";
      console.log("!!!!! Last Name", errors);
    }

    // Validacion Email
    if (userRegister.email === "") {
      errorsObj.email = "El email es obligatorio";
      console.log("!!!!! Email", errorsObj);
    } else {
      if (!regexEmail.test(userRegister.email)) {
        errorsObj.email = "Formato de email incorrecto";
        console.log("!!!!! Format Mail", errorsObj.email);
      }
    }

    // Validacion Password
    if (userRegister.password.length < 8) {
      errorsObj.password = "La contraseña debe tener al menos 8 caracteres";
      console.log("!!!!! Password", errorsObj.password);
    }
    if (userRegister.password !== userRegister.passwordConfirmation) {
      errorsObj.passwordConfirmation = "La contraseña no coincide";
      console.log("!!!!! La contraseña no coincide", errorsObj);
    }
    if (userRegister.passwordConfirmation === "") {
      errorsObj.passwordConfirmation = "Repita su contraseña";
      console.log("!!!!! Password Confirmation", errorsObj);
    }

    setErrors(errorsObj);
    // Verificar si 'errorsObj' tiene propiedades
    if (errorsObj && Object.keys(errorsObj).length > 0) {
      console.log("✕✕✕ ERROR DE VALIDACIONES ****: ", errors);
      return false; // No se puede enviar el formulario si hay errores de validaciones
    } else {
      console.log("✓✓✓ No hubo error de validaciones");
      return true; // Se puede enviar el formulario si no hay errores de validaciones
    }
    // console.log("OBJECT KEY", Object.keys(errors));
  }
  // ------------------------

  // Funcion para enviar el formulario
  function handleSubmit(event) {
    event.preventDefault();
    validation(); // Devuelve un true si no hay errores y false si hay alguno
  }

  console.log("DATOS DE USUARIO: ", userRegister);

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
                <div className="">
                  <a href="http://localhost:5173/">
                    <div className="auth-side-wrapper flex justify-center justify-content-center p-4">
                      <img
                        src="https://thehomehobby.com/assets/images/the_home_hobby.svg"
                        alt=""
                      />
                    </div>
                  </a>
                </div>
                {/* Titulo y form */}
                {/* <div className=""> */}
                <div className="  px-3 py-5 ">
                  <a
                    href="http://localhost:5173/"
                    // href="https://thehomehobby.com"
                    className="noble-ui-logo block mb-2"
                  >
                    <h2 className="text-2xl font-bold text-center">
                      The <span className="text-red-700">Home Hobby </span>
                    </h2>
                  </a>
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
                      <label htmlFor="userName" className="form-label block">
                        Name
                      </label>
                      <input
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                        type="text"
                        name="name"
                        id="userName"
                        placeholder="   Name"
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
                      <label htmlFor="lastname" className="form-label block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                        id="lastName"
                        placeholder="   Last Name"
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
                      <label htmlFor="phone" className="form-label block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                        id="phone"
                        placeholder="   Phone"
                        value={userRegister.phone}
                        required=""
                        autoComplete="name"
                      />
                    </div>
                    {/* Email Addres */}
                    <div className="mb-3">
                      <label htmlFor="userEmail" className="form-label block">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                        id="userEmail"
                        value={userRegister.email}
                        onChange={handleInput}
                        placeholder="   Email"
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
                        className="form-label block"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={userRegister.password}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                        id="userPassword"
                        placeholder="   Password"
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
                        htmlFor="userPassword"
                        className="form-label block"
                      >
                        Password Confirm
                      </label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        value={userRegister.passwordConfirmation}
                        onChange={handleInput}
                        className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                        id="userPasswordConfirmation"
                        // autoComplete="current-password"
                        placeholder="   Password"
                        required=""
                      />
                      {errors.passwordConfirmation && (
                        <span
                          className={`flex font-extralight w-[200px] lg:w-auto text-red-600 `}
                        >
                          {errors.passwordConfirmation}
                        </span>
                      )}
                    </div>
                    {/* Register */}
                    <div
                      type="submit"
                      className="text-center text-white px-6 mt-6 bg-red-600 py-1"
                    >
                      <button className="">Register</button>
                    </div>
                    {/* I already have an account */}
                    <div className="text-center  mt-3">
                      <a
                        href="https://thehomehobby.com/login"
                        className="text-dark"
                      >
                        I already have an account
                      </a>
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
