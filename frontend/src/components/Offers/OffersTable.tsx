import { Offer } from '@/types/offers'
import OfferItem from './OfferItem'

function OffersTable({ offers, getOffers }: { offers: Offer[], getOffers: () => Promise<void> }) {
  return (
    <div className='grid mt-5 md:grid-cols-3 xl:grid-cols-3 gap-3 py-4'>
      {
        offers.map((offer) => (
          <OfferItem key={""} getOffers={getOffers} offer={offer} />
        ))
      }
    </div>
  )
}

export default OffersTable