import { HOME, OFFER, PHASES } from "@/routes/paths";
import { pb } from "@/utils/pocketbase";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineInbox } from "react-icons/ai";
import { LuHome } from "react-icons/lu";
import Navbar from "../Navbar/Navbar";
import NavbarPublic from "../Navbar/NavbarPublic";

interface UserData {
  user: boolean;
}

const LayoutWithNavbarPublic: React.FC<{ data?: UserData; children: React.ReactNode; }> = ({ data = { user: false }, children }) => {

  const [userData, setUserData] = useState<UserData | undefined>({ user: false });

  useEffect(() => {
    setUserData({ user: pb.authStore.isValid });
  }, []);

  return (
    <div>
      <nav className="navbar bg-base-100 border-b">
        {/* LogoESPE */}

        <div>

          {!userData?.user ? (
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
          ) : (
            <Navbar labels={[]} />
          )}
        </div>
      </nav>

      <div className="pb-1">
        {children}
      </div>
    </div>
  );
};

export default LayoutWithNavbarPublic;