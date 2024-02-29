import { Department } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getDepartments(setDepartments: (e: Department[])=>void) {
    try {
      const records = await pb
        .collection("Department")
        .getFullList<Department>({
          sort: "name",
        });

        setDepartments(records);
    } catch (error) {}
  }
