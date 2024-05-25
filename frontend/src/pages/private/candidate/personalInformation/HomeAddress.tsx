import React, { useState, useEffect } from "react";
import { HomeAddress } from "@/types/cv";
import { validateNotEmpty, validateNumbersOnly } from "@/utils/validations";
import InputLabel from "@/components/Form/InputLabel";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import { pb } from "@/utils/pocketbase";

import { Canton, Province, Parish } from "@/types/staticData";

import {
  getProvince,
  getCanton,
  getParish,
} from "@/utils/fetch_functions/staticData";
import { set } from "date-fns";
import { User } from "@/types/user";

interface Props {
  onChange: (name: string, selectedOption: string) => void;
}

const HomeAddressForm: React.FC<Props> = ({ onChange }) => {
  const [model, setModel] = useState<User | undefined>(undefined);

  useEffect(() => {
    setModel(pb.authStore.model as User);
      }, [pb.authStore])
  const userId = model?.id;

  const [homeAddressData, setHomeAddressData] = useState<HomeAddress>();
  const [province, setProvince] = useState<Province[]>([]);
  const [canton, setCanton] = useState<Canton[]>([]);
  const [parish, setParish] = useState<Parish[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string[]>([]);
  const [selectedCanton, setSelectedCanton] = useState<string[]>([]);
  const [selectedParish, setSelectedParish] = useState<string[]>([]);

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

  async function fetchHomeAddress() {
    try{
      const record = await pb.collection("HomeAddress").getOne(userId, {
        expand: "cv,cv.homeAddress",
        fields: "expand.cv.expand.homeAddress",
      });
      setHomeAddressData(record?.expand?.cv?.expand?.homeAddress);
    }catch(error){
      console.error(error);
    }
    
  }

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
    fetchHomeAddress();
    getProvince(setProvince);
    getCanton(setCanton);
    getParish(setParish);
  }, []);

  return (
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
        <div className="grid grid-cols-1 gap-4 pb-4 lg:w-5/6 lg:grid-cols-5">
          <InputLabel
            name="number"
            title="Número:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon={false}
          />
          <InputLabel
            name="homePhone"
            title="Teléfono domicilio:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon={false}
          />
          <InputLabel
            name="cellPhone"
            title="Teléfono celular:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon={false}
          />
          <InputLabel
            name="workPhone"
            title="Teléfono trabajo:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon={false}
          />
          <InputLabel
            name="extencion"
            title="Extensión:"
            onChange={handleFormChange}
            validationFunction={validateNumbersOnly}
            showErrorIcon={false}
          />
        </div>
      </div>
    </form>
  );
};

export default HomeAddressForm;
