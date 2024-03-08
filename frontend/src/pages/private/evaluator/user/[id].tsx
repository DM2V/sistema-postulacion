import GreenButton from "@/components/Buttons/GreenButton";
import WhiteButton from "@/components/Buttons/WhiteButton";
import LayoutWithSidebarEvaluator from "@/components/Layout/LayoutWithSidebarEvaluator";
import { EVALUATORHOME } from "@/routes/paths";
import { User } from "@/types/user";
import { BACKEND_ADDRESS, pb } from "@/utils/pocketbase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LuFileText } from "react-icons/lu";
import Modal from "react-modal";

function ViewUser() {
  const router = useRouter();
  const { id } = router.query;

  const [userCv, setUserCv] = useState<User | undefined>();
  const [score, setScore] = useState<number>();
  const [phaseStatus, setPhaseStatus] = useState<User>();
  const headerName = ["Cedula/Pasaporte", "Nombre", "Apellido", "Estado"];
  const [ModalOpen, setModalOpen] = useState(false);


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    async function getUserCv() {
      if (id) {
        const record = await pb.collection("users").getOne<User>(id as string, {
          expand: "period, identificationNumber, name, lastName, phaseStatus, cv, offer",
        });
        setUserCv(record);
      }
    }
    getUserCv();
  }, [id]);

  if (!id) {
    return <div>No se proporcionó un ID válido</div>;
  }

  function openModal() {
    setModalOpen(true);
  }

  async function closeModal() {
    setModalOpen(false);
  }

  const handleScore = async () => {
    const record = await pb.collection("users").getOne<User>(id as string, {
      expand: "phaseStatus, offer",
    });
    setPhaseStatus(record);
    const scoreMerits = record?.expand?.phaseStatus?.score;
    console.log(record);

    if (score == null || score < 35 || score > 60) {
      alert("El puntaje debe ser mínimo 35 y máximo 50.");
    } else if (scoreMerits == null || scoreMerits == 0) {
      const data = {
        score: score,
        user: id,
        status: "Méritos",
      };
      const newPhase = await pb.collection("PhaseStatus").create(data);
      console.log(data);
      alert("Exitoso");
      const idPhaseStatus = newPhase.id;


      //update user with the new phaseStatus
      const data2 = {
        "phaseStatus": idPhaseStatus,
      };
      pb.collection('users').update(id as string, data2);
      console.log("Usuario actualizado con nuevo phaseStatus");

      window.location.reload();
    } else {
      alert("Ya existe un puntaje");
    }
  };

  const handleMinScore = async () => {
    const minScore = 35;
    const maxScore = 70;

    const record = await pb.collection("users").getOne<User>(id as string, {
      expand: "phaseStatus, cv, offer",
    });
    setPhaseStatus(record);
    const score = record?.expand?.phaseStatus?.score ?? 0;
    console.log(record);
    console.log(record?.expand?.phaseStatus?.score);

    if (score >= minScore && score <= maxScore) {
      alert("Puntaje válido! Pasa a la siguiente fase");
      router.push(`phase/${id}`);

    } else {
      alert("Para seguir a la siguiente fase debe tener un puntaje mínimo de: " + minScore);
    }
  };



  return (
    <LayoutWithSidebarEvaluator >
      <div className="flex items-center mt-5 ml-5 gap-4">
        <h2 className="font-bold text-ter-color ">Fase de Méritos</h2>
      </ div>

      <div className="mb-5 p-3">
        <p className="text-base text-tp-disable-color">
          <Link href={EVALUATORHOME}>&lt;Regresar</Link>
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <p className="flex gap-3">
            <b>Periodo: </b>
            <p>{userCv?.expand?.period?.name}</p>
          </p>

          {/*           <p className="flex gap-3">
            <b>Tipo de Personal Académico:</b>
            <p>{userCv?.expand?.offer?.academicStaff}</p>
          </p> */}
        </div>

        {/* Tabla Datos */}
        <div className="my-4 flex items-center space-x-10 overflow-x-auto max-w-full justify-center">
          <table className="w-5/6 table-auto bg-transparent border-collapse rounded-lg">
            <thead className="sticky top-0">
              <tr className="sm:table-row">
                {headerName.map((header) => (
                  <th key={header} className="p-3 text-left border-b border-gray-300 text-gray-800">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="sm:table-row">
                <td className="p-3 md:table-cell lg:table-cell">
                  {userCv?.identificationNumber}
                </td>
                <td className="p-3 md:table-cell lg:table-cell">
                  {userCv?.name}
                </td>
                <td className="p-3 md:table-cell lg:table-cell">
                  {userCv?.lastName}
                </td>
                <td className="p-3 md:table-cell lg:table-cell font-bold">
                  {userCv?.expand?.phaseStatus?.status ? userCv?.expand?.phaseStatus?.status : "...."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="my-2 flex items-center gap-2 font-medium justify-center">
          <h5 className="my-3 font-bold">Calificación</h5>
          <LuFileText />
          <button onClick={openModal}> Revisar Puntajes</button>
        </div>
        <Modal isOpen={ModalOpen} onRequestClose={closeModal}>
          <div>
            <div className="mb-1 flex w-full justify-end">
              <button className="text-xl font-bold" onClick={closeModal}>
                x
              </button>
            </div>
            <iframe
              src={`${BACKEND_ADDRESS}/api/files/Calendar/ptevqfawl3xgxj6/calificacion_meritos_JztLicJsOs.pdf`}
              title="PDF Viewer"
              width="100%"
              className="h-[80vh]"
            />
          </div>
        </Modal>

        <div className="pr-2  flex justify-center items-center">
          <div
            className="mb-4 space-y-5 rounded-3xl bg-gray-bg p-3 shadow-md"
            style={{
              boxShadow:
                "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
            }}
          >
            <div>
              <div className="flex items-center justify-center text-xs mb-2 text-center">
                <p className="py-1 font-bold text-state-press md:text-xl">
                  Agregar Puntaje:
                  <section className="m-2">
                    <input
                      className="text-center border border-tp-disable-color rounded-lg text-base font-light text-black"
                      type="number"
                      value={score}
                      step="0.01"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value) && value >= 0) {
                          setScore(value);
                        }
                      }}
                      placeholder=""
                      min="0"
                      max="50"
                    />
                  </section>
                  <div className="text-sm">
                    <WhiteButton content="Aceptar" onClick={handleScore} />
                  </div>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h6>Puntaje asignado Fase Méritos: </h6>
              <strong>{userCv?.expand?.phaseStatus?.score}</strong>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <GreenButton content="Siguiente Fase" onClick={handleMinScore} />
        </div>
      </div>
    </LayoutWithSidebarEvaluator>
  );
}

export default ViewUser;
function fetchData() {
  throw new Error("Function not implemented.");
}
