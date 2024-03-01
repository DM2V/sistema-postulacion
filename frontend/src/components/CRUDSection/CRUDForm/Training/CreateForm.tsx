import React, { useEffect, useState } from "react";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import FileInput from "@/components/Form/FileLabel";
import { validateNotEmpty } from "@/utils/validations";
import { Training } from "@/types/cv";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";

import {
  EventType,
  Country,
  Province,
  CertifiacteType,
} from "@/types/staticData";

import {
  getEventType,
  getCountry,
  getProvince,
  getCertifiacteType,
} from "@/utils/fetch_functions/staticData";

type CreateFormTrainingProps = {
  selectedElement?: Training;
};

function CreateFormTraining({ selectedElement }: CreateFormTrainingProps) {
  const [file, setFile] = useState<File | undefined>();
  const [eventType, setEventType] = useState<EventType[]>([]);
  const [country, setCountry] = useState<Country[]>([]);
  const [province, setProvince] = useState<Province[]>([]);
  const [certifiacteType, setCertifiacteType] = useState<CertifiacteType[]>([]);

  const [selectedEventType, setSelectedEventType] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCertifiacteType, setSelectedCertifiacteType] =
    useState<string>("");

  useEffect(() => {
    getEventType(setEventType);
    getCountry(setCountry);
    getProvince(setProvince);
    getCertifiacteType(setCertifiacteType);
  }, []);

  return (
    <>
      <div className="w-full px-3">
        <ComboBoxGeneric
          name="eventType"
          title="Tipo de evento"
          options={eventType.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedEventType(selectedOption.label);
          }}
          defaultOption={selectedElement?.eventType ?? ""}
        />
        <InputLabel
          name="eventTheme"
          title="Tema del evento"
          placeholder={selectedElement?.eventTheme ?? ""}
          defaultValue={selectedElement?.eventTheme ?? ""}
        />
        <InputLabel
          name="institutionName"
          title="Nombre Institución"
          placeholder={selectedElement?.institutionName ?? ""}
          defaultValue={selectedElement?.institutionName ?? ""}
        />
      </div>
      <div className="w-1/2 px-3">
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
        <InputLabel
          name="hoursCount"
          title="N° de Horas"
          placeholder={selectedElement?.hoursCount ?? ""}
          defaultValue={selectedElement?.hoursCount ?? ""}
        />
      </div>
      <div className="w-1/2 px-3">
        <div className="w-full px-3">
          <DateInput
            name="startDate"
            title="Fecha inicio"
            defaultValue={selectedElement?.startDate!.slice(0, 10) ?? ""}
          />
          <DateInput
            name="endDate"
            title="Fecha fin"
            defaultValue={selectedElement?.endDate!.slice(0, 10) ?? ""}
          />
        </div>
        <ComboBoxGeneric
          name="certificateType"
          title="Tipo de Certificado"
          options={certifiacteType.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedCertifiacteType(selectedOption.label);
          }}
          defaultOption={selectedElement?.certificateType ?? ""}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"additionalDocuments"}
          title="Documentos Adicionales"
          onChange={(name, selectedFile) => {
            setFile(selectedFile);
          }}
          accept=".pdf"
          placeholder="Subir Certificados"
          validationFunction={validateNotEmpty}
        />
      </div>
    </>
  );
}

export default CreateFormTraining;
