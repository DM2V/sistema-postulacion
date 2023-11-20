import { InfoCampusProps } from "@/types/components/types.t";
import { Circle, Map, Phone, Email, WebSite } from "@/assets/icons";

function InfoCampus({ info }: InfoCampusProps) {
  const { title, location, phone, email, website } = info;

  return (
    <div className="mb-5 mt-5 w-96 rounded-xl bg-bg-primary-color p-4 text-body-small text-tp-body-color shadow-md">
      <div className="mb-2 flex items-center text-secondary-color">
        <Circle/>
        <h5 className="text-lg font-extrabold">{title}</h5>
      </div>

      <p className="mb-2 flex items-center">
        <Map />
        {location}
      </p>

      <p className="mb-2 flex items-center">
        <Phone/>
        {phone}
      </p>

      <p className="mb-2 flex items-center">
        <Email/>
        {email}
      </p>

      <p className="flex items-center">
        <WebSite/>
        <a href={website} target="_blank" rel="noreferrer">
          {website}
        </a>
      </p>
    </div>
  );
}

export default InfoCampus;
