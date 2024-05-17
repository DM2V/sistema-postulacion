import { User } from "@/types/user";
import { getLinkForImage, pb } from "@/utils/pocketbase";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { LuUser2 } from "react-icons/lu";

function UserdataCandidate() {

  const [model, setModel] = useState<User | undefined>(undefined)

  useEffect(() => {
    setModel(pb.authStore.model as User);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pb.authStore])



  return (
    <>
      {model && (
        <div className="m-5">
          <div >
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

            <p className="text-sm font-bold mt-2 mb-1 hover:text-[#0077c3] cursor-pointer">{model.name?.toUpperCase()} {model.lastName?.toUpperCase()}</p>
            <p className="text-xs hover:text-[#0077c3] cursor-pointer">{model.email}</p>
            <p> {model.identificationNumber}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserdataCandidate;
