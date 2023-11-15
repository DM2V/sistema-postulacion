import React from "react";
import { Link } from "react-router-dom";
import CardHome from "../../types/components/types.t";


const Card : React.FC <CardHome> = ({title, icon, description, root}) =>{
  return (
    <div>
      <Link to={root || ""} className="mt-4">
        <div className="bg-white shadow-md p-4 rounded-md w-60 h-44">
          <div className="flex items-top mb-2 text-left justify-between">
            <h5 className="text-primary-color font-semibold">{title}</h5>
            {icon}
          </div>
          <p className="text-sm text-left text-gray-600">{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;