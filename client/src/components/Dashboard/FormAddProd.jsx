import React, { useEffect, useState } from "react";
// REACT QUILL
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";

export const FormAddProd = ({ setCloseModal }) => {
  //* --- HOOKs ---
  const [tags, setTags] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
  const [imagen, setImagen] = useState(null);
  const [galeria, setGaleria] = useState([
    { url: "" },
    { url: "" },
    { url: "" },
  ]);
  console.log("🚀 ~ FormAddProd ~ galeria:", galeria);
  // console.log("🚀 ~ FormAddProd ~ gallery:", gallery);
  console.log("🚀 ~ FormAddProd ~ imagen:", imagen);
  const [product, setProduct] = useState({
    contenido: [
      {
        idioma: "Spanish",
        nombre: "", // su valor sera igual a nombre_es
        slug: "", // Se creara a partir del nombre automaticamente
        descripcion: "",
        ficha: "",
      },
      {
        idioma: "English",
        nombre: "",
        slug: "",
        descripcion: "",
        ficha: "",
      },
    ],
    precio_base: 0,
    nombre_es: "",
    nombre_ingles: "",
    tags: [],
    marca_id: undefined, //obligatorio algun valor
    sub_categoria_id: undefined,
    categoria_id: undefined, //obligatorio algun valor
    oferta_id: undefined,
    imagen: "", //! test
    galeria: [
      //! test
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
    ],
    video: "", //! test
    status: 1, //obligatorio 0/1
    envio_free: 0, //obligatorio 0/1
    envio_rapido: 0, //obligatorio 0/1
    filtros: { color: "rojo", tamaño: "grande" }, //? Beta
  });
  // --- HOOKs ---

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

  const handleInputFichaDesc = (event1, name) => {
    // const { name, value } = event1.target;
    const languageIndex = isEnglish ? 1 : 0;

    const updatedContenido = [...product.contenido]; // Realizo una copia temporal del hook para usarlo mutable
    updatedContenido[languageIndex] = {
      ...updatedContenido[languageIndex],
      [name]: event1, // Modifico la propiedad y valor de Descripcion y Ficha
    };

    setProduct({
      ...product,
      contenido: updatedContenido,
    });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes realizar cualquier manipulación necesaria con la imagen seleccionada
      // Por ejemplo, puedes mostrar una vista previa de la imagen antes de subirla al servidor

      // Actualiza el formData con la imagen seleccionada
      setProduct((prevent) => ({ ...prevent, imagen: file }));
    }
  };

  const handleGaleriaChange = (e,index) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes realizar cualquier manipulación necesaria con la imagen seleccionada
      // Por ejemplo, puedes mostrar una vista previa de la imagen antes de subirla al servidor

      // Modificar la primera propiedad 'url' del objeto de la galería
      // Clonar el estado actual de la galería
      const copyGaleria = [...product.galeria];
      copyGaleria[index].url = file;
      setProduct((prevent)=>({...prevent, galeria: copyGaleria}));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes realizar cualquier manipulación necesaria con la imagen seleccionada
      // Por ejemplo, puedes mostrar una vista previa de la imagen antes de subirla al servidor

      // Actualiza el formData con la imagen seleccionada
      setProduct((prevent) => ({ ...prevent, video: file }));
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
    alert("Test beta Nuevo producto");

    postProduct(
      product.contenido, //array
      product.precio_base,
      product.nombre_es,
      product.nombre_ingles,
      product.tags, //array
      product.marca_id,
      product.sub_categoria_id,
      product.categoria_id,
      // product.oferta_id,
      product.imagen, //file
      //  product.galeria, //array file
      product.video, //file
      product.status,
      product.envio_free,
      product.envio_rapido
      // product.filtros
    );
    // alert("eyy mas despacio chiquitin");
  };
  // --- HANDLEs ---

  //* --- POST ---
  const postProduct = async (
    contenido, //array
    precio_base,
    nombre_es,
    nombre_ingles,
    tags, //array
    marca_id,
    sub_categoria_id,
    categoria_id,
    // oferta_id,
    imagen, //file
    video, //file
    galeria, //array file
    status,
    envio_free,
    envio_rapido
    // filtros //object
  ) => {
    try {
      console.log("PRODUCT >>> ", product);

      const formData = new FormData();

      product.contenido.forEach((item, index) => {
        formData.append(`contenido[${index}][idioma]`, item.idioma);
        formData.append(`contenido[${index}][nombre]`, item.nombre);
        formData.append(`contenido[${index}][slug]`, item.slug);
        formData.append(`contenido[${index}][descripcion]`, item.descripcion);
        formData.append(`contenido[${index}][ficha]`, item.ficha);
      });

      product.galeria.forEach((item, index) => {
        formData.append(`galeria[${index}][url]`, item.url);
      });

      // Tags como array
      product.tags.forEach((tag) => {
        //! verificar porque objeto
        formData.append("tags[]", tag);
      });
      // const tagsArray = JSON.parse(product.tags);
      // formData.append("contenido", JSON.stringify(contenido));
      formData.append("precio_base", precio_base);
      formData.append("nombre_es", nombre_es);
      formData.append("nombre_ingles", nombre_ingles);
      // formData.append("tags", JSON.stringify(tags));
      // formData.append("tags", JSON.stringify(tagsArray));
      formData.append("marca_id", marca_id);
      formData.append("sub_categoria_id", sub_categoria_id);
      formData.append("categoria_id", categoria_id);
      // formData.append("oferta_id", oferta_id);
      // formData.append('size', size);
      formData.append("imagen", imagen);
      // formData.append("galeria", JSON.stringify(galeria));
      formData.append("video", video);
      formData.append("status", status);
      formData.append("envio_free", envio_free);
      formData.append("envio_rapido", envio_rapido);
      // formData.append("envio_rapido", JSON.stringify(product.envio_rapido));
      // formData.append("filtros", JSON.stringify(filtros));

      console.log("🚀 ~ FormAddProd ~ formData:", formData.keys("video"));

      const isLocalhost = window.location.href.includes("localhost");
      const urlPostProduct = isLocalhost
        ? `http://localhost:3001/productos`
        : `https://thehomehobby-react.onrender.com/productos`;

      const response = await axios.post(urlPostProduct, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("🚀 ~ POST ~ response >>> ", response.data);
      alert(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };
  // const postProduct = async () => {
  //   try {
  //     const isLocalhost = window.location.href.includes("localhost");
  //     const urlPostProduct = isLocalhost
  //       ? `http://localhost:3001/productos`
  //       : `https://thehomehobby-react.onrender.com/productos`;

  //     const response = await axios.post(urlPostProduct, product);
  //     console.log("🚀 ~ POST ~ response:", response.data);
  //     alert(JSON.stringify(response.data));
  //   } catch (error) {
  //     console.log("ERROR POST: ", error);
  //   }
  // };
  // --- POST ---

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

  console.log("🚀 ~ FormAddProd ~ product:", product);
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
                        isEnglish ? product.nombre_ingles : product.nombre_es
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
                      value={product.precio_base}
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
                      value={product.contenido[1].descripcion}
                      onChange={(event1) =>
                        handleInputFichaDesc(event1, "descripcion")
                      }
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
                      value={product.contenido[0].descripcion}
                      onChange={(event1) =>
                        handleInputFichaDesc(event1, "descripcion")
                      }
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
                        value={product.contenido[1].ficha}
                        onChange={(event1) =>
                          handleInputFichaDesc(event1, "ficha")
                        }
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
                        value={product.contenido[0].ficha}
                        onChange={(event1) =>
                          handleInputFichaDesc(event1, "ficha")
                        }
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
                    {/* <input
                      className="w-full shadow-inner p-4 border-0"
                      type="url"
                      name="url"
                      value={product.imagen}
                      onChange={(e) =>
                        setProduct({ ...product, imagen: e.target.value })
                      }
                      placeholder="Video..."
                    /> */}
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
                        id="imagen"
                        name="imagen"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e)=> handleGaleriaChange(e,0)}
                      />
                      <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e)=> handleGaleriaChange(e,1)}
                      />
                      <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e)=> handleGaleriaChange(e,2)}
                      />
                    </div>
                    {/* <input
                      className="w-full shadow-inner p-4 border-0"
                      type="email"
                      name="email"
                      placeholder="beta"
                    /> */}
                  </div>
                  <div className="mb-4 md:ml-4 md:w-3/4">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Video
                    </label>
                    <input
                      type="file"
                      id="video"
                      name="video"
                      accept="video/*"
                      onChange={handleVideoChange}
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
                      value={product.status}
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
                      value={product.envio_rapido}
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
                      value={product.envio_free}
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
                          value={product.marca_id}
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
                          value={product.oferta_id}
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
                          value={product.categoria_id}
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
                          value={product.sub_categoria_id}
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
            <div className="md:flex mb-6">
              {/* <div className="md:w-1/3">
                <legend className="uppercase tracking-wide text-sm">
                  Filtros
                </legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <input
                  type="text"
                  className="shadow-inner p-4 border-0"
                  placeholder="NULL BETA"
                />
              </div> */}
            </div>
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
                type="buton"
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
