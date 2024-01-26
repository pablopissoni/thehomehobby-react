const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3001;

// Configuración de CORS
app.use(cors());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "tu_usuario",
  password: "tu_contraseña",
  database: "nombre_de_la_base_de_datos",
});

// Conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Ruta para obtener los primeros 10 IDs
app.get("/api/ids", (req, res) => {
  const query = "SELECT id FROM productos LIMIT 10";
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

// Otras rutas...

// Ruta de ejemplo
app.get("/api/ejemplo", (req, res) => {
  res.json({ mensaje: "Esta es una ruta de ejemplo" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
