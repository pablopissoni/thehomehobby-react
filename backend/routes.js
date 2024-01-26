const express = require("express");
const router = express.Router();

module.exports = function (connection) {
  // Ruta para obtener la lista completa de productos
  router.get("/productos", (req, res) => {
    const query = "SELECT * FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
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
