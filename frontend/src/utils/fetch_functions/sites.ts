import { Site } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getSites(setSites: (e: Site[])=>void) {
    try {
      const records = await pb
        .collection("Site")
        .getFullList<Site>({
          sort: "name",
        });

        setSites(records);
    } catch (error) {}
  }
