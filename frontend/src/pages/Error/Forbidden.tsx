import {Link} from "react-router-dom";
import Image from "next/image";
import GreenButton from "@/components/Buttons/GreenButton";
import espe_error from "../../assets/images/espe_error.png";
import top_error from "../../assets/images/top_error.png";

const Forbidden = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute left-0 top-0">
          <Image src={top_error} alt="Imagen superior" />
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-primary-color md:text-4xl lg:text-5xl">
            Error 403 - Prohibido
          </h1>
          <Image
            className="w-40 md:w-48 lg:w-56"
            src={espe_error}
            alt="Espe Junto a ti"
          />
          <p className="mb-4 text-lg md:text-xl lg:text-2xl">
            Acceso denegado. No tienes permiso para acceder a esta página o
            recurso. Si crees que esto es un error, por favor, comunícate con el
            soporte técnico{" "}
          </p>
          {/* <Link to={HOME}>
            <GreenButton>Volver a la página de inicio</GreenButton>
          </Link> */}
        </div>
      </div>
    );
  };
  
  export default Forbidden;
  