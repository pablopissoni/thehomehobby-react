const express = require("express");
const router = express.Router();

// Middleware para recibir el pool como parámetro
const withPool = (pool) => (req, res, next) => {
  req.pool = pool;
  next();
};

// Ruta para obtener todos los productos
router.get("/productos", withPool, (req, res) => {
  const pool = req.pool;
  const query = "SELECT * FROM newschema.productos;";

  console.log("Consulta SQL:", query);

  // Ejemplo de consulta utilizando el pool
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error en la consulta a la base de datos:", error);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    console.log("Resultados de la consulta:", results);
    res.json(results);
  });
});

// Otras rutas...

module.exports = router;
