import GreenButton from "@/components/Buttons/GreenButton";
import CreateFormAcademicTraining from "@/components/CRUDSection/CRUDForm/AcademicTraining/CreateForm";
import CreateFormLanguage from "@/components/CRUDSection/CRUDForm/Languages/CreateForm";
import CreateFormPublications from "@/components/CRUDSection/CRUDForm/Publications/CreateForm";
import CRUDSection from "@/components/CRUDSection/CRUDSection";
import LayoutWithSidebarCandidate from "@/components/Layout/LayoutWithSidebarCandidate";
import NavBar from "@/components/Navbar/NavbarUser";
import { EDUCATIONPUBLICATIONS } from "@/routes/paths";
import { AcademicTraining, Language, Publications } from "@/types/cv";
import { pb } from "@/utils/pocketbase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function TrainingPublications() {
  const router = useRouter();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [academicTraining, setAcademicTraining] = useState<AcademicTraining[]>(
    [],
  );
  const [publications, setPublications] = useState<Publications[]>([]);

  const handleSubmit = () => {
    router.push(EDUCATIONPUBLICATIONS);
  };

  useEffect(() => {
    if (userId) {
      fetchLanguagesForUser(userId);
    }
  }, [userId]);

  async function fetchLanguagesForUser(userId:string) {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.languages",
        fields: "expand.cv.expand.languages",
      });
     const primerIdioma = record.expand.cv.expand.languages;
     console.log("Primer idioma ID:", primerIdioma.id);
      if (record?.expand?.cv?.expand?.languages) {
        setLanguages(record?.expand?.cv.expand.languages);
      } else {
        console.log("No languages found for user");
      }
      console.log("Fetched languages:", languages);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  }
  async function fetchPublicationsForUser(userId:string) {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.publications",
        fields: "expand.cv.expand.publications",
      });
      setPublications(record?.expand?.cv.expand.publications);
      console.log("Fetched publications:", publications);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  }

  async function fetchAcademicTrainingForUser(userId:string) {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.academicTraining",
        fields: "expand.cv.expand.academicTraining",
      });
     // Acceder a la formación académica del CV del usuarios 
     const academicTraining = record?.expand?.cv?.expand?.academicTraining;
    console.log("Formación académica:", academicTraining);
      setAcademicTraining(record?.expand?.cv.expand.academicTraining);
    } catch (error) {
      console.error("Error fetching academic training:", error);
    }
  }

  async function createLanguage(formData: FormData) {
    const language = formData.get("language");
    const europeanFrameworkLevel = formData.get("europeanFrameworkLevel");
    const certificationDate = formData.get("certificationDate");
    const certificate = formData.get("certificate");

    const data = {
      language,
      europeanFrameworkLevel,
      certificationDate,
      certificate,
    };

    
    try {
      const { cv } = await pb.collection("users").getOne("msof6xv1zl55pof", {
        fields: "cv",
      });
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }
      const languageCreated: Language = await pb
        .collection("Language")
        .create(data);

      const dataCV = {
        "languages+": languageCreated.id,
      };

      await pb.collection("CV").update(cv, dataCV);

      setLanguages((prevLanguages) => [...prevLanguages, languageCreated]);
    } catch (error) {
      console.error("Error creating academic training:", error);
    }
  }

  async function updateLanguage(formData: FormData, id: string) {
    await pb.collection("Language").update(id, {
      language: formData.get("language"),
      europeanFrameworkLevel: formData.get("europeanFrameworkLevel"),
      certificationDate: formData.get("certificationDate"),
    });
  }

  async function deleteLanguage(id: string) {
    await pb.collection("Language").delete(id);
  }

  async function createPublication(formData: FormData) {
    const researchType = formData.get("researchType");
    const fullTitle = formData.get("fullTitle");
    const publisher = formData.get("publisher");
    const issnIsbnDoi = formData.get("issnIsbnDoi");
    const participation = formData.get("participation");
    const language = formData.get("language");
    const publicationStatus = formData.get("publicationStatus");
    const publicationDate = formData.get("publicationDate");
    const volumeNumber = formData.get("volumeNumber");
    const peerReviewed = formData.get("peerReviewed");
    const additionalDocuments = formData.get("additionalDocuments");

    const data = {
      researchType,
      fullTitle,
      publisher,
      issnIsbnDoi,
      participation,
      language,
      publicationStatus,
      publicationDate,
      volumeNumber,
      peerReviewed,
      additionalDocuments,
    };

    const publicationCreated = await pb.collection("Publications").create(data);

    const { cv } = await pb.collection("users").getOne("msof6xv1zl55pof", {
      fields: "cv",
    });
    const dataCV = {
      "publications+": publicationCreated.id,
    };

    await pb.collection("CV").update(cv, dataCV);
  }

  async function updatePublication(formData: FormData, id: string) {
    await pb.collection("Publications").update(id, {
      researchType: formData.get("researchType"),
      fullTitle: formData.get("fullTitle"),
      publisher: formData.get("publisher"),
      issnIsbnDoi: formData.get("issnIsbnDoi"),
      participation: formData.get("participation"),
      language: formData.get("language"),
      publicationStatus: formData.get("publicationStatus"),
      publicationDate: formData.get("publicationDate"),
      volumeNumber: formData.get("volumeNumber"),
      peerReviewed: formData.get("peerReviewed"),
      additionalDocuments: formData.get("additionalDocuments"),
    });
  }

  async function deletePublication(id: string) {
    await pb.collection("Publications").delete(id);
  }

  async function createAcademicTraining(formData: FormData) {
    const educationLevel = formData.get("educationLevel");
    const institution = formData.get("institution");
    const degree = formData.get("degree");
    const studyDurationType = formData.get("studyDurationType");
    const studyDuration = formData.get("studyDuration");
    const country = formData.get("country");
    const senescytRegistrationNumber = formData.get(
      "senescytRegistrationNumber",
    );
    const senescytRegistrationDate = formData.get("senescytRegistrationDate");
    const graduationDate = formData.get("graduationDate");
    const certificate = formData.get("certificate");

    const data = {
      educationLevel,
      institution,
      degree,
      studyDuration,
      studyDurationType,
      country,
      senescytRegistrationNumber,
      senescytRegistrationDate,
      graduationDate,
      certificate,
    };

    try {
      const { cv } = await pb
        .collection("users")
        .getOne("msof6xv1zl55pof", { fields: "cv" });
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }
      const academicTrainingCreated: AcademicTraining = await pb
        .collection("AcademicTraining")
        .create(data);

      const dataCV = {
        "academicTraining+": academicTrainingCreated.id,
      };

      await pb.collection("CV").update(cv, dataCV);

      setAcademicTraining((prevAcademicTraining) => [
        ...prevAcademicTraining,
        academicTrainingCreated,
      ]);
    } catch (error) {
      console.error("Error creating academic training:", error);
    }
  }

  async function updateAcademicTraining(formData: FormData, id: string) {
    await pb.collection("AcademicTraining").update(id, {
      educationLevel: formData.get("educationLevel"),
      institution: formData.get("institution"),
      degree: formData.get("degree"),
      studyDuration: formData.get("studyDuration"),
      studyDurationType: formData.get("studyDurationType"),
      country: formData.get("country"),
      senescytRegistrationNumber: formData.get("senescytRegistrationNumber"),
      senescytRegistrationDate: formData.get("senescytRegistrationDate"),
      graduationDate: formData.get("graduationDate"),
      certificate: formData.get("certificate"),
    });
  }

  async function deleteAcademicTraining(id: string) {
    await pb.collection("AcademicTraining").delete(id);
  }

  useEffect(() => {
    if (languages &&  languages.length === 0) {
      fetchLanguagesForUser();
    }
    if (publications && publications.length === 0) {
      fetchPublicationsForUser();
    }
    if (academicTraining && academicTraining.length === 0) {
      fetchAcademicTrainingForUser();
    }
  });
  return (
    <LayoutWithSidebarCandidate>
      <div>
        <NavBar />
        <div className="py-5">
          <div>
            <CRUDSection
              title="Formación Académica"
              description="Detalles sobre los niveles de instrucción que has alcanzado, comenzando con el nivel de instrucción que tenga mayor relevancia para la postulación."
              elements={academicTraining}
              fetchElements={fetchAcademicTrainingForUser}
              addForm={<CreateFormAcademicTraining />}
              editForm={<CreateFormAcademicTraining />}
              createElement={createAcademicTraining}
              deleteElement={deleteAcademicTraining}
              editElement={updateAcademicTraining}
              headers={[
                {
                  value: "educationLevel",
                  label: "Nivel de Instrucción",
                  type: "string",
                },
                {
                  value: "institution",
                  label: "Institución",
                  type: "string",
                },
                {
                  value: "degree",
                  label: "Titulo Obtenido",
                  type: "string",
                },
                // {
                //   value: "studyDuration",
                //   label: "Tiempo de Estudio",
                //   type: "string",
                // },{
                //   value: "studyDurationType",
                //   label: "Tipo",
                //   type: "string",
                // },
                {
                  value: "country",
                  label: "País",
                  type: "string",
                },
                {
                  value: "senescytRegistrationNumber",
                  label: "No. de Registro SENESCYT",
                  type: "string",
                },
                // ,{
                //   value: "senescytRegistrationDate",
                //   label: "Fecha de Registro SENESCYT",
                //   type: "string",
                // },{
                //   value: "graduationDate",
                //   label: "Fecha de Graduación",
                //   type: "string",
                // },{
                //   value: "certificate",
                //   label: "Nivel de Instrucción",
                //   type: "string",
                // },
              ]}
            />
          </div>

          <div>
            <CRUDSection
              title="Idiomas"
              description="Indique su nivel de habilidad en los idiomas que posea."
              elements={languages}
              fetchElements={fetchLanguagesForUser}
              addForm={<CreateFormLanguage />}
              editForm={<CreateFormLanguage />}
              createElement={createLanguage}
              deleteElement={deleteLanguage}
              editElement={updateLanguage}
              headers={[
                { value: "language", label: "Idioma", type: "string" },
                {
                  value: "europeanFrameworkLevel",
                  label:
                    "Nivel según el Marco Común Europeo de Referencia para las lenguas",
                  type: "string",
                },
                {
                  value: "certificationDate",
                  label: "Fecha de certificación",
                  type: "date",
                },
              ]}
            />
          </div>

          <div>
            <CRUDSection
              title="Publicaciones"
              description="Indique su participación en publicaciones, revistas, libros, capítulos de libros, entre otros."
              elements={publications}
              fetchElements={fetchPublicationsForUser}
              addForm={<CreateFormPublications />}
              editForm={<CreateFormPublications />}
              createElement={createPublication}
              deleteElement={deletePublication}
              editElement={updatePublication}
              headers={[
                {
                  value: "researchType",
                  label: "Tipo de Investigación",
                  type: "string",
                },
                { value: "fullTitle", label: "Título Completo", type: "string" },
                { value: "publisher", label: "Editorial", type: "string" },
                { value: "issnIsbnDoi", label: "ISSN/ISBN/DOI", type: "string" },
                // { value: "participation", label: "Participación", type: "string" },
                // { value: "language", label: "Idioma", type: "string" },
                // { value: "publicationStatus", label: "Estado de Publicación", type: "string" },
                // { value: "publicationDate", label: "Fecha de Publicación", type: "date" },
                // { value: "volumeNumber", label: "No. de Volumen", type: "string" },
                // { value: "peerReviewed", label: "Revisión por Pares", type: "string" },
                // { value: "additionalDocuments", label: "Documentos Adicionales", type: "string" },
              ]}
            />
          </div>
          <div className="my-4 flex justify-end">
            <GreenButton onClick={handleSubmit} content="Siguiente" />
          </div>
        </div>
      </div>
    </LayoutWithSidebarCandidate>
  );
}

export default TrainingPublications;
