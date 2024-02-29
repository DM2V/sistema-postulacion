import { AcademicStaff } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getAcademicStaff(setAcademicStaff: (e: AcademicStaff[])=>void) {
    try {
      const records = await pb
        .collection("AcademicStaff")
        .getFullList<AcademicStaff>({
          sort: "name",
        });

        setAcademicStaff(records);
    } catch (error) {}
  }
