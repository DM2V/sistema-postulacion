import { DeleteIcon, EditIcon, Eye } from "@/assets/icons";
import { User } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const headerName = ["Cédula/Pasaporte", "Nombre", "Apellido", "Rol"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
        } else {
          console.error("Error: Datos de usuarios no válidos.");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Usuarios
      </h2>

      <div className="pr-2 lg:w-5/6">
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <div className="my-4 flex items-center justify-between text-xs">
            <p className="py-3 text-h6 font-bold text-state-press md:text-2xl">
              Lista de usuarios
            </p>
            <Link href="/private/hr/users/createUser">
              <button className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none">
                + Crear Usuario
              </button>
            </Link>
          </div>

          {/* Tabla de Usuarios */}
          <div className="max-h-[350px] overflow-x-auto text-start text-sm md:text-center md:text-base">
            <div className="max-h-[calc(40vh)] md:max-h-[calc(70vh)] lg:max-h-[calc(90vh)]">
              <table className="w-full overflow-x-scroll rounded-lg border border-gray-300 bg-white">
                {users.length > 0 && (
                  <thead className="sticky top-0 bg-gray-200">
                    <tr className="sm:table-row">
                      {headerName
                        .filter(
                          (header) =>
                            header !==
                            "id && header !== 'username' && header !== 'email'",
                        )
                        .map((header) => (
                          <th
                            key={header}
                            className="border-b py-2 md:table-cell lg:table-cell"
                          >
                            {header.charAt(0).toUpperCase() + header.slice(1)}
                          </th>
                        ))}
                      <th className="border-b py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {users.length > 0 ? (
                    users.map((offer) => (
                      <tr key={offer.id} className="sm:table-row">
                        {Object.keys(offer)
                          .filter(
                            (key) =>
                              key !== "id" &&
                              key !== "username" &&
                              key !== "email",
                          )
                          .map((key, index) => (
                            <td
                              key={index}
                              className="border-b px-4 py-2 md:table-cell lg:table-cell"
                            >
                              {offer[key as keyof typeof offer]}
                            </td>
                          ))}
                        <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                          <div className="flex justify-center gap-5 text-lg ">
                            <button className="hover:cursor-pointer">
                              <Eye color="#000" />
                            </button>
                            <button className="hover:cursor-pointer">
                              <EditIcon color="#006935" />
                            </button>
                            <button className="hover:cursor-pointer">
                              <DeleteIcon color="#DD331D" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Si no hay datos, mostrar solo la fila de cabecera
                    <tr className="sm:table-row">
                      {headerName.map((nameHeader, index) => (
                        <th
                          key={index}
                          className="border-b px-4 py-2 md:table-cell lg:table-cell"
                        >
                          {nameHeader}
                        </th>
                      ))}
                      <th className="border-b px-4 py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getAllUsers = async (): Promise<User[]> => {
  const data: User[] = [
    {
      id: "1",
      email: "marcelo@example.com",
      identificationNumber: "123456789",
      name: "Marcelo",
      lastname: "Malte",
      role: "Evaluador",
    },
  ];
  return data;
};
export default User;
