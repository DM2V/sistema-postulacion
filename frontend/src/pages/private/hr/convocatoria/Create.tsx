import GreenButton from "@/components/Buttons/GreenButton";
import ComboBox from "@/components/Form/ComboBox";
import InputLabel from "@/components/Form/InputLabel";
import { OfferView } from "@/types/components/types.t";
import { validateNotEmpty } from "@/utils/validations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateCall = () => {
  const [offers, setoffers] = useState<OfferView[]>([]);
  const headerName = [
    "Vacantes",
    "Horas",
    "Sedes",
    "Departamento",
    "Campo Amplio",
    "Campo Específico",
    "Tipo Personal Académico",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDataOffers();
        if (Array.isArray(data) && data.length > 0) {
          setoffers(data);
        } else {
          console.error("Error: Datos de empleo no válidos.");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);
  const router = useRouter();

  return (
    <>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Convocatoria
      </h2>
      <div className="pr-2 lg:w-5/6">
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <div className="text-sm md:grid md:grid-cols-3 md:gap-3 lg:text-base">
            <section>
              <ComboBox
                name={"applicationPeriod"}
                title={"Periodo de Postulación"}
                options={["202351", "202350"]}
                onChange={() => {
                  console.log("applicationPeriod");
                }}
              />
            </section>

            <section>
              <ComboBox
                name={"department"}
                title={"Departamento"}
                options={["Ciencias de la Computación", "Energía y Mecánica"]}
                onChange={() => {
                  console.log("department");
                }}
              />
            </section>

            <section>
              <ComboBox
                name={"campus"}
                title={"Sede:"}
                options={["Matriz Sangolqui", "Latacunga"]}
                onChange={() => {
                  console.log("campus");
                }}
              />
            </section>
          </div>

          <section>
            <p>Bases del Concurso: File Upload</p>
            <InputLabel
              name={"specificField"}
              title=""
              onChange={() => {
                console.log("specificField");
              }}
              placeholder="Subir Bases del Concurso"
              validationFunction={validateNotEmpty}
            />
          </section>

          <div className="my-4 flex items-center justify-between text-xs">
            <p className="py-3 text-h6 font-bold text-state-press md:text-2xl">
              Fases de la oferta (Cronograma)
            </p>
            <Link href="/private/hr/schedule">
              <button className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none">
                +Agregar
              </button>
            </Link>
          </div>

          <div className="my-3 h-auto md:h-auto lg:mx-3 lg:h-auto">
            Viasualizacion del Cronograma
          </div>

          {/* Tabla de ofertas */}
          <div className="my-4 flex items-center justify-between text-xs">
            <p className="py-3 text-h6 font-bold text-state-press md:text-2xl">
              Ofertas
            </p>
            <Link href="/private/hr/offer">
              <button className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none">
                +Agregar
              </button>
            </Link>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
                {offers.length > 0 && (
                  <thead className="bg-gray-200">
                    <tr className="sm:table-row">
                      {headerName
                        .filter((header) => header !== "id")
                        .map((header) => (
                          <th
                            key={header}
                            className="border-b px-4 py-2 md:table-cell lg:table-cell"
                          >
                            {header.charAt(0).toUpperCase() + header.slice(1)}
                          </th>
                        ))}
                      <th className="border-b px-4 py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {offers.length > 0 ? (
                    offers.map((offer) => (
                      <tr key={offer.id} className="sm:table-row">
                        {Object.keys(offer)
                          .filter((key) => key !== "id")
                          .map((key, index) => (
                            <td
                              key={index}
                              className="border-b px-4 py-2 md:table-cell lg:table-cell"
                            >
                              {offer[key as keyof typeof offer]}
                            </td>
                          ))}
                        <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                          Ver - Editar
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Si no hay datos, mostrar solo la fila de cabecera
                    <tr className="sm:table-row">
                      {headerName.map((nombreCabecera, index) => (
                        <th
                          key={index}
                          className="border-b px-4 py-2 md:table-cell lg:table-cell"
                        >
                          {nombreCabecera}
                        </th>
                      ))}
                      <th className="border-b px-4 py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <GreenButton content="Crear Convocatoria" />
          </div>
        </div>
      </div>
    </>
  );
};

const getAllDataOffers = async (): Promise<OfferView[]> => {
  return [];
};

export default CreateCall;
