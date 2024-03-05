import React, { FC, useState } from "react";
import { FormEvent } from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import CreateFormPersonalData from "@/components/CRUDSection/CRUDForm/PersonalData/CreateForm";
import { fetchPersonalData, fetchPersonalDataForUser } from "@/utils/fetch_functions/cv";
import Notification from "@/components/Form/Notification";

import { pb } from "@/utils/pocketbase";

const PersonalDataPage: FC = () => {
  const userId = "msof6xv1zl55pof";

  const id = fetchPersonalDataForUser(userId); 
  const [notificationMessage, setNotificationMessage] = useState("");


  async function addSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createPersonalData(formData);
      
      // fetchElements();
    } catch (error) {
      console.error("Error creating element:", error);
    }
    // closeAddModal();
  }

  async function createPersonalData(formData: FormData) {
    const personalData = {
      avatar: formData.get("avatar") as string,
      name: formData.get("name") as string,
      lastName1: formData.get("lastName1") as string,
      lastName2: formData.get("lastName2") as string,
      birthDate: formData.get("birthDate") as string,
      gender: formData.get("gender") as string,
      bloodType: formData.get("bloodType") as string,
      maritalStatus: formData.get("maritalStatus") as string,
      nationality: formData.get("nationality") as string,
      residenceYears: formData.get("residenceYears") || "0",
      ethnicIdentification: formData.get("ethnicIdentification") as string,
      ethnicGroup: formData.get("ethnicGroup") || "0",
      specialCapacity: formData.get("specialCapacity") as string,
      catastrophicDisease: formData.get("catastrophicDisease") as string,
      catastrophicDiseaseType: formData.get("selectedCatastrophicDiseaseType") || "0",
      disabilityType: formData.get("selectedDisabilityType") || "0",
      disabilityPercentage: formData.get("disabilityPercentage") || "0",
      MSPIDNumber: formData.get("MSPIDNumber") || "0",
    };

    const isFilled = Object.values(personalData).every(
      (value) => value !== null && value !== undefined && value !== "",
    );

    if (!isFilled) {
      setNotificationMessage('Por favor, completa los datos antes de enviar.');
      return;
    }

    try {
      const { cv } = await pb
        .collection("users")
        .getOne(userId, { fields: "cv" });
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }

      const personalDataCreated = await pb
        .collection("PersonalData")
        .create(personalData);
      const dataCV = { "personalData+": personalDataCreated.id };
      await pb.collection("CV").update(cv, dataCV);
      setNotificationMessage('¡El formulario ha sido enviado!');

      // setTimeout(() => {
      //   router.push(PERSONALINFORMATION);
      // }, 2000);
    } catch (error) {
      console.error("Error creating personal data:", error);
    }
  }


  async function updatePersonalData(formData: FormData, id: string) {
    await pb.collection('PersonalData').update(id, {
      name: formData.get("name"),
      lastName1: formData.get("lastName1"),
      lastName2: formData.get("lastName2"),
      birthDate: formData.get("birthDate"),
      gender: formData.get("gender"),
      bloodType: formData.get("bloodType"),
      maritalStatus: formData.get("maritalStatus"),
      nationality: formData.get("nationality"),
      residenceYears: formData.get("residenceYears"),
      ethnicIdentification: formData.get("ethnicIdentification"),
      ethnicGroup: formData.get("ethnicGroup"),
      specialCapacity: formData.get("specialCapacity"),
      catastrophicDisease: formData.get("catastrophicDisease"),
      catastrophicDiseaseType: formData.get("catastrophicDiseaseType"),
      disabilityType: formData.get("disabilityType"),
      disabilityPercentage: formData.get("disabilityPercentage"),
      MSPIDNumber: formData.get("MSPIDNumber"),
    });
  }

  return (
    <div>
      {/* <NavBar />
      <div className="my-8 flex min-h-screen flex-col items-center lg:p-4">
        <div className="rounded-2xl bg-gray-bg p-8 shadow-lg md:w-1/2">
          <form onSubmit={handleSubmit}>
            
          </form>
          
        </div>
      </div> */}

      <form onSubmit={addSubmit} className="">
        <div className="my-5 flex flex-wrap border-2 bg-white px-2 py-5">
          {<CreateFormPersonalData />}
        </div>
        <div className="flex w-full items-end justify-end space-x-2">
          <button
            type="submit"
            className="rounded-lg bg-primary-color px-5 py-2 font-medium text-white"
          >
            Guardar
          </button>
          <button
            type="button"
            className="rounded-lg bg-fill-error px-5 py-2 font-medium text-white"
            // onClick={closeAddModal}
          >
            Cancelar
          </button>
        </div>
      </form>
      <Notification message={notificationMessage} />
    </div>
  );
};

export default PersonalDataPage;
