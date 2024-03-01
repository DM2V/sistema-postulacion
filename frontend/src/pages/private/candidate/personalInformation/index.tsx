import React, { FC, FormEvent, useState } from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import HomeAddressForm from "./HomeAddress";
import EmergencyContactForm from "./EmergencyContact";
import { pb } from "@/utils/pocketbase";
import { ACADEMICTRANING } from "@/routes/paths";
import { useRouter } from "next/router";

import { HomeAddress, EmergencyContact } from "@/types/cv";

const PersonalInformationPage: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    homeAddressData: {
      province: "",
      canton: "",
      parish: "",
      mainStreet: "",
      secondaryStreet: "",
      reference: "",
      number: "",
      homePhone: "",
      cellPhone: "",
      workPhone: "",
      extencion: "",
    },
    emergencyContactData: {
      name: "",
      lastName1: "",
      lastName2: "",
      typeIdentification: "",
      identification: "",
      relationship: "",
      province: "",
      canton: "",
      parish: "",
      mainStreet: "",
      secondaryStreet: "",
      reference: "",
      number: "",
      homePhone: "",
      cellPhone: "",
    },
  });

  const handleFormChange = (
    formName: "homeAddressData" | "emergencyContactData",
    fieldName: string,
    value: string,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [formName]: {
        ...prevData[formName],
        [fieldName]: value,
      },
    }));
  };

  async function createPersonalInfomation(
    homeAddressData: HomeAddress,
    emergencyContactData: EmergencyContact,
  ) {
    const homeAddress = {
      province: formData.homeAddressData.province,
      canton: formData.homeAddressData.canton,
      parish: formData.homeAddressData.parish,
      mainStreet: formData.homeAddressData.mainStreet,
      secondaryStreet: formData.homeAddressData.secondaryStreet,
      reference: formData.homeAddressData.reference,
      number: formData.homeAddressData.number || "",
      homePhone: formData.homeAddressData.homePhone || "",
      cellPhone: formData.homeAddressData.cellPhone || "",
      workPhone: formData.homeAddressData.workPhone || "",
      extencion: formData.homeAddressData.extencion || "",
    };

    const emergencyContact = {
      name: formData.emergencyContactData.name,
      lastName1: formData.emergencyContactData.lastName1,
      lastName2: formData.emergencyContactData.lastName2,
      typeIdentification: formData.emergencyContactData.typeIdentification,
      identification: formData.emergencyContactData.identification,
      relationship: formData.emergencyContactData.relationship,
      province: formData.emergencyContactData.province,
      canton: formData.emergencyContactData.canton,
      parish: formData.emergencyContactData.parish,
      mainStreet: formData.emergencyContactData.mainStreet,
      secondaryStreet: formData.emergencyContactData.secondaryStreet,
      reference: formData.emergencyContactData.reference || "",
      number: formData.emergencyContactData.number || "",
      homePhone: formData.emergencyContactData.homePhone || "",
      cellPhone: formData.emergencyContactData.cellPhone || "",
    };

    const isPersonalInfoFilled = Object.values(homeAddress).every(
      (value) => value !== null && value !== undefined && value !== "",
    );

    const isEmergencyContactFilled = Object.values(emergencyContact).every(
      (value) => value !== null && value !== undefined && value !== "",
    );

    if (!isPersonalInfoFilled && !isEmergencyContactFilled) {
      console.error("Please fill in all required fields.");
      return;
    }

    try {
      const { cv } = await pb
        .collection("users")
        .getOne("msof6xv1zl55pof", { fields: "cv" });
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }
      const homeAddressCreated = await pb
        .collection("HomeAddress")
        .create(homeAddressData);
      const emergencyContactCreated = await pb
        .collection("EmergencyContact")
        .create(emergencyContactData);

      const dataCV = {
        "homeAddress+": homeAddressCreated.id,
        "emergencyContact+": emergencyContactCreated.id,
      };
      await pb.collection("CV").update(cv, dataCV);
      router.push(ACADEMICTRANING);
    } catch (error) {
      console.error("Error retrieving CV data:", error);
    }
  }


  const handleSubmit = () => {
    if (formData.homeAddressData && formData.emergencyContactData) {
      createPersonalInfomation(
        formData.homeAddressData,
        formData.emergencyContactData,
      );

    } else {
      console.log("Please fill out both forms before submitting.");
    }
  };

  return (
    <div className="pr-2 lg:w-5/6">
      <div>
        <h1 className="text-ter-color">Información Personal</h1>
      </div>
      <div
        className="rounded-r-3xl  bg-gray-bg  p-8 shadow-lg"
        style={{
          boxShadow:
            "15px -6px 0px -7px rgba(0, 74, 62, 0.20), 0px 4px 4px 0px rgba(0, 74, 62, 0.25), 0px -2px 4px 0px rgba(0, 74, 62, 0.25)",
        }}
      >
        <HomeAddressForm
          onChange={(name, value) =>
            handleFormChange("homeAddressData", name, value)
          }
        />
        <EmergencyContactForm
          onChange={(name, value) =>
            handleFormChange("emergencyContactData", name, value)
          }
        />
        <div className="my-4 flex justify-end">
          <GreenButton onClick={handleSubmit} content="Siguiente" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;
