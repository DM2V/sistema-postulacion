import React, { useEffect, useState } from "react";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import FileInput from "@/components/Form/FileLabel";
import { validateNotEmpty } from "@/utils/validations";
import { Publications } from "@/types/cv";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import {
  ResearchType,
  Participation,
  PublicationStatus,
  PeerReviewed,
} from "@/types/staticData";

import {
  getResearchType,
  getParticipation,
  getPublicationStatus,
  getPeerReviewed,
} from "@/utils/fetch_functions/staticData";

type CreateFormPublicationsProps = {
  selectedElement?: Publications;
};

function CreateFormPublications({
  selectedElement,
}: CreateFormPublicationsProps) {
  const [file, setFile] = useState<File | undefined>();

  const [researchType, setResearchType] = useState<ResearchType[]>([]);
  const [participation, setParticipation] = useState<Participation[]>([]);
  const [publicationStatus, setPublicationStatus] = useState<
    PublicationStatus[]
  >([]);
  const [peerReviewed, setPeerReviewed] = useState<PeerReviewed[]>([]);

  const [selectedResearchType, setSelectedResearchType] = useState<string>("");
  const [selectedParticipation, setSelectedParticipation] =
    useState<string>("");
  const [selectedPublicationStatus, setSelectedPublicationStatus] =
    useState<string>("");
  const [selectedPeerReviewed, setSelectedPeerReviewed] = useState<string>("");

  useEffect(() => {
    getResearchType(setResearchType);
    getParticipation(setParticipation);
    getPublicationStatus(setPublicationStatus);
    getPeerReviewed(setPeerReviewed);
  }, []);

  return (
    <div className="w-full">
      <ComboBoxGeneric
        name="researchType"
        title="Tipo de investigación"
        options={researchType.map((el) => {
          return { label: el.name, value: el.name };
        })}
        onChange={(name, selectedOption) => {
          setSelectedResearchType(selectedOption.label);
        }}
        defaultOption={selectedElement?.researchType ?? ""}
      />
      <InputLabel
        name="fullTitle"
        title="Titulo Completo"
        placeholder={selectedElement?.fullTitle ?? ""}
        defaultValue={selectedElement?.fullTitle ?? ""}
      />
      <InputLabel
        name="publisher"
        title="Editorial"
        placeholder={selectedElement?.publisher ?? ""}
        defaultValue={selectedElement?.publisher ?? ""}
      />
      <InputLabel
        name="issnIsbnDoi"
        title="ISSN/ISBN/DOI"
        placeholder={selectedElement?.issnIsbnDoi ?? ""}
        defaultValue={selectedElement?.issnIsbnDoi ?? ""}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ComboBoxGeneric
          name="participation"
          title="Participación"
          options={participation.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedParticipation(selectedOption.label);
          }}
          defaultOption={selectedElement?.participation ?? ""}
        />
        <InputLabel
          name="language"
          title="Idioma"
          placeholder={selectedElement?.language ?? ""}
          defaultValue={selectedElement?.language ?? ""}
        />
        <ComboBoxGeneric
          name="publicationStatus"
          title="Estado de Publicación"
          options={publicationStatus.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedPublicationStatus(selectedOption.label);
          }}
          defaultOption={selectedElement?.publicationStatus ?? ""}
        />
        <DateInput
          name="publicationDate"
          title="Fecha de publicación"
          defaultValue={selectedElement?.publicationDate!.slice(0, 10) ?? ""}
        />
        <InputLabel name="volumeNumber" title="N° Volumen de la Publicación" placeholder={selectedElement?.volumeNumber ?? "" } />
        <ComboBoxGeneric
          name="peerReviewed"
          title="Revisión por Pares"
          options={peerReviewed.map((el) => {
            return { label: el.name, value: el.name };
          })}
          onChange={(name, selectedOption) => {
            setSelectedPeerReviewed(selectedOption.label);
          }}
          defaultOption={selectedElement?.peerReviewed ?? ""}
        />
      </div>

      <div>
        <FileInput
          name={"additionalDocuments"}
          title="Documentos Adicionales"
          onChange={(name, selectedFile) => {
            setFile(selectedFile);
          }}
          accept=".pdf"
          placeholder="Subir documentos adicionales"
          validationFunction={validateNotEmpty}
        />
      </div>
    </div>
  );
}

export default CreateFormPublications;
