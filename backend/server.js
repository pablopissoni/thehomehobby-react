const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

const dbConfig = {
  host: "thehome.cf42mm20c12e.us-east-1.rds.amazonaws.com",
  user: "adbize",
  password: "Adbize13",
  database: "newschema",
  port: 3306,
};

app.use(bodyParser.json());

// Conectar a la base de datos utilizando createPool
const pool = mysql.createPool(dbConfig);

// Usar las rutas definidas en routes.js
app.use(
  "/api",
  (req, res, next) => {
    req.pool = pool; // Pasar el pool a través de la solicitud
    next();
  },
  routes
);

// Resto del código...
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
