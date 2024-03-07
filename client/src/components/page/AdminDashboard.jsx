import React, { useEffect, useState } from "react";
import LogoMini from "../../assets/Logo miniatura.svg";
import { FormAddProd } from "../Dashboard/FormAddProd";
import { Link } from "react-router-dom";
import { ProductsDashboard } from "../Dashboard/ProductsDashboard";
import axios from "axios";
import { EditUsers } from "../Dashboard/EditUsers";

export const AdminDashboard = () => {
  // Estado para controlar la visibilidad del menú lateral
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isOriginalOpen, setOriginalOpen] = useState(false);
  const [isFormAddProd, setIsFormAddProd] = useState(false); // Nuevo producto
  const [isProducts, setIsProducts] = useState(false); // Lista de productos y Edicion
  const [isEditUsers, setIsEditUsers] = useState(false); // Lista de Users y Edicion
  const [categories, setCategories] = useState([]); // Get Categories
  const [subCategories, setSubCategories] = useState([]); // Get SubCategories
  const [marcas, setMarcas] = useState([]); // Get Marcas
  const [ofertas, setOfertas] = useState([]); // Get Marcas

  //* ----------- GETs ------------
  async function getCategories() {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlCategories = isLocalhost
        ? "http://localhost:3001/categories"
        : "https://thehomehobby-react.onrender.com/categories";

      const response = await axios.get(urlCategories);
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  }

  async function getSubCategories() {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlSubCategories = isLocalhost
        ? "http://localhost:3001/subcategories"
        : "https://thehomehobby-react.onrender.com/subcategories";
      // const urlSubCategories = "https://thehomehobby-react.onrender.com/subcategories";

      const response = await axios.get(urlSubCategories);
      // console.log("🚀 ~ getSubCategories ~ response:", response)
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las SubCategories:", error);
    }
  }

  async function getMarcas() {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlMarcas = isLocalhost
        ? "http://localhost:3001/marcas"
        : "https://thehomehobby-react.onrender.com/marcas";
      // const urlSubCategories = "https://thehomehobby-react.onrender.com/subcategories";

      const response = await axios.get(urlMarcas);
      // console.log("🚀 ~ getSubCategories ~ response:", response)
      setMarcas(response.data);
    } catch (error) {
      console.error("Error al obtener las Marcas:", error);
    }
  }

  async function getOfertas() {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlOfertas = isLocalhost
        ? "http://localhost:3001/ofertas"
        : "https://thehomehobby-react.onrender.com/ofertas";

      const response = await axios.get(urlOfertas);
      // console.log("🚀 ~ getSubCategories ~ response:", response)
      setOfertas(response.data);
    } catch (error) {
      console.error("Error al obtener las Ofertas:", error);
    }
  }
  //  ----------- GETs ------------

  //* ------ USE EFFECT --------
  useEffect(() => {
    getCategories();
    getSubCategories();
    getMarcas();
    getOfertas();
  }, []);
  //  ------ USE EFFECT --------

  // Función para alternar la visibilidad del menú lateral
  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  // Función para alternar la visibilidad del formulario de productos
  const toggleTitleOpen = (setOpen) => {
    setOriginalOpen(false);
    setIsFormAddProd(false);
    setIsProducts(false);
    setIsEditUsers(false);
    setOpen(true);
  };

  return (
    <div className="flex flex-col h-auto bg-gray-100">
      {/* Barra de navegación superior */}
      <div className="bg-white shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center  w-full">
          {" "}
          {/* se agrego w-full */}
          <div className="flex items-center">
            {/* Mostrado en todos los dispositivos */}
            <img src={LogoMini} alt="Logo" className="w-28 h-10 mr-2" />
            <h2 className="text-2xl font-bold ">
              The <span className="text-red-700">Home Hobby </span>
            </h2>
          </div>
          <div className="md:hidden flex items-center ml-auto">
            {/* Se muestra solo en dispositivos pequeños */}
            <button onClick={toggleSideNav}>
              <i className="bi bi-list text-gray-500 text-lg"></i>
              {/* Ícono de menú */}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-wrap">
        {/* Barra lateral de navegación (oculta en dispositivos pequeños) */}
        <div
          className={`p-2 bg-white w-full md:w-60 flex flex-col md:flex ${
            isSideNavOpen ? "" : "hidden"
          }`}
        >
          <nav>
            <Link
              className={`block cursor-pointer text-gray-500 py-2.5 px-4 my-4 font-bold rounded  transition duration-200 ${
                isFormAddProd
                  ? "bg-gradient-to-r from-red-800 to-red-500 text-white"
                  : ""
              } hover:bg-gradient-to-r hover:from-red-500 hover:to-red-300 hover:text-white`}
              // href="#"
              onClick={() => toggleTitleOpen(setIsFormAddProd)}
            >
              <i className="fas fa-file-alt mr-2"></i>Agregar Producto
            </Link>
            <Link
              className={`block cursor-pointer text-gray-500 py-2.5 px-4 my-4 font-bold rounded  transition duration-200 ${
                isProducts
                  ? "bg-gradient-to-r from-red-800 to-red-500 text-white"
                  : ""
              } hover:bg-gradient-to-r hover:from-red-500 hover:to-red-300 hover:text-white`}
              // href="#"
              onClick={() => toggleTitleOpen(setIsProducts)}
            >
              <i className="fas fa-file-alt mr-2"></i>Producto / Editar
            </Link>
            <Link
              className={`block cursor-pointer text-gray-500 py-2.5 px-4 my-4 font-bold rounded  transition duration-200 ${
                isEditUsers
                  ? "bg-gradient-to-r from-red-800 to-red-500 text-white"
                  : ""
              } hover:bg-gradient-to-r hover:from-red-500 hover:to-red-300 hover:text-white`}
              // href="#"
              onClick={() => toggleTitleOpen(setIsEditUsers)}
            >
              <i className="fas fa-file-alt mr-2"></i>Users / Editar
            </Link>
            <Link
              className={`block cursor-pointer text-gray-500 py-2.5 px-4 my-4 font-bold rounded  transition duration-200 ${
                isOriginalOpen
                  ? "bg-gradient-to-r from-red-800 to-red-500 text-white"
                  : ""
              } hover:bg-gradient-to-r hover:from-red-500 hover:to-red-300 hover:text-white`}
              onClick={() => toggleTitleOpen(setOriginalOpen)}
              // href="#"
            >
              <i className="fas fa-exchange-alt mr-2"></i>Original - test
            </Link>
          </nav>

          {/* Ítem de Cerrar Sesión */}
          {/* <a
            className="block text-gray-500 py-2.5 px-4 my-2 font-bold rounded transition duration-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-300 hover:text-white mt-auto"
            href="#"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Cerrar sesión
          </a> */}

          {/* Señalador de ubicación */}
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>

          {/* Copyright al final de la navegación lateral
          <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">
            Copyright WCSLAT@2023
          </p> */}
        </div>

        {/* Área de contenido principal */}
        <div className="flex-1 p-4 w-full md:w-1/2">
          {/* Agregar Producto */}
          {isFormAddProd && (
            <FormAddProd
              setCloseModal={setIsFormAddProd}
              categories={categories}
              subCategories={subCategories}
              marcas={marcas}
              ofertas={ofertas}
            />
          )}
          {/* Buscar productos y editar */}
          {isProducts && <ProductsDashboard setCloseModal={setIsFormAddProd} />}
          {/* Editar Usuarios */}
          {isEditUsers && <EditUsers setCloseModal={setIsEditUsers} />}
          {/*//! Oculto   */}
          {isOriginalOpen && (
            <>
              {/* Campo de búsqueda */}
              <div className="relative max-w-md w-full">
                <div className="absolute top-1 left-2 inline-flex items-center p-2">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline"
                  type="search"
                  placeholder="Buscar..."
                />
              </div>
              {/* Contenedor de Gráficas */}
              <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
                {/* Primer contenedor */}
                {/* Sección 1 - Gráfica de Usuarios */}
                <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                  <h2 className="text-gray-500 text-lg font-semibold pb-1">
                    Usuarios
                  </h2>
                  <div className="my-1"></div>
                  {/* Espacio de separación */}
                  <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                  {/* Línea con gradiente */}
                  <div
                    className="chart-container"
                    style={{
                      position: "relative",
                      height: "150px",
                      width: "100%",
                    }}
                  ></div>
                </div>

                {/* Segundo contenedor */}
                {/* Sección 2 - Gráfica de Comercios */}
                <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
                  <h2 className="text-gray-500 text-lg font-semibold pb-1">
                    Comercios
                  </h2>
                  <div className="my-1"></div>
                  {/* Espacio de separación */}
                  <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                  {/* Línea con gradiente */}
                  <div
                    className="chart-container"
                    style={{
                      position: "relative",
                      height: "150px",
                      width: "100%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Tercer contenedor debajo de los dos anteriores */}
              {/* Sección 3 - Tabla de Autorizaciones Pendientes */}
              <div className="mt-8 bg-white p-4 shadow rounded-lg">
                <h2 className="text-gray-500 text-lg font-semibold pb-4">
                  Autorizaciones Pendientes
                </h2>
                <div className="my-1"></div>
                {/* Espacio de separación */}
                <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                {/* Línea con gradiente */}
                <table className="w-full table-auto text-sm">
                  <thead>
                    <tr className="text-sm leading-normal">
                      <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                        Foto
                      </th>
                      <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                        Nombre
                      </th>
                      <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                        Rol
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-grey-lighter">
                      <td className="py-2 px-4 border-b border-grey-light">
                        <img
                          src="https://via.placeholder.com/40"
                          alt="Foto Perfil"
                          className="rounded-full h-10 w-10"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-grey-light">
                        Juan Pérez
                      </td>
                      <td className="py-2 px-4 border-b border-grey-light">
                        Comercio
                      </td>
                    </tr>
                    {/* Añade más filas aquí como la anterior para cada autorización pendiente */}
                  </tbody>
                </table>

                {/* Botón "Ver más" para la tabla de Autorizaciones Pendientes */}
                <div className="text-right mt-4">
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                    Ver más
                  </button>
                </div>
              </div>

              {/* Cuarto contenedor */}
              {/* Sección 4 - Tabla de Transacciones */}
              <div className="mt-8 bg-white p-4 shadow rounded-lg">
                <div className="bg-white p-4 rounded-md mt-4">
                  <h2 className="text-gray-500 text-lg font-semibold pb-4">
                    Transacciones
                  </h2>
                  <div className="my-1"></div>
                  {/* Espacio de separación */}
                  <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                  {/* Línea con gradiente */}
                  <table className="w-full table-auto text-sm">
                    <thead>
                      <tr className="text-sm leading-normal">
                        <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-500 border-b border-gray-300">
                          Nombre
                        </th>
                        <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-500 border-b border-gray-300">
                          Fecha
                        </th>
                        <th className="py-2 px-4 bg-gray-200 font-bold uppercase text-sm text-gray-500 border-b border-gray-300 text-right">
                          Monto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">
                          Carlos Sánchez
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          27/07/2023
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300 text-right">
                          $1500
                        </td>
                      </tr>
                      {/* Añade más filas aquí como la anterior para cada transacción */}
                    </tbody>
                  </table>
                  {/* Botón "Ver más" para la tabla de Transacciones */}
                  <div className="text-right mt-4">
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
