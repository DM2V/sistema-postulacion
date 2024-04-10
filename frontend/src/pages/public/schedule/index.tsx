import Table from "@/components/Form/Table";
import Footer from "@/components/Layout/Footer";
import LayoutWithNavbarPublic from "@/components/Layout/LayoutWithNavbarPublic";
import { getCalendars } from "@/utils/fetch_functions/calendar";
import { BACKEND_ADDRESS } from "@/utils/pocketbase";
import { FC, useEffect, useState } from "react";

export type Calendar = {
  id: string;
  title: string;
  document: string;
};

const Schedule: FC = () => {

  /*   const columnsSchulde = ["Actividad", "Inicio", "Fin"];
    const rowsSchulde = [
      ["PUBLICACIÓN DE CONVOCATORIA", "10-07-2023", "10-07-2023"],
      ["CONVOCATORIA", "10-07-2023", "01-08-2023"],
      ["POSTULACIONES", "01-08-2023", "04-08-2023"],
      [
        "VERIFICACIÓN DE DOCUMENTOS HABILITANTES POR EL DPTO. DE TALENTO HUMANO",
        "07-08-2023",
        "11-08-2023",
      ],
    ]; */

  const columnsRequirements = ["No.", "Requisitos Generales", "Documentos"];
  const rowsRequirements = [
    [
      "1",
      "Hoja de Vida",
      "Formato establecido por la Unidad de Talento Humano(formulario)",
    ],
    [
      "2",
      "Ser mayor de dieciocho (18) años y estar en el pleno de los derechos previstos por la constitución de la Republica del Ecuador y la Ley para el desempeño de una función pública",
      "Cédula de ciudadanía o de identidad vigente a color (anverson y reverso)",
    ],
    [
      "3",
      "Haber sufragado, cuando se tiene obligación de hacerlo, salvo las causas de excusa previstas en la Ley",
      "Certificado de votación del último proceso electoral o su equivalente"
    ],
    [
      "4",
      "Certificado de registro de título",
      "Obtenido en línea de la página web de la Secretaría de Educación Superior Ciencia Tecnología e Innovación (SENESCYT)"
    ],
    [
      "5",
      "Experiencia profesional docente",
      "Certificados laborales emitidos por las instituciones de educación superior u otras instituciones; y/o; documentos similares que acrediten su experiencia profesional docente e investigativa",
    ],
    [
      "6",
      "No estar comprendido en algunas de las causales de prohibición para ejercer cargos públicos",
      "Registro actualizado de no tener impedimento legal para ejercer cargo público (emitido en línea por el Ministerio de Trabajo)"
    ],
    [
      "7",
      "Certificado de no tener responsabilidades administrativas en firme, civiles o indicios de responsabilidad penal",
      "Emitido por la Contraloría General de Estado (reporte de información personal, actualizado)",
    ],
    [
      "8",
      "Experiencia profesional",
      "Certificados laborales emitidos por las instituciones públicas o privadas en las que ejerció su profesión",
    ],
  ];



  const [calendars, setCalendars] = useState<Calendar[]>([]);

  useEffect(() => {
    getCalendars(setCalendars);
  }, []);

  return (
    <>
      <LayoutWithNavbarPublic>
        <div className="container mx-auto mb-10 mt-2 px-4 py-8 md:px-10">
          <div className=" md:text-left">
            <h1 className="font-bold text-primary-color">Cronograma</h1>
            <p className="my-4 text-tp-body-color">
              Encuentra el cronograma correspondiente a tu convocatoria, donde
              podrás consultar las fechas clave y los eventos planificados para
              todo el proceso de selección.
            </p>
          </div>

          {/* <Table columns={columnsSchulde} rows={rowsSchulde} /> */}


          <div className="">
            <h4 className="font-semibold text-state-hover mb-3">Instructivo</h4>
          </div>
          {/* <PDFViewer pdfUrl={pdfUrl} /> */}
          <section>
            <div className="h-auto md:h-auto lg:mx-20 lg:my-7 lg:h-auto">
              <iframe
                src={`${BACKEND_ADDRESS}/api/files/Calendar/dvalmawifo1ong1/2023_uthm_ins_concurso_meritos_oposicion_personal_academico_v2_2Wsp1ltryY.pdf`}
                title="PDF Viewer"
                width="100%"
                height="550"
              />
            </div>
          </section>

          <div className="pt-12">
            <h4 className="py-4 font-semibold text-state-hover">
              Requisitos Generales
            </h4>
            <Table columns={columnsRequirements} rows={rowsRequirements} />
          </div>
        </div>
        <Footer />
      </LayoutWithNavbarPublic>
    </>
  );
};

export default Schedule;
