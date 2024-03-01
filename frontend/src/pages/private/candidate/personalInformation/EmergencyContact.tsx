import React, { useState, useEffect } from "react";
import { EmergencyContact } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import InputLabel from "@/components/Form/InputLabel";
import ComboBox from "@/components/Form/ComboBox";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";

import {
  IdentificationType,
  Canton,
  Province,
  Parish,
  emergencyContactData,
} from "@/types/staticData";

import {
  getIdentificationType,
  getProvince,
  getCanton,
  getParish,
  getEmergencyContactData,
} from "@/utils/fetch_functions/staticData";

interface Props {
  onChange: (name: string, selectedOption: string) => void;
}

const EmergencyContactForm: React.FC<Props> = ({ onChange }) => {
  const [province, setProvince] = useState<Province[]>([]);
  const [canton, setCanton] = useState<Canton[]>([]);
  const [parish, setParish] = useState<Parish[]>([]);
  const [relationship, setRelationship] = useState<emergencyContactData[]>([]);
  const [identificationType, setIdentificationType] = useState<
    IdentificationType[]
  >([]);

  const [selectedIdentificationType, setSelectedIdentificationType] = useState<
    string[]
  >([]);
  const [selectedRelationship, setSelectedRelationship] = useState<string[]>(
    [],
  );
  const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
  const [selectedCanton, setSelectedCanton] = useState<string[]>([]);
  const [selectedParish, setSelectedParish] = useState<string[]>([]);

  const [formData, setFormData] = useState<EmergencyContact>({
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
  });

  const handleFormChange = (name: string, selectedOption: string) => {
    onChange(name, selectedOption);
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    getIdentificationType(setIdentificationType);
    getProvince(setProvince);
    getCanton(setCanton);
    getParish(setParish);
    getEmergencyContactData(setRelationship);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4 className="py-4 font-bold text-state-hover">
          Contacto de emergencia
        </h4>
        <div className="grid w-full grid-cols-1 gap-4 pb-4 lg:w-4/5 lg:grid-cols-3">
          <InputLabel
            name="name"
            title="Nombres:"
            onChange={handleFormChange}
            validationFunction={validateNotEmpty}
          />
          <InputLabel
            name="lastName1"
            title="Apellido Paterno:"
            onChange={handleFormChange}
            validationFunction={validateNotEmpty}
          />
          <InputLabel
            name="lastName2"
            title="Apellido Materno:"
            onChange={handleFormChange}
            validationFunction={validateNotEmpty}
          />
          <ComboBoxGeneric
            name="typeIdentification"
            title="Tipo de identificación:"
            options={identificationType.map((d) => {
              return { label: d.name, value: d.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedIdentificationType([selectedOption.label]);
               handleFormChange(name, selectedOption.label);
            }}
          />
          <InputLabel
            name="identification"
            title="Numero de identificación:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
          <ComboBoxGeneric
            name="relationship"
            title="Parentesco:"
            options={relationship.map((d) => {
              return { label: d.relationship, value: d.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedRelationship([selectedOption.label]);
              handleFormChange(name, selectedOption.label);
            }}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3">
          <ComboBoxGeneric
            name={"province"}
            title={"Provincia:"}
            options={province.map((d) => {
              return { label: d.province, value: d.province };
            })}
            onChange={(name, selectedOption) => {
              setSelectedProvince([selectedOption.label]);
              handleFormChange(name, selectedOption.label);
            }}
          />
          <ComboBoxGeneric
            name={"canton"}
            title={"Cantón:"}
            options={canton.map((d) => {
              return { label: d.canton, value: d.canton };
            })}
            onChange={(name, selectedOption) => {
              setSelectedCanton([selectedOption.label]);
              handleFormChange(name, selectedOption.label);
            }}
          />
          <ComboBoxGeneric
            name={"parish"}
            title={"Parroquia:"}
            options={parish.map((d) => {
              return { label: d.parish, value: d.parish };
            })}
            onChange={(name, selectedOption) => {
              setSelectedParish([selectedOption.label]);
              handleFormChange(name, selectedOption.label);
            }}
          />
          <InputLabel
            name="mainStreet"
            title="Calle Principal:"
            onChange={handleFormChange}
            validationFunction={validateNotEmpty}
          />
          <InputLabel
            name="secondaryStreet"
            title="Calle Secundaría:"
            onChange={handleFormChange}
            validationFunction={validateNotEmpty}
          />
          <InputLabel
            name="reference"
            title="Referencia:"
            onChange={handleFormChange}
            validationFunction={validateNotEmpty}
          />
        </div>
        {/* 5-6 */}
        <div className="grid w-full grid-cols-1 gap-4 pb-4 lg:w-3/6 lg:grid-cols-3">
          <InputLabel
            name="number"
            title="Número:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
          <InputLabel
            name="homePhone"
            title="Teléfono domicilio:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
          <InputLabel
            name="cellPhone"
            title="Teléfono celular:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
        </div>
      </div>
    </form>
  );
};

export default EmergencyContactForm;
