import { PostulationPeriod } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getPostulationPeriods(setPeriods: (r: PostulationPeriod[])=>void) {
    try {
      const records = await pb
        .collection("PostulationPeriod")
        .getFullList<PostulationPeriod>({
          sort: "name",
        });

      setPeriods(records);
    } catch (error) {}
  }