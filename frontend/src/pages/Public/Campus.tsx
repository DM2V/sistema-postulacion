import { useEffect, useState } from "react";

import AboutCampus from "../../components/Campus/AboutCampus";
import InfoCampus from "../../components/Campus/InfoCampus";
//import MapView from "../../components/Campus/MapView";

function Campus() {
  const [campusData, setCampusData] = useState([]);
  const [aboutCampus, setAboutCampus] = useState([]);

  useEffect(() => {
    const campusInfo = [
      {
        title: "Campus Matriz Sangolqui",
        location: "Av. General Rumiñahui s/n y Ambato",
        phone: "(593)23989-400",
        email: "comunicacion@espe.edu.ec",
        website: "https://www.espe.edu.ec/",
      },
      {
        title: "Campus Latacunga Centro",
        location: "Calle Quijano y Ordónez y Hna.Páez",
        phone: "(593)32810-206 Ext: 4121",
        email: "marketing-el@espe.edu.ec",
        website: "https://espe-el.espe.edu.ec/",
      },
      {
        title: "Campus Latacunga Belisario Quevedo",
        location: "Parroquia Belisario Quevedo",
        phone: "(593) 32810-206 Ext: 4132",
        email: "marketing-el@espe.edu.ec",
        website: "https://espe-el.espe.edu.ec/",
      },
      {
        title: "Campus Santo Domingo",
        location: "Hda. Zoila Luz, Vía Santo Domingo – Quevedo Km. 24",
        phone: "(593)22722-246",
        email: "santodomingo@espe.edu.ec",
        website: "http://santodomingo.espe.edu.ec/",
      },
    ];

    const aboutCampus = [
      {
        imageUrl:
          "https://www.espe.edu.ec/wp-content/uploads/2021/03/Espe-Matriz-Sangolqui.gif",
        title: "Campus Sangolqui",
        description:
          "Nuestro campus es un lugar donde la innovación y la excelencia se fusionan para formar a los líderes del mañana. Aquí, encontrarás una amplia gama de emocionantes programas académicos, desde Ingeniería de Software hasta Medicina. También ofrecemos oportunidades en áreas de alta demanda como Tecnologías de la Información, Administración de Empresas y Biotecnología.",
      },
      {
        imageUrl:
          "https://espe-el.espe.edu.ec/wp-content/uploads/2020/10/Espe-latacunga-centro.jpg",
        title: "Campus Latacunga Centro",
        description:
          "En el corazón de Latacunga, nuestro campus se especializa en Mecatrónica, una disciplina que combina la mecánica, la electrónica y la informática. Aquí, los estudiantes obtienen las habilidades necesarias para abordar los desafíos de la automatización y la tecnología avanzada en una variedad de industrias.",
      },
      {
        imageUrl:
          "https://santodomingo.espe.edu.ec/wp-content/uploads/2019/12/Espe-Latacunga.jpg",
        title: "Campus Latacunga Belisario Quevedo",
        description:
          "Este es el lugar donde la excelencia se encuentra con la ingeniería. Ofrecemos programas emocionantes como Petroquímica e Ingeniería Automotriz, junto con opciones en Electrónica y Automatización y Electromecánica. Nuestro campus está diseñado para prepararte para una carrera en la vanguardia de la tecnología y la industria.",
      },
      {
        imageUrl:
          "https://santodomingo.espe.edu.ec/wp-content/uploads/2020/09/Espe-Sede-Santo-Domingo.jpg",
        title: "Campus Santo Domingo",
        description:
          "Nuestro campus en Santo Domingo de los Tsáchilas es un centro de innovación en Tecnologías de la Información, Agropecuaria y Biotecnología. Aquí, los futuros profesionales encuentran un ambiente estimulante para desarrollar habilidades tecnológicas y empresariales que los prepararán para enfrentar los desafíos del siglo XXI.",
      },
    ];

    setCampusData(campusInfo);
    setAboutCampus(aboutCampus);
  }, []);

  return (
    <div className="container mx-auto mt-2 px-10 mb-10">
      <div className="lg:grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-0 ">
        {/* InfoCampus */}
        <section className="md:flex md:flex-col md:justify-center md:items-center lg:block">
          <h3 className="text-primary-color mt-5 font-bold text-h3 min-[320px]:text-center md:text-left lg:text-left ">
            Sedes
          </h3>
          {campusData.map((data, index) => (
            <article
              key={index}
              className="transition-transform hover:scale-105">
              <InfoCampus key={index} info={data} />
            </article>
          ))}
        </section>

        {/* Location */}
        <section>
          <h3 className="text-primary-color mt-5 font-bold text-h3 mb-5">
            Ubicación
          </h3>
          <div className="flex flex-col items-center justify-center">
            {/* <MapView /> */}
            <h1>MAPA</h1>
          </div>
        </section>
      </div>

      <div className="flex flex-col justify-center items-center">
        <section className="bg-secondary-color text-white p-5 m-5 rounded-2xl sm:w-full md:w-4/5 lg:w-11/12">
          <p>
            En la Universidad de las Fuerzas Armadas ESPE, estamos orgullosos de
            ofrecer una variedad de sedes especializadas en diferentes
            disciplinas académicas. Cada una de nuestras sedes está diseñada
            para brindar una educación de calidad y oportunidades únicas en su
            campo respectivo. Descubre más sobre cada una de nuestras sedes y lo
            que tienen para ofrecerte.
          </p>
        </section>

        <h3 className="text-ter-color text-h3 font-bold mt-10 mb-5 mr-auto">
          Conoce más sobre nuestras Sedes
        </h3>

        {/* AboutCampus */}
        {aboutCampus.map((data, index) => (
          <article key={index} className="mb-5">
            <AboutCampus key={index} info={data} />
          </article>
        ))}
      </div>
    </div>
  );
}

export default Campus;
