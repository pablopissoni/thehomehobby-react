const parsers = require("../parsers/parsers");

// Lógica para obtener todos los productos
const getAllProducts = (req, res, connection) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const searchTerm = req.query.name || "";
  const colorFilter = req.query.color || ""; // Nuevo filtro por color

  let countQuery =
    "SELECT COUNT(*) as total FROM productos WHERE (nombre_es LIKE ? OR nombre_ingles LIKE ?)";
  let countParams = [`%${searchTerm}%`, `%${searchTerm}%`];

  // Agregar filtro por color si se proporciona
  if (colorFilter) {
    countQuery += " AND JSON_SEARCH(filtros, 'one', ?) IS NOT NULL";
    countParams.push(colorFilter);
  }

  connection.query(countQuery, countParams, (error, countResult) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / pageSize);
    const nextPage = page < totalPages ? parseInt(page) + 1 : null;
    const previousPage = page > 1 ? parseInt(page) - 1 : null;

    if (page < 1 || page > totalPages) {
      return res.status(404).json({ error: "Página no encontrada" });
    }

    let query =
      "SELECT * FROM productos WHERE (nombre_es LIKE ? OR nombre_ingles LIKE ?)";
    let queryParams = [`%${searchTerm}%`, `%${searchTerm}%`];

    // Agregar filtro por color si se proporciona
    if (colorFilter) {
      query += " AND JSON_SEARCH(filtros, 'one', ?) IS NOT NULL";
      queryParams.push(colorFilter);
    }

    query += " LIMIT ? OFFSET ?";

    connection.query(
      query,
      [...queryParams, pageSize, offset],
      (error, results) => {
        if (error) {
          console.error("Error al realizar la consulta:", error);
          return res.status(500).json({ error: "Error en el servidor" });
        }

        if (results.length === 0) {
          return res.status(404).json({
            error: "No se encontraron productos en esta página",
          });
        }

        // Formatear el contenido, las etiquetas, la galería y los filtros para cada producto
        const formattedResults = results.map((product) => {
          // Agregar la URL base a los campos de "imagen" y "galeria"
          const formattedProduct = {
            ...product,
            contenido: parsers.parseContent(product.contenido),
            tags: parsers.parseTags(product.tags),
            // Agregar la URL base a la imagen
            imagen: `https://thehomehobby.s3.amazonaws.com${product.imagen}`,
            // Mapear sobre la galería y agregar la URL base a cada enlace
            galeria: JSON.parse(product.galeria).map((item) => ({
              url: `https://thehomehobby.s3.amazonaws.com${item.url}`,
            })),
            filtros: parsers.parseFilters(product.filtros),
          };

          return formattedProduct;
        });

        const response = {
          info: {
            totalItems: total,
            totalPages: totalPages,
            currentPage: page,
            nextPage: nextPage,
            previousPage: previousPage,
          },
          data: formattedResults,
        };

        res.json(response);
      }
    );
  });
};

// Lógica para obtener un producto por ID
const getProductById = (req, res, connection) => {
  const productId = req.params.id;
  const query = "SELECT * FROM productos WHERE id = ?";
  connection.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ error: "Error en el servidor" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "El producto no fue encontrado" });
    }
    // } else {
    //   res.json(results[0]);
    // }

    // Formatear el contenido, las etiquetas, la galería y los filtros para cada producto
    const formattedResults = results.map((product) => {
      // Agregar la URL base a los campos de "imagen" y "galeria"
      const formattedProduct = {
        ...product,
        contenido: parsers.parseContent(product.contenido),
        tags: parsers.parseTags(product.tags),
        // Agregar la URL base a la imagen
        imagen: `https://thehomehobby.s3.amazonaws.com${product.imagen}`,
        galeria: JSON.parse(product.galeria).map((item) => ({
          url: `https://thehomehobby.s3.amazonaws.com${item.url}`,
        })),
        filtros: parsers.parseFilters(product.filtros),
      };

      return formattedProduct;
    });

    res.json(formattedResults);
  });
};

// Lógica para crear un nuevo producto
const createProduct = (req, res, connection) => {
  const {
    contenido,
    nombre_es,
    nombre_ingles,
    tags,
    marca_id,
    sub_categoria_id,
    imagen,
    galeria,
    categoria_id,
    status,
    video,
    oferta_id,
    precio_base,
    filtros,
    envio_free,
    envio_rapido,
  } = req.body;

  // Verifica que se haya proporcionado al menos el nombre_es
  if (!nombre_es) {
    return res
      .status(400)
      .json({ error: "El campo 'nombre_es' es obligatorio" });
  }

  const nuevoProducto = {
    contenido,
    nombre_es,
    nombre_ingles,
    tags: JSON.stringify(tags), // Convertir el array a formato JSON
    marca_id,
    sub_categoria_id,
    imagen,
    galeria: JSON.stringify(galeria), // Convertir el array a formato JSON
    categoria_id,
    status,
    video,
    oferta_id,
    precio_base,
    filtros: JSON.stringify(filtros), // Convertir el objeto a formato JSON
    envio_free,
    envio_rapido,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const query = "INSERT INTO productos SET ?";

  connection.query(query, nuevoProducto, (error, results) => {
    if (error) {
      console.error("Error al realizar la inserción:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    const nuevoProductoId = results.insertId;
    res
      .status(201)
      .json({ id: nuevoProductoId, mensaje: "Producto creado exitosamente" });
  });
};

// Lógica para eliminar un producto por ID
const deleteProduct = (req, res, connection) => {
  const productId = req.params.id;
  const selectQuery = "SELECT * FROM productos WHERE id = ?";
  const deleteQuery = "DELETE FROM productos WHERE id = ?";

  // Obtener la información del producto antes de eliminarlo
  connection.query(selectQuery, [productId], (selectError, selectResults) => {
    if (selectError) {
      console.error(
        "Error al obtener la información del producto:",
        selectError
      );
      return res.status(500).json({ error: "Error en el servidor" });
    }

    const deletedProduct = selectResults[0];

    // Eliminar el producto
    connection.query(deleteQuery, [productId], (deleteError, deleteResults) => {
      if (deleteError) {
        console.error("Error al realizar la eliminación:", deleteError);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (deleteResults.affectedRows === 0) {
        // No se encontró el producto con el ID proporcionado
        return res.status(404).json({ error: "El producto no fue encontrado" });
      }

      // Devolver la información del producto eliminado
      res.json({
        mensaje: "Producto eliminado exitosamente",
        productoEliminado: deletedProduct,
      });
    });
  });
};

const updateProduct = (req, res, connection) => {
  // Lógica para actualizar un producto por ID
  const productId = req.params.id;

  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: "Se requiere al menos un campo para actualizar" });
  }

  const updateFields = { ...req.body, updated_at: new Date() };

  // Convertir tags y galería a cadenas antes de la consulta SQL
  updateFields.tags = JSON.stringify(updateFields.tags);
  updateFields.galeria = JSON.stringify(updateFields.galeria);

  // Convertir el objeto filtros a cadena JSON
  updateFields.filtros = JSON.stringify(updateFields.filtros);

  const query = "UPDATE productos SET ? WHERE id = ?";

  connection.query(query, [updateFields, productId], (error, results) => {
    if (error) {
      console.error("Error al realizar la actualización:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "El producto no fue encontrado" });
    }

    res.json({ mensaje: "Producto actualizado exitosamente" });
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
};
