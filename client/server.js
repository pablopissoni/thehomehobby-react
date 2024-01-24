import express from 'express';
import mysql from 'mysql';

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'thehome.cf42mm20c12e.us-east-1.rds.amazonaws.com',
  user: 'adbize',
  password: 'Adbize13',
  database: 'newschema',
  port: 3306,
};

const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta para obtener los primeros dos productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM newschema.productos LIMIT 2;';

  console.log('Consulta SQL:', query);

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta a la base de datos:', error);
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }

    // Imprimir los resultados en la consola
    console.log('Resultados de la consulta:', results);

    // Enviar los resultados como respuesta al cliente
    res.json(results);
  });
});

// Capturar eventos de error de la conexión
connection.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
