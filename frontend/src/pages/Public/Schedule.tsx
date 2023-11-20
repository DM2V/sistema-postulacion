import React, { FC, useState } from "react";
import { Concourse, Requirements } from "@/assets/icons";
import GreenButton from "@/components/Buttons/GreenButton";
import ComboBox from "@/components/Form/ComboBox";
import Table from "@/components/Form/Table";
import { SearchScheduleProps } from "@/types/components/types.t";

const Schedule: FC = () => {
  const columnsSchulde = ["Actividad", "Inicio", "Fin"];

  const rowsSchulde = [
    ["PUBLICACIÓN DE CONVOCATORIA", "10-07-2023", "10-07-2023"],
    ["CONVOCATORIA", "10-07-2023", "01-08-2023"],
    ["POSTULACIONES", "01-08-2023", "04-08-2023"],
    [
      "VERIFICACIÓN DE DOCUMENTOS HABILITANTES POR EL DPTO. DE TALENTO HUMANO",
      "07-08-2023",
      "11-08-2023",
    ],
  ];

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
  ];

  const [formState, setFormState] = useState<SearchScheduleProps>({
    schedule_period: "",
    schedule_announcement: "",
    schedule_campus: "",
  });

  const handleFormChange = (fieldName: string, value: string) => {
    setFormState({
      ...formState,
      [fieldName]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container mx-auto mb-10 mt-2 px-4 py-8 md:px-10">
        <div className=" md:text-left">
          <h1 className="font-bold text-primary-color">Cronograma</h1>
          <p className="my-4 text-tp-body-color">
            Encuentra el cronograma correspondiente a tu convocatoria, donde
            podrás consultar las fechas clave y los eventos planificados para
            todo el proceso de selección.
          </p>
        </div>

        <div className="pt-4">
          <h4 className="font-semibold text-state-hover">
            Consulta de convocatoria
          </h4>
        </div>
        <form
          className="flex flex-col  items-center  md:flex-row"
          onSubmit={handleSubmit}
        >
          <div className=" w-full pt-4 md:w-2/4 md:pr-4">
            <ComboBox
              name={"schedule_period"}
              title={"Período de Postulación:"}
              defaultOption={""}
              options={["202351", "202350", "202251", "202250"]}
              onChange={handleFormChange}
            />
          </div>

          <div className="w-full  pt-4 md:w-5/6 md:pr-4">
            <ComboBox
              name={"schedule_announcement"}
              title={"Convocatoria:"}
              defaultOption={""}
              options={[
                "Departamento de Ciencias de la Computación",
                "Ciencias Exactas",
              ]}
              onChange={handleFormChange}
            />
          </div>
          <div className="w-full  pt-4 md:w-2/4 md:pr-4">
            <ComboBox
              name={"schedule_campus"}
              title={"Sede:"}
              defaultOption={""}
              options={["Matriz Sangolquí", "Santo Domingo"]}
              onChange={handleFormChange}
            />
          </div>
          <div className="pt-4 md:w-1/6 md:pr-4">
            <GreenButton content="Buscar" />
          </div>
        </form>

        <div className="flex items-center justify-center py-4">
          <div className="mx-4 flex flex-col items-center">
            <i className="text-3xl">
              <Concourse />
            </i>
            <p className="mt-2 text-center text-sm text-state-hover ">
              Bases del concurso
            </p>
          </div>
          <div className="mx-4 flex flex-col items-center">
            <i className="text-3xl">
              <Requirements />
            </i>
            <p className="mt-2 text-center text-sm text-state-hover">
              Requisitos
            </p>
          </div>
        </div>

        <Table columns={columnsSchulde} rows={rowsSchulde} />
        <div className="pt-12">
          <h4 className="font-semibold text-state-hover">Bases del Concurso</h4>
        </div>
        {/* <PDFViewer pdfUrl={pdfUrl} /> */}

        <div className="pt-12">
          <h4 className="py-4 font-semibold text-state-hover">
            Requisitos Generales
          </h4>
          <Table columns={columnsRequirements} rows={rowsRequirements} />
        </div>
      </div>
    </>
  );
};

export default Schedule;
