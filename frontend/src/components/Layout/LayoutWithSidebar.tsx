import { CALENDARHR, CONVOCATIONHR, HOMEHR, OFFERSHR, USERSHR } from '@/routes/paths';
import React from 'react';
import { AiOutlineCalendar, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

function LayoutWithSidebar({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-row'>
      <div className='w-1/5'>
        <Sidebar
          labels={
            [
              {
                displayName: "Inicio",
                icon: <LuHome />,
                route: HOMEHR
              },
              {
                displayName: "Ofertas",
                icon: <AiOutlineInbox />,
                route: OFFERSHR
              },
              {
                displayName: "Convocatorias",
                icon: <AiOutlineInbox />,
                route: CONVOCATIONHR
              },
              {
                displayName: "Cronogramas",
                icon: <AiOutlineCalendar />,
                route: CALENDARHR
              },
              {
                displayName: "Usuarios",
                icon: <AiOutlineUser />,
                route: USERSHR
              }
            ]
          }
        />
      </div>
      <div className='w-screen'>
        <Navbar labels={[]} /> 
        {children}
      </div>
    </main>
  )
}

export default LayoutWithSidebar