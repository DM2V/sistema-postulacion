import logoEspe from "@/assets/images/logo_espe.png";
import GreenButton from "@/components/Buttons/GreenButton";
import WhiteButton from "@/components/Buttons/WhiteButton";
import { HOME, INFO, LOGIN, OFFER, REGISTER } from "@/routes/paths";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface NavItemProps {
  text: string;
  link: string;
  hoverColor: string;
}

const NavItem: React.FC<NavItemProps> = ({ text, link, hoverColor }) => (
  <Link href={link}>
    <div
      className={`cursor-pointer transition-transform hover:scale-110 hover:${hoverColor}`}
    >
      {text}
    </div>
  </Link>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItemProps[] = [
    { text: "Inicio", link: HOME, hoverColor: "text-primary-color" },
    { text: "Ofertas", link: OFFER, hoverColor: "text-primary-color" },
    { text: "Información", link: INFO, hoverColor: "text-primary-color" },
  ];

  return (
    <nav className="bg-dark p-4 shadow-md">
      <div className="md:flex-center container mx-auto flex flex-col items-center justify-between px-10 md:flex-col lg:flex-row">
        <div className="h-auto w-48 md:mb-4 md:text-center lg:mb-0">
          <Link href={HOME}>
            <Image
              src={logoEspe}
              alt="logo_espe"
              className="cursor-pointer"
              priority={true}
            />
          </Link>
        </div>

        <div className="hidden space-x-6 text-h6 font-semibold text-tp-heading-color md:flex">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}

          <div className="flex space-x-4">
            <Link href={LOGIN}>
              <WhiteButton content="Iniciar Sesión" />
            </Link>
            <Link href={REGISTER}>
              <GreenButton content="Registrarse" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-color hover:text-primary-color"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6 w-6 fill-current"
                >
                  <path
                    d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
                    fillRule="evenodd"
                  />
                </svg>
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
              <ul className="flex flex-col items-center space-y-3 text-center text-h6 font-semibold text-tp-heading-color">
                {navItems.map((item, index) => (
                  <NavItem key={index} {...item} />
                ))}
              </ul>
              <div className="mt-3 flex space-x-4">
                <Link href={LOGIN}>
                  <WhiteButton content="Iniciar Sesión" />
                </Link>
                <Link href={REGISTER}>
                  <GreenButton content="Registrarse" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
