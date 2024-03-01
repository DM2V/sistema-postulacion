import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import LayoutWithSidebar from '@/components/Layout/LayoutWithSidebar';
import OffersTable from '@/components/Offers/OffersTable';
import { OFFERSHRCREATE } from "@/routes/paths";
import { Offer, PostulationPeriod } from '@/types/offers';
import { User } from '@/types/user';
import { getOffers } from '@/utils/fetch_functions/offer';
import { getPostulationPeriods } from '@/utils/fetch_functions/periods';
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

  useEffect(() => {
    getPostulationPeriods(setPeriods);
    getOffers(setOffers);
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
      <div className="flex flex.row md:flex-row md:gap-x-4 items-center justify-start mx-10 text-sm">
        <section className="">
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

      <div className='bg-[#f3f3f3]'>
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
    </LayoutWithSidebar>
  )
}

export default OffersHome