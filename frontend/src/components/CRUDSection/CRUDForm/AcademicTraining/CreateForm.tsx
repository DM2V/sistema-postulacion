import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import ComboBox from "@/components/Form/ComboBox";
import React from "react";

function CreateFormAcademicTraining() {
  return (
    <>
      <div>
        <ComboBox
          name="educationLevel"
          title="Tipo de Investigación"
          options={["Grado", "Máster", "Doctorado", "Otro"]}
        />
        <InputLabel name="title" title="Título" placeholder="Título" />
        <InputLabel
          name="institution"
          title="Institución"
          placeholder="Institución"
        />
        <InputLabel
          name="degree"
          title="Titulo Obtenido"
          placeholder="Localización"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <InputLabel
            name="studyDuration"
            title="Tiempo de Estudio"
            placeholder=""
          />
          <ComboBox
            name="studyDurationType"
            title="Tipo"
            options={["Semestres", "Años"]}
          />
          <ComboBox name="country" title="País" options={[""]} />
        </div>
        <InputLabel
          name="senescytRegistrationNumber"
          title="No. de Registro SENESCYT"
          placeholder=""
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DateInput
            name="senescytRegistrationDate"
            title="Fecha de Registro SENESCYT"
          />
          <DateInput name="graduationDate" title="Fecha de Graduación" />
        </div>
      </div>
    </>
  );
}

export default CreateFormAcademicTraining;
