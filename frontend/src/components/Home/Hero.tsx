import React from "react";
import slideImage from "../../assets/images/espe-slide.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="h-96 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${require('../../assets/images/espe-slide.png')})`,
      }}
    >
      <div className="absolute inset-0 "></div>
      <div className="relative h-full flex flex-col justify-center items-center text-white">
        <h2 className="font-bold text-center">¡Comienza ahora!</h2>
        <h5 className="mt-4 text-center">
          Para aplicar, explora las plazas disponibles en la sección de Ofertas.
        </h5>

        <h5 className="mt-4 text-center">
          Inicia el proceso creando una cuenta.{" "}
        </h5>

        <div className="mt-6 space-x-4">
          {/* <Link to={OFFER} className="bg-fill-warning text-tp-body-color px-4 py-2 rounded hover:bg-yellow-600"> */}
          Ver Ofertas
          {/* </Link> */}
          {/* <Link to={REGISTER}  className="bg-state-hover text-white px-4 py-2 rounded hover:bg-state-press"> */}
          Crear Cuenta
          {/* </Link> */}
        </div>
      </div>
      ;
    </div>
  );
}

export default Hero;
