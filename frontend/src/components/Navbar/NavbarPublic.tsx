import { LOGIN, REGISTER } from "@/routes/paths";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GreenButton from "../Buttons/GreenButton";
import WhiteButton from "../Buttons/WhiteButton";


type SidebarProps = {
  labels: Label[];
};

type Label = {
  icon: React.ReactNode;
  displayName: string;
  route: string;
};

function NavbarPublic({ labels }: SidebarProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="p-4 shadow-md top-0 w-screen">
        <div className="md:flex-center container mx-auto flex flex-col items-center justify-between px-10 md:flex-col lg:flex-row">

          <div className="md:mb-4 md:text-center lg:mb-0">
            <Link href="/">
              <Image
                src="https://www.espe.edu.ec/wp-content/uploads/2023/03/espe.png"
                alt="logo_espe"
                className="mx-auto w-auto cursor-pointer md:mx-0"
                width={200}
                height={56}
                priority={true}
              />
            </Link>
          </div>

          <div className="hidden space-x-6 text-h6 font-semibold text-tp-heading-color md:flex">
            {labels.map((l, item) => (
              // eslint-disable-next-line react/jsx-key
              <Link href={l.route} key={""}>
                <p className={`transition-transform hover:scale-110 hover:text-primary-color`}>{l.displayName}</p>
              </Link>
            ))}

            <div>
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
                <ul className="flex flex-col items-center space-y-3 text-center text-h6 font-semibold text-tp-heading-color">
                  {labels.map((l, item) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={l.route} key={""}>
                      <p className={`transition-transform hover:scale-110 hover:text-primary-color`}>{l.displayName}</p>
                    </Link>
                  ))}
                </ul>
                <div className="mt-3 flex flex-row gap-y-1 ">
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
    </>
  );
}

export default NavbarPublic;
