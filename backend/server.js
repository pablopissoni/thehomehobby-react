const express = require("express");
const cors = require("cors");
const multer = require("multer");
const router = require("./routes/productsRoutes");
const usersRouter = require("./routes/usersRoutes");
const dbConnection = require("./dbConfig");

const app = express();
const port = 3001;

// Configuración de CORS
app.use(cors());

const upload = multer();
app.use(upload.any());

app.use(express.json());

// Middleware para pasar la conexión a las rutas
app.use((req, res, next) => {
  req.dbConnection = dbConnection;
  next();
});

// Configuración de la conexión a la base de datos
dbConnection.connect((error) => {
  if (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  } else {
    console.log("Conexión exitosa a la base de datos");

    // Iniciar el servidor solo después de que la conexión a la base de datos sea exitosa
    app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  }
});

app.use("/", router);
app.use("/users", usersRouter);
