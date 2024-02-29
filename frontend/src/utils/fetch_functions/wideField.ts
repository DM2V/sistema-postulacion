import { WideField } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getWideField(setWideField: (e: WideField[])=>void) {
    try {
      const records = await pb
        .collection("WideField")
        .getFullList<WideField>({
          sort: "name",
        });

        setWideField(records);
    } catch (error) {}
  }