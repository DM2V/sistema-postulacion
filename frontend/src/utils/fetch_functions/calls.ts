import { Call } from "@/types/convocatoria";
import { pb } from "../pocketbase";

export async function getCalls(setCalls: (e: Call[])=>void) {
    try {
      const records = await pb
        .collection("Call")
        .getFullList<Call>({
          sort: "-created",
          expand: "period,department,site,calendarPhases,offers"
        });

        setCalls(records);
    } catch (error) {}
  }
