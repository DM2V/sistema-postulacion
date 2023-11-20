import {Link} from "react-router-dom";
import Image from "next/image";
import GreenButton from "@/components/Buttons/GreenButton";
import espe_error from "../../assets/images/espe_error.png";
import top_error from "../../assets/images/top_error.png";

const InternalServer = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute left-0 top-0">
          <Image src={top_error} alt="Imagen superior" />
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-3xl font-extrabold text-primary-color md:text-4xl lg:text-5xl">
            500 -Error Interno del Servidor
          </h1>
          <Image
            className="w-40 md:w-48 lg:w-56"
            src={espe_error}
            alt="Espe Junto a ti"
          />
          <p className="mb-4 text-lg md:text-xl lg:text-2xl">
            Lo sentimos, pero algo salió mal en nuestro servidor. Por favor,
            inténtalo de nuevo más tarde o contáctanos si el problema persiste.{" "}
          </p>
          {/* <Link to={HOME}> */}
            {/* <GreenButton>Contáctanos</GreenButton> */}
          {/* </Link> */}
        </div>
      </div>
    );
  };
  
  export default InternalServer;