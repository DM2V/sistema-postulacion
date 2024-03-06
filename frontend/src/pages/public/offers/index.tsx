import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import Footer from "@/components/Layout/Footer";
import LayoutWithNavbarPublic from "@/components/Layout/LayoutWithNavbarPublic";
import OffersTable from "@/components/Offers/OffersPublic/OffersTable";
import { Offer, PostulationPeriod, Site } from '@/types/offers';
import { User } from "@/types/user";
import { getOffers } from "@/utils/fetch_functions/offer";
import { getPostulationPeriods } from "@/utils/fetch_functions/periods";
import { getSites } from "@/utils/fetch_functions/sites";
import { pb } from "@/utils/pocketbase";
import { FC, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const Offer: FC = () => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [periods, setPeriods] = useState<PostulationPeriod[]>([]);
  const [campus, setCampus] = useState<Site[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>('');
  const [showOffers, setShowOffers] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>('');

  interface SearchOfferProps {
    offer_announcement: string;
    offer_campus: string;
  }

  const handleSearch = async () => {
    try {
      if (selectedPeriod && selectedCampus) {
        const data = await pb.collection("Offer").getList<Offer>(1, 50, {
          filter: `period = "${selectedPeriod}" && site = "${selectedCampus}"`,
          expand: "period,contractType,wideField,specificField,site,department,academicStaff,activity"
        });

        setOffers(data.items);
        setShowOffers(true);
      } else {
        alert("Error: Debe seleccionar un periodo de postulación y un campus.");
      }
    } catch (error) {
      alert("Error al realizar la búsqueda");
    }
  };


  async function getOffersLocal() {
    try {
      const records = await pb.collection('Offer').getFullList<Offer>({
        sort: '-created',
        expand: "period,contractType,wideField,specificField,site,department,academicStaff,activity"
      });
      setOffers(records)
    } catch (error) {

    }
  }

  useEffect(() => {
    getPostulationPeriods(setPeriods);
    getSites(setCampus);
    getOffers(setOffers);
  }, [])

  return (
    <LayoutWithNavbarPublic>
      <div className="container mx-auto mb-10 mt-2 px-10">

        <h2 className="mb-3 mt-5 text-h2 font-bold text-primary-color">
          Ofertas
        </h2>


        {/* Search */}
        <div className="flex flex-col md:flex-row md:gap-x-4 items-center justify-start mx-5 text-sm">
          <section className="w-full md:w-1/6">
            <ComboBoxGeneric
              name={"applicationPeriod"}
              title={"Periodo Académico"}
              options={periods.map((period) => {
                return { label: period.name, value: period.id };
              })}
              onChange={(name, selectedOption) => {
                setSelectedPeriod(selectedOption.value);
              }}
            />
          </section>

          <section className="w-full md:w-1/4 mt-4 md:mt-0">
            <ComboBoxGeneric
              name={"sites"}
              title={"Campus"}
              options={campus.map((period) => {
                return { label: period.name, value: period.id };
              })}
              onChange={(name, selectedOption) => {
                setSelectedCampus(selectedOption.value);
              }}
            />
          </section>

          <section className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-center">
            <button
              className="mt-3 mx-1 flex transform items-center gap-2 rounded-xl border border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color"
              onClick={handleSearch}
            >
              <LuSearch />
              <p>Buscar</p>
            </button>
          </section>
        </div>



        {showOffers && (
          <>
            {offers.length > 0 ? (
              <section>
                <OffersTable getOffers={getOffersLocal} offers={offers} />
              </section>
            ) : (
              <p className="mx-5">No hay ofertas para los campos seleccionados</p>
            )}
          </>
        )}

      </div>
      <Footer />
    </LayoutWithNavbarPublic>
  );
};

export default Offer;
