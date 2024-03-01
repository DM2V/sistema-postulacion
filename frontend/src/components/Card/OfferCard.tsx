import { OfferCardIcon } from "@/assets/icons";
import { format } from "date-fns";
import React from "react";
import { OfferCardProps } from "../../types/components/types.t";

const OfferCard: React.FC<OfferCardProps> = ({ offer, onClick }) => {
  const formattedDate = format(new Date(offer.date), "d LLLL y");

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const fields = [
    {
      label: "PUESTO INSTITUCIONAL",
      value: offer.specific_field,
    },
    {
      label: "LUGAR DE TRABAJO",
      value: offer.campus,
    },
    {
      label: "RENUMERACIÓN",
      value: `${offer.rmu}$`,
    },
  ];

  return (
    <div className="flex flex-col items-start rounded-md w-50 h-auto p-4 bg-white shadow-md m-4">
      <div className="flex flex-row items-center justify-start space-x-2">
        <OfferCardIcon />
        <div className="text-body-small leading-6 text-tp-disable-color">
          {formattedDate}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">
        <h6 className="text-h6 leading-8 text-tp-heading-color">
          {offer.title}
        </h6>

        <div className="text-tp-body-color leading-6 py-2 text-body-small">
          {fields.map((field, index) => (
            <div key={index}>
              <span className="font-semibold inline">{field.label}:</span>{" "}
              {field.value}
            </div>
          ))}
        </div>
      </div>
      <button
        className="rounded-md  px-10 bg-tp-body-color text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-body-small-medium leading-6"
        onClick={handleClick}
      >
        Leer más
      </button>
    </div>
  );
};

export default OfferCard;
