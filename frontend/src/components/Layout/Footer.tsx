import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "../../assets/icons/index";

export default function Footer() {
  return (
    <footer className="bg-dark relative p-4 text-center text-white">
      <div className="absolute left-0 top-0 w-full border-t-2 border-primary-color" />
      <Image
        src="https://www.espe.edu.ec/wp-content/uploads/2023/03/espe.png"
        alt="logo_espe"
        className="mx-auto mb-4 w-auto md:h-auto md:w-auto"
        width={400}
        height={56}
        priority={true}
      />
      <div className="flex justify-center space-x-4">
        {/* facebook */}
        <a
          href="https://www.facebook.com/ESPE.U"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook />
        </a>

        {/* youtube */}
        <a
          href="https://www.youtube.com/@universidaddelasfuerzasarm4608/videos"
          rel="noreferrer"
          target="_blank"
        >
          <Youtube />
        </a>

        {/* instagram */}
        <a
          href="https://www.instagram.com/espe.u/"
          rel="noreferrer"
          target="_blank"
        >
          <Instagram />
        </a>

        {/* twitter */}
        <a href="https://twitter.com/ESPEU" rel="noreferrer" target="_blank">
          <Twitter />
        </a>
      </div>
    </footer>
  );
}
