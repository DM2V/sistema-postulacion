import React, { FC, useState, useEffect } from "react";
import { PersonalData } from "@/types/cv";
import GreenButton from "@/components/Buttons/GreenButton";
import InputLabel from "@/components/Form/InputLabel";
import DateInput from "@/components/Form/DateInput";
import ComboBox from "@/components/Form/ComboBox";
import CheckBox from "@/components/Form/CheckBox";
import {
  validateNotEmpty,
  calculateAge,
  validateNumbersOnly,
} from "@/utils/validations";


const PersonalDataPage: FC = () => {
  const [isSpecialCapacityVisible, setSpecialCapacityVisible] = useState(true);
  const [isDiseaseVisible, setDiseaseVisible] = useState(true);
  const [isResidenceYearsVisible, setResidenceYearsVisible] = useState(true);
  const gender = ["hombre", "mujer"];
  const nacionality = ["Ecuatoriano", "Mexicano", "Colombiano", "Peruano", "Cubano"];
  const [formState, setFormState] = useState<PersonalData>({
    name: "",
    lastName1: "",
    lastName2: "",
    birthDate: "",
    gender: "",
    bloodType: "",
    maritalStatus: "",
    nationality: "",
    residenceYears: "",
    ethnicIdentification: "",
    ethnicGroup: "",
    specialCapacity: "",
    catastrophicDisease: "",
    catastrophicDiseaseType: "",
    disabilityType: "",
    disabilityPercentage: "",
    MSPIDNumber: "",
    avatar: "",
  });

  const handleFormChange = (fieldName: string, value: string | string[]) => {
    if (fieldName === "specialCapacity") {
      setSpecialCapacityVisible(value === "Si");
      if (value === "No") {
        setSpecialCapacityVisible(false);
      } else {
        setSpecialCapacityVisible(true);
      }
    }

    if (fieldName === "catastrophicDisease") {
      setDiseaseVisible(value === "Si");

      if (value === "No") {
        setDiseaseVisible(false);
      } else {
        setDiseaseVisible(true);
      }
    }

    if (fieldName === "nationality") {
        setResidenceYearsVisible(value === "Ecuatoriano");
      if (value !== "Ecuatoriano") {
          setResidenceYearsVisible(true);
        } else {
          setResidenceYearsVisible(false);
      }
    }

    if (Array.isArray(value)) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [fieldName]: value[0],
      }));
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log("Form state updated:", formState);
  }, [formState]);

  return (
    <div className="my-8 flex min-h-screen flex-col items-center lg:p-4">
      <div className="rounded-2xl bg-gray-bg p-8 shadow-lg md:w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="mb-4 font-bold text-state-press">
              Datos personales
            </h2>
            <InputLabel
              name="name"
              title="Nombres:"
              errorMessage={"*Campo Requerido"}
              validationFunction={validateNotEmpty}
              onChange={handleFormChange}
            />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <InputLabel
                name="lastName1"
                title="Apellido Paterno:"
                errorMessage={"*Campo Requerido"}
                validationFunction={validateNotEmpty}
                onChange={handleFormChange}
              />
              <InputLabel
                name="lastName2"
                title="Apellido Materno:"
                errorMessage={"*Campo Requerido"}
                validationFunction={validateNotEmpty}
                onChange={handleFormChange}
              />
              <DateInput
                name="birthDate"
                title="Fecha de Nacimiento:"
                onChange={handleFormChange}
              />
              <InputLabel
                name="age"
                title="Edad:"
                placeholder={
                  isNaN(calculateAge(formState.birthDate)) ||
                  calculateAge(formState.birthDate) < 19
                    ? ""
                    : calculateAge(formState.birthDate)?.toString() || ""
                }
                disabled={true}
              />
              <ComboBox
                name="gender"
                title="Genero:"
                options={gender}
                onChange={handleFormChange}
              />
              <ComboBox
                name="bloodType"
                title="Tipo de Sangre:"
                options={gender}
                onChange={handleFormChange}
              />
              <ComboBox
                name="maritalStatus"
                title="Estado Civil:"
                options={gender}
                onChange={handleFormChange}
              />
              <ComboBox
                name="nationality"
                title="Nacionalidad:"
                options={nacionality}
                onChange={handleFormChange}
              />
            </div>
            {isResidenceYearsVisible && (
            <InputLabel
              name="residenceYears"
              title="En caso de ser extranjero, indicar años de residencia:"
              errorMessage={"Solo se permiten números"}
              validationFunction={validateNumbersOnly}
              onChange={handleFormChange}
            />
            )}
            <ComboBox
              name="ethnicIdentification"
              title="Auto identificación étnica:"
              options={gender}
              onChange={handleFormChange}
            />
            <ComboBox
              name="ethnicGroup"
              title="En caso de ser indigena, indique el grupo étnico:"
              options={gender}
              onChange={handleFormChange}
            />
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
                  selectedOptions={formState.specialCapacity}
                  allowMultipleSelection={false}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <p>Enfermedad Catastrófica:</p>
                <CheckBox
                  name="catastrophicDisease"
                  options={["Si", "No"]}
                  selectedOptions={[formState.catastrophicDisease]}
                  allowMultipleSelection={false}
                  onChange={handleFormChange}
                />
              </div>
              {isSpecialCapacityVisible && (
                <ComboBox
                  name="disabilityType"
                  title="Tipo de discapacidad:"
                  defaultOption={""}
                  options={gender}
                  onChange={handleFormChange}
                />
              )}
              {isDiseaseVisible && (
                <ComboBox
                  name="catastrophicDiseaseType"
                  title="Tipo de enfermedad catastrófica:"
                  defaultOption={""}
                  options={gender}
                  onChange={handleFormChange}
                />
              )}
              {isSpecialCapacityVisible && (
                <InputLabel
                  name="disabilityPercentage"
                  title="% de discapacidad:"
                  errorMessage={"Solo se permiten números"}
                  validationFunction={validateNumbersOnly}
                  onChange={handleFormChange}
                />
              )}
              {isDiseaseVisible && (
                <InputLabel
                  name="MSPIDNumber"
                  title="No. Carnet M.S.P.:"
                  errorMessage={"Solo se permiten números"}
                  validationFunction={validateNumbersOnly}
                  onChange={handleFormChange}
                />
              )}
            </div>
          </div>
          <div className="flex  justify-center">
            <GreenButton content="Continuar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDataPage;
