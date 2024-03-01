import React, { useEffect, useState }  from "react";
import CRUDSection from "@/components/CRUDSection/CRUDSection";
import CRUDTable from "@/components/CRUDSection/CRUDTable";
import { ExtraPoints } from "@/types/cv";
import { CVGENERATOR } from "@/routes/paths";
import { useRouter } from "next/router";
import { pb } from "@/utils/pocketbase";

import GreenButton from "@/components/Buttons/GreenButton";
import CreateFormExtraPoints from "@/components/CRUDSection/CRUDForm/ExtraPoints/CreateForm";

function ExtraPoints() {
    const [extraPoints, setExtraPoints] = useState<ExtraPoints[]>([]);
  const router = useRouter();
  const handleSubmit = () => {
    router.push(CVGENERATOR);
  };

  async function fetchExtraPointsForUser() {
    try {
      const record = await pb.collection("users").getOne("msof6xv1zl55pof", {
        expand: "cv,cv.extraPoints",
        fields: "expand.cv.expand.extraPoints",
      });
      return record?.expand?.cv.expand.extraPoints;
    } catch (error) {
      console.error(error);
    }
  }

  async function createFormExtraPoints(formData: FormData) {
    const professionalExperienceEspe = formData.get(
      "professionalExperienceEspe",
    );
    const nationalInternationalAwards = formData.get(
      "nationalInternationalAwards",
    );
    const professionalAcademicRecognition = formData.get(
      "professionalAcademicRecognition",
    );
    const twonsNationalities = formData.get("twonsNationalities");
    const disability = formData.get("disability");
    const warHeroes = formData.get("warHeroes");
    const vulnerableSituations = formData.get("vulnerableSituations");
    const data = {
      professionalExperienceEspe,
      nationalInternationalAwards,
      professionalAcademicRecognition,
      twonsNationalities,
      disability,
      warHeroes,
      vulnerableSituations,
    };
    const extraPointsCreated = await pb.collection("ExtraPoints").create(data);
    const { cv } = await pb.collection("users").getOne("msof6xv1zl55pof", {
      fields: "cv",
    });
    const dataCV = {
      "extraPoints+": extraPointsCreated.id,
    };
    await pb.collection("CV").update(cv, dataCV);
  }

  async function updateFormExtraPoints(formData: FormData, id: string) {
    const professionalExperienceEspe = formData.get(
      "professionalExperienceEspe",
    );
    const nationalInternationalAwards = formData.get(
      "nationalInternationalAwards",
    );
    const professionalAcademicRecognition = formData.get(
      "professionalAcademicRecognition",
    );
    const twonsNationalities = formData.get("twonsNationalities");
    const disability = formData.get("disability");
    const warHeroes = formData.get("warHeroes");
    const vulnerableSituations = formData.get("vulnerableSituations");
    const data = {
      professionalExperienceEspe,
      nationalInternationalAwards,
      professionalAcademicRecognition,
      twonsNationalities,
      disability,
      warHeroes,
      vulnerableSituations,
    };
    await pb.collection("ExtraPoints").update(id, data);
  }

  async function deleteExtraPoints(id: string) {
    await pb.collection("ExtraPoints").delete(id);
  }

  return (
    <div>
      <CRUDSection
        title="Puntos Extra"
        description="Indique "
        elements={extraPoints}
        fetchElements={fetchExtraPointsForUser}
        addForm={<CreateFormExtraPoints />}
        editForm={<CreateFormExtraPoints />}
        createElement={createFormExtraPoints}
        deleteElement={deleteExtraPoints}
        editElement={updateFormExtraPoints}
        headers={[
          { value: "eventType", label: "Tipo de evento", type: "string" },
        ]}
      />
      <div className="my-4 flex justify-end">
        <GreenButton onClick={handleSubmit} content="Siguiente" />
      </div>
    </div>
  );
}

export default ExtraPoints;
