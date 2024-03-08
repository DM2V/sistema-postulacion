/* eslint-disable react-hooks/rules-of-hooks */
import GreenButton from '@/components/Buttons/GreenButton';
import LayoutWithSidebarCandidate from '@/components/Layout/LayoutWithSidebarCandidate';
import { CANIDADATEOFFERS } from '@/routes/paths';
import Link from 'next/link';

function index() {


  return (
    <LayoutWithSidebarCandidate>
      <div className='container m-5 text-primary-color flex flex-col items-center'>
        <h3 className="font-bold text-ter-color my-5 ml-5">Bienvenido al Concurso de Méritos y Oposición</h3>

        <Link href={CANIDADATEOFFERS}>
          <GreenButton content='Iniciar Postulación' />
        </Link>
      </div>
    </LayoutWithSidebarCandidate>

  )
}

export default index