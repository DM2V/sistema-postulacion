import { User } from "@/types/user";
import { getLinkForImage, pb } from "@/utils/pocketbase";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";

function Userdata() {

  const [model, setModel] = useState<User | undefined>(undefined)

  useEffect(() => {
    setModel(pb.authStore.model as User);
  }, [pb.authStore])



  return (
    <>
      {model && (
        <div className="flex flex-row-reverse w-full gap-2 items-center justify-center text-[#262626] font-bold">

          <div className="w-4/5 text-xs flex items-center justify-end gap-3">
            {model && model.avatar ? (
              <Image
                alt="user profile"
                className="w-7 h-7 object-cover"
                src={getLinkForImage(model.avatar, "users", model.id)}
                width={250}
                height={250}
              />
            ) : (
              <div className="w-7 h-7 bg-gray-50 flex items-center justify-center">
                <LuUser2 />
              </div>
            )}

            <p className="text-sm hover:text-[#0077c3] cursor-pointer">{model.name?.toUpperCase()} {model.lastName?.toUpperCase()}</p>
            <p className="text-xs hover:text-[#0077c3] cursor-pointer">{model.email}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Userdata;
