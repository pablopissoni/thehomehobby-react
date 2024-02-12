import React, { useState } from "react";
// REACT QUILL
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import axios from "axios";

export const FormAddProd = () => {
  //* --- HOOKs ---
  const [tags, setTags] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
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
    imagen: "",
    galeria: [],
    video: "",
    status: 1, //obligatorio 0/1
    envio_free: 0, //obligatorio 0/1
    envio_rapido: 0, //obligatorio 0/1
    filtros: { color: "rojo", tamaño: "grande" }, //? Beta
  });
  // --- HOOKs ---

  //* --- HANDLEs ---
  const handleSubmit = () => {
    event.preventDefault();
    alert("eyy mas despacio chiquitin")
  }

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

  const handleInputFichaDesc = (event) => {
    const { name, value } = event.target;
    const languageIndex = isEnglish ? 1 : 0;

    const updatedContenido = [...product.contenido]; // Realizo una copia temporal del hook para usarlo mutable
    updatedContenido[languageIndex] = {
      ...updatedContenido[languageIndex],
      [name]: value, // Modifico la propiedad y valor de Descripcion y Ficha
    };

    setProduct({
      ...product,
      contenido: updatedContenido,
    });
  };

  // --- HANDLEs ---

  //* --- POST ---
  const postProduct = async () => {
    try {
      const isLocalhost = window.location.href.includes("localhost");
      const urlPostProduct = isLocalhost
        ? `http://localhost:3001/productos`
        : `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;

      const response = await axios.post(urlPostProduct, product);
      console.log("🚀 ~ postProduct ~ response:", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // --- POST ---

  const saveTags = (event) => {
    const newTags = event.target.value;
    setTags(newTags);
    const tagsArray = newTags.split(",").map((tag) => tag.trim());
    setProduct({ ...product, tags: tagsArray });
    console.log(tagsArray);
  };

//   console.log("🚀 ~ FormAddProd ~ product:", product);
  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto border border-red-400">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-2 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow ">
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
                  idioma: <strong>{isEnglish ? "Inglish" : "Spanish"}</strong>
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
                  <div className="md:flex-1 ">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Descripcion
                    </label>
                    <textarea
                      name="descripcion"
                      value={
                        isEnglish
                          ? product.contenido[1].descripcion
                          : product.contenido[0].descripcion
                      }
                      onChange={handleInputFichaDesc}
                      className="w-full shadow-inner p-4 border-0"
                      placeholder="Aquí puedes escribir tu mensaje."
                    ></textarea>
                  </div>
                  {/* Ficha */}
                  <div className="md:flex-1 ">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Ficha
                    </label>
                    <textarea
                      name="ficha"
                      value={
                        isEnglish
                          ? product.contenido[1].ficha
                          : product.contenido[0].ficha
                      }
                      onChange={handleInputFichaDesc}
                      className="w-full shadow-inner p-4 border-0"
                      placeholder="Aquí puedes escribir la Ficha."
                    ></textarea>
                  </div>
                  {/* TAGS */}
                  <div className="mb-4 flex flex-col">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      TAGs
                    </label>
                    <input
                      className="tag-input "
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
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="url"
                      name="url"
                      value={product.imagen}
                      onChange={(e) =>
                        setProduct({ ...product, imagen: e.target.value })
                      }
                      placeholder="Video..."
                    />
                  </div>
                  <div className="mb-4 md:ml-4 md:w-3/4">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      galeria
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="email"
                      name="email"
                      placeholder="beta"
                    />
                  </div>
                  <div className="mb-4 md:ml-4 md:w-3/4">
                    <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                      Video
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="email"
                      name="email"
                      value={product.video}
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
                      value={product.status}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          status: parseInt(e.target.value),
                        })
                      }
                      className="flex-1 shadow-inner py-2 px-1 border-0"
                    >
                      <option value={1} >
                        Activo
                      </option>
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
                      <option value={0} >
                        Desactivo
                      </option>
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
                      <option value={0} >
                        Desactivo
                      </option>
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
            {/* DESCRIPCION */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
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
              </div>
            </div>
            {/* GUARDAR */}
            <button type="submit" className="md:flex mb-6 p-2 bg-blue-300 rounded-md shadow-xl transition-color duration-300 hover:bg-blue-400 hover:text-white">
              Subir Producto
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};
