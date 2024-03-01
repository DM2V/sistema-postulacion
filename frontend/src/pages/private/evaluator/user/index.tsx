import LayoutWithSidebarEvaluator from "@/components/Layout/LayoutWithSidebarEvaluator";
import { User } from "@/types/user";
import { pb } from "@/utils/pocketbase";
import { useEffect, useState } from "react";

const User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const headerName = ["Cédula/Pasaporte", "Nombre", "Apellido", "Rol", "Estado", "Puntaje Total"];

  const fetchData = async () => {
    try {
      const data = await getAllUsers();
      const filteredData = data.filter((user) => user.role === "candidate");

      if (Array.isArray(data) && data.length > 0) {
        //setUsers(data);
        setUsers(filteredData);
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
    <LayoutWithSidebarEvaluator>
      <div className="pr-2 lg:w-5/6 mt-7">
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <div className="my-4 flex items-center justify-between text-xs">
            <p className="py-1 text-h6 font-bold text-state-press md:text-2xl">
              Lista de Postulantes
            </p>
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
                    </tr>
                  </thead>
                )}
                <tbody>
                  {users.length > 0
                    ? users.map((user) => (
                        <tr key={user.id} className="sm:table-row">
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {user.identificationNumber}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {user.name}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {user.lastName}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {user.role === "candidate" ? "Postulante" : null}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {user?.expand?.phaseStatus?.status}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {user?.expand?.phaseStatus?.totalScore}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebarEvaluator>
  );
};

const getAllUsers = async (): Promise<User[]> => {
  const data = await pb.collection("users").getFullList<User>({
    sort: "-created",
    role: "candidate",
    expand: "phaseStatus",
  });

  return data;
};
export default User;
