import React, { FC, useState, useEffect } from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import HomeAddressForm from "./HomeAddress";
import EmergencyContactForm from "./EmergencyContact";
import { HomeAddress, EmergencyContact } from "@/types/cv";

const PersonalInformationPage: FC = () => {
  const handleHomeAddressSubmit = (data: HomeAddress) => {
    // Aquí puedes manejar la lógica para guardar los datos
    console.log("Personal Information:", data);
  };

  const handleEmergencyContactSubmit = (data: EmergencyContact) => {
    // Aquí puedes manejar la lógica para guardar los datos
    console.log("Emergency Contact:", data);
  };

  return (
    <div className="w-5/6">
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
        <HomeAddressForm onSubmit={handleHomeAddressSubmit} />
        <EmergencyContactForm onSubmit={handleEmergencyContactSubmit} />
      </div>
      <div className="my-4 flex justify-end">
        <GreenButton content="Siguiente" />
      </div>
    </div>
  );
};

export default PersonalInformationPage;
