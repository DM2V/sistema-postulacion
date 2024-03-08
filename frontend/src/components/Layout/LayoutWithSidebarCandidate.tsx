import { CANDIDATEPANEL, CANIDADATEOFFERS, PERSONALDATA } from '@/routes/paths';
import React from 'react';
import { AiOutlineInbox } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import SidebarCandidate from '../Sidebar/SidebarCandidate';

function LayoutWithSidebarCandidate({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-row'>
      <div className='w-1/5'>
        <SidebarCandidate
          labels={
            [
              {
                displayName: "Inicio",
                icon: <LuHome />,
                route: CANDIDATEPANEL
              },
              {
                displayName: "Ofertas",
                icon: <AiOutlineInbox />,
                route: CANIDADATEOFFERS
              },
              {
                displayName: "Información Personal",
                icon: <AiOutlineInbox />,
                route: PERSONALDATA
              },
            ]
          }
        />
      </div>
      <div className='w-screen'>
        {children}
      </div>
    </main>
  )
}

export default LayoutWithSidebarCandidate