import { OFFER, REGISTER } from "@/routes/paths";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="relative h-96 bg-[url(../assets/images/espe-slide.png)] bg-cover bg-center ">
      <div className="absolute inset-0 "></div>
      <div className="relative flex h-full flex-col items-center justify-center text-white">
        <h2 className="text-center font-bold">¡Comienza ahora!</h2>
        <h5 className="mt-4 text-center">
          Para aplicar, explora las plazas disponibles en la sección de Ofertas.
        </h5>

        <h5 className="mt-4 text-center">
          Inicia el proceso <i>creando una cuenta</i>
        </h5>

        <div className="mt-6 space-x-4">
          <Link
            href={OFFER}
            className="rounded bg-fill-warning px-4 py-2 text-black hover:bg-yellow-600"
          >
            Ver Ofertas
          </Link>
          <Link
            href={REGISTER}
            className="rounded bg-state-hover px-4 py-2 text-white hover:bg-state-press"
          >
            Crear Cuenta
          </Link>
        </div>
      </div>
      ;
    </div>
  );
};

export default Hero;
