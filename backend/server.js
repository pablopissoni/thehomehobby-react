const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const router = require("./routes");

const app = express();
const port = 3001;

// Configuración de CORS
app.use(cors());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "thehome.cf42mm20c12e.us-east-1.rds.amazonaws.com",
  user: "adbize",
  password: "Adbize13",
  database: "newschema",
});

// Conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Rutas
app.use("/", router(connection));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
