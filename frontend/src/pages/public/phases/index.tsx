import Footer from "@/components/Layout/Footer";
import LayoutWithNavbarPublixc from "@/components/Layout/LayoutWithNavbarPublic";

function Phases() {

  return (

    <LayoutWithNavbarPublixc>
      <div className="container mx-auto mt-2 px-10 mb-10">
        <h3 className="text-h3 text-primary-color font-bold mt-10 mb-5 ">
          Proceso de Selección Docente
        </h3>
        <p className="text-tp-disable-color font-bold">
          Descubre las fases del proceso, postúlate para unirte a nuestro equipo
          académico de excelencia y sigue tu camino hacia una carrera docente de
          éxito en el Departamento de Ciencias de la Computación.
        </p>

        <div className="md:mx-32 lg:mx-28 lg:relative ">
          {/* Postulation Phase */}
          <section className="my-10 relative ">
            <div className="bg-white  rounded-lg w-96 relative">
              <h5 className="bg-primary-color text-gray-bg p-2 text-h5 font-bold rounded-xl relative z-10">
                Fase de Postulación
              </h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 0 512 512"
                className="absolute top-0 right-0 z-20 -mr-4"
                style={{ marginTop: "-0.5rem" }}>
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                  fill="#E8B93F"
                />
                <path
                  d="M256 488A232 232 0 1 1 256 24a232 232 0 1 1 0 464z"
                  fill="white"
                />
              </svg>
              <div className="mx-7">
                <h6 className="font-bold mt-2">¿Qué es?</h6>
                <p>
                  La postulación al concurso público de méritos y oposición se
                  realiza a través de esta aplicación web.
                </p>
                <h6 className="font-bold mt-3">¿Qué hacer?</h6>
                <p>
                  Completa los formularios y carga los documentos necesarios
                  firmados.
                </p>
                <h6 className="font-bold mt-3 ">💡Importante</h6>
                <p>
                  Recuerda que <strong> solo puedes postularte una vez</strong> y
                  no podrás cambiar tu elección una vez aceptada la plaza.
                </p>
              </div>
            </div>
          </section>

          {/* Merits Phase */}
          <section className="my-10 relative lg:flex lg:justify-end lg:items-center">
            <div className="bg-white  rounded-lg w-96 relative">
              <h5 className="bg-primary-color text-gray-bg p-2 text-h5 font-bold rounded-xl relative z-10 pl-14">
                Fase de Méritos
              </h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 0 512 512"
                className="absolute top-0 left-0 z-20 -ml-4"
                style={{ marginTop: "-0.5rem" }}>
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                  fill="#E8B93F"
                />
                <path
                  d="M256 488A232 232 0 1 1 256 24a232 232 0 1 1 0 464z"
                  fill="white"
                />
              </svg>
              <div className="mx-10">
                <p className="mt-2">
                  <i>Tu mérito será evaluado para determinar tu idoneidad.</i>
                </p>
                <h6 className="font-bold mt-2">¿Qué es?</h6>
                <p>
                  Los documentos presentados por los aspirantes se analizan,
                  verifican y califican.
                </p>
                <h6 className="font-bold mt-3">¿Cómo funciona?</h6>
                <p>
                  Consulta el <strong>instructivo</strong> si tienes preguntas
                  sobre la ponderación.
                </p>
              </div>
            </div>
          </section>

          {/* Opposition Phase */}
          <section className="my-10 relative">
            <div className="bg-white  rounded-lg w-96 relative">
              <h5 className="bg-primary-color text-gray-bg p-2 text-h5 font-bold rounded-xl relative z-10">
                Fase de Oposición
              </h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 0 512 512"
                className="absolute top-0 right-0 z-20 -mr-4"
                style={{ marginTop: "-0.5rem" }}>
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                  fill="#E8B93F"
                />
                <path
                  d="M256 488A232 232 0 1 1 256 24a232 232 0 1 1 0 464z"
                  fill="white"
                />
              </svg>
              <div className="mx-7">
                <p className="mt-2">
                  <i>
                    Demuestra tus habilidades en una evaluación práctica y oral.
                  </i>
                </p>
                <h6 className="font-bold mt-2">¿En qué consiste?</h6>
                Se divide en dos etapas:
                <ul className="list-disc list-inside mx-4">
                  <li>Pruebas teóricas/prácticas, orales y escritas</li>
                  <li>
                    Una clase demostrativa o exposición pública de un proyecto de
                    investigación o innovación educativa o una obra o creación
                    artística, en el que el concursante haya participado o
                    dirigido.
                  </li>
                </ul>
                <h6 className="font-bold mt-3 ">💡Importante</h6>
                <p>
                  La fase de oposición se realiza de forma{" "}
                  <strong>presencial</strong> en una de nuestras sedes.
                </p>
              </div>
            </div>
          </section>

          {/* Barra */}
          <div className="h-full w-3 hidden sm:hidden md:hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.3em"
              viewBox="0 0 512 512"
              className="absolute top-7 right-0 z-20 -mr-1.5"
              style={{ marginTop: "-0.5rem" }}>
              <path
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                fill="#E8B93F"
              />
            </svg>

            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 512 512"
                className="absolute -top-40 right-0 z-20 -mr-1.5"
                style={{ marginTop: "-0.5rem" }}>
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                  fill="#E8B93F"
                />
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.3em"
                viewBox="0 0 512 512"
                className="absolute -top-[410px] right-0 z-20 -mr-1.5"
                style={{ marginTop: "-0.5rem" }}>
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
                  fill="#E8B93F"
                />
              </svg>
            </div>

            <div className="w-3 h-full border-bg-disable border rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-center">

        </div>

        <section className="my-5">
          <h5 className="font-bold">👀 Consideraciones</h5>
          <div className="bg-state-hover-secondary p-7 my-5 rounded-2xl">
            <h6 className="font-bold">🚩Impugnación</h6>
            <p>
              Si no estás de acuerdo, tienes la oportunidad de impugnar los
              resultados.
            </p>
            <h6 className="font-bold mt-3">¿Cómo hacerlo?</h6>
            <p>
              Puedes impugnar los resultados de cada fase del concurso dentro de
              tres (3) días desde la notificación, presentando una solicitud al
              Vicerrector Académico General a través del Centro de Atención al
              Usuario de la Universidad o por correo a{" "}
              <strong>causuario@espe.edu.ec</strong>.
            </p>
          </div>

          <h5 className="font-bold">🏆 Aprobación y Notificación de Ganadores</h5>
          <div className="my-3 bg-bg-warning p-7 rounded-2xl">
            <p>
              Al finalizar cada fase, se notificarán los resultados y se aprobarán
              a los ganadores.
            </p>
            <h6 className="font-bold mt-3">¿Qué esperas?</h6>
            <p>
              Una vez completadas todas las fases, los resultados son evaluados de
              manera minuciosa por nuestro equipo de expertos. Aquellos que
              demuestren su excelencia académica y profesional serán aprobados
              para unirse a nuestro selecto cuerpo docente.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </LayoutWithNavbarPublixc>

  );
}

export default Phases;
