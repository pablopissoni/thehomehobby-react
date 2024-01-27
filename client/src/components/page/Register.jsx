import React from "react";

export const Register = () => {
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
                    <div className="  px-4 py-5 ">
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
                        className="flex flex-col items-center "
                        method="post"
                        action="https://thehomehobby.com/register"
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
                            value=""
                            required=""
                            autoComplete="name"
                          />
                        </div>
                        {/* Last name */}
                        <div className="mb-3">
                          <label htmlFor="lastname" className="form-label block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            // className="form-control"
                            className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                            id="lastname"
                            placeholder="   Last Name"
                            value=""
                            required=""
                            autoComplete="name"
                          />
                        </div>
                        {/* Phone */}
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label block">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            // className="form-control"
                            className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                            id="phone"
                            placeholder="   Phone"
                            value=""
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
                            placeholder="   Email"
                            // require=""
                            // autofocus=""
                          />
                        </div>
                        {/* Password */}
                        <div className="mb-3">
                          <label htmlFor="userPassword" className="form-label block">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                            id="userPassword"
                            placeholder="   Password"
                            required=""
                          />
                        </div>
                        {/* Password Confirm */}
                        <div className="mb-3 ">
                          <label htmlFor="userPassword" className="form-label block">
                            Password Confirm
                          </label>
                          <input
                            type="password"
                            name="password_confirmation"
                            className="form-control mt-2 w-full lg:w-[350px] border border-gray-200 rounded-sm"
                            id="userPassword"
                            autoComplete="current-password"
                            placeholder="   Password"
                            required=""
                          />
                        </div>
                        {/* Register */}
                        <div className="text-center text-white px-6 mt-6 bg-red-600 py-1">
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
