
import GreenButton from "@/components/Buttons/GreenButton";
import WhiteButton from "@/components/Buttons/WhiteButton";
import LayoutWithSidebarEvaluator from "@/components/Layout/LayoutWithSidebarEvaluator";
import { EVALUATORHOME } from "@/routes/paths";
import { User } from "@/types/user";
import { BACKEND_ADDRESS, pb } from "@/utils/pocketbase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LuFileText } from "react-icons/lu";
import Modal from "react-modal";


function Phase() {
  const router = useRouter();
  const { id } = router.query;

  const [userCv, setUserCv] = useState<User | undefined>();
  const [phaseStatus, setPhaseStatus] = useState<User>();
  const headerName = ["Cedula/Pasaporte", "Nombre", "Apellido", "Estado"];
  const [ModalOpen, setModalOpen] = useState(false);

  const [score1, setScore1] = useState<number>();
  const [score2, setScore2] = useState<number>();

  useEffect(() => {
    async function getUserCv() {
      if (id) {
        const record = await pb.collection("users").getOne<User>(id as string, {
          expand: "period, identificationNumber, name, lastName, phaseStatus",
        });
        setUserCv(record);
      }
    }
    getUserCv();
  }, [id]);

  const handleGoBack = () => {
    router.back()
  };

  const hanndleEnd = async () => {
    const record = await pb.collection("users").getOne<User>(id as string, {
      expand: "phaseStatus",
    });
    setPhaseStatus(record);
    const idPhaseStatus = record?.expand?.phaseStatus?.id;

    //update user with the new phaseStatus
    alert("EL proceso va esta por FINALIZAR, no podrá realizar cambios");
    const data2 = {
      status: "Terminado",
    };
    pb.collection('PhaseStatus').update(idPhaseStatus as string, data2);
    console.log("Usuario actualizado con nuevo phaseStatus");
    router.push(EVALUATORHOME);
  }

  function openModal() {
    setModalOpen(true);
  }

  async function closeModal() {
    setModalOpen(false);
  }

  const handleScore = async () => {
    const totalScore = ((score1 ?? 0) || 0) + ((score2 ?? 0) || 0);

    // Verificación adicional para score1 y score2
    if (((score1 ?? 0) < 17.5 || (score1 ?? 0) > 25) || ((score2 ?? 0) < 17.5 || (score2 ?? 0) > 25)) {
      alert("El puntaje debe estar entre 17.5 y 25.");
      return; // Salir de la función si no cumple con la condición
    }

    const record = await pb.collection("users").getOne<User>(id as string, {
      expand: "phaseStatus",
    });
    setPhaseStatus(record);
    console.log(record);
    const scoreMerits = record?.expand?.phaseStatus?.score;
    const scoreOpposition = record?.expand?.phaseStatus?.scoreOpposition;
    const idPhaseStatus = record?.expand?.phaseStatus?.id;
    const totalScorePhase = (scoreMerits || 0) + totalScore;

    if (scoreOpposition == null || scoreOpposition == 0) {
      const data = {
        scoreOpposition: totalScore,
        totalScore: totalScorePhase,
        status: "Oposición"
      }

      pb.collection('PhaseStatus').update(idPhaseStatus as string, data);
      console.log(data);
      alert("Exitoso");
      //window.location.reload();
    } else {
      alert("Ya existe un puntaje");
    }
  };




  return (
    <LayoutWithSidebarEvaluator>
      <div className="flex items-center mt-5 ml-5 gap-4">
        <h2 className="font-bold text-ter-color">Fase de Oposición</h2>
      </div>

      <div className="mb-5 p-3">
        <p className="text-base text-tp-disable-color">
          <button onClick={handleGoBack}>&lt;Regresar</button>
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <p className="flex gap-3">
            <b>Periodo: </b>
            {userCv?.expand?.period?.name}
          </p>

          {/*           <p className="flex gap-3">
            <b>Tipo de Personal Académico:</b>
            <p>{userCv?.expand?.offer?.academicStaff}</p>
          </p> */}
        </div>

        {/* Tabla Datos */}
        <div className="my-4 flex items-center space-x-10 overflow-x-auto max-w-full justify-center ">
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
                <td className="p-3 md:table-cell lg:table-cell">
                  {userCv?.expand?.phaseStatus?.status}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className=" bg-bg-warning p-5 rounded-2xl">
          <h6 className="font-bold">❗ Importante</h6>
          <p>
            Despues de notificar al postulante las fechas establecidas para la realización de esta fase de oposición, ingresar el puntaje obtenido en la tabla que se muestra
          </p>
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
              src={`${BACKEND_ADDRESS}/api/files/Calendar/dx1tqpu48whv65i/puntajes_oposici_n_0NyQK6x7bt.pdf`}
              title="PDF Viewer"
              width="100%"
              className="h-[80vh]"
            />
          </div>
        </Modal>


        <div className="pr-2 flex justify-center items-center">
          <div className="mb-4 rounded-3xl bg-gray-bg p-3 shadow-md" style={{ boxShadow: "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)" }}>
            {/* tabla */}
            <p className="py-1 font-bold text-state-press md:text-xl">Agregar Puntaje</p>
            <div className="my-4 flex items-center space-x-10 overflow-x-auto max-w-full justify-center">
              <table className="w-5/6 table-auto bg-transparent border-collapse rounded-lg">
                <thead className="sticky top-0">
                  <tr className="sm:table-row">
                    <th className="p-3 text-left border-b border-gray-300 text-gray-800">Item</th>
                    <th className="p-3 text-left border-b border-gray-300 text-gray-800">Puntaje</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Pruebas Teóricas y/o Prácticas, orales y escritas", value: score1 },
                    { label: "Etapa de la clase demostrativa y/o exposición pública", value: score2 },
                  ].map((item, index) => (
                    <tr key={index} className="sm:table-row">
                      <td className="p-3 md:table-cell lg:table-cell">{item.label}</td>
                      <td className="p-3 md:table-cell lg:table-cell">
                        <input
                          className="text-center border border-tp-disable-color rounded-lg text-base font-light text-black"
                          type="number"
                          value={item.value}
                          step="0.01"
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value) && value >= 0) {
                              if (index === 0) setScore1(value);
                              else if (index === 1) setScore2(value);
                            }
                          }}
                          placeholder=""
                          min="0"
                          max="50"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="border-y-[1.5px] border-gray-300 sm:table-row">
                    <td className="p-3 border-blue-50px-4 py-2">Total</td>
                    <td className="border-blue-50px-4 py-2 text-center">{(score1 ?? 0) + (score2 ?? 0) || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-3">
              <WhiteButton content="Aceptar" onClick={handleScore} />
            </div>
            <div className="flex items-center gap-2 my-4 justify-center">
              <h6>Puntaje asignado Fase Oposición: </h6>
              <strong>{userCv?.expand?.phaseStatus?.scoreOpposition}</strong>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <GreenButton content="Finalizar" onClick={hanndleEnd} />
        </div>

      </div>

    </LayoutWithSidebarEvaluator>
  )
}

export default Phase