import CreateFormLanguage from "@/components/CRUDSection/CRUDForm/Languages/CreateForm";
import CRUDSection from "@/components/CRUDSection/CRUDSection";
import { Language } from "@/types/cv";
import { pb } from "@/utils/pocketbase";
import React, { useEffect, useState } from "react";

function TrainingPublications() {
  const [languages, setLanguages] = useState<Language[]>([]);
  async function fetchLanguagesForUser() {
    const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
      expand: "cv,cv.languages",
      fields: "expand.cv.expand.languages",
    });

    setLanguages(record?.expand?.cv.expand.languages);
  }

  async function createLanguage(formData: FormData) {
    const language = formData.get("language");
    const europeanFrameworkLevel = formData.get("europeanFrameworkLevel");
    const certificationDate = formData.get("certificationDate");

    const data = {
      language,
      europeanFrameworkLevel,
      certificationDate,
    };
    
    const languageCreated = await pb.collection("Language").create(data);

    /** TODO: Fetch the cv id of the logged user */
    const { cv } = await pb.collection("users").getOne("msof6xv1zl55pof", {
      fields: "cv",
    });

    const dataCV = {
      "languages+": languageCreated.id,
    };

    await pb.collection("CV").update(cv, dataCV);
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

  useEffect(() => {
    fetchLanguagesForUser();
  }, []);

  return (
    <div className="py-5">
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
  );
}

export default TrainingPublications;
