import { Calendar } from "@/pages/private/hr/calendar";
import { pb } from "../pocketbase";

export async function getCalendars(setCalendars: (e: Calendar[])=>void) {
    const records = await pb.collection("Calendar").getFullList<Calendar>({
      sort: "-created",
    });
    setCalendars(records);
  }