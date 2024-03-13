const addToCart = (req, res, connection) => {
  const { userId, productId } = req.body;

  // Verificar si el userId existe en la tabla de usuarios
  const userQuery = "SELECT * FROM users WHERE id = ?";
  connection.query(userQuery, [userId], (error, userResult) => {
    if (error) {
      console.error("Error al verificar el usuario:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Si no se encontró ningún usuario con el userId proporcionado, devolver un error
    if (userResult.length === 0) {
      return res.status(404).json({ error: "El usuario no existe" });
    }

    // Generar un ID único de 12 caracteres aleatorios
    const cartId = generateUniqueId();

    // Realizar la inserción en la base de datos
    const query =
      "INSERT INTO carrito (id, userId, productId) VALUES (?, ?, ?)";
    connection.query(query, [cartId, userId, productId], (error, result) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        return res.status(500).json({ error: "Error en el servidor" });
      }
      res.status(201).json({
        id: cartId,
        message: "Producto agregado al carrito con éxito",
      });
    });
  });
};

// Función para generar un ID único de 12 caracteres alfanuméricos
const generateUniqueId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 15; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

const removeFromCart = (req, res, connection) => {
  const cartItemId = req.params.id; // Obtener el ID del elemento del carrito a eliminar

  // Realizar la eliminación en la base de datos
  const query = "DELETE FROM carrito WHERE id = ?";
  connection.query(query, [cartItemId], (error, result) => {
    if (error) {
      console.error("Error al eliminar elemento del carrito:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Elemento del carrito no encontrado" });
    }

    res.json({ message: "Elemento del carrito eliminado con éxito" });
  });
};

const getCartByUserId = (req, res, connection) => {
  const userId = req.params.userId;

  // Consultar todos los productos en el carrito para el userId especificado
  const query = "SELECT * FROM carrito WHERE userId = ?";
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error al consultar el carrito:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Si no se encontraron productos en el carrito para el userId proporcionado, devolver un mensaje
    if (results.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron productos en el carrito para el usuario especificado",
      });
    }

    // Devolver los productos encontrados en el carrito
    res.status(200).json(results);
  });
};

module.exports = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCartByUserId: getCartByUserId,
};
