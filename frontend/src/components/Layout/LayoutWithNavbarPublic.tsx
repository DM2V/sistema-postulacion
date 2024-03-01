import { HOME, OFFER, PHASES } from '@/routes/paths';
import { pb } from '@/utils/pocketbase';
import router from 'next/router';
import React from 'react';
import { AiOutlineCalendar, AiOutlineInbox } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import NavbarPublic from "../Navbar/NavbarPublic";

function LayoutWithNavbarPublic({ children }: { children: React.ReactNode }) {

  function handleSignOut() {
    pb.authStore.clear();
    router.push(HOME);
  }

  /*   useEffect(() => {
      if (!pb.authStore.clear || !pb.authStore.model) {
        //router.push(HOME);
        //return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pb.authStore]); */

  return (
    <main>

      <>
        <NavbarPublic
          labels={
            [
              {
                displayName: "Inicio",
                icon: <LuHome />,
                route: HOME
              },
              {
                displayName: "Ofertas",
                icon: <AiOutlineInbox />,
                route: OFFER
              },
              {
                displayName: "Fases  del Concurso",
                icon: <AiOutlineCalendar />,
                route: PHASES
              },

            ]
          }
        />
        <div className='w-screen'>
          {children}
        </div>
      </>

    </main>
  )
}

export default LayoutWithNavbarPublic