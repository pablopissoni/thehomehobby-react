const addToCart = (req, res, connection) => {
  const { userId, productId } = req.body;

  // Generar un ID único de 12 caracteres aleatorios
  const cartId = generateUniqueId();

  // Realizar la inserción en la base de datos
  const query = "INSERT INTO carrito (id, userId, productId) VALUES (?, ?, ?)";
  connection.query(query, [cartId, userId, productId], (error, result) => {
    if (error) {
      console.error("Error al insertar en la base de datos:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res
      .status(201)
      .json({ id: cartId, message: "Producto agregado al carrito con éxito" });
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

module.exports = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
};
