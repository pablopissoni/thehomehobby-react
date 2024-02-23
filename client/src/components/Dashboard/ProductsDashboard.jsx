import axios from "axios";
import React, { useState } from "react";
import { FormEdirProd } from "./FormEdirProd";

export const ProductsDashboard = () => {
  //* --- HOOKS ---
  const [searchTerm, setSearchTerm] = useState(""); // Input de busqueda
  const [producSearchs, setProducSearchs] = useState([]); //Productos encontrados
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [editTempProduct, setEditTempProduct] = useState({});
  console.log("🚀 ~ editTempProduct >>> ", editTempProduct);
  const [paginationData, setPaginationData] = useState({
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalItems: null,
    totalPages: null,
  });

  // ---- HOOKS ---

  //* ---- Get Products by search ----
  async function getProducts(name, page = 1) {
    const isLocal = window.location.href.includes("localhost");
    const urlGetProductsId = isLocal
      ? `http://localhost:3001/productos?name=${name}&page=${page}`
      : `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${name}&page=${page}`;
    try {
      const response = await axios(urlGetProductsId);
      setProducSearchs(response.data.data);
      setPaginationData(response.data.info);
    } catch (error) {
      setProducSearchs({ message: "no products found" });
      console.error("Error en getProduct ID >>> ", error);
    }
  }
  // ---- Get Products by search ----

  //* --- HANDLEs ---
  const handleEdit = (product) => {
    setEditTempProduct(product);
    setIsFormEdit(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm == "") {
      return;
    } else {
      getProducts(searchTerm);
      //   navigate(`products/${searchTerm}`);
    }
  };
  // --- HANDLEs ---
  return (
    <div>
        <div className="mb-4">
        {/* {isFormEdit && <FormAddProd prodEdit={editTempProduct} setCloseModal={setIsFormEdit}/>} */}
        {isFormEdit && <FormEdirProd prodEdit={editTempProduct} setCloseModal={setIsFormEdit}/>}
        {/* {isFormEdit && <div>{editTempProduct.nombre_es}</div>} */}
        </div>
      {/* SearchBar  */}
      <div
        className={`header-search transition-all-300 order-3 col-span-4 mt-[10px] self-center lg:order-2 lg:col-span-6 lg:mt-0
            }`}
      >
        <form className="search" onSubmit={handleSearch}>
          <div className="flex h-[40px] overflow-hidden rounded-[50px] bg-white">
            <input
              className="search w-full border-none bg-transparent py-[5px] pl-5 text-black focus:border-none focus:ring-0 focus:ring-transparent"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
            <button className="btn-search px-3 text-red-600" type="submit">
              <i className="bi bi-search flex text-xl"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Sección - Tabla de Productos */}
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">
          Productos encontrados <strong>{paginationData.totalItems}</strong>{" "}
          de: <strong>{searchTerm}</strong>
        </h2>
        <div className="my-1"></div>
        {/* Espacio de separación */}
        <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
        {/* Línea con gradiente */}
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Foto
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Nombre
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Precio
              </th>
              <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                ID
              </th>
              <th className="py-2 px-2 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Mod
              </th>
            </tr>
          </thead>
          <tbody>
            {producSearchs &&
              producSearchs?.map((product, index) => (
                <tr key={index} className="hover:bg-grey-lighter">
                  <td className="py-2 px-4 border-b border-grey-light">
                    <img
                      src={product?.imagen}
                      alt="Foto Perfil"
                      className="rounded-full h-10 w-10"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    {product?.nombre_ingles || product?.nombre_es}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    $ {product?.precio_base}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    # {product?.id}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light transition-transform duration-300 hover:scale-150">
                  <button onClick={() => handleEdit(product)}>
                      <i className="bi bi-pen hover:text-blue-500"></i>
                    </button>
                  </td>
                </tr>
              ))}
            {/* Añade más filas aquí como la anterior para cada autorización pendiente */}
          </tbody>
        </table>

        {/* Botón "Ver más" para la tabla de Autorizaciones Pendientes */}
        {/* <div className="text-right mt-4">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
            Ver más
          </button>
        </div> */}
      </div>
    </div>
  );
};
