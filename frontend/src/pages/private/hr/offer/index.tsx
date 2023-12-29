import GreenButton from "@/components/Buttons/GreenButton";
import ComboBox from "@/components/Form/ComboBox";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import { validateNotEmpty } from "@/utils/validations";

export const Offer = () => {
  return (
    <>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Crear Oferta
      </h2>
      <div className="pr-2 lg:w-5/6">
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md "
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <div className="md:grid md:grid-cols-3 md:gap-x-4">
            {/* Periodo de aplicacion */}
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

            {/* Departamento */}
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

            {/* Sede */}
            <section>
              <ComboBox
                name={"campus"}
                title={"Sede"}
                options={[
                  "Matriz Sangolqui",
                  "Latacunga",
                  "Latacunga Belisario Quevedo",
                  "Santo Domingo",
                ]}
                onChange={() => {
                  console.log("campus");
                }}
              />
            </section>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            {/* Tipo de contratacion */}
            <section>
              <ComboBox
                name={"typeOfHiring"}
                title={"Tipo de contratación"}
                options={["Tiempo completo", "Medio tiempo"]}
                onChange={() => {
                  console.log("typeOfHiring");
                }}
              />
            </section>

            {/* Personal Academico */}
            <section>
              <ComboBox
                name={"academicStaff"}
                title={"Personal Académico"}
                options={[
                  "Titular Auxiliar 1",
                  "Técnico de Laboratorio Nivel 1",
                ]}
                onChange={() => {
                  console.log("academicStaff");
                }}
              />
            </section>
          </div>

          {/* Campo amplio */}
          <section>
            <ComboBox
              name={"wideField"}
              title={"Campo Amplio"}
              options={[
                "TECNOLOGÍAS DE LA INFORMACIÓN Y LA COMUNICACIÓN (TIC)",
              ]}
              onChange={() => {
                console.log("WideField");
              }}
            />
          </section>

          {/* Campo especifico */}
          <section>
            <ComboBox
              name={"specificField"}
              title={"Campo Específico"}
              options={["TÉCNICO SUPERIOR EN MANTENIMIENTO DE SOFTWARE"]}
              onChange={() => {
                console.log("specificField");
              }}
            />
          </section>

          <div className="md:grid md:grid-cols-3 md:gap-x-4">
            {/* Actividad */}
            <section>
              <ComboBox
                name={"activity"}
                title={"Actividad"}
                options={["Docencia", "Investigación"]}
                onChange={() => {
                  console.log("activity");
                }}
              />
            </section>

            {/* Fecha de Inicio */}
            <section>
              <DateInput
                name={"startDate"}
                title={"Fecha de Inicio"}
                onChange={() => {
                  console.log("startDate");
                }}
              />
            </section>

            {/* Fecha de fin */}
            <section>
              <DateInput
                name={"endDate"}
                title={"Fecha de Fin"}
                onChange={() => {
                  console.log("endDate");
                }}
              />
            </section>

            {/* Vacantes */}
            <section>
              <InputLabel
                name={"vacancies"}
                title={"Vacantes"}
                placeholder="Ejm: 2"
                onChange={() => {
                  console.log("vacancies");
                }}
                validationFunction={validateNotEmpty}
              />
            </section>

            {/* Horas */}
            <section>
              <InputLabel
                name={"hours"}
                title={"Horas"}
                placeholder="Ejm: 40"
                onChange={() => {
                  console.log("hours");
                }}
                validationFunction={validateNotEmpty}
              />
            </section>

            {/* Remuneración */}
            <section>
              <InputLabel
                name={"remuneration"}
                title="Remuneración:"
                onChange={() => {
                  console.log("remuneration");
                }}
                placeholder="Ejm: $2000"
                validationFunction={validateNotEmpty}
              />
            </section>
          </div>
        </div>

        <div className="mb-3 mt-5 flex justify-center">
          <GreenButton content="Crear Oferta" />
        </div>
      </div>
    </>
  );
};

export default Offer;
