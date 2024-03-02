import React, { useEffect, useState } from "react";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import FileInput from "@/components/Form/FileLabel";
import { validateNotEmpty } from "@/utils/validations";
import { ProfessionalExperience } from "@/types/cv";

import {
  EmploymentModality,
  InstitutionType,
  ReasonJobExit,
  Country,
  Province,
} from "@/types/staticData";

import {
  getEmploymentModality,
  getInstitutionType,
  getReasonJobExit,
  getCountry,
  getProvince,
} from "@/utils/fetch_functions/staticData";

type CreateFormProfessionalExperienceProps = {
  selectedElement?: ProfessionalExperience;
};

function CreateFormProfessionalExperience({
  selectedElement,
}: CreateFormProfessionalExperienceProps) {
  const [file, setFile] = useState<File | undefined>();

  const [employmentModality, setEmploymentModality] = useState<
    EmploymentModality[]
  >([]);
  const [institutionType, setInstitutionType] = useState<InstitutionType[]>([]);
  const [reasonJobExit, setReasonJobExit] = useState<ReasonJobExit[]>([]);
  const [country, setCountry] = useState<Country[]>([]);
  const [province, setProvince] = useState<Province[]>([]);

  const [selectedEmploymentModality, setSelectedEmploymentModality] =
    useState<string>("");
  const [selectedInstitutionType, setSelectedInstitutionType] =
    useState<string>("");
  const [selectedReasonJobExit, setSelectedReasonJobExit] =
    useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");

  useEffect(() => {
    getEmploymentModality(setEmploymentModality);
    getInstitutionType(setInstitutionType);
    getReasonJobExit(setReasonJobExit);
    getCountry(setCountry);
    getProvince(setProvince);
  }, []);

  return (
    <>
      <div className="w-full px-3">
        <InputLabel
          name="institutionName"
          title="Nombre de la institución"
          placeholder={selectedElement?.institutionName ?? ""}
          defaultValue={selectedElement?.institutionName ?? ""}
        />
        <InputLabel
          name="position"
          title="Puesto"
          placeholder={selectedElement?.position ?? ""}
          defaultValue={selectedElement?.position ?? ""}
        />
        <ComboBoxGeneric
          name="employmentModality"
          title="Modalidad de contratación"
          options={employmentModality.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedEmploymentModality(selectedOption.label);
          }}
          defaultOption={selectedElement?.employmentModality ?? ""}
        />
        <InputLabel
          name="administrativeUnit"
          title="Unidad Administrativa"
          placeholder={selectedElement?.administrativeUnit ?? ""}
          defaultValue={selectedElement?.administrativeUnit ?? ""}
        />
        <ComboBoxGeneric
          name="institutionType"
          title="Tipo de Institución"
          options={institutionType.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedInstitutionType(selectedOption.label);
          }}
          defaultOption={selectedElement?.institutionType ?? ""}
        />
        <ComboBoxGeneric
          name="reasonJobExit"
          title="Motivo de salida laboral"
          options={reasonJobExit.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedReasonJobExit(selectedOption.label);
          }}
          defaultOption={selectedElement?.reasonJobExit ?? ""}
        />

        <ComboBoxGeneric
          name="country"
          title="País"
          options={country.map((el) => {
            return { label: el.description, value: el.description };
          })}
          onChange={(name, selectedOption) => {
            setSelectedCountry(selectedOption.label);
          }}
          defaultOption={selectedElement?.country ?? ""}
        />

        <ComboBoxGeneric
          name="province"
          title="Provincia"
          options={province.map((el) => {
            return { label: el.province, value: el.province };
          })}
          onChange={(name, selectedOption) => {
            setSelectedProvince(selectedOption.label);
          }}
          defaultOption={selectedElement?.province ?? ""}
        />
      </div>
      <div className="w-full px-3">
        <DateInput
          name="startDate"
          title="Fecha de ingreso"
          defaultValue={selectedElement?.startDate!.slice(0, 10) ?? ""}
          placeholder={selectedElement?.startDate!.slice(0, 10) ?? ""}
        />
        <DateInput
          name="endDate"
          title="Fecha de salida "
          defaultValue={selectedElement?.endDate!.slice(0, 10) ?? ""}
          placeholder={selectedElement?.endDate!.slice(0, 10) ?? ""}
        />
        <FileInput
          name={"employmentCertificate"}
          title="Certificados Laborales"
          onChange={(name, selectedFile) => {
            setFile(selectedFile);
          }}
          accept=".pdf"
          placeholder="Documento que respalde esta información, como referencias laborales."
          validationFunction={validateNotEmpty}
        />
      </div>
    </>
  );
}

export default CreateFormProfessionalExperience;
