import React, { useEffect, useState } from "react";
import FileInput from "@/components/Form/FileLabel";
import CheckBox from "@/components/Form/CheckBox";
import { validateNotEmpty } from "@/utils/validations";
import { ExtraPoints } from "@/types/cv";

type CreateFormExtraPointsProps = {
  selectedElement?: ExtraPoints;
};

function CreateFormExtraPoints({
  selectedElement,
}: CreateFormExtraPointsProps) {
  const [file, setFile] = useState<File | undefined>();
  const [fileProfessionalExperienceEspe, setFileProfessionalExperienceEspe] =
    useState<File | undefined>();
  const [fileNationalInternationalAwards, setFileNationalInternationalAwards] =
    useState<File | undefined>();
  const [
    fileProfessionalAcademicRecognition,
    setFileProfessionalAcademicRecognition,
  ] = useState<File | undefined>();
  const [fileTwonsNationalities, setFileTwonsNationalities] = useState<
    File | undefined
  >();
  const [filedisability, setFiledisability] = useState<File | undefined>();
  const [fileWarHeroes, setFileWarHeroes] = useState<File | undefined>();
  const [fileVulnerableSituations, setFileVulnerableSituations] = useState<
    File | undefined
  >();

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full px-3">
        <FileInput
          name={"professionalExperienceEspe"}
          title="Certificado o diploma de haber trabajado en la Universidad de las Fuerzas Armadas ESPE"
          onChange={(name, selectedFile) => {
            setFileProfessionalExperienceEspe(selectedFile);
          }}
          accept=".pdf"
          placeholder="Certificado otorgado por la institución"
          validationFunction={validateNotEmpty}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"nationalInternationalAwards"}
          title="Certificado o diploma de
            premios, relacionados
            con las áreas de
            conocimiento al cual postula."
          onChange={(name, selectedFile) => {
            setFileNationalInternationalAwards(selectedFile);
          }}
          accept=".pdf"
          placeholder="Certificado otorgado por instituciones de
            educación superior que
            pertenezcan a las primeras
            mil del ranking SCIMAGO o
            WOS"
          validationFunction={validateNotEmpty}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"professionalAcademicRecognition"}
          title="Certificado o diploma de
            premios reconocimiento
            profesional o académico relacionados con las áreas de conocimiento al cual postula"
          onChange={(name, selectedFile) => {
            setFileProfessionalAcademicRecognition(selectedFile);
          }}
          accept=".pdf"
          placeholder="Certificado otorgado por instituciones de
            reconocimiento nacional o
            extranjero  diferente a la
            que realiza el concurso"
          validationFunction={validateNotEmpty}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"twonsNationalities"}
          title="Autodeterminación o
            documento que indique que
            pertenece a pueblos y
            nacionalidades"
          onChange={(name, selectedFile) => {
            setFileTwonsNationalities(selectedFile);
          }}
          accept=".pdf"
          placeholder="Documentos que respalden esta información"
          validationFunction={validateNotEmpty}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"disability"}
          title="Carnet de
            discapacidad otorgado por el
            CONADIS"
          onChange={(name, selectedFile) => {
            setFiledisability(selectedFile);
          }}
          accept=".pdf"
          placeholder="Documentos que respalden esta información"
          validationFunction={validateNotEmpty}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"warHeroes"}
          title="Resolución de ser Héroe o heroína de guerra"
          onChange={(name, selectedFile) => {
            setFileWarHeroes(selectedFile);
          }}
          accept=".pdf"
          placeholder="Documentos que respalden esta información"
          validationFunction={validateNotEmpty}
        />
      </div>
      <div className="w-full px-3">
        <FileInput
          name={"vulnerableSituations"}
          title="Documento que señale ser
            persona en situación de
            vulnerabilidad"
          onChange={(name, selectedFile) => {
            setFileVulnerableSituations(selectedFile);
          }}
          accept=".pdf"
          placeholder="SDocumentos que respalden esta información"
          validationFunction={validateNotEmpty}
        />
      </div>
    </>
  );
}

export default CreateFormExtraPoints;
