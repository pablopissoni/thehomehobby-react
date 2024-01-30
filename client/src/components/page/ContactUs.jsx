import React from "react";
import LogoGrande from "../../assets/logo The Home Hobby.svg";

export const ContactUs = () => {
  return (
    <section>
      <div className="banner-title-section container mx-auto my-5 px-2 sm:px-8">
        <div className="liner-container my-5 flex justify-center border-b-2 border-[rgba(119,119,119,.17)]">
          <h1 className="mb-[-2px] inline-block border-b-2 border-primary pb-3 text-2xl font-bold uppercase">
            Contact Us
          </h1>
        </div>
      </div>
      <div className="information-section container mx-auto my-5 px-2 sm:px-8">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-telephone flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Phone</h6>
                <p className="break-all text-sm text-gray-400">2284 - 010101</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-envelope flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">E-mail</h6>
                <p className="break-all text-sm text-gray-400">
                  megabyte@example.com
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-geo-alt flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Ubication</h6>
                <p className="break-all text-sm text-gray-400">
                  Colón 0101, Olavarría
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 flex sm:col-span-6 lg:col-span-3">
            <div className="transition-all-300 flex w-full items-center gap-4 rounded-lg bg-white p-5 hover:shadow-lg xs:pl-[20%] sm:pl-5">
              <div className="rounded-full border-2">
                <i className="bi bi-clock flex p-3 text-[40px] text-primary"></i>
              </div>
              <div>
                <h6 className="font-bold capitalize">Hours</h6>
                <p className="break-all text-sm text-gray-400">
                  Monday to Friday 10:00 to 23:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="leave-message-section container mx-auto my-5 px-2 sm:px-8">
        <div className="grid grid-cols-12 overflow-hidden rounded-lg">
          <div className="col-span-12 h-60 sm:col-span-6 sm:h-full">
            <iframe
              className="h-full w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25525.690009671285!2d-60.3206370790762!3d-36.88856868458139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959445daae9e90a3%3A0xd11aadb313dbf072!2sOlavarr%C3%ADa%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1643148990997!5m2!1ses!2sar"
              width="700"
              height="500"
              loading="lazy"
            ></iframe>
          </div>
          <div className="col-span-12 bg-white p-5 sm:col-span-6">
            <h1 className="inline-block pb-3 text-xl font-bold uppercase">
              Leave a Message
            </h1>
            <form className="form-leave-message flex flex-col gap-5">
              <div>
                <input
                  className="input"
                  type="text"
                  placeholder="Your Name"
                  required=""
                />
              </div>
              <div>
                <input
                  className="input"
                  type="email"
                  placeholder="Your E-mail"
                  required=""
                />
              </div>
              <div className="h-32">
                <textarea
                  className="input h-full resize-none"
                  placeholder="Write your message here..."
                  required=""
                ></textarea>
              </div>
              <div>
                <button
                  className="btn-view-shopping-cart btn-effect transition-all-300 flex items-center justify-center rounded-lg bg-primary p-4"
                  type="submit"
                >
                  <span className="font-bold uppercase text-white">
                    Send Message
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
