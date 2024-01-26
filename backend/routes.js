const express = require("express");
const router = express.Router();

module.exports = function (connection) {
  // Ruta para obtener los primeros 10 IDs
  router.get("/ids", (req, res) => {
    const query = "SELECT id FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        const ids = results.map((row) => row.id);
        res.json(ids);
      }
    });
  });

  // Ruta para obtener la tabla "contenido"
  router.get("/contenido", (req, res) => {
    const query = "SELECT contenido FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
  });

  // Ruta para obtener la tabla "nombre_es"
  router.get("/nombre_es", (req, res) => {
    const query = "SELECT nombre_es FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
  });

  // Ruta para obtener la tabla "nombre_ingles"
  router.get("/nombre_ingles", (req, res) => {
    const query = "SELECT nombre_ingles FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
  });

  // Ruta para obtener la tabla "tags"
  router.get("/tags", (req, res) => {
    const query = "SELECT tags FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
  });

  // Ruta para obtener la tabla "marca_id"
  router.get("/marca_id", (req, res) => {
    const query = "SELECT marca_id FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
  });

  // Ruta para obtener la tabla "sub_categoria_id"
  router.get("/sub_categoria_id", (req, res) => {
    const query = "SELECT sub_categoria_id FROM productos";
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al realizar la consulta:", error);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        res.json(results);
      }
    });
  });

  // Otras rutas...

  // Ruta de ejemplo
  router.get("/ejemplo", (req, res) => {
    res.json({ mensaje: "Esta es una ruta de ejemplo" });
  });

  return router;
};
