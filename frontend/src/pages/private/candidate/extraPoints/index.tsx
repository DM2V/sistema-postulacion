import React, { FC, FormEvent, useState, useEffect } from "react";
import { CVGENERATOR } from "@/routes/paths";
import { useRouter } from "next/router";
import { pb } from "@/utils/pocketbase";

import FileInput from "@/components/Form/FileLabel";
import CheckBox from "@/components/Form/CheckBox";
import GreenButton from "@/components/Buttons/GreenButton";
import { validateNotEmpty } from "@/utils/validations";

const ExtraPointsPage: FC = () => {
  const router = useRouter();

  const [isVisibleMap, setIsVisibleMap] = useState({
    professionalExperienceEspe: false,
    fileNationalInternationalAwards: false,
    fileProfessionalAcademicRecognition: false,
    fileTwonsNationalities: false,
    fileDisability: false,
    fileWarHeroes: false,
    fileVulnerableSituations: false,
  });

  const [fileMap, setFileMap] = useState({
    fileProfessionalExperienceEspe: null,
    fileNationalInternationalAwards: null,
    fileProfessionalAcademicRecognition: null,
    fileTwonsNationalities: null,
    fileDisability: null,
    fileWarHeroes: null,
    fileVulnerableSituations: null,
  });

  const [stringValues, setStringValues] = useState({
    professionalExperienceEspe: "",
    twonsNationalities: "",
    disability: "",
    warHeroes: "",
    vulnerableSituations: "",
    genderWomen: "",
    fileNationalInternationalAwards: "",
    fileProfessionalAcademicRecognition: "",
    fileTwonsNationalities: "",
    fileDisability: "",
    fileWarHeroes: "",
    fileVulnerableSituations: "",
  });

  async function createExtraPointsData(formData: FormData) {
    const extraPointsData = {
      ...stringValues,
      ...fileMap,
    };

    // if (!stringValues.professionalExperienceEspe) {
    //   extraPointsData.professionalExperienceEspe = "no";
    //   extraPointsData.fileProfessionalExperienceEspe = null;
    // } else {
    //   extraPointsData.professionalExperienceEspe = "yes";
    // }

    // const isFilled = Object.values(extraPointsData).every(
    //   (value) => value !== null && value !== undefined && value !== "",
    // );

    // if (!isFilled) {
    //   console.error("Please fill in all required fields.");
    //   console.log(extraPointsData);
    //   return;
    // }

    try {
      const { cv } = await pb
        .collection("users")
        .getOne("msof6xv1zl55pof", { fields: "cv" });
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }

      const extraPointDataCreated = await pb
        .collection("ExtraPoints")
        .create(extraPointsData);
      const dataCV = { extraPoints: extraPointDataCreated.id }; // Corrected key
      await pb.collection("CV").update(cv, dataCV);

      router.push(CVGENERATOR);
    } catch (error) {
      console.error("Error creating personal data:", error);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createExtraPointsData(formData);
  }

  const handleFileInputChange = (name: string, selectedFile: File | null) => {
    setFileMap({ ...fileMap, [name]: selectedFile });
  };

  
  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="border-b-2 border-gray-400 pb-2 font-bold text-state-hover">
            Obtención de premios nacionales o internacionales{" "}
          </h2>

          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"professionalExperienceEspe"}
              options={[""]}
              selectedOptions={stringValues.professionalExperienceEspe}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  professionalExperienceEspe:
                    !isVisibleMap.professionalExperienceEspe,
                });
              }}
            />
            <div className="w-full">
              <p>
                ¿Ha trabajado en la Universidad de las Fuerzas Armadas ESPE como
                personal <span className="font-bold">Titular</span> u{" "}
                <span className="font-bold">Ocasional</span> por más de cinco
                (5) años, consecutivos o no?
              </p>
              {isVisibleMap.professionalExperienceEspe && (
                <FileInput
                  name={"fileProfessionalExperienceEspe"}
                  title="Subir certificado laboral de la Universidad de las Fuerzas Armadas - ESPE"
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Certificado otorgado por la institución"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"fileNationalInternationalAwards"}
              options={[""]}
              selectedOptions={stringValues.fileNationalInternationalAwards}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  fileNationalInternationalAwards:
                    !isVisibleMap.fileNationalInternationalAwards,
                });
              }}
            />
            <div className="w-full">
              <p>
                ¿Ha recibido premios nacionales o internacionales relacionados
                con las áreas de conocimiento al cual postula?{" "}
              </p>
              {isVisibleMap.fileNationalInternationalAwards && (
                <FileInput
                  name={"fileNationalInternationalAwards"}
                  title="Certificado o diploma de premios, relacionados con las áreas de conocimiento al cual postula."
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Certificado otorgado por instituciones de educación superior que pertenezcan a las primeras mil del ranking SCIMAGO o WOS"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="my-4">
          <h2 className="mb-2 border-b-2 border-gray-400 pb-2 font-bold text-state-hover">
            Reconocimiento profesional o académico{" "}
          </h2>
          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"fileProfessionalAcademicRecognition"}
              options={[""]}
              selectedOptions={stringValues.fileProfessionalAcademicRecognition}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  fileProfessionalAcademicRecognition:
                    !isVisibleMap.fileProfessionalAcademicRecognition,
                });
              }}
            />
            <div className="w-full">
              <p>
                ¿Ha recibido premios reconocimiento profesional o académico
                relacionados con las áreas de conocimiento al cual postula?{" "}
              </p>
              {isVisibleMap.fileProfessionalAcademicRecognition && (
                <FileInput
                  name={"fileProfessionalAcademicRecognition"}
                  title="Certificado o diploma de premios reconocimiento profesional o académico relacionados con las áreas de conocimiento al cual postula."
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Certificado otorgado por instituciones de reconocimiento nacional o extranjero  diferente a la que realiza el concurso"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="my-4">
          <h2 className="border-b-2 border-gray-400 pb-2 font-bold text-state-hover">
            Acciones Afirmativas
          </h2>
          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"fileTwonsNationalities"}
              options={[""]}
              selectedOptions={stringValues.fileTwonsNationalities}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  fileTwonsNationalities: !isVisibleMap.fileTwonsNationalities,
                });
              }}
            />
            <div className="w-full">
              <p>
                ¿Autodeterminación o documento que indique que pertenece a
                pueblos y nacionalidades?{" "}
              </p>
              {isVisibleMap.fileTwonsNationalities && (
                <FileInput
                  name={"fileTwonsNationalities"}
                  title="Autodeterminación o documento que indique que pertenece a pueblos y nacionalidades"
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Documentos que respalden esta información"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"fileDisability"}
              options={[""]}
              selectedOptions={[]}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  fileDisability: !isVisibleMap.fileDisability,
                });
              }}
            />
            <div className="w-full">
              <p>¿Carnet de discapacidad otorgado por el CONADIS? </p>
              {isVisibleMap.fileDisability && (
                <FileInput
                  name={"fileDisability"}
                  title="Carnet de discapacidad otorgado por el CONADIS"
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Documentos que respalden esta información"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"fileWarHeroes"}
              options={[""]}
              selectedOptions={stringValues.fileWarHeroes}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  fileWarHeroes: !isVisibleMap.fileWarHeroes,
                });
              }}
            />
            <div className="w-full">
              <p>¿Resolución de ser Héroe o heroína de guerra? </p>
              {isVisibleMap.fileWarHeroes && (
                <FileInput
                  name={"fileWarHeroes"}
                  title="Resolución de ser Héroe o heroína de guerra"
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Documentos que respalden esta información"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <CheckBox
              name={"fileVulnerableSituations"}
              options={[""]}
              selectedOptions={stringValues.fileVulnerableSituations}
              allowMultipleSelection={false}
              onChange={(name, selectedOptions) => {
                setIsVisibleMap({
                  ...isVisibleMap,
                  fileVulnerableSituations:
                    !isVisibleMap.fileVulnerableSituations,
                });
              }}
            />
            <div className="w-full">
              <p>
                ¿Documento que señale ser persona en situación de
                vulnerabilidad?{" "}
              </p>
              {isVisibleMap.fileVulnerableSituations && (
                <FileInput
                  name={"fileVulnerableSituations"}
                  title="Documento que señale ser persona en situación de vulnerabilidad"
                  onChange={handleFileInputChange}
                  accept=".pdf"
                  placeholder="Documentos que respalden esta información"
                  validationFunction={validateNotEmpty}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <GreenButton content="Guardar" />
        </div>
      </form>
    </div>
  );
};

export default ExtraPointsPage;