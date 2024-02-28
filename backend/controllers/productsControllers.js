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
        const formattedResults = results.map((product) => {
          const formattedProduct = {
            ...product,
            contenido: parsers.parseContent(product.contenido),
            tags: parsers.parseTags(product.tags),
            imagen: formatURL(product.imagen),
            galeria: JSON.parse(product.galeria).map((item) => ({
              url: formatURL(item.url),
            })),
            video: formatURL(product.video),
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
        // Formatear la URL de la imagen
        imagen: formatURL(product.imagen),
        // Mapear sobre la galería y formatear las URL de cada enlace
        galeria: JSON.parse(product.galeria).map((item) => ({
          url: formatURL(item.url),
        })),
        // Formatear la URL del video
        video: formatURL(product.video),
        filtros: parsers.parseFilters(product.filtros),
      };

      return formattedProduct;
    });

    res.json(formattedResults);
  });
};

// Función para formatear una URL según los criterios especificados
function formatURL(url) {
  // Verificar si la URL es null o undefined
  if (url == null) {
    // Si la URL es null o undefined, devolver null
    return null;
  }

  // Verificar si la URL contiene "/storage"
  if (url.includes("/storage")) {
    // Si contiene "/storage", agregar el prefijo
    return `https://thehomehobby.s3.amazonaws.com${url}`;
  } else {
    // Si la URL no contiene "/storage", dejar la URL como está
    return url;
  }
}
const AWS = require("aws-sdk");
const fs = require("fs");
const async = require("async");

const createProduct = (req, res, connection) => {
  const {
    contenido,
    nombre_es,
    nombre_ingles,
    tags,
    marca_id,
    sub_categoria_id,
    galeria,
    categoria_id,
    status,
    oferta_id,
    precio_base,
    filtros,
    envio_free,
    envio_rapido,
  } = req.body;
  console.log("Request body:", req.body);
  console.log("Files received:", req.files);

  const parsedMarcaId = parseInt(marca_id);
  const parsedSubCategoriaId = parseInt(sub_categoria_id);
  const parsedCategoriaId = parseInt(categoria_id);

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
  if (marca_id && !Number.isInteger(Number(marca_id))) {
    return res
      .status(400)
      .json({ error: "El campo 'marca_id' debe ser un número entero" });
  }

  // Verificar que el ID de la subcategoría, si está presente, sea un número entero
  if (sub_categoria_id && !Number.isInteger(Number(sub_categoria_id))) {
    return res
      .status(400)
      .json({ error: "El campo 'sub_categoria_id' debe ser un número entero" });
  }

  console.log("Valor de categoria_id:", categoria_id);
  // Verificar que el ID de la categoría sea un número entero
  if (!Number.isInteger(+categoria_id)) {
    return res
      .status(400)
      .json({ error: "El campo 'categoria_id' debe ser un número entero" });
  }

  console.log("Request files:", req.files); // Agregado para verificar los archivos adjuntos recibidos

  const lastIdQuery = "SELECT MAX(id) AS lastId FROM productos;";

  connection.query(lastIdQuery, (error, results) => {
    if (error) {
      console.error("Error al obtener el último ID:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    const lastId = results[0].lastId || 0;
    const nuevoProductoId = lastId + 1;

    AWS.config.update({
      accessKeyId: "AKIASSFS6RFCBNCABLI4",
      secretAccessKey: "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",
    });

    const s3 = new AWS.S3();

    const nuevoProducto = {
      id: nuevoProductoId,
      contenido: JSON.stringify(contenido),
      nombre_es,
      nombre_ingles,
      tags: JSON.stringify(tags),
      marca_id,
      sub_categoria_id,
      galeria: JSON.stringify(galeria),
      categoria_id,
      status,
      oferta_id,
      precio_base,
      filtros: JSON.stringify(filtros),
      envio_free,
      envio_rapido,
      created_at: new Date(),
      updated_at: new Date(),
    };

    let galleryUrls = [];

    // Función para subir un archivo a Amazon S3
    function uploadToS3(file, callback) {
      const filePath = `storage/${nuevoProductoId}_${file.originalname}`;
      const params = {
        Bucket: "thehomehobby",
        Key: filePath,
        Body: fs.createReadStream(file.path),
        ACL: "public-read",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(`Error al subir ${file.fieldname} a S3:`, err);
          callback(err);
        } else {
          console.log(
            `${file.fieldname} subido exitosamente a S3:`,
            data.Location
          );
          callback(null, data.Location);
        }
      });
    }

    // Función para procesar y subir los archivos de galería
    function processGalleryFiles(files, callback) {
      const filesToUpload = files.map((file) => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        path: file.path,
      }));

      async.eachOfSeries(
        filesToUpload,
        (file, index, cb) => {
          uploadToS3(file, (err, url) => {
            if (err) {
              cb(err);
            } else {
              galleryUrls.push({ url }); // Agrega la URL al array de URLs de galería
              cb();
            }
          });
        },
        (err) => {
          if (err) {
            callback(err);
          } else {
            callback(null, galleryUrls);
          }
        }
      );
    }

    // Procesar y subir los archivos de galería
    processGalleryFiles(
      req.files.filter((file) => file.fieldname.startsWith("galeria")),
      (err, urls) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al procesar los archivos de galería" });
        }

        // Guardar las URLs en MySQL
        const galeriaUrls = JSON.stringify(urls); // Convertir el array de URLs a formato JSON
        nuevoProducto.galeria = galeriaUrls; // Asignar el array de URLs a nuevoProducto

        // Subir la imagen a Amazon S3
        const imagen = req.files.find((file) => file.fieldname === "imagen");
        if (!imagen) {
          return res
            .status(400)
            .json({ error: "No se ha proporcionado una imagen" });
        }

        const imagenPath = `storage/${nuevoProductoId}_${imagen.originalname}`;
        const imagenParams = {
          Bucket: "thehomehobby",
          Key: imagenPath,
          Body: fs.createReadStream(imagen.path),
          ACL: "public-read",
        };

        s3.upload(imagenParams, (err, imagenData) => {
          if (err) {
            console.error("Error al subir la imagen a S3:", err);
            return res
              .status(500)
              .json({ error: "Error al subir la imagen a S3" });
          }

          console.log("Imagen subida exitosamente a S3:", imagenData.Location);
          nuevoProducto.imagen = imagenData.Location; // Asignar la URL de la imagen a nuevoProducto

          // Subir el video a Amazon S3
          const video = req.files.find((file) => file.fieldname === "video");
          if (!video) {
            return res
              .status(400)
              .json({ error: "No se ha proporcionado un video" });
          }

          const videoPath = `storage/${nuevoProductoId}_${video.originalname}`;
          const videoParams = {
            Bucket: "thehomehobby",
            Key: videoPath,
            Body: fs.createReadStream(video.path),
            ACL: "public-read",
          };

          s3.upload(videoParams, (err, videoData) => {
            if (err) {
              console.error("Error al subir el video a S3:", err);
              return res
                .status(500)
                .json({ error: "Error al subir el video a S3" });
            }

            console.log("Video subido exitosamente a S3:", videoData.Location);
            nuevoProducto.video = videoData.Location; // Asignar la URL del video a nuevoProducto

            // Insertar el producto en la base de datos
            insertProduct(nuevoProducto);
          });
        });
      }
    );

    // Función para insertar el producto en la base de datos
    function insertProduct(producto) {
      const insertProductQuery = "INSERT INTO productos SET ?";
      connection.query(insertProductQuery, producto, (error, results) => {
        if (error) {
          console.error(
            "Error al insertar el nuevo producto en la base de datos:",
            error
          );
          return res.status(500).json({
            error: "Error al insertar el nuevo producto en la base de datos",
          });
        }
        console.log("Producto insertado exitosamente en la base de datos");
        console.log("Producto:", producto);
        res.status(200).json({ message: "Producto insertado exitosamente" });
      });
    }
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
