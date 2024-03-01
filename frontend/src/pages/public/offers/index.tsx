import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import Footer from "@/components/Layout/Footer";
import LayoutWithNavbarPublic from "@/components/Layout/LayoutWithNavbarPublic";
import OffersTable from "@/components/Offers/OffersTable";
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

  interface SearchOfferProps {
    offer_announcement: string;
    offer_campus: string;
  }

  const handleSearch = async () => {
    try {
      if (selectedPeriod) {
        const data = await pb.collection("Offer").getList<User>(1, 50, {
          filter: `period = "${selectedPeriod}"`,
        });
        setUsers(data.items);
        console.log(data.items)
      } else {
        alert("Error: Debe seleccionar un periodo de postulación.");
      }
    } catch (error) {
      alert("Error al realizar la búsqueda");
    }
    setShowOffers(true);

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
        <div className="flex flex.row md:flex-row md:gap-x-4 items-center justify-start text-sm">
          <section>
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

          <section>
            <ComboBoxGeneric
              name={"sites"}
              title={"Campus"}
              options={campus.map((period) => {
                return { label: period.name, value: period.id };
              })}
              onChange={(name, selectedOption) => {
                setSelectedPeriod(selectedOption.value);
              }}
            />
          </section>

          <section className="mt-4 flex w-auto items-center justify-center">
            <button
              className="mx-1 flex transform items-center gap-2 rounded-xl border
                border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color"
              onClick={handleSearch}
            >
              <LuSearch />
              <p>Buscar</p>
            </button>
          </section>
        </div>



        {showOffers && (
          <>
            {offers.some((offer) => offer.period === selectedPeriod) ? (
              <section>
                <OffersTable getOffers={getOffersLocal} offers={offers} />
              </section>
            ) : (
              <p className="mx-10">No hay ofertas para el periodo seleccionado</p>
            )
            }
          </>
        )}

      </div>
      <Footer />
    </LayoutWithNavbarPublic>
  );
};

export default Offer;
