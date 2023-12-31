import React, { useState, useEffect } from "react";
import { EmergencyContact } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import InputLabel from "@/components/Form/InputLabel";
import ComboBox from "@/components/Form/ComboBox";

interface Props {
  onChange: (name: string, selectedOption: string) => void;
}

const EmergencyContactForm: React.FC<Props> = ({ onChange }) => {
  const gender = ["hombre", "mujer"];

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
          <ComboBox
            name="typeIdentification"
            title="Tipo de identificación:"
            options={gender}
            onChange={handleFormChange}
          />
          <InputLabel
            name="identification"
            title="Numero de identificación:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
          <ComboBox
            name="relationship"
            title="Parentesco:"
            options={gender}
            onChange={handleFormChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3">
          <ComboBox
            name="province"
            title="Provincia:"
            options={gender}
            onChange={handleFormChange}
          />
          <ComboBox
            name="canton"
            title="Cantón:"
            options={gender}
            onChange={handleFormChange}
          />
          <ComboBox
            name="parish"
            title="Parroquia:"
            options={gender}
            onChange={handleFormChange}
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
