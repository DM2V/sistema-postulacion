import { HOME } from "@/routes/paths";
import { pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GoSignOut } from "react-icons/go";
import Userdata from "../Sidebar/Userdata";

type NavbarProps = {
  labels: Label[];
};

type Label = {
  icon: React.ReactNode;
  displayName: string;
  route: string;
};

function Navbar({ labels }: NavbarProps) {
  const router = useRouter();

  function handleSignOut() {
    pb.authStore.clear();
    router.push(HOME);
  }

  useEffect(() => {
    if (!pb.authStore.isValid || !pb.authStore.model) {
      router.push(HOME);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pb.authStore]);

  return (
    <div className="md:flex-center mx-auto flex flex-col items-center px-10 md:flex-col lg:flex-row h-20 border-b-[1.5px] top-0 ">

      <Userdata />

      <Link href={HOME}>
        <button onClick={handleSignOut} className="flex items-center text-sm font-sans m-4">
          <GoSignOut />
          <p className="m-2 font-bold text-[#888888]">Salir</p>
        </button>
      </Link>

    </div>
  );
}

export default Navbar;
