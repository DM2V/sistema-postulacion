import { OfferCardIcon } from "@/assets/icons";
import { OFFERSELECTEDCANDIDATE } from "@/routes/paths";
import { Offer } from "@/types/offers";
import { pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LuMousePointerClick } from "react-icons/lu";

pb.autoCancellation(false);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function OfferItem({ offer, getOffers, }: { offer: Offer; getOffers: () => Promise<void>; }) {
  const router = useRouter();
  const { id } = router.query;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [userCv, setUserCv] = useState<Offer[]>([]);


  useEffect(() => {
    async function getUserCv() {

      const record = await pb.collection("Offer").getFullList<Offer>({
        sort: '-created',
        expand: "period,contractType,wideField,specificField,site,department,academicStaff,activity"
      });
      setUserCv(record);
    }

    getUserCv();
  }, [id]);

  return (
    <div className="rounded-lg border px-3 py-2 shadow bg-white mx-4">

      <p className="flex flex-row items-center justify-start space-x-2 gap-2 text-body-small leading-6 text-tp-disable-color">
        <OfferCardIcon />
        {offer.expand?.period?.name} | {offer.expand?.site?.name}
      </p>
      <p className="mb-3 text-lg font-semibold">
        {offer.expand?.academicStaff?.name}
      </p>

      <section>
        <p className="text-xs mb-1">
          <b className="text-tp-heading-color leading-6 py-2 text-sm">Campo amplio</b>: {offer.expand?.wideField?.name}
        </p>
        <p className="text-xs mb-1">
          <b className="text-tp-heading-color">Campo especifico</b>: {offer.expand?.specificField?.name}
        </p>
        <p className="text-xs mb-1">
          <b className="text-tp-heading-color">Departamento</b>: {offer.expand?.department?.name}
        </p>
        <p className="text-xs mb-1">
          <b className="text-tp-heading-color">Actividad</b>: {offer.expand?.activity?.name}
        </p>
        <p className="text-xs mb-1">
          <b className="text-tp-heading-color">Tipo de contratación</b>: {offer.expand?.contractType?.name}
        </p>

        <p className="mt-4">
          <b className="text-tp-heading-color">Vacantes</b>: {offer.openings}
        </p>
        <p>
          <b className="text-tp-heading-color">Remuneración</b>: ${offer.compensation}
        </p>
      </section>


      <div className="flex w-full items-end justify-end gap-2 text-[#293846] mt-3">
        <div className="flex flex-row gap-1 items-center">
          <LuMousePointerClick />
          <Link
            className="font-bold transition-all hover:text-yellow-800"
            href={`${OFFERSELECTEDCANDIDATE}/${offer.id}`}>
            Seleccionar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OfferItem;
