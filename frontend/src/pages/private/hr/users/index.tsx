import { DeleteIcon } from "@/assets/icons";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { User } from "@/types/user";
import { pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const headerName = ["Cédula/Pasaporte", "Nombre", "Apellido", "Rol"];


  async function deleteUser(userId: string) {
    try {
      await pb.collection('users').delete(userId);
      fetchData()
    } catch (error) {

    }
  }

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

  useEffect(() => {


    fetchData();
  }, []);

  return (
    <LayoutWithSidebar>

      <div className="flex flex-row items-center justify-between mx-5">
        <h3 className="my-5 ml-5 text-center font-bold text-ter-color lg:text-start">
          Usuarios
        </h3>
        <section className="mt-4 flex w-auto text-sm">
          <Link href="/private/hr/users/createUser">
            <button
              className="mx-5 flex transform items-center gap-2 rounded-xl border
            border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color">
              Crear usuario
            </button>
          </Link>
        </section>
      </div>


      <div className="pr-2 bg-gray-bg h-screen pt-3">
        <div className="mb-4 shadow-md mx-10">
          <div className="pb-2 flex items-center justify-between text-lg">
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

                        <td
                          className="border-b px-4 py-2 md:table-cell lg:table-cell"
                        >
                          {offer.identificationNumber}
                        </td>
                        <td
                          className="border-b px-4 py-2 md:table-cell lg:table-cell"
                        >
                          {offer.name}
                        </td>
                        <td
                          className="border-b px-4 py-2 md:table-cell lg:table-cell"
                        >
                          {offer.lastName}
                        </td>
                        <td
                          className="border-b px-4 py-2 md:table-cell lg:table-cell"
                        >
                          {offer.role === "admin_hr" ? "Administrador" : offer.role === "candidate" ? "Candidato" : "Evaluador"}
                        </td>

                        <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                          <div className="flex justify-center gap-5 text-lg ">

{/*                             <button className="hover:cursor-pointer">
                              <EditIcon color="#006935" />
                            </button> */}
                            <button onClick={() => deleteUser(offer.id)} className="hover:cursor-pointer">
                              <DeleteIcon color="#DD331D" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
};

const getAllUsers = async (): Promise<User[]> => {
  const data = await pb.collection("users").getFullList<User>({
    sort: "-created",
  });

  return data;
};
export default User;
