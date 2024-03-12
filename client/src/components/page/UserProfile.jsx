/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import axios from "axios";
import UserDefault from "../../assets/DefaultUser.jpg";
import { apiUrl } from "../../utils/config";

export const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // Manejar el caso en que no se disponga de un token de acceso
        return;
      }

      try {
        const response = await axios.post(
          `${apiUrl}/users/get-token`,
          {}, // Enviar un cuerpo vacío, si es necesario
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        // Manejar el error al obtener los datos del usuario
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section>
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={UserDefault}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" // Cambia 'class' a 'className'
                    alt="User profile"
                  />

                  <div>
                    <h2>User Profile</h2>
                    <p>
                      Name:{" "}
                      {userData &&
                        userData.UserAttributes &&
                        userData.UserAttributes.find(
                          (attr) => attr.Name === "name"
                        ).Value}
                    </p>
                    <p>
                      Last Name:{" "}
                      {userData &&
                        userData.UserAttributes &&
                        userData.UserAttributes.find(
                          (attr) => attr.Name === "family_name"
                        ).Value}
                    </p>
                    <p>
                      Email:{" "}
                      {userData &&
                        userData.UserAttributes &&
                        userData.UserAttributes.find(
                          (attr) => attr.Name === "email"
                        ).Value}
                    </p>
                    <p>
                      Phone Number:{" "}
                      {userData &&
                        userData.UserAttributes &&
                        userData.UserAttributes.find(
                          (attr) => attr.Name === "phone_number"
                        ).Value}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center"></div>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">purchase history</h2>
                <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <a
                    className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                    href="#"
                  >
                    <img
                      className="object-cover"
                      src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt="product image"
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      39% OFF
                    </span>
                  </a>

                  <div className="mt-4 px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl tracking-tight text-slate-900">
                        Nike Air MX Super 2500 - Red
                      </h5>
                    </a>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold text-slate-900">
                          $449
                        </span>
                        <span className="text-sm text-slate-900 line-through">
                          $699
                        </span>
                      </p>
                      <div class="flex items-center">
                        <svg
                          aria-hidden="true"
                          class="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          // eslint-disable-next-line react/no-unknown-property
                          class="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          class="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          class="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          aria-hidden="true"
                          class="h-5 w-5 text-yellow-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          5.0
                        </span>
                      </div>
                    </div>
                    <a
                      href="#"
                      class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2" // Cambia stroke-width a strokeWidth
                      >
                        <path
                          strokeLinecap="round" // Cambia stroke-linecap a strokeLinecap
                          strokeLinejoin="round" // Cambia stroke-linejoin a strokeLinejoin
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to cart
                    </a>
                  </div>
                </div>

                <h2 className="text-xl font-bold mt-6 mb-4">Mas apartados</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
