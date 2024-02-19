import React from "react";
import { Link } from "react-router-dom";

export const Paginado = ({ getProducts, id, paginationData }) => {
  // Extraer los datos de paginación necesarios
  const { currentPage, totalPages } = paginationData;

  // Calcular el rango de páginas a mostrar
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Ajustar el rango si es necesario para evitar números de página negativos o superiores al total
  if (totalPages <= maxPagesToShow) {
    // Si hay menos páginas que el máximo a mostrar, mostrar todas las páginas
    startPage = 1;
    endPage = totalPages;
  } else {
    // Si el número actual de página está cerca del extremo, ajustar el inicio o el final del rango
    if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
      // Si la página actual está cerca del principio, mostrar las primeras páginas
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
      // Si la página actual está cerca del final, mostrar las últimas páginas
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    }
  }

  // Generar los enlaces para las páginas
  const pageLinks = [];
  for (let i = startPage; i <= endPage; i++) {
    pageLinks.push(
      <Link
        key={i}
        to="#"
        onClick={() => getProducts(id, i)}
        className={`relative inline-flex items-center px-4 py-2 text-sm ${
          i == currentPage
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-200"
        } border border-fuchsia-100 leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center my-4">
      <nav className="flex space-x-2" aria-label="Pagination">
        {/* Botón para ir a la página anterior */}
        {/* {currentPage > 1 && (
          <Link
            to="#"
            onClick={() => getProducts(id, currentPage - 1)}
            className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            Previous
          </Link>
        )} */}

        {/* Enlaces para las páginas */}
        {pageLinks}

        {/* Botón para ir a la página siguiente */}
        {/* {currentPage < totalPages && (
          <Link
            to="#"
            onClick={() => getProducts(id, currentPage + 1)}
            className="relative inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-violet-300 to-indigo-300 border border-fuchsia-100 hover:border-violet-100 text-white font-semibold cursor-pointer leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
          >
            Next
          </Link>
        )} */}
      </nav>
    </div>
  );
};
