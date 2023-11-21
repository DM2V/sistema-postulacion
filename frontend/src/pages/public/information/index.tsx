import GreenButton from "@/components/Buttons/GreenButton";
import Image from "next/image";

function Information() {
  return (
    <div className="container mx-auto mb-10 mt-2 px-10">
      <h3 className="my-7 text-center text-h3 font-bold text-primary-color lg:text-left">
        Información
      </h3>
      <section className="mb-10 flex flex-col items-center justify-center gap-5 text-center md:flex-row md:text-left lg:text-left">
        <p className="p-3 text-justify lg:w-2/5">
          El presente sistema es una aplicación web multiplataforma diseñada con
          el propósito de optimizar y perfeccionar el proceso de gestión y
          administración del proceso de contratación docente, basado en el
          concurso de méritos y oposición de la Universidad de las Fuerzas
          Armadas ESPE, específicamente en el Departamento de Ciencias de la
          Computación. El objetivo principal del Sistema de Registro de Docentes
          es centralizar y mejorar la eficiencia de todo el ciclo de selección
          de docentes.
        </p>
        <Image
          src="https://srvcas.espe.edu.ec/authenticationendpoint/images/sidebar-4.jpg"
          alt="information"
          className=" h-max p-1 md:h-72 md:w-2/5"
          width={768}
          height={768}
          priority={true}
        />
      </section>

      <section>
        <p className="font-bold text-primary-color sm:flex sm:items-center sm:justify-center sm:text-h6 md:mb-3 md:flex md:items-start md:justify-start md:text-h4 lg:flex lg:items-start lg:justify-start lg:text-h3">
          Conoce el Instructivo
        </p>

        <div className="h-auto md:h-auto lg:mx-20 lg:my-7 lg:h-auto">
          <iframe
            src="https://pdf-lib.js.org/assets/dod_character.pdf" //Cambiar por el link del instructivo
            title="PDF Viewer"
            width="100%"
            height="550"
            className="mb-5 h-72 md:mb-5 md:h-80 lg:h-screen"
          />
        </div>
      </section>

      <div className="flex items-center justify-center">
        <GreenButton content="Inicia tu Postulación" />
      </div>
    </div>
  );
}

export default Information;
