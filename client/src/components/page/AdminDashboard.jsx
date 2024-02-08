import React from 'react';

export const AdminDashboard = () => {
  
  
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Barra de navegación superior */}
      <div className="bg-white text-white shadow w-full p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            {/* Mostrado en todos los dispositivos */}
            <img src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png" alt="Logo" className="w-28 h-18 mr-2" />
            <h2 className="font-bold text-xl">Nombre de la Aplicación</h2>
          </div>
          <div className="md:hidden flex items-center">
            {/* Se muestra solo en dispositivos pequeños */}
            <button id="menuBtn">
              <span className="fas fa-bars text-gray-500 text-lg"></span>
              {/* Ícono de menú */}
            </button>
          </div>
        </div>

        {/* Ícono de Notificación y Perfil */}
        <div className="space-x-5">
          <button>
            <span className="fas fa-bell text-gray-500 text-lg"></span>
          </button>
          {/* Botón de Perfil */}
          <button>
            <span className="fas fa-user text-gray-500 text-lg"></span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-wrap">
        {/* Barra lateral de navegación (oculta en dispositivos pequeños) */}
        <div className="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden" id="sideNav">
          <nav>
            <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
              <span className="fas fa-home mr-2"></span>Inicio
            </a>
            <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
              <span className="fas fa-file-alt mr-2"></span>Autorizaciones
            </a>
            <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
              <span className="fas fa-users mr-2"></span>Usuarios
            </a>
            <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
              <span className="fas fa-store mr-2"></span>Comercios
            </a>
            <a className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white" href="#">
              <span className="fas fa-exchange-alt mr-2"></span>Transacciones
            </a>
          </nav>

          {/* Ítem de Cerrar Sesión */}
          <a className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white mt-auto" href="#">
            <span className="fas fa-sign-out-alt mr-2"></span>Cerrar sesión
          </a>

          {/* Señalador de ubicación */}
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>

          {/* Copyright al final de la navegación lateral */}
          <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">Copyright WCSLAT@2023</p>

        </div>

        {/* Área de contenido principal */}
        <div className="flex-1 p-4 w-full md:w-1/2">
          {/* Campo de búsqueda */}
          <div className="relative max-w-md w-full">
            <div className="absolute top-1 left-2 inline-flex items-center p-2">
              <span className="fas fa-search text-gray-400"></span>
            </div>
            <input className="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline" type="search" placeholder="Buscar..." />
          </div>

          {/* Contenedor de Gráficas */}
          <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
            {/* Primer contenedor */}
            {/* Sección 1 - Gráfica de Usuarios */}
            <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Usuarios</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="usersChart"></canvas>
              </div>
            </div>

            {/* Segundo contenedor */}
            {/* Sección 2 - Gráfica de Comercios */}
            <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2">
              <h2 className="text-gray-500 text-lg font-semibold pb-1">Comercios</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <div className="chart-container" style={{ position: 'relative', height: '150px', width: '100%' }}>
                <canvas id="commercesChart"></canvas>
              </div>
            </div>
          </div>

          {/* Tercer contenedor debajo de los dos anteriores */}
          {/* Sección 3 - Tabla de Autorizaciones Pendientes */}
          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h2 className="text-gray-500 text-lg font-semibold pb-4">Autorizaciones Pendientes</h2>
            <div className="my-1"></div>
            <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Foto</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                  <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" className="rounded-full h-10 w-10" /></td>
                  <td className="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
                  <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
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
              <h2 className="text-gray-500 text-lg font-semibold pb-4">Transacciones</h2>
              <div className="my-1"></div>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
              <table className="w-full table-auto text-sm">
                <thead>
                  <tr className="text-sm leading-normal">
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Nombre</th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Fecha</th>
                    <th className="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-grey-lighter">
                    <td className="py-2 px-4 border-b border-grey-light">Carlos Sánchez</td>
                    <td className="py-2 px-4 border-b border-grey-light">27/07/2023</td>
                    <td className="py-2 px-4 border-b border-grey-light text-right">$1500</td>
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
        </div>
      </div>
    </div>
  );
};
