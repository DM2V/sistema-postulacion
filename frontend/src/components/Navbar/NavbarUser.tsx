import { useRouter } from "next/router";
import {
  PERSONALDATA,
  PERSONALINFORMATION,
  TRAININGPUBLICATIONS,
  EDUCATIONPUBLICATIONS,
  EXTRAPOINTS,
} from "../../routes/paths";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="h-16 bg-primary-color">
      <ul className="flex h-full items-center justify-center text-center align-middle">
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
    <li className="mr-6">
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
