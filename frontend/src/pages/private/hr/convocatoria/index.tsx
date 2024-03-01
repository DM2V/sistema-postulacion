import CallItem from "@/components/Calls/CallItem";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { CONVOCATIONHRCREATE } from "@/routes/paths";
import { Call } from "@/types/convocatoria";
import { getCalls } from "@/utils/fetch_functions/calls";
import { pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useEffect, useState } from "react";

function HomeConvocatoria() {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    getCalls(setCalls);
  }, []);

  async function deleteCall(callId: string) {
    try {
      await pb.collection("Call").delete(callId);
      getCalls(setCalls);
    } catch (error) { }
  }

  return (
    <LayoutWithSidebar>

      <div className="flex flex-row items-center justify-between mx-5">
        <h3 className="my-5 ml-5 text-center font-bold text-ter-color lg:text-start">
          Convocatorias
        </h3>
        <section className="mt-4 flex w-auto text-sm">
          <button
            className="mx-5 flex transform items-center gap-2 rounded-xl border
            border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color">
            <Link href={CONVOCATIONHRCREATE}>Crear convocatoria</Link>
          </button>
        </section>
      </div>

      <div className="bg-[#f3f3f3] h-screen">
        <div className="pt-3 mx-10 grid grid-cols-3 gap-1">
          {calls.map(c => (
            <div key={c.id} className="p-1 rounded">
              <CallItem
                handleDelete={deleteCall}
                call={c}
              />
            </div>
          ))}

        </div>
      </div>
    </LayoutWithSidebar>
  );
}

export default HomeConvocatoria;
