import espelogoImg from "@/assets/images/miespe_logo.webp";
import { HOME } from "@/routes/paths";
import { pb } from "@/utils/pocketbase";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type SidebarProps = {
  labels: Label[];
};

type Label = {
  icon: React.ReactNode;
  displayName: string;
  route: string;
};

function Sidebar({ labels }: SidebarProps) {
  const router = useRouter();

  useEffect(() => {
    if (!pb.authStore.isValid || !pb.authStore.model) {
      router.push(HOME);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pb.authStore]);

  return (
    <div className="sticky top-0 flex h-screen w-56 flex-col items-stretch justify-between text-xl text-black bg-[url(../assets/images/sidebar-espe.webp)] bg-cover bg-center">
      <div>

        <Image
          src={espelogoImg}
          alt="logo_espe"
          className="mx-auto w-full cursor-pointer md:mx-0 bg-white py-8 px-10"
          width={200}
          height={56}
          priority={true}
        />

        {labels.map((l) => (
          // eslint-disable-next-line react/jsx-key
          <Link href={l.route} key={""}>
            <div className="flex items-center hover:font-bold hover:bg-[#293846] hover:text-white text-sm font-medium font-sans">
              <p className="m-4 px-2">{l.displayName}</p>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Sidebar;
