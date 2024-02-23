import GreenButton from "@/components/Buttons/GreenButton";
import CheckBox from "@/components/Form/CheckBox";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import Notification from "@/components/Form/Notification";
import ImageInput from "@/components/Image/ImageInput";
import NavBar from "@/components/Navbar/NavbarUser";
import { PERSONALINFORMATION } from "@/routes/paths";
import { PersonalData } from "@/types/cv";
import {
  BloodType,
  CatastrophicIllnessType,
  Country,
  DisabilityType,
  EthnicGroup,
  EthnicIdentification,
  Gender,
  MaritalStatus,
} from "@/types/staticData";
import { fetchPersonalDataForUser } from "@/utils/fetch_functions/cv";
import {
  getBloodType,
  getCatastrophicIllnessType,
  getCountry,
  getDisabilityType,
  getEthnicGroup,
  getEthnicIdentification,
  getGender,
  getMaritalStatus,
} from "@/utils/fetch_functions/staticData";
import { pb } from "@/utils/pocketbase";
import { useRouter } from "next/router";
import { FC, FormEvent, useEffect, useState } from "react";

import LayoutWithSidebarCandidate from "@/components/Layout/LayoutWithSidebarCandidate";
import {
  calculateAge,
  validateNotEmpty,
  validateNumbersOnly,
} from "@/utils/validations";
import { set } from "date-fns";

const PersonalDataPage: FC = () => {
  const userId = "msof6xv1zl55pof";
  const router = useRouter();
  const [personalData, setPersonalData] = useState<PersonalData | undefined>();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isSpecialCapacityVisible, setSpecialCapacityVisible] = useState(true);
  const [isDiseaseVisible, setDiseaseVisible] = useState(true);
  const [isResidenceYearsVisible, setResidenceYearsVisible] = useState(true);
  const [isethnicIdentificationVisible, setEthnicIdentificationVisible] =
    useState(true);

  const [avatar, setAvatar] = useState<File>();
  const [name, setName] = useState<string>("");
  const [lastName1, setLastName1] = useState<string>("");
  const [lastName2, setLastName2] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [gender, setGender] = useState<Gender[]>([]);
  const [bloodType, setBloodType] = useState<BloodType[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
  const [nationality, setNationality] = useState<Country[]>([]);
  const [residenceYears, setResidenceYears] = useState<string>("");
  const [ethnicIdentification, setEthnicIdentification] = useState<
    EthnicGroup[]
  >([]);
  const [ethnicGroup, setEthnicGroup] = useState<EthnicIdentification[]>([]);
  const [specialCapacity, setSpecialCapacity] = useState<string>("");
  const [catastrophicDisease, setCatastrophicDisease] = useState<string>("");
  const [catastrophicIllnessType, setCatastrophicIllnessType] = useState<
    CatastrophicIllnessType[]
  >([]);
  const [disabilityType, setDisabilityType] = useState<DisabilityType[]>([]);
  const [disabilityPercentage, setDisabilityPercentage] = useState<string>("");
  const [MSPIDNumber, setMSPIDNumber] = useState<string>("");
  const [selectedNationality, setSelectedNationality] = useState<string>("");
  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedBloodType, setSelectedBloodType] = useState<string>("");
  const [selectedEthnicIdentification, setSelectedEthnicIdentification] =
    useState<string>("");
  const [selectedEthnicGroup, setSelectedEthnicGroup] = useState<string>("");
  const [selectedCatastrophicDiseaseType, setSelectedCatastrophicDiseaseType] =
    useState<string>("");
  const [selectedDisabilityType, setSelectedDisabilityType] =
    useState<string>("");

  async function createPersonalData(formData: FormData) {
    const data = {
      avatar: (avatar as File) || "",
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
      specialCapacity: (formData.get("specialCapacity") as string) || "0",
      catastrophicDisease:
        (formData.get("catastrophicDisease") as string) || "0",
      catastrophicDiseaseType:
        (formData.get("catastrophicDiseaseType") as string) || "0",
      disabilityType: (formData.get("disabilityType") as string) || "0",
      disabilityPercentage: formData.get("disabilityPercentage") || "0",
      MSPIDNumber: formData.get("MSPIDNumber") || "0",
    };
    console.log("data", data);

    const isFilled = Object.values(data).every(
      (value) => value !== null && value !== undefined && value !== "",
    );

    if (!isFilled) {
      setNotificationMessage("Por favor, completa los datos antes de enviar.");
      return;
    }

    try {
      if (personalData?.id) {
        // await pb.collection("PersonalData").update(personalData.id, { data });
        await pb.collection("PersonalData").update(personalData.id, data);
        console.log(personalData.id);
      } else {
        const { cv } = await pb
          .collection("users")
          .getOne(userId, { fields: "cv" });
        if (!cv) {
          console.error("Error retrieving CV data.");
          return;
        }

        const personalDataCreated = await pb
          .collection("PersonalData")
          .create(data);
        const dataCV = { "personalData+": personalDataCreated.id };
        await pb.collection("CV").update(cv, dataCV);
        setTimeout(() => {
          router.push(PERSONALINFORMATION);
        }, 2000);
      }
      setNotificationMessage("¡El formulario ha sido enviado!");
    } catch (error) {
      console.error("Error creating or updating personal data:", error);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createPersonalData(formData);
  }

  useEffect(() => {
    setResidenceYearsVisible(personalData?.nationality !== "ECUADOR");
    setEthnicIdentificationVisible(
      personalData?.ethnicIdentification !== "INDÍGENA",
    );
    getGender(setGender);
    getBloodType(setBloodType);
    getCountry(setNationality);
    getMaritalStatus(setMaritalStatus);
    getEthnicGroup(setEthnicGroup);
    getEthnicIdentification(setEthnicIdentification);
    getDisabilityType(setDisabilityType);
    getCatastrophicIllnessType(setCatastrophicIllnessType);
  }, []);

  useEffect(() => {
    fetchPersonalDataForUser(userId).then((data) => {
      setPersonalData(data);
    });
    setSpecialCapacityVisible(personalData?.specialCapacity === "Si");
    setDiseaseVisible(personalData?.catastrophicDisease === "Si");
  }, [userId]);

  console.log("personalData", personalData);

  return (
    <LayoutWithSidebarCandidate>
      <div>
        <NavBar />
        <div className="my-8 flex min-h-screen flex-col items-center lg:p-4">
          <div className="rounded-2xl bg-gray-bg p-8 shadow-lg md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h2 className="mb-4 font-bold text-state-press">
                  Datos personales
                </h2>
                <ImageInput
                  title="Fotografía"
                  name="avatar"
                  width={254}
                  height={318}
                  defaultValue={
                    personalData?.id && personalData?.avatar
                      ? `a7upmrm44olwz6l/${personalData.id}/${personalData.avatar}`
                      : undefined
                  }
                  onChange={(file) => {
                    if (file !== null) {
                      setAvatar(file);
                    } else {
                      setAvatar(undefined);
                    }
                  }}
                />
                <InputLabel
                  name={"name"}
                  title={"Nombres:"}
                  errorMessage={"*Campo Requerido"}
                  validationFunction={validateNotEmpty}
                  onChange={(name, selectedOption) => {
                    setName(selectedOption);
                  }}
                  defaultValue={personalData?.name || ""}
                  placeholder={personalData?.name || ""}
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <InputLabel
                    name={"lastName1"}
                    title={"Apellido Paterno:"}
                    errorMessage={"*Campo Requerido"}
                    onChange={(name, selectedOption) => {
                      setLastName1(selectedOption);
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={personalData?.lastName1 || ""}
                    placeholder={personalData?.lastName1 || ""}
                  />
                  <InputLabel
                    name={"lastName2"}
                    title={"Apellido Materno:"}
                    errorMessage={"*Campo Requerido"}
                    onChange={(name, selectedOption) => {
                      setLastName2(selectedOption);
                    }}
                    validationFunction={validateNotEmpty}
                    defaultValue={personalData?.lastName2 || ""}
                    placeholder={personalData?.lastName2 || ""}
                  />
                  <DateInput
                    name={"birthDate"}
                    title={"Fecha de Nacimiento:"}
                    onChange={(name, selectedOption) => {
                      selectedOption.setSeconds(30);
                      // setBirthDate(selectedOption.toISOString());
                      if (
                        selectedOption instanceof Date &&
                        !isNaN(selectedOption.getTime())
                      ) {
                        const modifiedDate = new Date(selectedOption);
                        // modifiedDate.setSeconds(30);
                        setBirthDate(modifiedDate.toISOString());
                      } else {
                        // Handle invalid date selection
                        console.error("Invalid date selected:", selectedOption);
                      }
                    }}
                    defaultValue={
                      personalData?.birthDate
                        ? `${personalData?.birthDate}`
                        : ""
                    }
                  />
                  <InputLabel
                    name="age"
                    title="Edad:"
                    placeholder={
                      isNaN(calculateAge(birthDate)) ||
                      calculateAge(birthDate) < 19
                        ? ""
                        : calculateAge(birthDate)?.toString() || ""
                    }
                    disabled={true}
                    defaultValue={
                      personalData && personalData.birthDate
                        ? calculateAge(personalData.birthDate).toString()
                        : undefined
                    }
                  />
                  <ComboBoxGeneric
                    name="gender"
                    title="Genero:"
                    defaultOption={
                      personalData?.gender ? personalData.gender : ""
                    }
                    options={gender.map((d) => {
                      return { label: d.name, value: d.name };
                    })}
                    onChange={(name, selectedOption) => {
                      setSelectedGender(selectedOption.value);
                    }}
                  />

                  <ComboBoxGeneric
                    name="bloodType"
                    title="Tipo de Sangre:"
                    defaultOption={personalData?.bloodType || ""}
                    options={bloodType.map((c) => {
                      return { label: c.name, value: c.name };
                    })}
                    onChange={(name, selectedOption) => {
                      setSelectedBloodType(selectedOption.value);
                    }}
                  />
                  <ComboBoxGeneric
                    name="maritalStatus"
                    title="Estado Civil:"
                    options={maritalStatus.map((c) => {
                      return { label: c.name, value: c.name };
                    })}
                    onChange={(name, selectedOption) => {
                      setSelectedMaritalStatus(selectedOption.value);
                    }}
                    defaultOption={
                      personalData?.maritalStatus
                        ? `${personalData.maritalStatus}`
                        : ""
                    }
                  />
                  <ComboBoxGeneric
                    name={"nationality"}
                    title={"País:"}
                    options={nationality.map((c) => {
                      return { label: c.description, value: c.description };
                    })}
                    defaultOption={personalData?.nationality || ""}
                    onChange={(name, selectedOption) => {
                      setSelectedNationality(selectedOption.value);
                      setResidenceYearsVisible(
                        selectedOption.label !== "Ecuador",
                      );
                    }}
                  />
                </div>
                {isResidenceYearsVisible && (
                  <InputLabel
                    name="residenceYears"
                    title="En caso de ser extranjero, indicar años de residencia:"
                    errorMessage={"Solo se permiten números"}
                    validationFunction={validateNumbersOnly}
                    onChange={(name, selectedOption) => {
                      setResidenceYears(selectedOption);
                    }}
                    defaultValue={personalData?.residenceYears || ""}
                  />
                )}

                <ComboBoxGeneric
                  name={"ethnicIdentification"}
                  title={"Auto identificación étnica:"}
                  options={ethnicIdentification.map((c) => {
                    return { label: c.name, value: c.name };
                  })}
                  onChange={(name, selectedOption) => {
                    setSelectedEthnicIdentification(selectedOption.value);
                    setEthnicIdentificationVisible(
                      selectedOption.value === "INDÍGENA",
                    );
                  }}
                  defaultOption={personalData?.ethnicIdentification || ""}
                />

                {isethnicIdentificationVisible && (
                  <ComboBoxGeneric
                    name={"ethnicGroup"}
                    title={"En caso de ser indigena, indique el grupo étnico:"}
                    options={ethnicGroup.map((c) => {
                      return { label: c.name, value: c.name };
                    })}
                    onChange={(name, selectedOption) => {
                      setSelectedEthnicGroup(selectedOption.value);
                    }}
                    defaultOption={personalData?.ethnicGroup || ""}
                  />
                )}
              </div>
              <div>
                <h2 className="mb-4 font-bold text-state-press">
                  Información adicional discapacidad y/o enfermedad catastrófica{" "}
                </h2>

                <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-2">
                  <div>
                    <p>Capacidad Especial:</p>
                    <CheckBox
                      name="specialCapacity"
                      options={["Si", "No"]}
                      selectedOptions={[specialCapacity]}
                      allowMultipleSelection={false}
                      onChange={(name, selectedOption) => {
                        setSpecialCapacity(
                          selectedOption === "Si" ? "Si" : "No",
                        );
                        setSpecialCapacityVisible(selectedOption === "Si");
                      }}
                      defaultOption={personalData?.specialCapacity || ""}
                    />
                  </div>
                  <div>
                    <p>Enfermedad Catastrófica:</p>
                    <CheckBox
                      name="catastrophicDisease"
                      options={["Si", "No"]}
                      selectedOptions={[catastrophicDisease]}
                      allowMultipleSelection={false}
                      onChange={(name, selectedOption) => {
                        setCatastrophicDisease(
                          selectedOption === "Si" ? "Si" : "No",
                        );
                        setDiseaseVisible(selectedOption === "Si");
                      }}
                      defaultOption={personalData?.catastrophicDisease || ""}
                    />
                  </div>

                  {isSpecialCapacityVisible && (
                    <ComboBoxGeneric
                      name={"disabilityType"}
                      title={"Tipo de discapacidad:"}
                      options={disabilityType.map((c) => {
                        return { label: c.name, value: c.name };
                      })}
                      onChange={(name, selectedOption) => {
                        setSelectedDisabilityType(selectedOption.label);
                      }}
                      defaultOption={personalData?.disabilityType || ""}
                    />
                  )}
                  {isDiseaseVisible && (
                    <ComboBoxGeneric
                      name={"catastrophicDiseaseType"}
                      title={"Tipo de enfermedad catastrófica:"}
                      options={catastrophicIllnessType.map((c) => {
                        return { label: c.name, value: c.name };
                      })}
                      onChange={(name, selectedOption) => {
                        setSelectedCatastrophicDiseaseType(
                          selectedOption.label,
                        );
                      }}
                      defaultOption={
                        personalData?.catastrophicDiseaseType || ""
                      }
                    />
                  )}
                  {isSpecialCapacityVisible && (
                    <InputLabel
                      name="disabilityPercentage"
                      title="% de discapacidad:"
                      errorMessage={"Solo se permiten números"}
                      validationFunction={validateNumbersOnly}
                      onChange={(name, value) => {
                        setDisabilityPercentage(value);
                      }}
                    />
                  )}
                  {isDiseaseVisible && (
                    <InputLabel
                      name="MSPIDNumber"
                      title="No. Carnet M.S.P.:"
                      errorMessage={"Solo se permiten números"}
                      validationFunction={validateNumbersOnly}
                      onChange={(name, value) => {
                        setMSPIDNumber(value);
                      }}
                    />
                  )}
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
    </LayoutWithSidebarCandidate>
  );
};

export default PersonalDataPage;
