import React, { useEffect, useState } from "react";
// REACT QUILL
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";

export const FormEdirProd = ({ prodEdit, setCloseModal }) => {
  //* --- HOOKs ---
  const [tags, setTags] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [gallery, setGallery] = useState([]);
  // console.log("🚀 ~ FormAddProd ~ gallery:", gallery);
  // console.log("🚀 ~ FormAddProd ~ imagen:", imagen);
  const [product, setProduct] = useState({
    /* eslint-disable */
    contenido: [
      {
        idioma: "Spanish",
        nombre: prodEdit.contenido[0].nombre || "", // su valor sera igual a nombre_es
        slug: prodEdit.contenido[0].slug || "", // Se creara a partir del nombre automaticamente
        descripcion: prodEdit.contenido[0].descripcion || "",
        ficha: prodEdit.contenido[0].ficha || "",
      },
      {
        idioma: "English",
        nombre: prodEdit?.contenido[1]?.nombre || "", // su valor sera igual a nombre_es
        slug: prodEdit?.contenido[1]?.slug || "", // Se creara a partir del nombre automaticamente
        descripcion: prodEdit?.contenido[1]?.descripcion || "",
        ficha: prodEdit?.contenido[1]?.ficha || "",
      },
    ],
    precio_base: prodEdit.precio_base || "",
    nombre_es: prodEdit.nombre_es || "",
    nombre_ingles: prodEdit.nombre_ingles || "",
    tags: prodEdit.tags || [],
    marca_id: prodEdit.marca_id || undefined, //obligatorio algun valor
    sub_categoria_id: prodEdit.sub_categoria_id || undefined,
    categoria_id: prodEdit.categoria_id || undefined, //obligatorio algun valor
    oferta_id: prodEdit.oferta_id || undefined,
    imagen:
      prodEdit.imagen ||
      "https://tecnitium.com/wp-content/uploads/2022/05/testing-1.jpg", //! test
    galeria: prodEdit.galeria || [
      //! test
      {
        url: "https://tecnitium.com/wp-content/uploads/2022/05/testing-1.jpg",
      },
      {
        url: "https://tecnitium.com/wp-content/uploads/2022/05/testing-1.jpg",
      },
      {
        url: "https://tecnitium.com/wp-content/uploads/2022/05/testing-1.jpg",
      },
    ],
    video:
      prodEdit.video || "https://player.vimeo.com/video/225519343?h=a9a924c301", //! test
    status: prodEdit.status || 1, //obligatorio 0/1
    envio_free: prodEdit.envio_free || 0, //obligatorio 0/1
    envio_rapido: prodEdit.envio_rapido || 0, //obligatorio 0/1
    filtros: prodEdit.filtros || {}, //? Beta
    /* eslint-enable */
  });
  // --- HOOKs ---

  //* ------------ AL EDITAR UN PRODUCTO -----------------
  /* eslint-disable */
  //   useEffect(() => {
  //     if (prodEdit) {
  //       setProduct({
  //         contenido: prodEdit?.contenido,
  //         precio_base: prodEdit?.precio_base,
  //         nombre_es: prodEdit?.nombre_es,
  //         nombre_ingles: prodEdit?.nombre_ingles,
  //         tags: prodEdit?.tags,
  //         marca_id: prodEdit?.marca_id,
  //         sub_categoria_id: prodEdit?.sub_categoria_id,
  //         categoria_id: prodEdit?.categoria_id,
  //         oferta_id: prodEdit?.oferta_id,
  //         imagen: prodEdit?.imagen,
  //         galeria: prodEdit?.galeria,
  //         video: prodEdit?.video,
  //         status: prodEdit?.status,
  //         envio_free: prodEdit?.envio_free,
  //         envio_rapido: prodEdit?.envio_rapido,
  //         filtros: prodEdit?.filtros,
  //       });
  //     }
  //   }, [prodEdit]);
  /* eslint-enable */
  // ------------- AL EDITAR UN PRODUCTO -----------------

  //* --- HANDLEs ---
  // cambia el valor y donde se guarda el input NAME depende del idioma seleccionado
  const handleInputName = (event) => {
    const { name, value } = event.target;
    // setProduct({ ...product, [name]: value });

    const languageIndex = isEnglish ? 1 : 0;

    const updateNombres = [...product.contenido];
    updateNombres[languageIndex] = {
      ...updateNombres[languageIndex],
      nombre: value,
      slug: value.toLowerCase().replace(/ /g, "-"),
    };
    setProduct({
      ...product,
      [name]: value,
      contenido: updateNombres,
    });
  };

  const handleInputFichaDesc = (event1, name, source) => {
    // const { name, value } = event1.target;
    const languageIndex = isEnglish ? 1 : 0;
    if (source === "user") {
      const updatedContenido = [...product.contenido]; // Realizo una copia temporal del hook para usarlo mutable
      updatedContenido[languageIndex] = {
        ...updatedContenido[languageIndex],
        [name]: event1, // Modifico la propiedad y valor de Descripcion y Ficha
      };

      setProduct({
        ...product,
        contenido: updatedContenido,
      });
    }
  };

  const handleImagenChange = (e) => {
    //! Beta para carga de IMG
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagen(reader.result);
      };
    }
  };

  const handleGalleryChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploadedImages = [];
      const uploadPromises = Array.from(files).map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            // Aquí tendrías la lógica para subir la imagen a AWS
            // Supongamos que 'uploadImageToAWS' es una función que sube la imagen a AWS y devuelve su URL
            // uploadImageToAWS(file).then((url) => {
            //   uploadedImages.push({ url });
            //   resolve();
            // }).catch((error) => {
            //   console.error("Error al subir imagen a AWS:", error);
            //   reject(error);
            // });
          };
        });
      });

      // Espera a que todas las promesas de carga de imágenes se completen
      Promise.all(uploadPromises)
        .then(() => {
          setGallery([...gallery, ...uploadedImages]);
        })
        .catch((error) => {
          console.error("Error al cargar imágenes de la galería:", error);
        });
    }
  };

  const handleSubmit = () => {
    event.preventDefault();
    // prodEdit ? alert("Edito producto") : alert("Nuevo producto");
    //  putProduct(prodEdit.id);
    alert("Test button edit product");
  };
  // --- HANDLEs ---
  console.log("ID PROD >>> ", prodEdit.id);
  //* --- PUT ---
  const putProduct = async (id) => {
    try {
      const isLocalhost = window.location.href.includes("localhost");
      const urlPutProduct = isLocalhost
        ? `http://localhost:3001/productos/${id}`
        : `https://thehomehobby-react.onrender.com/productos/${id}`;

      const response = await axios.put(urlPutProduct, product);
      console.log("🚀 ~ PUT ~ response:", response.data);
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.log("ERROR PUT: ", error);
    }
  };
  // --- PUT ---

  //* --- REACT QUILL ---
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  // --- REACT QUILL ---

  const saveTags = (event) => {
    const newTags = event.target.value;
    setTags(newTags);
    const tagsArray = newTags.split(",").map((tag) => tag.trim());
    setProduct({ ...product, tags: tagsArray });
    console.log(tagsArray);
  };

  console.log("🚀 ~ FormEdirProd ~ product:", product);
  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto border border-gray-200">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-2 flex flex-col">
        <section className="bg-cream-lighter p-4  ">
          <div className="md:flex">
            <h2 className=" uppercase tracking-wide text-sm sm:text-lg mb-6">
              Agregar un nuevo producto
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* NOMBRE - FICHA - DESCRIPCION Spanish/English */}
            <div className=" mb-8">
              <div className="flex">
                <legend className="uppercase tracking-wide text-sm mr-3">
                  nombre, ficha y descripcion
                </legend>
                <button
                  type="button"
                  onClick={() => setIsEnglish(!isEnglish)}
                  className="uppercase tracking-wide text-sm bg-white border-2 border-gray-300 px-2 rounded-sm shadow-lg"
                >
                  idioma: <strong>{isEnglish ? "English" : "Spanish"}</strong>
                </button>
              </div>
              {/*Name Precio Descripcion Ficha */}
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4 xl:flex ">
                  {/* NAME */}
                  <div className="w-5/6 mr-4 mb-4">
                    <label className="block uppercase tracking-wide text-xs font-bold">
                      Name
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      value={
                        isEnglish ? product?.nombre_ingles : product?.nombre_es
                      }
                      onChange={handleInputName}
                      name={isEnglish ? "nombre_ingles" : "nombre_es"}
                      placeholder="TV Led 55 pulgadas Samsung"
                    />
                  </div>
                  {/* Precio */}
                  <div className="">
                    <label className="block uppercase tracking-wide text-xs font-bold">
                      Precio
                    </label>
                    <input
                      type="number"
                      value={product?.precio_base}
                      onChange={
                        (e) =>
                          setProduct({
                            ...product,
                            precio_base: parseInt(e.target.value),
                          }) //Guardo el valor como un entero
                      }
                      placeholder="$ ..."
                      className="shadow-inner p-4 border-0"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  {/* Descripcion */}
                  <label className="mb-1 block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                    descripcion
                  </label>
                  {/* Descripcion para Ingles */}
                  {isEnglish && (
                    <ReactQuill
                      theme="snow"
                      name="descripcion"
                      //   value={product.contenido[1].descripcion}
                      value={product?.contenido[1]?.descripcion}
                      onChange={(event1, delta, source) =>
                        handleInputFichaDesc(event1, "descripcion", source)
                      }
                      //   onChange={(event1) =>
                      //     handleInputFichaDesc(event1, "descripcion")
                      //   }
                      modules={{
                        toolbar: toolbarOptions,
                      }}
                      className="h-auto mb-4 "
                    />
                  )}
                  {/* Descripcion para Español */}
                  {!isEnglish && (
                    <ReactQuill
                      theme="snow"
                      name="descripcion"
                      //   value={product.contenido[0].descripcion}
                      value={product?.contenido[0]?.descripcion}
                      onChange={(event1, delta, source) =>
                        handleInputFichaDesc(event1, "descripcion", source)
                      }
                      //   onChange={(event1) =>
                      //     handleInputFichaDesc(event1, "descripcion")
                      //   }
                      modules={{
                        toolbar: toolbarOptions,
                      }}
                      className="h-auto mb-4 "
                    />
                  )}

                  {/* Ficha */}
                  <div className="md:flex-1">
                    <label className="mb-1 block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Ficha
                    </label>
                    {/* Ficha para Ingles */}
                    {isEnglish && (
                      <ReactQuill
                        theme="snow"
                        name="ficha"
                        // value={product.contenido[1].ficha}
                        value={product?.contenido[1]?.ficha}
                        onChange={(event1, delta, source) =>
                          handleInputFichaDesc(event1, "ficha", source)
                        }
                        // onChange={(event1) =>
                        //   handleInputFichaDesc(event1, "ficha")
                        // }
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                        className="h-auto mb-4 "
                      />
                    )}
                    {/* Ficha para Español */}
                    {!isEnglish && (
                      <ReactQuill
                        theme="snow"
                        name="ficha"
                        // value={product.contenido[0].ficha}
                        value={product?.contenido[0]?.ficha}
                        onChange={(event1, delta, source) =>
                          handleInputFichaDesc(event1, "ficha", source)
                        }
                        // onChange={(event1) =>
                        //   handleInputFichaDesc(event1, "ficha")
                        // }
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                        className="h-auto mb-4 "
                      />
                    )}
                  </div>
                  {/* TAGS */}
                  <div className="mb-4 flex flex-col">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      TAGs
                      <span className="font-medium italic normal-case text-gray-500">
                        {" "}
                        separar por comas `,`
                      </span>
                    </label>
                    <input
                      className="tag-input p-1"
                      type="text"
                      id="tagInput"
                      placeholder="Agregar tags (separados por comas)"
                      value={tags}
                      onChange={(event) => saveTags(event)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Imagen y Galeria */}
            <div className=" mb-8">
              <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Imagenes
                </legend>
              </div>
              <div className="mt-2 mb:mt-0 md:px-3">
                <div className="mb-4 md:flex justify-around">
                  <div className="mb-4 md:w-1/4">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      imagen
                    </label>
                    <div>
                      <label htmlFor="imagen">Imagen:</label>
                      {/* beta imagen */}
                      <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImagenChange}
                      />
                    </div>
                    {imagen && (
                      <div>
                        <img src={imagen} alt="Vista previa de la imagen" />
                      </div>
                    )}
                  </div>
                  <div className="mb-4 md:ml-4 md:w-3/4">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      galeria
                    </label>
                    <div>
                      {/* beta galeria */}
                      <label htmlFor="galleryInput">
                        Seleccionar imágenes:
                      </label>
                      <input
                        type="file"
                        id="galleryInput"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4 md:ml-4 md:w-3/4">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Video
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="email"
                      value={product?.video}
                      onChange={(e) =>
                        setProduct({ ...product, video: e.target.value })
                      }
                      placeholder="beta"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Selectores e input radio */}
            <div className="">
              <div className=" ">
                <legend className="uppercase tracking-wide text-sm">
                  Selectores
                </legend>
              </div>

              <div className="xl:flex  items-center">
                {/* Select STATUS - ENVIO RAPIDO - ENVIO FREE */}
                <div className="flex xl:flex-col justify-between items-end ">
                  <div className="bg-slate-100 shadow-md rounded-md m-1 px-1">
                    <label htmlFor="" className="mr-8">
                      Status
                    </label>
                    <select
                      value={product?.status}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          status: parseInt(e.target.value),
                        })
                      }
                      className="flex-1 shadow-inner py-2 px-1 border-0"
                    >
                      <option value={1}>Activo</option>
                      <option value={0}>Desactivo</option>
                    </select>
                  </div>

                  <div className="bg-slate-100 shadow-md rounded-md m-1 px-1">
                    <label htmlFor="" className="mr-8">
                      Envio Rapido
                    </label>
                    <select
                      value={product?.envio_rapido}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          envio_rapido: parseInt(e.target.value),
                        })
                      }
                      className="flex-1 shadow-inner py-2 px-1 border-0"
                    >
                      <option value={0}>Desactivo</option>
                      <option value={1}>Activo</option>
                    </select>
                  </div>

                  <div className="bg-slate-100 shadow-md rounded-md m-1 px-1">
                    <label htmlFor="" className="mr-8">
                      Envio Free
                    </label>
                    <select
                      value={product?.envio_free}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          envio_free: parseInt(e.target.value),
                        })
                      }
                      className="flex-1 shadow-inner py-2 px-1 border-0"
                    >
                      <option value={0}>Desactivo</option>
                      <option value={1}>Activo</option>
                    </select>
                  </div>
                </div>
                {/* Input Select  Categoria  Marca Oferta  Sub Categoria */}
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  {/* MARCA y OFERTA */}
                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3">
                      <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                        Marca
                      </label>
                      <div className="w-full flex">
                        <select
                          value={product?.marca_id}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              marca_id: parseInt(e.target.value),
                            })
                          }
                          className="flex-1 shadow-inner p-4 border-0"
                        >
                          <option value="">Selecciona una opcion</option>
                          <option value="1">Opción 1</option>
                          <option value="2">Opción 2</option>
                          <option value="3">Opción 3</option>
                          <option value="4">Opción 4</option>
                          <option value="5">Opción 5</option>
                        </select>
                      </div>
                    </div>

                    <div className="md:flex-1 md:pl-3 mt-2 md:mt-0">
                      <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                        Oferta
                      </label>
                      <div className="w-full flex">
                        <select
                          value={product?.oferta_id}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              oferta_id: parseInt(e.target.value),
                            })
                          }
                          className="flex-1 shadow-inner p-4 border-0"
                        >
                          <option value="">Selecciona una opcion</option>
                          <option value="2">Opción 2</option>
                          <option value="3">Opción 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* CATEGORIA Y SUBCATEGORIA */}
                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3">
                      <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                        Categoria
                      </label>
                      <div className="w-full flex">
                        <select
                          value={product?.categoria_id}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              categoria_id: parseInt(e.target.value),
                            })
                          }
                          className="flex-1 shadow-inner p-4 border-0"
                        >
                          <option value="">Selecciona una opcion</option>
                          <option value="4">Opción 1</option>
                          <option value="5">Opción 2</option>
                          <option value="6">Opción 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:flex-1 md:pl-3 mt-2 md:mt-0">
                      <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                        Sub Categoria
                      </label>
                      <div className="w-full flex">
                        <select
                          value={product?.sub_categoria_id}
                          onChange={(e) =>
                            setProduct({
                              ...product,
                              sub_categoria_id: parseInt(e.target.value),
                            })
                          }
                          className="flex-1 shadow-inner p-4 border-0"
                        >
                          <option value="">Selecciona una opcion</option>
                          <option value="4">Opción 1</option>
                          <option value="5">Opción 2</option>
                          <option value="6">Opción 3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Filtros */}
            <div className="md:flex mb-6"></div>
            {/* GUARDAR y cerrar edicion*/}
            <div className="flex">
              <button
                type="submit"
                className="md:flex mb-6 p-2 mr-4 bg-blue-300 rounded-md shadow-xl transition-color duration-300 hover:bg-blue-400 hover:text-white"
              >
                Subir Producto
              </button>
              <button
                onClick={() => setCloseModal(false)}
                type="button"
                className="md:flex mb-6 p-2 bg-red-300 rounded-md shadow-xl transition-color duration-300 hover:bg-red-400 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};
