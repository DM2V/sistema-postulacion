import { AboutCampusProps } from "@/types/components/types.t";
import Image from "next/image";

function AboutCampus({ info }: AboutCampusProps) {
  const { imageUrl, title, description } = info;
  return (
    <div className="mx-auto mb-5 mt-5 flex w-full max-w-full flex-col overflow-hidden bg-bg-primary-color p-2 shadow-md lg:flex-row">
      <div className="lg:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          width={800}
          height={800}
          priority={true}
        />
      </div>

      <div className="p-6 lg:w-1/2">
        <h5 className="mb-2 text-2xl font-extrabold text-secondary-color">
          {title}
        </h5>
        <p className="text-body-small">{description}</p>
      </div>
    </div>
  );
}

export default AboutCampus;
