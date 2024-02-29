import { Activity } from "@/types/offers";
import { pb } from "../pocketbase";

export async function getActivities(setActivity: (e: Activity[])=>void) {
    try {
      const records = await pb
        .collection("Activity")
        .getFullList<Activity>({
          sort: "name",
        });

        setActivity(records);
    } catch (error) {}
  }