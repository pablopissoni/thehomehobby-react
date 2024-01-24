import React from "react";
import { Link } from "react-router-dom";
// --- imgages ---
import Logo from "../../public/Logo miniatura.svg";
import Perfil from "../../public/perfil.png";

export const NavBar = () => {
  return (
    <nav className="bg-white py-3">
      <div className="flex items-center justify-between mx-10">
        {/* --- Logo y titulo --- */}
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="mr-2" />
          <h1 className="font-bold text-xl">THE HOME HOBBY</h1>
        </div>

        {/* --- search --- */}
        <form id="buscador2" method="POST" action="{{ route('search') }}" className="bg-white border rounded-lg max-w-[420px] w-full overflow-hidden flex items-center lg:hidden">
          <input type="text" className="ring-0 shadow-none border-none outline-none focus:ring-0 px-4 py-2 w-full" name="search" placeholder="Search..." id="input_buscador1"/>
          <section className="px-4 py-3" >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="fill-zinc-400 hover:fill-zinc-500 cursor-pointer">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.58335 2.29167C5.55628 2.29167 2.29169 5.55626 2.29169 9.58334C2.29169 13.6104 5.55628 16.875 9.58335 16.875C13.6104 16.875 16.875 13.6104 16.875 9.58334C16.875 5.55626 13.6104 2.29167 9.58335 2.29167ZM1.04169 9.58334C1.04169 4.86591 4.86592 1.04167 9.58335 1.04167C14.3008 1.04167 18.125 4.86591 18.125 9.58334C18.125 11.7171 17.3426 13.6681 16.0491 15.1652L18.7753 17.8914C19.0194 18.1355 19.0194 18.5312 18.7753 18.7753C18.5312 19.0194 18.1355 19.0194 17.8914 18.7753L15.1652 16.0491C13.6681 17.3426 11.7171 18.125 9.58335 18.125C4.86592 18.125 1.04169 14.3008 1.04169 9.58334Z" />
            </svg>
          </section>
        </form>
        {/* --- search --- */}
        <form id="buscador" method="POST" action="{{ route('search') }}" className="hidden lg:flex bg-white rounded-lg max-w-[420px] w-full overflow-hidden items-center">
        <input type="text" className="ring-0 shadow-none border-none outline-none focus:ring-0 px-4 py-3 w-full" name="search" placeholder="Search..." id="input_buscador2"/>
        <section className="px-4 border-r py-3 cursor-pointer" >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.58335 2.29167C5.55628 2.29167 2.29169 5.55626 2.29169 9.58334C2.29169 13.6104 5.55628 16.875 9.58335 16.875C13.6104 16.875 16.875 13.6104 16.875 9.58334C16.875 5.55626 13.6104 2.29167 9.58335 2.29167ZM1.04169 9.58334C1.04169 4.86591 4.86592 1.04167 9.58335 1.04167C14.3008 1.04167 18.125 4.86591 18.125 9.58334C18.125 11.7171 17.3426 13.6681 16.0491 15.1652L18.7753 17.8914C19.0194 18.1355 19.0194 18.5312 18.7753 18.7753C18.5312 19.0194 18.1355 19.0194 17.8914 18.7753L15.1652 16.0491C13.6681 17.3426 11.7171 18.125 9.58335 18.125C4.86592 18.125 1.04169 14.3008 1.04169 9.58334Z" fill="#71717A" />
          </svg>
        </section>
      </form>
        {/* --- Titulos Links --- */}
        <div className="flex items-center mr-4">
            <img className="h-6 mx-3" src={Perfil} alt="" />
            <button className="text-white">Sign in</button>
        </div>
       
      </div>
    </nav>
  );
};
