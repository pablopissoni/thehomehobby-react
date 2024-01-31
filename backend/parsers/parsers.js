// parsers.js

// Función para parsear y formatear el contenido del campo "contenido"
const parseContent = (contentString) => {
  try {
    const contentArray = JSON.parse(contentString);

    // Formatear el contenido para una mejor visualización
    const formattedContent = contentArray.map((item) => {
      return {
        idioma: item.idioma,
        nombre: item.nombre,
        slug: item.slug,
        descripcion: item.descripcion,
        ficha: item.ficha,
      };
    });

    return formattedContent;
  } catch (error) {
    console.error("Error al parsear el contenido:", error);
    return null;
  }
};

// Función para parsear y formatear los filtros
const parseFilters = (filtersString) => {
  try {
    const filters = JSON.parse(filtersString);

    // Verificar si los filtros son nulos o no
    if (filters) {
      // Formatear los filtros para una mejor visualización
      const formattedFilters = Object.entries(filters).map(([key, value]) => {
        return {
          [key]: value,
        };
      });

      return formattedFilters;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al parsear los filtros:", error);
    return null;
  }
};

// Función para parsear y formatear las etiquetas
const parseTags = (tagsString) => {
  try {
    return JSON.parse(tagsString);
  } catch (error) {
    console.error("Error al parsear las etiquetas:", error);
    return null;
  }
};

// Función para parsear y formatear la galería de imágenes
const parseGallery = (galleryString) => {
  try {
    return JSON.parse(galleryString);
  } catch (error) {
    console.error("Error al parsear la galería:", error);
    return null;
  }
};

module.exports = {
  parseContent,
  parseFilters,
  parseTags,
  parseGallery,
};
