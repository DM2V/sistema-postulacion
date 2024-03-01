import { EVALUATORHOME, USERSEVALUATORVIEW } from '@/routes/paths';
import React from 'react';
import { LuHome } from "react-icons/lu";
import Sidebar from '../Sidebar/Sidebar';
import LayoutWithNavbar from './LayoutWithNavbar';

function LayoutWithSidebarEvaluator({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex flex-row '>
      <div className='w-1/5'>

        <Sidebar
          labels={
            [
              {
                displayName: "Inicio",
                icon: <LuHome />,
                route: EVALUATORHOME
              },
              {
                displayName: "Postulantes",
                icon: <LuHome />,
                route: USERSEVALUATORVIEW
              }
            ]
          }
        />

      </div>
      <div className='w-screen'>
        <LayoutWithNavbar>
          {children}
        </LayoutWithNavbar>
      </div>
    </main >
  )
}

export default LayoutWithSidebarEvaluator