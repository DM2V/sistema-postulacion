import React, { FC, useState } from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import HomeAddressForm from "./HomeAddress";
import EmergencyContactForm from "./EmergencyContact";

const PersonalInformationPage: FC = () => {
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
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [formName]: {
        ...prevData[formName],
        [fieldName]: value,
      },
    }));
  };


  const handleSubmit = () => {
    if (formData.homeAddressData && formData.emergencyContactData) {
      console.log("Submitting Combined Data:", formData);
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
