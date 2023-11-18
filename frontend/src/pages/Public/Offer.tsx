import { FC, useEffect, useState } from "react";
import GreenButton from "@/components/Buttons/GreenButton";
import OfferCard from "@/components/Card/OfferCard";
import ComboBox from "@/components/Form/ComboBox";

const Offer: FC = () => {

  interface SearchOfferProps{
    offer_announcement: string,
    offer_campus: string,
  }

  const [formState, setFormState] = useState<SearchOfferProps>({
    offer_announcement: "",
    offer_campus: "",
  });


  const handleFormChange = (fieldName: string, value: string) => {
    setFormState({
      ...formState,
      [fieldName]: value,
    });
  };

  const offerData = {
    title: "Titular Agregado 1",
    specific_field: "ANALISTA DE INFRAESTRUCTURA FÍSICA 2",
    campus: "SANGOLQUÍ",
    rmu: "1412.00",
    date: "10/10/2023",
  };

  return (
    <div className="container mx-auto mb-10 mt-2 px-10">
      <h2 className="mb-3 mt-5 text-h2 font-bold text-primary-color">
        Ofertas
      </h2>
      <h6 className="text-h6 font-bold text-state-hover">
        Consulta de Procesos
      </h6>
      <form className="mb-5 flex flex-col  items-center  md:flex-row" action="">
        <div className=" w-full pt-4 md:w-5/6 md:pr-4">
          <ComboBox
            name={"offer_announcement"}
            title={"Convocatoria"}
            defaultOption={"Selecione"}
            options={["Departamento de Ciencias de la Computacion"]}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full  pt-4 md:w-2/4 md:pr-4">
          <ComboBox
            name={"offer_campus"}
            title={"Sede"}
            defaultOption={"Selecione"}
            options={["Matriz Sangolquí"]}
            onChange={handleFormChange}
          />
        </div>
        <div className="mt-3 pt-4 md:w-1/6 md:pr-4">
          <GreenButton content="Buscar" />
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {<OfferCard offer={offerData} />}
        {<OfferCard offer={offerData} />}
        {<OfferCard offer={offerData} />}
        {<OfferCard offer={offerData} />}
        {<OfferCard offer={offerData} />}
        {<OfferCard offer={offerData} />}
      </div>
    </div>
  );
};

export default Offer;
