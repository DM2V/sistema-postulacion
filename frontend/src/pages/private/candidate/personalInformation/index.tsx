import React, { FC, FormEvent, useEffect, useState } from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import HomeAddressForm from "./HomeAddress";
import EmergencyContactForm from "./EmergencyContact";
import { pb } from "@/utils/pocketbase";
import { ACADEMICTRANING } from "@/routes/paths";

import { HomeAddress, EmergencyContact } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import NavBar from "@/components/Navbar/NavbarUser";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import InputLabel from "@/components/Form/InputLabel";
import Notification from "@/components/Form/Notification";
import {
  fetchEmergencyContact,
  fetchEmergencyContactForUser,
  fetchHomeAddress,
  fetchHomeAddressForUser,
} from "@/utils/fetch_functions/cv";
import {
  IdentificationType,
  Canton,
  Province,
  Parish,
  EmergencyRelationship,
} from "@/types/staticData";
import {
  getProvince,
  getCanton,
  getParish,
  getIdentificationType,
  getEmergencyRelationship,
} from "@/utils/fetch_functions/staticData";
import { fetchUserData } from "@/utils/fetch_functions/cv";

const PersonalInformationPage: FC = () => {
  const userId = "msof6xv1zl55pof";
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

    try {
      const { cv } = await pb
        .collection("users")
        .getOne(userId, { fields: "cv" });

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
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.homeAddressData && formData.emergencyContactData) {
      createPersonalInfomation(
        formData.homeAddressData,
        formData.emergencyContactData,
      );
    } else {
      setNotificationMessage("Por favor, completa los datos antes de enviar.");
    }
  }

  console.log("FORM DATA", formData);

  // useEffect(() => {
  //   fetchEmergencyContactForUser(userId).then((data) => {
  //     if (data) {
  //       setFormData({
  //         ...formData,
  //         emergencyContactData: data,
  //       });
  //     }
  //   });

  //   fetchHomeAddressForUser(userId).then((data) => {
  //     if (data) {
  //       setFormData({
  //         ...formData,
  //         homeAddressData: data,
  //       });
  //     }
  //   });
  // });

  useEffect(() => {
    console.log(userId);

    fetchUserData(userId).then((data) => {
      if (data.emergencyContact) {
        setFormData({
          ...formData,
          emergencyContactData: data.emergencyContact,
        });
      }
      if (data.homeAddress) {
        setFormData({
          ...formData,
          homeAddressData: data.homeAddress,
        });
      }
    });
    
    getEmergencyRelationship(setRelationship);
    getProvince(setProvince);
    getCanton(setCanton);
    getParish(setParish);
    getIdentificationType(setIdentificationType);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex justify-center align-middle">
        <div className="container">
          <h1 className="text-ter-color">Información Personal</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <h4 className="py-4 font-bold text-state-hover">
                Dirección Domiciliaria Permanente
              </h4>
              <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3">
                <ComboBoxGeneric
                  name={"province"}
                  title={"Provincia:"}
                  options={province.map((d) => {
                    return { label: d.province, value: d.province };
                  })}
                  // setSelectedProvince(selectedOption.label);
                  // handleFormChange(name, selectedOption.label);
                  onChange={(name, value) => {
                    setFormData({
                      ...formData,
                      homeAddressData: {
                        ...formData.homeAddressData,
                        [name]: value,
                      },
                    });
                  }}
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
                />
              </div>
            </div>
            <div>
              <h4 className="py-4 font-bold text-state-hover">
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
                    return { label: d.name, value: d.id };
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
                    formData.emergencyContactData.typeIdentification
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
                    return { label: d.relationship, value: d.id };
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
                  defaultOption={formData.emergencyContactData.relationship}
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
            <div className="my-4 flex justify-end">
              <GreenButton content="Guardar" />
            </div>
          </form>
          <Notification message={notificationMessage} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationPage;
