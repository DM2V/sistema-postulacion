import { CardHomeProps } from "@/types/components/types.t";
import Link from "next/link";
import React from "react";

const Card: React.FC<CardHomeProps> = ({ card }) => {
  return (
    <div>
      <Link href={card.root || ""} className="mt-4">
        <div className="h-44 w-60 rounded-md bg-white p-4 shadow-md">
          <div className="items-top mb-2 flex justify-between text-left">
            <h5 className="font-semibold text-primary-color">{card.title}</h5>
            {card.icon}
          </div>
          <p className="text-left text-sm text-gray-600">{card.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
