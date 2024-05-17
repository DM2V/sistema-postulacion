/* eslint-disable react-hooks/rules-of-hooks */
import FasePostulacion from '@/assets/images/FasePostulacion.webp';
import GreenButton from '@/components/Buttons/GreenButton';
import LayoutWithSidebarCandidate from '@/components/Layout/LayoutWithSidebarCandidate';
import { CANIDADATEOFFERS } from '@/routes/paths';
import Image from 'next/image';
import Link from 'next/link';

function index() {


  return (
    <LayoutWithSidebarCandidate>
      <div className='container m-5 text-primary-color flex flex-col items-center'>
        <h3 className="font-bold text-ter-color my-5 ml-5">Bienvenido al Concurso de Méritos y Oposición</h3>

        <div className=' mx-20 mb-5'>


          <section>
            🎉 Le damos la más cordial bienvenida al proceso de selección de docentes en la Universidad de las Fuerzas Armadas ESPE. Esta a punto de dar un paso importante en tu carrera profesional.
          </section>

          <p className='text-center my-5 text-black'>Ahora puede comenzar la <b>Fase de Postulación</b></p>

          <section>
            <Image src={FasePostulacion} alt='Fases Concurso' className='w-screen' />

          </section>

        </div>
        <Link href={CANIDADATEOFFERS}>
          <GreenButton content='Iniciar Postulación' />
        </Link>
      </div>
    </LayoutWithSidebarCandidate>

  )
}

export default index