import React, { useState, useEffect, } from "react";
import { HomeAddress } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import InputLabel from "@/components/Form/InputLabel";
import ComboBox from "@/components/Form/ComboBox";

interface Props {
  onChange: (name: string, selectedOption: string) => void;
}

const HomeAddressForm: React.FC<Props>  = ({ onChange }) => {
  const gender = ["hombre", "mujer"];

  const [formData, setFormData] = useState<HomeAddress>({
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
    <form onSubmit={handleSubmit} >
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
        <div className="grid lg:w-5/6 grid-cols-1 gap-4 pb-4 lg:grid-cols-5">
          <InputLabel
            name="number"
            title="Número:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon = {false}
          />
          <InputLabel
            name="homePhone"
            title="Teléfono domicilio:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon = {false}
          />
          <InputLabel
            name="cellPhone"
            title="Teléfono celular:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon = {false}
          />
          <InputLabel
            name="workPhone"
            title="Teléfono trabajo:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon = {false}
          />
          <InputLabel
            name="extencion"
            title="Extensión:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon = {false}
          />
        </div>
      </div>
    </form>
  );
};

export default HomeAddressForm;