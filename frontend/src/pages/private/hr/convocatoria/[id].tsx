import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { CONVOCATIONHR } from "@/routes/paths";
import { Call } from "@/types/convocatoria";
import { BACKEND_ADDRESS, pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ViewCall() {
  const router = useRouter();
  const { id } = router.query;
  const [call, setCall] = useState<Call | undefined>();
  const headerName = [
    "Vacantes",
    "Horas",
    "Sedes",
    "Departamento",
    "Campo Amplio",
    "Campo Específico",
    "Tipo Personal Académico",
  ];
  const headerNameCalendar = ["Actividad", "Inicio", "Fin"];
  
  useEffect(() => {
    async function getCall() {
      if (id) {
        const record = await pb.collection("Call").getOne<Call>(id as string, {
          expand: "period,department,site,calendarPhases,offers,offers.site,offers.department,offers.wideField,offers.specificField,offers.academicStaff",
        });
        setCall(record);
      }
    }
    getCall();
  }, [id]);

  if (!id) {
    return <div>No se proporcionó un ID válido</div>;
  }

  return (
    <LayoutWithSidebar>

      <div className="flex flex-col items-start justify-between mx-5">
        <h3 className="mt-5 ml-5 text-center font-bold text-ter-color lg:text-start">
          Convocatoria
        </h3>
        <p className="ml-5 text-base text-tp-disable-color pb-2">
          <Link href={CONVOCATIONHR}>&lt;Regresar</Link>
        </p>
      </div>


      <div className="">
        <div className="bg-[#f3f3f3] h-screen pt-3 flex flex-col items-center">
          <section className="border mx-7 px-3 space-y-2 text-base rounded-lg p-1 shadow-sm bg-white">
            <div className="flex items-center space-x-10">
              <div className="flex flex-col">
                <p>
                  <b>Periodo:</b>
                </p>
                <p>{call?.expand?.period?.name}</p>
              </div>
              <div className="flex flex-col">
                <p>
                  <b>Departamento:</b>
                </p>
                <p>{call?.expand?.department?.name}</p>
              </div>
              <div className="flex flex-col">
                <p>
                  <b>Sede:</b>
                </p>
                <p>{call?.expand?.site?.name}</p>
              </div>
            </div>

            <div>
              <p>
                <b>Bases de la convocatoria:</b>
              </p>
              <a
                target="_blank"
                href={`${BACKEND_ADDRESS}/api/files/Call/${call?.id}/${call?.rules}`}
              >
                Descargar
              </a>
            </div>

            <div className="text-sm">
              <p className="text-h5 font-medium"> Fases de la oferta</p>
              <div className="my-3 h-auto md:h-auto  lg:h-auto">
                <div className="max-h-[calc(40vh)] md:max-h-[calc(70vh)] lg:max-h-[calc(90vh)]">
                  <table className="w-full overflow-x-scroll rounded-lg border border-gray-300 bg-white">
                    {call?.expand?.calendarPhases &&
                      call?.expand?.calendarPhases?.length > 0 && (
                        <thead className="sticky top-0 bg-gray-200">
                          <tr className="sm:table-row">
                            {headerNameCalendar
                              .filter((header) => header !== "id")
                              .map((header) => (
                                <th
                                  key={header}
                                  className="border-b px-4 py-2 md:table-cell lg:table-cell"
                                >
                                  {header.charAt(0).toUpperCase() +
                                    header.slice(1)}
                                </th>
                              ))}
                          </tr>
                        </thead>
                      )}
                    <tbody>
                      {call?.expand?.calendarPhases &&
                        call?.expand?.calendarPhases.length > 0
                        ? call?.expand?.calendarPhases.map((calendar) => (
                          <tr
                            key={`${calendar.activity}-${calendar.end}-${calendar.start}`}
                            className="sm:table-row"
                          >
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {calendar.activity}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {calendar.start.slice(0, 10)}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {calendar.end.slice(0, 10)}
                            </td>
                          </tr>
                        ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-h5 font-medium">Ofertas</p>
              <div className="my-3 h-auto md:h-auto  lg:h-auto">
                <div className="max-h-[calc(40vh)] md:max-h-[calc(70vh)] lg:max-h-[calc(90vh)]">
                  <table className="w-full overflow-x-scroll rounded-lg border border-gray-300 bg-white">
                    {call?.expand?.offers &&
                      call?.expand?.offers?.length > 0 && (
                        <thead className="sticky top-0 bg-gray-200">
                          <tr className="sm:table-row">
                            {headerName
                              .filter((header) => header !== "id")
                              .map((header) => (
                                <th
                                  key={header}
                                  className="border-b px-4 py-2 md:table-cell lg:table-cell"
                                >
                                  {header.charAt(0).toUpperCase() +
                                    header.slice(1)}
                                </th>
                              ))}
                          </tr>
                        </thead>
                      )}
                    <tbody>
                      {call?.expand?.offers &&
                        call?.expand?.offers.length > 0
                        ? call?.expand?.offers.map((offer) => (
                          <tr key={offer.id} className="sm:table-row">
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.openings}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.hours}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.expand?.site?.name}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.expand?.department?.name}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.expand?.wideField?.name}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.expand?.specificField?.name}
                            </td>
                            <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                              {offer.expand?.academicStaff?.name}
                            </td>

                          </tr>
                        ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </LayoutWithSidebar>
  );
}

export default ViewCall;
