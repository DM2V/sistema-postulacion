import GreenButton from "@/components/Buttons/GreenButton";
import WhiteButton from "@/components/Buttons/WhiteButton";

import Image from "next/image";
import { useState } from "react";
/* import { Link } from "react-router-dom"; */

/* import { HOME, INFORMATION, LOGIN, OFFER, REGISTER } from "../../routes/paths"; */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { text: "Inicio", link: "", hoverColor: "text-primary-color" },
    { text: "Ofertas", link: "", hoverColor: "text-primary-color" },
    {
      text: "Información",
      link: "",
      hoverColor: "text-primary-color",
    },
  ];

  return (
    <nav className="bg-dark p-4 shadow-md ">
      <div className="container px-10 mx-auto flex justify-between items-center flex-col lg:flex-row md:flex-center md:flex-col">
        <div className="md:mb-4 md:text-center lg:mb-0">
          <Image
            src="https://www.espe.edu.ec/wp-content/uploads/2023/03/espe.png"
            alt="logo_espe"
            className="w-42 h-14 mx-auto md:mx-0 cursor-pointer"
            width={168}
            height={56}
            priority={true}
          />
        </div>

        <div className="hidden md:flex space-x-6 text-tp-heading-color font-semibold text-h6 ">
          {navItems.map((item, index) => (
            <a key={index}>{item.text}</a>
          ))}

          <div>
            <WhiteButton content="Iniciar Sesión" />

            <GreenButton content="Registrarse" />
          </div>
        </div>

        <div className="md:hidden flex items-center flex-col">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-color hover:text-primary-color">
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  d="M3.293 7.293a1 1 0 011.414 0L12 15.586l7.293-7.293a1 1 0 111.414 1.414l-8 8a1 1 0 01-1.414 0l-8-8a1 1 0 010-1.414z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4.293 8.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                />
              )}
            </svg>
          </button>

          {isOpen && (
            <div className="mt-4">
              <ul className="space-y-4 text-tp-heading-color text-center font-semibold text-h6">
                {navItems.map((item, index) => (
                  <a key={index}>{item.text}</a>
                ))}
              </ul>
              <div className="mt-3 flex flex-row gap-y-1 ">
                <WhiteButton content="Iniciar Sesión" />

                <GreenButton content="Registrarse" />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
