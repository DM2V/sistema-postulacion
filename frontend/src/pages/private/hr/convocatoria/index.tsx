import GreenButton from "@/components/Buttons/GreenButton";
import WhiteButton from "@/components/Buttons/WhiteButton";
import ComboBox from "@/components/Form/ComboBox";
import InputLabel from "@/components/Form/InputLabel";
import { validateNotEmpty } from "@/utils/validations";
import Link from "next/link";

const Convocatoria = () => {
  return (
    <>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Convocatoria
      </h2>

      <div className="pr-2 lg:w-5/6">
        {/* Periodo de Postulacion */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"applicationPeriod"}
                  title="Periodo de postulación:"
                  onChange={() => {
                    console.log("periodo");
                  }}
                  placeholder="Ejm: 202351"
                  validationFunction={validateNotEmpty}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Departamento */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"department"}
                  title="Departamento:"
                  onChange={() => {
                    console.log("department");
                  }}
                  placeholder="Ejm: Ciencias de la Computación"
                  validationFunction={validateNotEmpty}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Tipo de Contratación */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"typeOfHiring"}
                  title="Tipo de Contratación:"
                  onChange={() => {
                    console.log("typeOfHiring");
                  }}
                  placeholder="Ejm: Personal académico que desarrolla actividades de tercer nivel de grado y cuarto nivel"
                  validationFunction={validateNotEmpty}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Tipo de Personal Académico */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"typeOfAcademicStaff"}
                  title="Tipo de Personal Académico:"
                  onChange={() => {
                    console.log("typeOfAcademicStaff");
                  }}
                  placeholder="Ejm: Titular Auxiliar 1"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"description"}
                  title="Descripción:"
                  onChange={() => {
                    console.log("description");
                  }}
                  placeholder="Ejm: Descripcion"
                  validationFunction={validateNotEmpty}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Actividad */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"activity"}
                  title="Actividad:"
                  onChange={() => {
                    console.log("activity");
                  }}
                  placeholder="Ejm: Actividad"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"description"}
                  title="Descripción:"
                  onChange={() => {
                    console.log("description");
                  }}
                  placeholder="Ejm: Descripcion"
                  validationFunction={validateNotEmpty}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Item */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"description"}
                  title="Descripción de Item:"
                  onChange={() => {
                    console.log("description");
                  }}
                  placeholder="Ejm: Formación"
                  validationFunction={validateNotEmpty}
                />
                <ComboBox
                  name={"AcademicStaff"}
                  title={"Personal Académico"}
                  options={["Titular Auxiliar 1", "Titular Agregado 1"]}
                  onChange={() => {
                    console.log("AcademicStaff");
                  }}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Requisito */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"Requirement"}
                  title="Descripción de Requisito:"
                  onChange={() => {
                    console.log("Requirement");
                  }}
                  placeholder="Ejm: Tener al menos grado académico de maestría"
                  validationFunction={validateNotEmpty}
                />
                <ComboBox
                  name={"item"}
                  title={"Item"}
                  options={["Formación", "Docencia"]}
                  onChange={() => {
                    console.log("AcademicStaff");
                  }}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Titulo de Experiencia */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base ">
            <section>
              <div className="md:grid md:grid-cols-2 md:gap-3">
                <InputLabel
                  name={"TitleOfExperience"}
                  title="Descripción de Título de Experiencia:"
                  onChange={() => {
                    console.log("TitleOfExperience");
                  }}
                  placeholder="Ejm: Nivel B2 en castellano"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"detail"}
                  title="Detalle:"
                  onChange={() => {
                    console.log("detail");
                  }}
                  placeholder="Ejm: Detalle"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"minScore"}
                  title="Puntaje mínimo"
                  onChange={() => {
                    console.log("minScore");
                  }}
                  placeholder="Ejm: 12"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"maxScore"}
                  title="Puntaje máximo:"
                  onChange={() => {
                    console.log("maxScore");
                  }}
                  placeholder="Ejm: 10"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"observation"}
                  title="Observación:"
                  onChange={() => {
                    console.log("observation");
                  }}
                  placeholder="Ejm: Observacion"
                  validationFunction={validateNotEmpty}
                />
                <ComboBox
                  name={"requirement"}
                  title={"Requisito"}
                  options={[
                    "Tener al menos grado de maestría",
                    "128 horas de capacitación",
                  ]}
                  onChange={() => {
                    console.log("AcademicStaff");
                  }}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Campo Amplio */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"wideField"}
                  title="Campo Amplio:"
                  onChange={() => {
                    console.log("wideField");
                  }}
                  placeholder="Ejm: TECNOLOGÍAS DE LA INFORMACIÓN Y LA COMUNICACIÓN (TIC)"
                  validationFunction={validateNotEmpty}
                />
                <InputLabel
                  name={"description"}
                  title="Descripción:"
                  onChange={() => {
                    console.log("description");
                  }}
                  placeholder="Ejm: Descripción"
                  validationFunction={validateNotEmpty}
                />
              </div>
              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        {/* Campo Específico */}
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <form className="text-sm lg:text-base">
            <section>
              <div>
                <InputLabel
                  name={"specificField"}
                  title="Campo Específico:"
                  onChange={() => {
                    console.log("specificField");
                  }}
                  placeholder="Ejm TÉCNICO SUPERIOR EN MANTENIMIENTO DE SOFTWARE"
                  validationFunction={validateNotEmpty}
                />
                <ComboBox
                  name={"wideField"}
                  title={"Campo Amplio"}
                  options={["TIC", "Educación", "Administración"]}
                  onChange={() => {
                    console.log("wideField");
                  }}
                />
                <InputLabel
                  name={"description"}
                  title="Descripción:"
                  onChange={() => {
                    console.log("description");
                  }}
                  placeholder="Ejm: Descripción"
                  validationFunction={validateNotEmpty}
                />
              </div>

              <div>
                <GreenButton
                  content="Añadir"
                  onClick={() => console.log("Clic Añadir")}
                />
                <WhiteButton
                  content="Mostrar"
                  onClick={() => console.log("Clic Mostrar")}
                />
              </div>
            </section>
          </form>
        </div>

        <div className="my-4 flex justify-end">
          <Link href="/private/hr/convocatoria/Create">
            <GreenButton content="Siguiente" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Convocatoria;
