interface AboutCampusProps {
  info: {
    imageUrl: string;
    title: string;
    description: string;
  };
}

function AboutCampus({ info }: AboutCampusProps) {
  const { imageUrl, title, description } = info;
  return (
    <div className="bg-bg-primary-color shadow-md overflow-hidden flex flex-col lg:flex-row w-full max-w-full mx-auto p-2 mt-5 mb-5">
      <div className="lg:w-1/2">
        <img src={imageUrl} alt={title} />
      </div>

      <div className="lg:w-1/2 p-6">
        <h5 className="font-extrabold mb-2 text-secondary-color text-2xl">
          {title}
        </h5>
        <p className="text-body-small">{description}</p>
      </div>
    </div>
  );
}

export default AboutCampus;
