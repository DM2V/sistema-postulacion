import { Circle, Email, Map, Phone, WebSite } from "../../assets/icons/index";
interface InfoCampusProps {
  info: {
    title: string;
    location: string;
    phone: string;
    email: string;
    website: string;
  };
}

function InfoCampus({ info }: InfoCampusProps) {
  const { title, location, phone, email, website } = info;

  return (
    <div className="bg-bg-primary-color p-4 rounded-xl shadow-md w-96 text-tp-body-color text-body-small mt-5 mb-5">
      <div className="flex items-center mb-4 text-secondary-color">
        <Circle />
        <h5 className="font-extrabold text-lg">{title}</h5>
      </div>

      <p className="flex items-center mb-2">
        <Map />
        {location}
      </p>

      <p className="flex items-center mb-2">
        <Phone />
        {phone}
      </p>

      <p className="flex items-center mb-2">
        <Email />
        {email}
      </p>

      <p className="flex items-center">
        <WebSite />
        <a href={website} target="_blank" rel="noreferrer">
          {website}
        </a>
      </p>
    </div>
  );
}

export default InfoCampus;
