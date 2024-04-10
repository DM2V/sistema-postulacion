import { Eye } from "@/assets/icons";
import { Calendar } from "@/pages/private/hr/calendar";
import { BACKEND_ADDRESS } from "@/utils/pocketbase";

function CalendarItem({ calendar }: { calendar: Calendar }) {
  return (

    <div className="flex items-center justify-between rounded-lg border-2 p-5 shadow-sm bg-white">
      <div className="flex flex-row items-center gap-5 text-xl">
        <h5 className="">{calendar.title}</h5>
        <a
          className="font-semibold hover:scale-125 transition-all transform"
          target="_blank"
          href={`${BACKEND_ADDRESS}/api/files/Calendar/${calendar?.id}/${calendar?.document}`}>
          <Eye color="#000031"/>
        </a>
      </div>
    </div>
  );
}

export default CalendarItem;
