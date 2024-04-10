import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import LayoutWithSidebar from '@/components/Layout/LayoutWithSidebar';
import OffersTable from '@/components/Offers/OffersTable';
import { OFFERSHRCREATE } from "@/routes/paths";
import { Offer, PostulationPeriod, Site } from '@/types/offers';
import { User } from '@/types/user';
import { getOffers } from '@/utils/fetch_functions/offer';
import { getPostulationPeriods } from '@/utils/fetch_functions/periods';
import { getSites } from "@/utils/fetch_functions/sites";
import { pb } from '@/utils/pocketbase';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';

function OffersHome() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [periods, setPeriods] = useState<PostulationPeriod[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>('');
  const [users, setUsers] = useState<User[]>([]);
  const [showOffers, setShowOffers] = useState(false);
  const [campus, setCampus] = useState<Site[]>([]);
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>('');

  // globally disable auto cancellation
  pb.autoCancellation(false);

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


  useEffect(() => {
    getPostulationPeriods(setPeriods);
    getOffers(setOffers);
    getSites(setCampus);
  }, [])


  return (
    <LayoutWithSidebar>
      <div className="flex flex-row items-center justify-between mx-5">
        <h3 className="font-bold text-ter-color my-5 ml-5">Ofertas</h3>
        <section className="mt-4 flex w-auto text-sm">
          <button
            className="mx-1 flex transform items-center gap-2 rounded-xl border
          border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color"
          >
            {periods.length == 0 ? null :
              <Link href={OFFERSHRCREATE}>Crear Nueva oferta</Link>
            }
          </button>
        </section>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:gap-x-4 items-center justify-start mx-10 text-sm">
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

        <section className="w-full md:w-1/3 mt-4 md:mt-0">
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
            className=" mt-3 mx-1 flex transform items-center gap-2 rounded-xl border border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color"
            onClick={handleSearch}
          >
            <LuSearch />
            <p>Buscar</p>
          </button>
        </section>
      </div>


      <div className='bg-[#f3f3f3] h-screen'>
        {showOffers && (
          <>
            {offers.length > 0 ? (
              <section>
                <OffersTable getOffers={getOffersLocal} offers={offers} />
              </section>
            ) : (
              <p className="mx-10">No hay ofertas para los campos seleccionados</p>
            )}
          </>
        )}


      </div>
    </LayoutWithSidebar>
  )
}

export default OffersHome