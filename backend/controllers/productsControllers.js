const parsers = require("../parsers/parsers");

// Lógica para obtener todos los productos
const getAllProducts = (req, res, connection) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;
  const searchTerm = req.query.name || "";
  const categoryFilter = req.query.category || ""; // Nuevo filtro por categoría

  let countQuery =
    "SELECT COUNT(*) as total FROM productos WHERE (nombre_es LIKE ? OR nombre_ingles LIKE ?)";
  let countParams = [`%${searchTerm}%`, `%${searchTerm}%`];

  // Agregar filtro por categoría si se proporciona
  if (categoryFilter) {
    countQuery += " AND categoria_id = ?";
    countParams.push(categoryFilter);
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

    // Agregar filtro por categoría si se proporciona
    if (categoryFilter) {
      query += " AND categoria_id = ?";
      queryParams.push(categoryFilter);
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
            video: `https://thehomehobby.s3.amazonaws.com${product.video}`,
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
      return res.status(404).json({ error: "El producto no fue encontrado" });
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
        galeria: JSON.parse(product.galeria).map((item) => ({
          url: `https://thehomehobby.s3.amazonaws.com${item.url}`,
        })),
        video: `https://thehomehobby.s3.amazonaws.com${product.video}`,
        filtros: parsers.parseFilters(product.filtros),
      };

      return formattedProduct;
    });

    res.json(formattedResults);
  });
};

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

  // Validaciones de los campos

  // Verificar que el nombre en español esté presente y sea una cadena de texto
  if (!nombre_es || typeof nombre_es !== "string") {
    return res.status(400).json({
      error:
        "El campo 'nombre_es' es obligatorio y debe ser una cadena de texto",
    });
  }

  // Verificar que el nombre en inglés, si está presente, sea una cadena de texto
  if (nombre_ingles && typeof nombre_ingles !== "string") {
    return res
      .status(400)
      .json({ error: "El campo 'nombre_ingles' debe ser una cadena de texto" });
  }

  // Verificar que las etiquetas sean un arreglo
  if (!Array.isArray(tags)) {
    return res
      .status(400)
      .json({ error: "El campo 'tags' debe ser un arreglo" });
  }

  // Verificar que el ID de la marca sea un número entero
  if (marca_id && !Number.isInteger(marca_id)) {
    return res
      .status(400)
      .json({ error: "El campo 'marca_id' debe ser un número entero" });
  }

  // Verificar que el ID de la subcategoría, si está presente, sea un número entero
  if (sub_categoria_id && !Number.isInteger(sub_categoria_id)) {
    return res
      .status(400)
      .json({ error: "El campo 'sub_categoria_id' debe ser un número entero" });
  }

  // Verificar que la imagen esté presente y sea una URL válida
  if (!imagen || typeof imagen !== "string" || !isValidURL(imagen)) {
    return res.status(400).json({
      error: "El campo 'imagen' es obligatorio y debe ser una URL válida",
    });
  }

  // Verificar que la galería sea un arreglo de objetos con URLs válidas
  if (
    !Array.isArray(galeria) ||
    !galeria.every((item) => typeof item === "object" && isValidURL(item.url))
  ) {
    return res.status(400).json({
      error:
        "El campo 'galeria' debe ser un arreglo de objetos con URLs válidas",
    });
  }

  // Verificar que el ID de la categoría sea un número entero
  if (!Number.isInteger(categoria_id)) {
    return res
      .status(400)
      .json({ error: "El campo 'categoria_id' debe ser un número entero" });
  }

  // Otras validaciones necesarias para los demás campos...

  // Si todas las validaciones pasan, crear el nuevo producto
  const nuevoProducto = {
    contenido: JSON.stringify(contenido),
    nombre_es,
    nombre_ingles,
    tags: JSON.stringify(tags),
    marca_id,
    sub_categoria_id,
    imagen,
    galeria: JSON.stringify(galeria),
    categoria_id,
    status,
    video,
    oferta_id,
    precio_base,
    filtros: JSON.stringify(filtros),
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

// Función para validar una URL
function isValidURL(url) {
  // Utiliza una expresión regular para validar la URL
  // Esta expresión regular es simple y puede no cubrir todos los casos
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocolo
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // nombre de dominio
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // dirección IP
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // puerto y ruta
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // parámetros de consulta
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragmento
  return !!pattern.test(url);
}

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

// Función para analizar el contenido JSON
const parseContent = (content) => {
  try {
    const parsedContent = JSON.parse(content);
    return parsedContent.map((item) => ({
      idioma: item.idioma,
      nombre: item.nombre,
      descripcion: item.descripcion,
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error al analizar el contenido JSON:", error);
    return [];
  }
};

// Función para analizar los filtros JSON
// Función para analizar los filtros JSON
const parseFilters = (filters) => {
  try {
    if (!filters) {
      return [];
    }
    const parsedFilters = JSON.parse(filters);
    return parsedFilters.map((filter) => ({
      value: filter.value,
      nombre: filter.nombre,
      filtros: filter.filtros,
      visible: filter.visible,
    }));
  } catch (error) {
    console.error("Error al analizar los filtros JSON:", error);
    return [];
  }
};

// Lógica para obtener todas las categorías
const getAllCategories = (req, res, connection) => {
  const query = "SELECT * FROM newschema.categorias";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    // Formatear el contenido y los filtros para cada categoría
    const formattedResults = results.map((category) => ({
      id: category.id,
      image: category.image,
      status: category.status,
      created_at: category.created_at,
      updated_at: category.updated_at,
      contenido: parseContent(category.contenido),
      filtros: parseFilters(category.filtros),
    }));

    res.json(formattedResults);
  });
};

module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  getAllCategories: getAllCategories,
};
