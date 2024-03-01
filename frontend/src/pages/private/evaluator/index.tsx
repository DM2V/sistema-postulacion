import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import LayoutWithSidebarEvaluator from "@/components/Layout/LayoutWithSidebarEvaluator";
import { USERSEVALUATORVIEW } from "@/routes/paths";
import { PostulationPeriod } from "@/types/offers";
import { User } from "@/types/user";
import { getPostulationPeriods } from "@/utils/fetch_functions/periods";
import { pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";

const Home = () => {
  const [number, setNumber] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const headerName = ["Nombre", "Apellido", "Rol"];

  const [periods, setPeriods] = useState<PostulationPeriod[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>('');

  useEffect(() => {
    getPostulationPeriods(setPeriods);
  }, []);

  const handleSearch = async () => {
    try {
      if (selectedPeriod) {
        const data = await pb.collection("users").getList<User>(1, 50, {
          filter: `role = "candidate" && period = "${selectedPeriod}"`,
        });
        console.log(selectedPeriod)
        setUsers(data.items);
        console.log(data.items)
      } else {
        alert("Error: Debe seleccionar un periodo de postulación.");
      }
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  return (
    <LayoutWithSidebarEvaluator>

      <h3 className="font-bold text-ter-color my-5 ml-5">
        Comisión de Evaluación del Concurso de Méritos y Oposición
      </h3>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:gap-x-4 mx-5">
        <section className="">
          <ComboBoxGeneric
            name={"applicationPeriod"}
            title={"Periodo de Postulación"}
            options={periods.map((period) => {
              return { label: period.name, value: period.id };
            })}
            onChange={(name, selectedOption) => {
              setSelectedPeriod(selectedOption.value);
            }}
          />
        </section>
        <section className="mt-4 flex w-auto items-center justify-center">
          <button
            className="mx-1 flex transform items-center gap-2 rounded-xl border
                border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color"
            onClick={handleSearch}
          >
            <LuSearch />
            <p>Buscar</p>
          </button>
        </section>
      </div>

      <div className="pr-2 lg:w-5/6 mb-5 p-3">
        <div
          className="mb-4 rounded-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >


          <div className="my-4 flex items-center justify-between text-xs ">
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
                      <th className="border-b py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {users.length > 0
                    ? users.map((user) => (
                      <tr key={user.id} className="sm:table-row">
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
                          <div className="flex justify-center text-xs">
                            <Link href={`${USERSEVALUATORVIEW}/${user.id}`}>
                              <p className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none">
                                Seleccionar
                              </p>
                            </Link>
                          </div>

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
export default Home;