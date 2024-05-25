import GreenButton from "@/components/Buttons/GreenButton";
import { pb } from "@/utils/pocketbase";
import { FC, FormEvent, useEffect, useState } from "react";
import { User } from "@/types/user";

import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import InputLabel from "@/components/Form/InputLabel";
import Notification from "@/components/Form/Notification";
import LayoutWithSidebarCandidate from "@/components/Layout/LayoutWithSidebarCandidate";
import NavBar from "@/components/Navbar/NavbarUser";
import { EmergencyContact, HomeAddress } from "@/types/cv";
import {
  Canton,
  EmergencyRelationship,
  IdentificationType,
  Parish,
  Province,
} from "@/types/staticData";
import { fetchUserData } from "@/utils/fetch_functions/cv";
import {
  getCanton,
  getEmergencyRelationship,
  getIdentificationType,
  getParish,
  getProvince,
} from "@/utils/fetch_functions/staticData";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";

const PersonalInformationPage: FC = () => {
  const [model, setModel] = useState<User | undefined>(undefined);

  useEffect(() => {
    setModel(pb.authStore.model as User);
      }, [pb.authStore])
  const userId = model?.id;

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
  const [notificationMessage, setNotificationMessage] = useState("");
  const [province, setProvince] = useState<Province[]>([]);
  const [canton, setCanton] = useState<Canton[]>([]);
  const [parish, setParish] = useState<Parish[]>([]);
  const [relationship, setRelationship] = useState<EmergencyRelationship[]>([]);
  const [identificationType, setIdentificationType] = useState<
    IdentificationType[]
  >([]);

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
      setNotificationMessage("Por favor, completa los datos antes de enviar.");
      // return;
    }

   /* try {
      const { cv } = await pb.collection("users").getOne(userId, { fields: "cv" });
      
      if (!cv) {
        console.error("Error retrieving CV data.");
        return;
      }
      if (homeAddressData.id) {
        await pb
          .collection("HomeAddress")
          .update(homeAddressData.id, formData.homeAddressData);
      } else {
        const homeAddressCreated = await pb
          .collection("HomeAddress")
          .create(formData.homeAddressData);
        cv["homeAddress+"] = homeAddressCreated.id;
      }

      if (emergencyContactData.id) {
        await pb
          .collection("EmergencyContact")
          .update(emergencyContactData.id, formData.emergencyContactData);
      } else {
        const emergencyContactCreated = await pb
          .collection("EmergencyContact")
          .create(formData.emergencyContactData);
        cv["emergencyContact+"] = emergencyContactCreated.id;
      }

      await pb.collection("CV").update(cv, cv);
      setNotificationMessage("¡El formulario ha sido enviado!");
    } catch (error) {
      console.error("Error updating CV data:", error);
    }*/
    try {
      const record = await pb.collection("users").getOne(userId, {
        fields: "cv"
      });
    
      let cvId;
      if (!record?.cv) {
        const newCV = await pb.collection("CV").create({});
        setNotificationMessage(`Cv nuevo con id ${newCV.id}`);
        await pb.collection("users").update(userId, {
          cv: newCV.id
        });
        cvId = newCV.id;
      } else {
        cvId = record.cv;
        setNotificationMessage("CV del usuario encontrado.");
      }
    
      const cvRecord = await pb.collection("CV").getOne(cvId, {
        fields: "homeAddress, emergencyContact"
      });
    
      let homeAddressId;
      if (!cvRecord?.homeAddress) {
        const newHomeAddress = await pb.collection("homeAddress").create(formData.homeAddressData);
        homeAddressId = newHomeAddress.id;
      } else {
        homeAddressId = cvRecord.homeAddress;
        // Actualizar homeAddress existente con FormData
        await pb.collection("homeAddress").update(homeAddressId,  formData.homeAddressData);
      }
    
      let emergencyContactId;
      if (!cvRecord?.emergencyContact) {
        const newEmergencyContact = await pb.collection("emergencyContact").create(formData.emergencyContactData);
        emergencyContactId = newEmergencyContact.id;
      } else {
        emergencyContactId = cvRecord.emergencyContact;
       // console.log("Es: ",emergencyContactId)
        // Actualizar emergencyContact existente con FormData
        await pb.collection("emergencyContact").update(emergencyContactId,formData.emergencyContactData);
      }
    
      await pb.collection("CV").update(cvId, {
        homeAddress: homeAddressId,
        emergencyContact: emergencyContactId
      });
    
    } catch (error) {
      console.error("Error al obtener o crear el CV y homeAddress:", error);
    }
    
    
  }

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("click");
    e.preventDefault();
    if (formData.homeAddressData && formData.emergencyContactData) {
      createPersonalInfomation(
        formData.homeAddressData,
        formData.emergencyContactData
      );
    } else {
      setNotificationMessage("Por favor, completa los datos antes de enviar.");
    }
  }
  
  useEffect(() => {
    // Verifica si userId tiene un valor antes de llamar a fetchUserData
    if (userId) {
      fetchUserData(userId).then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          emergencyContactData: data.emergencyContact
            ? { ...prevFormData.emergencyContactData, ...data.emergencyContact }
            : prevFormData.emergencyContactData,
          homeAddressData: data.homeAddress
            ? { ...prevFormData.homeAddressData, ...data.homeAddress }
            : prevFormData.homeAddressData,
        }));
      });
    }
  }, [userId]);
  

  useEffect(() => {
    getEmergencyRelationship(setRelationship);
    getProvince(setProvince);
    getCanton(setCanton);
    getParish(setParish);
    getIdentificationType(setIdentificationType);
  }, []);

  return (
    <LayoutWithSidebarCandidate>
      <div>
        <NavBar />
        <div className="flex justify-center align-middle text-xs">
          <div className="container mx-8">

            <form onSubmit={handleSubmit}>
              <div>
                <h4 className="py-4 font-bold text-primary-color">
                  Dirección Domiciliaria Permanente
                </h4>
                <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3">
                  <ComboBoxGeneric
                    name={"province"}
                    title={"Provincia:"}
                    options={province.map((d) => {
                      return { label: d.province, value: d.province };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.homeAddressData.province || ""}
                  />
                  <ComboBoxGeneric
                    name={"canton"}
                    title={"Cantón:"}
                    options={canton.map((d) => {
                      return { label: d.canton, value: d.canton };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.homeAddressData.canton || ""}
                  />
                  <ComboBoxGeneric
                    name={"parish"}
                    title={"Parroquia:"}
                    options={parish.map((d) => {
                      return { label: d.parish, value: d.parish };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.homeAddressData.parish || ""}
                  />
                  <InputLabel
                    name="mainStreet"
                    title="Calle Principal:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.homeAddressData.mainStreet || ""}
                    placeholder={formData.homeAddressData?.mainStreet || ""}
                  />
                  <InputLabel
                    name="secondaryStreet"
                    title="Calle Secundaria:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.homeAddressData.secondaryStreet || ""}
                    placeholder={formData.homeAddressData?.secondaryStreet || ""}
                  />
                  <InputLabel
                    name="reference"
                    title="Referencia:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.homeAddressData.reference || ""}
                    placeholder={formData.homeAddressData?.reference || ""}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 pb-4 lg:w-5/6 lg:grid-cols-5">
                  <InputLabel
                    name="number"
                    title="Número:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    showErrorIcon={false}
                    defaultValue={formData.homeAddressData.number || ""}
                    placeholder={formData.homeAddressData?.number || ""}
                  />
                  <InputLabel
                    name="homePhone"
                    title="Teléfono domicilio:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    showErrorIcon={false}
                    defaultValue={formData.homeAddressData.homePhone || ""}
                    placeholder={formData.homeAddressData?.homePhone || ""}
                  />
                  <InputLabel
                    name="cellPhone"
                    title="Teléfono celular:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    showErrorIcon={false}
                    defaultValue={formData.homeAddressData.cellPhone || ""}
                    placeholder={formData.homeAddressData?.cellPhone || ""}
                  />
                  <InputLabel
                    name="workPhone"
                    title="Teléfono trabajo:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    showErrorIcon={false}
                    defaultValue={formData.homeAddressData.workPhone || ""}
                    placeholder={formData.homeAddressData?.workPhone || ""}
                  />
                  <InputLabel
                    name="extencion"
                    title="Extensión:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        homeAddressData: {
                          ...formData.homeAddressData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    showErrorIcon={false}
                    defaultValue={formData.homeAddressData.extencion || ""}
                    placeholder={formData.homeAddressData?.extencion || ""}
                  />
                </div>
              </div>
              <div>
                <h4 className="py-4 font-bold text-primary-color">
                  Contacto de emergencia
                </h4>
                <div className="grid w-full grid-cols-1 gap-4 pb-4 lg:w-4/5 lg:grid-cols-3">
                  <InputLabel
                    name="name"
                    title="Nombres:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.emergencyContactData.name}
                    placeholder={formData.emergencyContactData?.name}
                  />
                  <InputLabel
                    name="lastName1"
                    title="Apellido Paterno:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.emergencyContactData.lastName1}
                    placeholder={formData.emergencyContactData?.lastName1}
                  />
                  <InputLabel
                    name="lastName2"
                    title="Apellido Materno:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.emergencyContactData.lastName2}
                    placeholder={formData.emergencyContactData?.lastName2}
                  />
                  <ComboBoxGeneric
                    name="typeIdentification"
                    title="Tipo de identificación:"
                    options={identificationType.map((d) => {
                      return { label: d.name, value: d.name };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={
                      formData.emergencyContactData.typeIdentification || ""
                    }
                  />
                  <InputLabel
                    name="identification"
                    title="Numero de identificación:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    defaultValue={formData.emergencyContactData.identification}
                  />
                  <ComboBoxGeneric
                    name="relationship"
                    title="Parentesco:"
                    options={relationship.map((d) => {
                      return { label: d.relationship, value: d.relationship };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.emergencyContactData.relationship || ""}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3">
                  <ComboBoxGeneric
                    name={"province"}
                    title={"Provincia:"}
                    options={province.map((d) => {
                      return { label: d.province, value: d.province };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.emergencyContactData.province}
                  />
                  <ComboBoxGeneric
                    name={"canton"}
                    title={"Cantón:"}
                    options={canton.map((d) => {
                      return { label: d.canton, value: d.canton };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.emergencyContactData.canton}
                  />
                  <ComboBoxGeneric
                    name={"parish"}
                    title={"Parroquia:"}
                    options={parish.map((d) => {
                      return { label: d.parish, value: d.parish };
                    })}
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    defaultOption={formData.emergencyContactData.parish}
                  />
                  <InputLabel
                    name="mainStreet"
                    title="Calle Principal:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.emergencyContactData.mainStreet}
                    placeholder={formData.emergencyContactData?.mainStreet}
                  />
                  <InputLabel
                    name="secondaryStreet"
                    title="Calle Secundaría:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.emergencyContactData.secondaryStreet}
                    placeholder={formData.emergencyContactData?.secondaryStreet}
                  />
                  <InputLabel
                    name="reference"
                    title="Referencia:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={formData.emergencyContactData.reference}
                    placeholder={formData.emergencyContactData?.reference}
                  />
                </div>
                {/* 5-6 */}
                <div className="grid w-full grid-cols-1 gap-4 pb-4 lg:w-3/6 lg:grid-cols-3">
                  <InputLabel
                    name="number"
                    title="Número:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    defaultValue={formData.emergencyContactData.number}
                    placeholder={formData.emergencyContactData?.number}
                  />
                  <InputLabel
                    name="homePhone"
                    title="Teléfono domicilio:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    defaultValue={formData.emergencyContactData.homePhone}
                    placeholder={formData.emergencyContactData?.homePhone}
                  />
                  <InputLabel
                    name="cellPhone"
                    title="Teléfono celular:"
                    onChange={(name, value) => {
                      setFormData({
                        ...formData,
                        emergencyContactData: {
                          ...formData.emergencyContactData,
                          [name]: value,
                        },
                      });
                    }}
                    validationFunction={validateNumbersOnly}
                    defaultValue={formData.emergencyContactData.cellPhone}
                    placeholder={formData.emergencyContactData?.cellPhone}
                  />
                </div>
              </div>
            </form>
            <Notification message={notificationMessage} />
            <div className="my-4 flex justify-end">
            <GreenButton content="Guardar" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebarCandidate>
  );
};

export default PersonalInformationPage;
