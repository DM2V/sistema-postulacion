import { SidebarProps } from "@/types/components/types.t";
import Image from "next/image";

function Sidebar({ user }: SidebarProps) {
  const navItems = [
    { text: "Inicio", link: "#" },
    { text: "Ofertas", link: "#" },
    { text: "Hoja de Vida ESPE", link: "#" },
    { text: "Mi Postulación", link: "#" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-primary-color text-white">
      <div className="p-5">
        <div className="mb-10 flex items-center">
          <Image
            src={user.avatar}
            alt="Avatar"
            className="mr-4 h-12 w-12 rounded-full"
            width={48}
            height={48}
            priority={true}
          />
          <div>
            <h6 className="mb-1 font-semibold">{user.name}</h6>
            <h6>{user.email}</h6>
          </div>
        </div>

        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-2">
              <a
                href={item.link}
                className="block text-white hover:text-gray-bg2"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
