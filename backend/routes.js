const express = require("express");
const router = express.Router();

module.exports = function (connection) {
  // Ruta para obtener la lista completa de productos
  router.get("/productos", (req, res) => {
    const page = req.query.page || 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const searchTerm = req.query.name || "";

    const countQuery =
      "SELECT COUNT(*) as total FROM productos WHERE nombre_es LIKE ? OR nombre_ingles LIKE ?";
    connection.query(
      countQuery,
      [`%${searchTerm}%`, `%${searchTerm}%`],
      (error, countResult) => {
        if (error) {
          console.error("Error al realizar la consulta:", error);
          res.status(500).json({ error: "Error en el servidor" });
        } else {
          const total = countResult[0].total;
          const totalPages = Math.ceil(total / pageSize);
          const nextPage = page < totalPages ? parseInt(page) + 1 : null;
          const previousPage = page > 1 ? parseInt(page) - 1 : null;

          if (page < 1 || page > totalPages) {
            res.status(404).json({ error: "Página no encontrada" });
          } else {
            const query =
              "SELECT * FROM productos WHERE nombre_es LIKE ? OR nombre_ingles LIKE ? LIMIT ? OFFSET ?";
            connection.query(
              query,
              [`%${searchTerm}%`, `%${searchTerm}%`, pageSize, offset],
              (error, results) => {
                if (error) {
                  console.error("Error al realizar la consulta:", error);
                  res.status(500).json({ error: "Error en el servidor" });
                } else {
                  if (results.length === 0) {
                    res.status(404).json({
                      error: "No se encontraron productos en esta página",
                    });
                  } else {
                    const response = {
                      info: {
                        totalItems: total,
                        totalPages: totalPages,
                        currentPage: page,
                        nextPage: nextPage,
                        previousPage: previousPage,
                      },
                      data: results,
                    };
                    res.json(response);
                  }
                }
              }
            );
          }
        }
      }
    );
  });
  // Ruta para buscar un producto por ID
  router.get("/productos/:id", (req, res) => {
    const productId = req.params.id;
    const query = "SELECT * FROM productos WHERE id = ?";
    connection.query(query, [productId], (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else if (results.length === 0) {
        res.status(404).json({ error: "El producto no fue encontrado" });
      } else {
        res.json(results[0]);
      }
    });
  });

  router.get("/ejemplo", (req, res) => {
    res.json({ mensaje: "Esta es una ruta de ejemplo" });
  });

  return router;
};
