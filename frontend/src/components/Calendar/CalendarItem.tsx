import { Calendar } from "@/pages/private/hr/calendar";
import { BACKEND_ADDRESS } from "@/utils/pocketbase";

function CalendarItem({ calendar }: { calendar: Calendar }) {
  return (

    <div className="flex items-center justify-between rounded-lg border-2 p-5 shadow-sm bg-white">
      <div className="flex flex-col text-sm">
        <h5 className="">{calendar.title}</h5>
        <a
        className="font-semibold"
          target="_blank"
          href={`${BACKEND_ADDRESS}/api/files/Calendar/${calendar?.id}/${calendar?.document}`}>
          Ver
        </a>
      </div>
    </div>
  );
}

export default CalendarItem;
