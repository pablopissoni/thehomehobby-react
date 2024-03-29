const dbConnection = require("../dbConfig");

const generateRandomId = () => {
  // Generar un ID aleatorio de 12 caracteres
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Controlador para crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtener el userId de la URL

    const {
      metodo_pago,
      envio_type,
      envio,
      direccion,
      phone,
      city,
      codigo_postal,
      estado,
      cupon_id,
      productsId,
      iva,
      sub_total,
      total,
      porcentaje_cupon,
      email,
    } = req.body;

    const orderId = generateRandomId(); // Generar el ID del pedido
    const createdAt = new Date().toISOString(); // Obtener la fecha y hora actual

    // Insertar el nuevo pedido en la base de datos
    const query = `INSERT INTO pedidos (id, userId, metodo_pago, envio_type, envio, direccion, phone, city, codigo_postal, estado, cupon_id, productsId, iva, sub_total, total, porcentaje_cupon, created_at, updated_at, email)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    dbConnection.query(
      query,
      [
        orderId,
        userId,
        metodo_pago,
        envio_type,
        envio,
        direccion,
        phone,
        city,
        codigo_postal,
        estado,
        cupon_id,
        productsId,
        iva,
        sub_total,
        total,
        porcentaje_cupon,
        createdAt,
        createdAt, // Se asume que 'updated_at' será igual a 'created_at' al principio
        email,
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error al crear el pedido:", error);
          res.status(500).json({ error: "Error interno del servidor" });
        } else {
          res
            .status(201)
            .json({ message: "Pedido creado exitosamente", orderId });
        }
      }
    );
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Consulta para obtener todos los pedidos
    const query = "SELECT * FROM pedidos";
    dbConnection.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error al obtener los pedidos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Obtener el orderId de la URL

    // Consulta para eliminar el pedido por su ID
    const query = "DELETE FROM pedidos WHERE id = ?";
    dbConnection.query(query, [orderId], (error, results, fields) => {
      if (error) {
        console.error("Error al eliminar el pedido:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        // Verificar si alguna fila fue afectada por la consulta
        if (results.affectedRows > 0) {
          res.status(200).json({ message: "Pedido eliminado exitosamente" });
        } else {
          res.status(404).json({ error: "El pedido no existe" });
        }
      }
    });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { createOrder, getAllOrders, deleteOrder };
