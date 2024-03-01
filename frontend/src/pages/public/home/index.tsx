import { Campus, EmbeddedCircle, Phases, Schedule } from "@/assets/icons/index";
import GreenButton from "@/components/Buttons/GreenButton";
import Card from "@/components/Home/Card";
import Hero from "@/components/Home/Hero";
import Slide from "@/components/Home/Slide";
import { PHASES } from "@/routes/paths";
import { CardHome, Offer } from "@/types/components/types.t";
import Link from "next/link";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const HomePage: React.FC = () => {
  const [offers, setOffer] = useState<Offer[]>([]);
  const [cards, setCards] = useState<CardHome[]>([]);

  const handleClick = () => {
    console.log("El botón verde fue clickeado *conoce el proceso?!*");
  };

  useEffect(() => {
    const cardsData: CardHome[] = [
      {
        title: "Sedes",
        icon: <Campus />,
        description:
          "Conoce los lugares donde tendrán lugar las evaluaciones y prepárate para el éxito en tu área.",
        root: "/public/campus",
      },
      {
        title: "Fases del Concurso",
        icon: <Phases />,
        description:
          "Descubre las etapas clave de evaluación y prepárate para brillar en cada una de ellas.",
        root: "/public/phases",
      },
      {
        title: "Cronograma",
        icon: <Schedule />,
        description:
          "Planifica tus pasos con nuestro cronograma detallado para no perderte una fecha importante.",
        root: "/public/schedule",
      },
    ];

    setCards((prevCards) => [...prevCards, ...cardsData]);
    setOffer((prevOffers) => [...prevOffers, ...offers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-bg-primary-color">
      <Slide />

      <div className="relative mx-auto mb-96 h-24 md:mb-24 md:h-full lg:mb-56">
        <div className="absolute -top-64 w-full lg:-top-52">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 583"
            stroke="#FAFAFA"
          >
            <path
              d="M-4 582V1C174.667 25.0543 581.2 56.5575 738 56.5575C894.8 56.5575 1268 25.0543 1440 1V582H-4Z"
              fill="white"
              stroke="#FAFAFA"
            />
          </svg>
        </div>

        <div className="container absolute inset-0 z-10 mx-auto flex flex-col items-center justify-start text-center md:justify-center">
          <h4 className="-mt-56 text-h5 font-bold text-primary-color md:-mt-36 md:text-h4 lg:mt-10">
            ¡Forma Parte de Nuestro Equipo de Docentes en el Departamento de
            Ciencias de la Computación!
          </h4>
          <div className="mt-4 flex h-96 flex-col items-center gap-y-4 md:flex-row md:justify-start md:space-x-4">
            {cards.map((card, index) => (
              <article
                key={index}
                className="transition-transform hover:scale-105 lg:w-80"
              >
                <Card key={index} card={card} />
              </article>
            ))}
          </div>
        </div>
      </div>

      <Hero />

      <div className="container mx-auto mb-10 mt-8 px-10">
        <div className="items-top md:items-top container mx-auto flex flex-col justify-center space-y-8 py-8 md:flex-row  md:space-y-0 md:py-12">
          <div className="w-full p-4  md:w-1/2 md:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-primary-color md:text-3xl">
              ¡Explora el Camino hacia el Éxito!
            </h2>
            <p className="mb-4 text-gray-700">
              ¿Quieres conocer en detalle cómo se desarrolla nuestro concurso de
              selección de docentes? <br />
              Aquí te proporcionamos toda la información que
              necesitas para estar preparado. Explora el cronograma completo,
              comprende las distintas fases del concurso y conoce las sedes
              donde tendrán lugar las evaluaciones. Estamos comprometidos con la
              transparencia y la excelencia en nuestro proceso de selección.
            </p>
            <Link href={PHASES}>
              <GreenButton onClick={handleClick} content="Conoce el proceso" />
            </Link>
          </div>

          <div className="relative mt-4 flex w-full flex-col justify-end p-4 md:mt-0 md:w-1/2 md:p-8">
            <div className="z-10 flex flex-col items-end rounded-3xl bg-gradient-to-b from-fill-sucess to-primary-color p-6 text-white drop-shadow md:p-8">
              <p className="pb-6">
                En la Universidad de las Fuerzas Armadas ESPE no solo
                buscamos docentes excepcionales, sino que también creemos en la
                transparencia y la accesibilidad. Te invitamos a embarcarte en
                este viaje hacia el crecimiento futuro de tu carrera
                profesional.
              </p>
              <EmbeddedCircle />
            </div>

            <div className="absolute  left-4 md:-bottom-8  md:left-16">
              <div className=" letf-8 top-8 flex flex-col items-end rounded-3xl bg-green-900 p-6 drop-shadow md:left-8 md:p-8">
                <p className="text-green-900">
                  En el Departamento de Ciencias de la Computación, no solo
                  buscamos docentes excepcionales.En el Departamento de Ciencias
                  de la Computación, no solo buscamos docentes excepcionales.En
                  el Departamento de Ciencias de la Computación, no solo
                  buscamos docentes excepcionales.
                </p>
                <EmbeddedCircle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
