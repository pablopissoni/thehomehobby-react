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
    } = req.body;

    const orderId = generateRandomId(); // Generar el ID del pedido
    const createdAt = new Date().toISOString(); // Obtener la fecha y hora actual

    // Insertar el nuevo pedido en la base de datos
    const query = `INSERT INTO pedidos (id, userId, metodo_pago, envio_type, envio, direccion, phone, city, codigo_postal, estado, cupon_id, productsId, iva, sub_total, total, porcentaje_cupon, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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

module.exports = { createOrder };
