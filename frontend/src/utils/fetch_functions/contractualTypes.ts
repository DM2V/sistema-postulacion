import { ContractualType } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getContractualTypes(setContractualTypes: (e: ContractualType[])=>void) {
    try {
      const records = await pb
        .collection("ContractionType")
        .getFullList<ContractualType>({
          sort: "name",
        });

        setContractualTypes(records);
    } catch (error) {}
  }