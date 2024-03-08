import React, { useEffect, useState } from "react";
import axios from "axios";

export const EditUsers = () => {
  //* ----- USE STATE -----
  const [users, setUsers] = useState([]);

  console.log("🚀 ~ EditUsers ~ users:", users);
  // ----- USE STATE -----

  //* ----------- PUT ------------
    const handleRoleUser = async (id, userRole) => {
        try{
        const newRole = userRole === "user" ? "admin" : "user";

        // peticion desde localhost o deploy
        const isLocalhost = window.location.href.includes("localhost");
        const urlCategories = isLocalhost
          ? `http://localhost:3001/users/${id}`
          : `https://thehomehobby-react.onrender.com/users/${id}`;

        const response = await axios.put(urlCategories, { role: newRole });
        console.log("🚀 ~ handleRoleUser ~ response: ", response);
        getUsers();
      } catch (error) {
        console.error("Error al Editar el Rol del Usuario: ", error);
      }
    }

    
  // ----------- PUT ------------
  
  //* ----------- GETs ------------
  async function getUsers() {
    try {
      // peticion desde localhost o deploy
      const isLocalhost = window.location.href.includes("localhost");
      const urlCategories = isLocalhost
        ? "http://localhost:3001/users/getusers"
        : "https://thehomehobby-react.onrender.com/users/getusers";

      const response = await axios.get(urlCategories);
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener USERS:", error);
    }
  }
  // ----------- GETs ------------

  //* ----------- USE EFFECT ------------
  useEffect(() => {
    getUsers();
  }, []);
  //  ----------- USE EFFECT ------------

  return (
    <div>
      {/* Sección - Tabla de Productos */}
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500 text-lg font-semibold ">Usuarios</h2>
        <div className="my-1"></div>
        {/* Espacio de separación */}
        {/* Línea con gradiente */}
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 pr-2 bg-grey-lightest text-left font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                *
              </th>
              <th className="py-2 px-2 bg-grey-lightest text-left font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                ID
              </th>
              <th className="py-2 px-2 bg-grey-lightest text-left font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Nombre
              </th>
              <th className="py-2 px-2 bg-grey-lightest text-left font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Apellido
              </th>
              <th className="py-2 px-2 bg-grey-lightest text-left font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Email
              </th>
              <th className="py-2 px-2 bg-grey-lightest text-left font-bold uppercase text-sm text-grey-light border-b border-gray-400">
                Telefono
              </th>
              <th className="py-2 px-2 bg-grey-lightest  font-bold uppercase text-sm text-grey-light border-b text-center border-gray-400">
                role
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user, index) => (
                <tr key={index} className="hover:bg-grey-lighter">
                  <td className="py-2 px-4 border-b border-grey-light">
                    <i className="bi bi-person-fill"></i>
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    # {user?.id}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    {user?.name}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    {user?.lastname}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    $ {user?.email}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light">
                    {user?.phone}
                  </td>
                  <td className="py-2 px-4 border-b border-grey-light transition-transform duration-300 hover:scale-110 hover:text-blue-500  hover:font-bold text-center">
                    <button onClick={() => handleRoleUser(user.id, user.role)} className="bg-slate-200 px-2 rounded-lg">
                      {user?.role}
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
