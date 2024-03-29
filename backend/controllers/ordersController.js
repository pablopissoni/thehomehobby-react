const dbConnection = require("../dbConfig");
const stripe = require("stripe")(
  "sk_test_51Ovkt4Hf3yjhBctIofi15f9Pq3Qmu1SEIy8vo5RS0rf8xUkOAf1oAPB2bfOIlQpCX27u1KI9tp1dr148lPr8JCEw00mOJHRm0Y"
);

// Actualiza la función createOrder para que procese el pago con Stripe y cree el pedido en la base de datos
const createOrder = async (req, res) => {
  try {
    const { id, amount, userId, email, cardHolder, billingAddress, zip } =
      req.body;

    // Procesar el pago con Stripe
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Test",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:5173/",
    });

    // Si el pago se realiza correctamente, crear el pedido en la base de datos
    if (payment.status === "succeeded") {
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
          "stripe", // Método de pago (Stripe en este caso)
          req.body.envio_type,
          req.body.envio,
          billingAddress, // Utiliza la dirección de facturación proporcionada por el cliente
          req.body.phone,
          req.body.city,
          zip, // Utiliza el código postal proporcionado por el cliente
          req.body.estado,
          req.body.cupon_id,
          req.body.productsId,
          req.body.iva,
          req.body.sub_total,
          req.body.total,
          req.body.porcentaje_cupon,
          createdAt,
          createdAt, // Se asume que 'updated_at' será igual a 'created_at' al principio
          email,
        ],
        (error, results, fields) => {
          if (error) {
            console.error("Error al crear el pedido:", error);
            res.status(500).json({
              error: "Error interno del servidor al crear el pedido",
              details: error,
            });
          } else {
            res
              .status(201)
              .json({ message: "Pedido creado exitosamente", orderId });
          }
        }
      );
    } else {
      res.status(400).json({ error: "Error en el pago" });
    }
  } catch (error) {
    console.error("Error al procesar el pago y crear el pedido:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Función para generar un ID aleatorio
const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
