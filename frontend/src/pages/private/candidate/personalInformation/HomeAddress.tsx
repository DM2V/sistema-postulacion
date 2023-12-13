import React, { useState } from "react";
import { HomeAddress } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import GreenButton from "@/components/Buttons/GreenButton";
import InputLabel from "@/components/Form/InputLabel";
import ComboBox from "@/components/Form/ComboBox";
interface Props {
  onSubmit: (data: HomeAddress) => void;
}

const HomeAddressForm: React.FC<Props> = ({ onSubmit }) => {
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
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default HomeAddressForm;
