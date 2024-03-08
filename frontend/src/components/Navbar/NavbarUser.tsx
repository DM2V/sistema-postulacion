import Link from "next/link";
import { useRouter } from "next/router";
import {
  EDUCATIONPUBLICATIONS,
  EXTRAPOINTS,
  PERSONALDATA,
  PERSONALINFORMATION,
  TRAININGPUBLICATIONS,
} from "../../routes/paths";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="py-6 bg-primary-color text-sm">
      <ul className="flex flex-wrap justify-center">
        <NavItem
          href={PERSONALDATA}
          label="DATOS PERSONALES"
          isActive={router.pathname === PERSONALDATA}
        />
        <NavItem
          href={PERSONALINFORMATION}
          label="INFORMACIÓN PERSONAL"
          isActive={router.pathname === PERSONALINFORMATION}
        />
        <NavItem
          href={TRAININGPUBLICATIONS}
          label="FORMACIÓN ACADÉMICA Y PUBLICACIONES"
          isActive={router.pathname === TRAININGPUBLICATIONS}
        />
        <NavItem
          href={EDUCATIONPUBLICATIONS}
          label="CAPACITACIÓN"
          isActive={router.pathname === EDUCATIONPUBLICATIONS}
        />
        <NavItem
          href={EXTRAPOINTS}
          label="PUNTOS EXTRAS"
          isActive={router.pathname === EXTRAPOINTS}
        />
      </ul>
    </nav>
  );
};

const NavItem = ({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) => {
  const activeClass = isActive ? "border-b-2 border-white" : "";
  return (
    <li className="mx-5 text-center">
      <Link
        href={href}
        className={`text-white hover:text-gray-200 ${activeClass}`}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavBar;
