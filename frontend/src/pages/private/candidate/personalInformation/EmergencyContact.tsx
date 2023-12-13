import React, { useState } from "react";
import { EmergencyContact } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import GreenButton from "@/components/Buttons/GreenButton";
import InputLabel from "@/components/Form/InputLabel";
import ComboBox from "@/components/Form/ComboBox";

interface Props {
  onSubmit: (data: EmergencyContact) => void;
}

const EmergencyContactForm: React.FC<Props> = ({ onSubmit }) => {
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
    setFormData({
      ...formData,
      [name]: selectedOption,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4 className="py-4 font-bold text-state-hover">
          Dirección Domiciliaria Permanente
        </h4>
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
            title="Calle Secundaria:"
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
        <div className="grid w-5/6 grid-cols-1 gap-4 pb-4 lg:grid-cols-5">
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
            name="mobilePhone"
            title="Teléfono celular:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
          <InputLabel
            name="workPhone"
            title="Teléfono trabajo:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
          <InputLabel
            name="extencion"
            title="Extensión:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
          />
        </div>
        <div>
          <h4 className="py-4 font-bold text-state-hover">
            Contacto de emergencia
          </h4>
          <div className="grid w-full grid-cols-1 gap-4 pb-4 lg:w-4/5 lg:grid-cols-3">
            <InputLabel
              name="emergencyName"
              title="Nombres:"
              onChange={handleFormChange}
              validationFunction={validateNotEmpty}
            />
            <InputLabel
              name="emergencyLastName1"
              title="Apellido Paterno:"
              onChange={handleFormChange}
              validationFunction={validateNotEmpty}
            />
            <InputLabel
              name="emergencyLastName2"
              title="Apellido Materno:"
              onChange={handleFormChange}
              validationFunction={validateNotEmpty}
            />
            <ComboBox
              name="EmergencyTypeIdentification"
              title="Tipo de identificación:"
              options={gender}
              onChange={handleFormChange}
            />
            <InputLabel
              name="emergencyIdentification"
              title="Numero de identificación:"
              onChange={handleFormChange}
              validationFunction={validateNumbersOnly}
            />
            <ComboBox
              name="emergencyRelationship"
              title="Parentesco:"
              options={gender}
              onChange={handleFormChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-3">
            <ComboBox
              name="EmergencyProvince"
              title="Provincia:"
              options={gender}
              onChange={handleFormChange}
            />
            <ComboBox
              name="EmergencyCanton"
              title="Cantón:"
              options={gender}
              onChange={handleFormChange}
            />
            <ComboBox
              name="EmergencyParish"
              title="Parroquia:"
              options={gender}
              onChange={handleFormChange}
            />
            <InputLabel
              name="emergencyMainStreet"
              title="Calle Principal:"
              onChange={handleFormChange}
              validationFunction={validateNotEmpty}
            />
            <InputLabel
              name="emergencySecondaryStreet"
              title="Calle Secundaría:"
              onChange={handleFormChange}
              validationFunction={validateNotEmpty}
            />
            <InputLabel
              name="emergencyReference"
              title="Referencia:"
              onChange={handleFormChange}
              validationFunction={validateNotEmpty}
            />
          </div>
          {/* 5-6 */}
          <div className="grid w-full grid-cols-1 gap-4 pb-4 lg:w-3/6 lg:grid-cols-3">
            <InputLabel
              name="emergencyNumber"
              title="Número:"
              onChange={handleFormChange}
              validationFunction={validateNumbersOnly}
            />
            <InputLabel
              name="emergencyHomePhone"
              title="Teléfono domicilio:"
              onChange={handleFormChange}
              validationFunction={validateNumbersOnly}
            />
            <InputLabel
              name="emergencyMobilePhone"
              title="Teléfono celular:"
              onChange={handleFormChange}
              validationFunction={validateNumbersOnly}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmergencyContactForm;
