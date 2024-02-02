import React from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";
import { useState } from "react";
export const FAQs = () => {
  const faqData = [
    {
      question: "vitae porttitor diam. Donec eu erat?",
      answer:
        "Phasellus consequat, odio sagittis accumsan tempus, diam leo semper elit, eu ullamcorper leo tortor et dolor. Pellentesque metus erat, mattis ut est eget, commodo porta libero. Donec sit amet quam.",
    },
    // Agrega más preguntas y respuestas aquí
    {
      question: "Morbi sit amet lobortis tellus. Sed?",
      answer:
        "Proin sed augue a sem tempus hendrerit. Morbi et vestibulum lacus, ornare fermentum ante. Mauris ligula eros, ultricies at orci eget, bibendum semper erat. Nulla ultrices mauris eu est pretium, vitae luctus nunc viverra. Cras eleifend tristique sem, eget porta dolor aliquam ut. Vivamus tempor eget arcu ut egestas.",
    },
    {
      question: "arcu sed egestas pharetra, est ante placerat?",
      answer:
        "Se puede mostrar una amplia variedad de contenido, como anuncios publicitarios, promociones, información de productos, noticias, clima, horarios, contenido educativo, entretenimiento, y más. La versatilidad es una de las fortalezas de la señalización digital.",
    },
    {
      question: "arcu sed egestas pharetra, est ante placerat?",
      answer:
        "El hardware necesario incluye pantallas digitales (monitores, videowalls, etc.), reproductores de medios digitales (como reproductores multimedia, computadoras o TV Box) los cuales requieren estar conectados a Internet​",
    },
    {
      question: "Maecenas ut ipsum ut lectus dictum ?",
      answer:
        "El contenido se gestiona a través de una interfaz de usuario en una plataforma web. Los usuarios pueden cargar, organizar y programar contenido para que se reproduzca en las pantallas. ",
    },
    {
      question: "Maecenas ut ipsum ut lectus dictum ?",
      answer:
        "La seguridad y privacidad son preocupaciones importantes. Upper DS ofrece características de seguridad, como autenticación de usuarios, certificado de seguridad y gestión de permisos para proteger la privacidad y prevenir el acceso no autorizado.",
    },
    {
      question: "erat at nisl gravida elementum?",
      answer:
        "La señalización digital basada en la nube almacena y gestiona contenido en servidores remotos, lo que permite un acceso más fácil y la gestión desde cualquier lugar con conexión a Internet. La señalización en sitio, en cambio, utiliza servidores locales y suele ser adecuada para redes cerradas.",
    },
    {
      question:
        "Donec imperdiet egestas nisl sit amet iaculis. Ut id nulla congue, rutrum lorem sed, sodales nulla.?",
      answer:
        "Puedes medir el impacto mediante métricas como el número de reproducciones, la interacción del usuario (si es interactivo), el tiempo de visualización y el retorno de inversión (ROI) si estás utilizando la señalización digital con fines comerciales. ",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <section id="preguntas">
      <div className="pt-24 px-4 mx-auto max-w-screen-xl ">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-lg md:text-4xl tracking-tight font-extrabold text-custom">
            Lorem ipsum dolor
          </h2>
          <p className="mb-5 font-light text-sm md:text-xl text-gray-400">
            Phasellus consequat, odio sagittis accumsan
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => toggleAnswer(index)}
                className="flex justify-between items-center w-full px-4 py-5 sm:p-6"
              >
                <span className="text-sm font-semibold text-black">
                  {item.question}
                </span>

                <svg
                  className={`w-6 h-6 text-gray-400 transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm md:text-base mt-9">
          Donec sodales mauris a nisi
          <a
            href="#contacto"
            title=""
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
          >
            contact the support
          </a>
        </p>
      </div>

      <div className="information-section container mx-auto my-5 px-2 sm:px-8">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-truck flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Free shipping</h6>
                <p className="break-all text-sm text-gray-400">
                  Orders over $100
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-cash-coin flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Money back</h6>
                <p className="break-all text-sm text-gray-400">With a 30 day</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-shield-check flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Secure payment</h6>
                <p className="break-all text-sm text-gray-400">
                  Secured payment
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-headset flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Online support</h6>
                <p className="break-all text-sm text-gray-400">Support 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
