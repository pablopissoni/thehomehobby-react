const express = require("express");
const router = express.Router();

// Define tus rutas aquí
router.get("/productos", (req, res) => {
  const query = "SELECT * FROM newschema.productos LIMIT 2;";
  console.log("Consulta SQL:", query);

  // Ejemplo de consulta utilizando la conexión
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error en la consulta a la base de datos:", error);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    console.log("Resultados de la consulta:", results);
    res.json(results);
  });
});

// Más rutas...

module.exports = router;
