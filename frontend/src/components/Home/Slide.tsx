import Image from "next/image";
import logoImage from "../../assets/images/dcco-logo.png";

function Slide() {
  return (
    <div className="relative h-[38rem]">
      <div
        className="absolute top-0 left-0 w-full h-80 bg-cover bg-center md:h-80 lg:h-full"
        style={{
          backgroundImage:
            'url("https://www.espe.edu.ec/wp-content/uploads/slider/cache/39238263051b0ad849c2f7758a3b529c/ESPE-Matriz-2.png")',
        }}
      ></div>

      <div className="absolute flex justify-center items-start pt-4 md:items-end md:pt-0 transform -translate-y-1/2 top-52 left-0 right-0 bottom-0 lg:top-1/3 lg:mt-4 lg:block">
        <div
          className="absolute top-7 bg-cover bg-center filter blur-sm w-80 rounded-2xl h-64 md:w-96 md:h-64 md:blur-md md:top-8 lg:blur-sm lg:w-full lg:h-full"
          style={{
            backgroundImage:
              'url("https://www.espe.edu.ec/wp-content/uploads/slider/cache/39238263051b0ad849c2f7758a3b529c/ESPE-Matriz-2.png")',
          }}
        ></div>

        <div className="relative rounded-2xl flex flex-col justify-center items-center md:m-24 lg:mx-auto lg:h-auto lg:m-0 lg:justify-start lg:items-start lg:px-20">
          <Image
            src={logoImage}
            alt="Logo del departamento de ciencias de la Computación"
            className="w-20 h-20 mb-2"
          />
          {/* <div className="w-20 h-20 mb-2"></div> */}

          <div className="bg-white rounded-full inline-block p-2 mb-2">
            <p className="text-tp-heading-color font-extrabold text-h4 md:text-h3 lg:text-h2">
              CONCURSO DE
            </p>
          </div>

          <h1 className="text-white text-h5 font-semibold md:text-h4 lg:text-h2">
            MÉRITOS Y OPOSICIÓN
          </h1>

          <p className="text-white text-h6 font-bold md:text-h5 lg:text-h3">
            PARA SELECCIÓN DE
          </p>
          <p className="text-white text-h6 font-bold md:text-h5 lg:text-h3">
            DOCENTES
          </p>
        </div>
      </div>
    </div>
  );
};

export default Slide;