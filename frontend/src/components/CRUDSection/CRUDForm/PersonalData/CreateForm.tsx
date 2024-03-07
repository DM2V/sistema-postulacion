import React, { useEffect, useState } from "react";
import { PersonalData } from "@/types/cv";
import CheckBox from "@/components/Form/CheckBox";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import { fetchPersonalDataForUser } from "@/utils/fetch_functions/cv";
import ImageInput from "@/components/Image/ImageInput";
import {
    calculateAge,
    validateNotEmpty,
    validateNumbersOnly,
  } from "@/utils/validations";
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

type CreateFormPersonalDataProps = {
  selectedElement?: PersonalData;
};

function CreateFormPersonalData({
  selectedElement,
}: CreateFormPersonalDataProps) {
    const userId = "msof6xv1zl55pof";
    const [notificationMessage, setNotificationMessage] = useState("");
    const [personalData, setPersonalData] = useState<PersonalData>();
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
    const [CatastrophicIllnessType, setCatastrophicIllnessType] = useState<
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
  
      const [selectedImage, setSelectedImage] = useState<string | null>(null);
      const handleImageSelect = (imageUrl: string) => {
        setSelectedImage(imageUrl);
      };
    useEffect(() => {
        fetchPersonalDataForUser(userId).then((data) => {
          setPersonalData(data);
        });
        getGender(setGender);
        getBloodType(setBloodType);
        getCountry(setNationality);
        getMaritalStatus(setMaritalStatus);
        getEthnicGroup(setEthnicGroup);
        getEthnicIdentification(setEthnicIdentification);
        getDisabilityType(setDisabilityType);
        getCatastrophicIllnessType(setCatastrophicIllnessType);
      }, []);
    
    

  return (
    <div>
      <div>
        <h2 className="mb-4 font-bold text-state-press">Datos personales</h2>
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
          // onChange={(name, selected) => {
          //   if (selected !== null) {
          //     setAvatar(selected);
          //   } else {
          //     setAvatar(undefined);
          //   }
          // }}
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
          defaultValue={personalData?.name}
          placeholder={personalData?.name}
          // defaultValue={personalData?.name || ""}
          // placeholder={personalData?.name || ""}
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
            defaultValue={personalData?.name}
            placeholder={personalData?.name}
            // defaultValue={personalData?.lastName1  || ""}
            // placeholder={personalData?.lastName1 || ""}
          />
          <InputLabel
            name={"lastName2"}
            title={"Apellido Materno:"}
            errorMessage={"*Campo Requerido"}
            onChange={(name, selectedOption) => {
              setLastName2(selectedOption);
            }}
            validationFunction={validateNotEmpty}
            defaultValue={personalData?.name}
            placeholder={personalData?.name}
            // defaultValue={personalData?.lastName2 || ""}
            // placeholder={personalData?.lastName2 || ""}
          />
          <DateInput
            name={"birthDate"}
            title={"Fecha de Nacimiento:"}
            onChange={(name, selectedOption) => {
              // selectedOption.setSeconds(30);
              // setBirthDate(selectedOption.toISOString());
              if (
                selectedOption instanceof Date &&
                !isNaN(selectedOption.getTime())
              ) {
                const modifiedDate = new Date(selectedOption);
                modifiedDate.setSeconds(30);
                setBirthDate(modifiedDate.toISOString());
              } else {
                // Handle invalid date selection
                console.error("Invalid date selected:", selectedOption);
              }
            }}
            defaultValue={
              personalData && personalData.birthDate
                ? new Date(personalData.birthDate.slice(0, 10) + "T00:00:00")
                : undefined
            }
            placeholder={
              personalData && personalData.birthDate
                ? personalData.birthDate.slice(0, 10)
                : ""
            }
          />
          <InputLabel
            name="age"
            title="Edad:"
            placeholder={
              isNaN(calculateAge(birthDate)) || calculateAge(birthDate) < 19
                ? ""
                : calculateAge(birthDate)?.toString() || ""
            }
            disabled={true}
          />
          <ComboBoxGeneric
            name="gender"
            title="Genero:"
            options={gender.map((d) => {
              return { label: d.name, value: d.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedGender(selectedOption.label);
            }}
            defaultOption={personalData?.gender}
            // defaultOption={personalData?.gender || ""}
          />
          <ComboBoxGeneric
            name="bloodType"
            title="Tipo de Sangre:"
            options={bloodType.map((c) => {
              return { label: c.name, value: c.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedBloodType(selectedOption.label);
            }}
          />
          <ComboBoxGeneric
            name="maritalStatus"
            title="Estado Civil:"
            options={maritalStatus.map((c) => {
              return { label: c.name, value: c.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedMaritalStatus(selectedOption.label);
            }}
          />
          <ComboBoxGeneric
            name={"nationality"}
            title={"País:"}
            options={nationality.map((c) => {
              return { label: c.description, value: c.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedNationality(selectedOption.label);
              setResidenceYearsVisible(selectedOption.label !== "Ecuador");
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
          />
        )}

        <ComboBoxGeneric
          name={"ethnicIdentification"}
          title={"Auto identificación étnica:"}
          options={ethnicIdentification.map((c) => {
            return { label: c.name, value: c.id };
          })}
          onChange={(name, selectedOption) => {
            setSelectedEthnicIdentification(selectedOption.label);
            setEthnicIdentificationVisible(selectedOption.label === "INDÍGENA");
          }}
        />

        {isethnicIdentificationVisible && (
          <ComboBoxGeneric
            name={"ethnicGroup"}
            title={"En caso de ser indigena, indique el grupo étnico:"}
            options={ethnicGroup.map((c) => {
              return { label: c.name, value: c.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedEthnicGroup(selectedOption.label);
            }}
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
                setSpecialCapacity(selectedOption === "Si" ? "Si" : "No");
                setSpecialCapacityVisible(selectedOption === "Si");
              }}
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
                setCatastrophicDisease(selectedOption === "Si" ? "Si" : "No");
                setDiseaseVisible(selectedOption === "Si");
              }}
            />
          </div>

          {isSpecialCapacityVisible && (
            <ComboBoxGeneric
              name={"disabilityType"}
              title={"Tipo de discapacidad:"}
              options={disabilityType.map((c) => {
                return { label: c.name, value: c.id };
              })}
              onChange={(name, selectedOption) => {
                setSelectedDisabilityType(selectedOption.label);
              }}
            />
          )}
          {isDiseaseVisible && (
            <ComboBoxGeneric
              name={"catastrophicDiseaseType"}
              title={"Tipo de enfermedad catastrófica:"}
              options={CatastrophicIllnessType.map((c) => {
                return { label: c.name, value: c.id };
              })}
              onChange={(name, selectedOption) => {
                setSelectedCatastrophicDiseaseType(selectedOption.label);
              }}
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
    </div>
  );
}

export default CreateFormPersonalData;
