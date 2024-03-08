import GreenButton from "@/components/Buttons/GreenButton";
import CreateFormProfessionalExperience from "@/components/CRUDSection/CRUDForm/ProfessionalExperience/CreateForm";
import CreateFormTraining from "@/components/CRUDSection/CRUDForm/Training/CreateForm";
import CRUDSection from "@/components/CRUDSection/CRUDSection";
import LayoutWithSidebarCandidate from "@/components/Layout/LayoutWithSidebarCandidate";
import NavBar from "@/components/Navbar/NavbarUser";
import { EXTRAPOINTS } from "@/routes/paths";
import { ProfessionalExperience, Training } from "@/types/cv";
import { pb } from "@/utils/pocketbase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EducationPublications() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push(EXTRAPOINTS);
  };
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [professionalExperiences, setProfessionalExperiences] = useState<
    ProfessionalExperience[]
  >([]);

  async function fetchTrainingsForUser() {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.trainings",
        fields: "expand.cv.expand.trainings",
      });
      if (record?.expand?.cv?.expand?.trainings) {
        setTrainings(record?.expand?.cv.expand.trainings);
      } else {
        console.log("No trainings for user");
      }
      console.log("Fetch trainings for user", trainings);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProfessionalExperiencesForUser() {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.professionalExperience",
        fields: "expand.cv.expand.professionalExperience",
      });
      if (record?.expand?.cv?.expand?.professionalExperience) {
        setProfessionalExperiences(
          record?.expand?.cv.expand.professionalExperience,
        );
      } else {
        console.log("No professional experiences for user");
      }
      console.log(
        "Fetch professional experiences for user",
        professionalExperiences,
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function createTraining(formData: FormData) {
    const eventType = formData.get("eventType");
    const eventTheme = formData.get("eventTheme");
    const institutionName = formData.get("institutionName");
    const country = formData.get("country");
    const province = formData.get("province");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const hoursCount = formData.get("hoursCount");
    const certificateType = formData.get("certificateType");
    const additionalDocuments = formData.get("additionalDocuments");
    const data = {
      eventType,
      eventTheme,
      institutionName,
      country,
      province,
      startDate,
      endDate,
      hoursCount,
      certificateType,
      additionalDocuments,
    };

    const trainingCreated = await pb.collection("Training").create(data);
    const { cv } = await pb.collection("users").getOne("msof6xv1zl55pof", {
      fields: "cv",
    });
    const dataCV = {
      "trainings+": trainingCreated.id,
    };
    await pb.collection("CV").update(cv, dataCV);
  }

  async function updateTraining(formData: FormData, id: string) {
    await pb.collection("Training").update(id, {
      eventType: formData.get("eventType"),
      eventTheme: formData.get("eventTheme"),
      institutionName: formData.get("institutionName"),
      country: formData.get("country"),
      province: formData.get("province"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      hoursCount: formData.get("hoursCount"),
      certificateType: formData.get("certificateType"),
      additionalDocuments: formData.get("additionalDocuments"),
    });
  }

  async function deleteTraining(id: string) {
    await pb.collection("Training").delete(id);
  }

  async function createProfessionalExperience(formData: FormData) {
    const institutionName = formData.get("institutionName");
    const position = formData.get("position");
    const administrativeUnit = formData.get("administrativeUnit");
    const institutionType = formData.get("institutionType");
    const employmentModality = formData.get("employmentModality");
    const reasonJobExit = formData.get("reasonJobExit");
    const country = formData.get("country");
    const province = formData.get("province");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const employmentCertificates = formData.get("employmentCertificates");
    const data = {
      institutionName,
      position,
      administrativeUnit,
      institutionType,
      employmentModality,
      reasonJobExit,
      country,
      province,
      startDate,
      endDate,
      employmentCertificates,
    };
    const professionalExperienceCreated = await pb
      .collection("ProfessionalExperience")
      .create(data);
    const { cv } = await pb.collection("users").getOne("msof6xv1zl55pof", {
      fields: "cv",
    });
    const dataCV = {
      "professionalExperience+": professionalExperienceCreated.id,
    };
    await pb.collection("CV").update(cv, dataCV);
  }

  async function updateProfessionalExperience(formData: FormData, id: string) {
    await pb.collection("ProfessionalExperience").update(id, {
      institutionName: formData.get("institutionName"),
      position: formData.get("position"),
      administrativeUnit: formData.get("administrativeUnit"),
      institutionType: formData.get("institutionType"),
      employmentModality: formData.get("employmentModality"),
      reasonJobExit: formData.get("reasonJobExit"),
      country: formData.get("country"),
      province: formData.get("province"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      employmentCertificates: formData.get("employmentCertificates"),
    });
  }

  async function deleteProfessionalExperience(id: string) {
    await pb.collection("ProfessionalExperience").delete(id);
  }

  async function deleteLanguage(id: string) {
    await pb.collection("Language").delete(id);
  }

  useEffect(() => {
    if (professionalExperiences.length === 0) {
      fetchProfessionalExperiencesForUser();
    }
    if (trainings.length === 0) {
      fetchTrainingsForUser();
    }
  });

  return (
    <LayoutWithSidebarCandidate>
      <div>
        <NavBar />
        <div className="py-5">
          <CRUDSection
            title="Capacitación (últimos 5 años) "
            description="Indique los eventos de capacitación en los que ha participado."
            elements={trainings}
            fetchElements={fetchTrainingsForUser}
            addForm={<CreateFormTraining />}
            editForm={<CreateFormTraining />}
            createElement={createTraining}
            deleteElement={deleteTraining}
            editElement={updateTraining}
            headers={[
              { value: "eventType", label: "Tipo de evento", type: "string" },
              {
                value: "eventTheme",
                label: "Tema del evento",
                type: "string",
              },
              {
                value: "institutionName",
                label: "Nombre de la Institucion",
                type: "string",
              },
              {
                value: "hoursCount",
                label: "Nº de horas",
                type: "string",
              },
              {
                value: "certificateType",
                label: "Tipo de certificado",
                type: "string",
              },
            ]}
          />
          <CRUDSection
            title="Experiencia Profesional"
            description="Indique "
            elements={professionalExperiences}
            fetchElements={fetchProfessionalExperiencesForUser}
            addForm={<CreateFormProfessionalExperience />}
            editForm={<CreateFormProfessionalExperience />}
            createElement={createProfessionalExperience}
            deleteElement={deleteProfessionalExperience}
            editElement={updateProfessionalExperience}
            headers={[
              {
                value: "institutionName",
                label: "Tipo de Institución",
                type: "string",
              },
              {
                value: "position",
                label: "Puesto",
                type: "string",
              },
              {
                value: "employmentModality",
                label: "Modalidad de contratación",
                type: "string",
              },
              // {
              //   value: "administrativeUnit",
              //   label: "Unidad Administrativa",
              //   type: "string",
              // },
              {
                value: "institutionType",
                label: "Tipo de Institución",
                type: "string",
              },
              {
                value: "reasonJobExit",
                label: "Motivo de salida laboral",
                type: "string",
              },
              // {
              //   value: "country",
              //   label: "País",
              //   type: "string",
              // },
              // {
              //   value: "province",
              //   label: "Provincia",
              //   type: "string",
              // },
              // {
              //   value: "startDate",
              //   label: "Fecha de ingreso",
              //   type: "string",
              // },
              // {
              //   value: "endDate",
              //   label: "Fecha de salida",
              //   type: "string",
              // },
            ]}
          />
          <div className="my-4 flex justify-end">
            <GreenButton onClick={handleSubmit} content="Siguiente" />
          </div>
        </div>
      </div>
    </LayoutWithSidebarCandidate>
  );
}

export default EducationPublications;
