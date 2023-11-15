import React from "react";
import { Link } from "react-router-dom";
import { CardHomeProps } from "@/types/components/types.t";


const Card : React.FC <CardHomeProps> = ({card}) =>{
  return (
    <div>
      {/* <Link to={card.root || ""} className="mt-4"> */}
        <div className="bg-white shadow-md p-4 rounded-md w-60 h-44">
          <div className="flex items-top mb-2 text-left justify-between">
            <h5 className="text-primary-color font-semibold">{card.title}</h5>
            {card.icon}
          </div>
          <p className="text-sm text-left text-gray-600">{card.description}</p>
        </div>
      {/* </Link> */}
    </div>
  );
}

export default Card;