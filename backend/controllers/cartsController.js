const addToCart = (req, res, connection) => {
  const { userId, productId, quantity } = req.body;

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

    // Generar un ID único de 12 caracteres aleatorios para el elemento del carrito
    const cartItemId = generateUniqueId();

    // Realizar la inserción en la base de datos
    const query =
      "INSERT INTO carrito (id, userId, productId, quantity) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [cartItemId, userId, productId, quantity],
      (error, result) => {
        if (error) {
          console.error("Error al insertar en la base de datos:", error);
          return res.status(500).json({ error: "Error en el servidor" });
        }
        res.status(201).json({
          id: cartItemId,
          message: "Producto agregado al carrito con éxito",
        });
      }
    );
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

  const query = "SELECT * FROM carrito WHERE userId = ?";
  connection.query(query, [userId], (error, cartResults) => {
    if (error) {
      console.error("Error al consultar el carrito:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (cartResults.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron productos en el carrito para el usuario especificado",
      });
    }

    const productIds = cartResults.map((cartItem) => cartItem.productId);
    console.log("Product IDs:", productIds);

    const productQuery =
      "SELECT id, imagen, nombre_ingles, oferta_id, precio_base FROM productos WHERE id IN (?)";
    connection.query(productQuery, [productIds], (error, productResults) => {
      if (error) {
        console.error(
          "Error al consultar la información de los productos:",
          error
        );
        return res.status(500).json({ error: "Error en el servidor" });
      }

      console.log("Product Results:", productResults);

      const mergedResults = cartResults.map((cartItem) => {
        const product = productResults.find(
          (product) => product.id.toString() === cartItem.productId
        );
        if (product) {
          // Agregar la URL base a la imagen del producto
          product.imagen =
            "https://thehomehobby.s3.amazonaws.com" + product.imagen;
        }
        const mergedItem = {
          id: cartItem.id,
          userId: cartItem.userId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          product: product, // Aquí se agrega la información completa del producto
        };
        return mergedItem;
      });

      console.log("Merged Results:", mergedResults);

      res.status(200).json(mergedResults);
    });
  });
};

module.exports = {
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCartByUserId: getCartByUserId,
};
