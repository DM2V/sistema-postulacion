import React, { useEffect, useState } from "react";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import FileInput from "@/components/Form/FileLabel";
import { validateNotEmpty } from "@/utils/validations";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import {
  Country,
  ResearchType,
  EducationLevel,
  InstitutionType,
  StudyDurationType,
} from "@/types/staticData";

import {
  getResearchType,
  getCountry,
  getEducationLevel,
  getInstitutionType,
  getStudyDurationType,
} from "@/utils/fetch_functions/staticData";
import { AcademicTraining } from "@/types/cv";

type CreateFormAcademicTrainingProps = {
  selectedElement?: AcademicTraining;
};

function CreateFormAcademicTraining({
  selectedElement,
}: CreateFormAcademicTrainingProps) {
  const [file, setFile] = useState<File | undefined>();
  const [researchType, setResearchType] = useState<ResearchType[]>([]);
  const [institutionType, setInstitutionType] = useState<InstitutionType[]>([]);
  const [country, setCountry] = useState<Country[]>([]);
  const [educationLevel, setEducationLevel] = useState<EducationLevel[]>([]);
  const [studyDurationType, setStudyDurationType] = useState<
    StudyDurationType[]
  >([]);

  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedStudyDurationType, setSelectedStudyDurationType] =
    useState<string>("");

  useEffect(() => {
    getCountry(setCountry);
    getResearchType(setResearchType);
    getEducationLevel(setEducationLevel);
    getInstitutionType(setInstitutionType);
    getStudyDurationType(setStudyDurationType);
  }, []);

  return (
    <>
      <div className="w-full px-3">
        {
          <ComboBoxGeneric
            name="educationLevel"
            title="Nivel de Instrucción"
            options={educationLevel.map((el) => {
              return { label: el.name, value: el.name };
            })}
            onChange={(name, selectedOption) => {
              setSelectedEducationLevel(selectedOption.label);
            }}
            defaultOption={selectedElement?.educationLevel ?? ""}
          />
        }
        <InputLabel
          name="institution"
          title="Institución"
          placeholder={selectedElement?.institution ?? ""}
          defaultValue={selectedElement?.institution ?? ""}
        />
        <InputLabel 
        name="degree" 
        title="Titulo Obtenido" 
        placeholder={selectedElement?.degree ?? ""}
        defaultValue={selectedElement?.degree ?? ""}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          <ComboBoxGeneric
            name="studyDurationType"
            title="Tipo"
            options={studyDurationType.map((el) => {
              return { label: el.name, value: el.name };
            })}
            onChange={(name, selectedOption) => {
              setSelectedStudyDurationType(selectedOption.label);
            }}
            defaultOption={selectedElement?.studyDurationType ?? ""}
          />
          <InputLabel
            name="studyDuration"
            title="Tiempo de Estudio"
            placeholder={selectedElement?.studyDuration ?? ""}
            defaultValue={selectedElement?.studyDuration ?? ""}
          />
          <ComboBoxGeneric
            name={"country"}
            title={"País:"}
            options={country.map((c) => {
              return { label: c.description, value: c.description };
            })}
            onChange={(name, selectedOption) => {
              setSelectedCountry(selectedOption.label);
            }}
            defaultOption={selectedElement?.country ?? ""}
          />
        </div>
        <InputLabel
          name="senescytRegistrationNumber"
          title="No. de Registro SENESCYT"
          placeholder={selectedElement?.senescytRegistrationNumber ?? ""}
          defaultValue={selectedElement?.senescytRegistrationNumber ?? ""}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DateInput
            name="senescytRegistrationDate"
            title="Fecha de Registro SENESCYT"
            defaultValue={
              selectedElement?.senescytRegistrationDate!.slice(0, 10) ?? ""
            }
          />
          <DateInput
            name="graduationDate"
            title="Fecha de Graduación"
            defaultValue={selectedElement?.graduationDate!.slice(0, 10) ?? ""}
          />
        </div>
        <FileInput
          name={"certificate"}
          title="Digitalización del título obtenido"
          onChange={(name, selectedFile) => {
            setFile(selectedFile);
          }}
          accept=".pdf"
          placeholder="Subir Bases del Concurso"
          validationFunction={validateNotEmpty}
        />
      </div>
    </>
  );
}

export default CreateFormAcademicTraining;
