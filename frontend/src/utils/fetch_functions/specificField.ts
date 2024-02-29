import { SpecificField } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getSpecificField(setSpecificField: (e: SpecificField[])=>void) {
    try {
      const records = await pb
        .collection("SpecificField")
        .getFullList<SpecificField>({
          sort: "name",
        });

        setSpecificField(records);
    } catch (error) {}
  }