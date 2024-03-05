import { Calendar, CapIcon, CheckTable, SuiCase, UserEvaluatorIcon, UserIcon, UsersIcon, } from "@/assets/icons";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { CALENDARHR, CONVOCATIONHR, OFFERSHR, USERSHR } from "@/routes/paths";
import { pb } from "@/utils/pocketbase";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

pb.autoCancellation(false);

const getCallNumber = async (): Promise<number> => {
  const totalCall = await pb.collection("Call").getFullList({
    sort: "-created",
  });

  console.log(totalCall.length);

  return totalCall.length;
};

const getCandidateNumber = async (): Promise<number> => {
  const totalCandidates = await pb.collection("users").getList(1, 50, {
    filter: 'role = "candidate"',
  });
  console.log(totalCandidates.totalItems);
  const totalRecords = totalCandidates.totalItems;

  return totalRecords;
};

const getEvaluatorNumber = async (): Promise<number> => {
  const totalEvaluator = await pb.collection("users").getList(1, 50, {
    filter: 'role = "evaluator"',
  });
  console.log(totalEvaluator.totalItems);

  return totalEvaluator.totalItems;
};

const getEndProcessNumber = async (): Promise<number> => {
  const totalEndProcess = await pb.collection('PhaseStatus').getList(1, 50, {
    filter: 'status = "Terminado"'
  });

  const totalRecords = totalEndProcess.totalItems;

  return totalRecords;
};

const Home = ({ callNumber, candidateNumber, evaluatorNumber, processNumber, }: { callNumber: number; candidateNumber: number; evaluatorNumber: number; processNumber: number; }) => {
  const [number, setNumber] = useState(callNumber);
  const [candidateNum, setcandidateNum] = useState(candidateNumber);
  const [processNum, setProcessNum] = useState(processNumber);
  const [evaluatorNum, setEvaluatorNum] = useState(evaluatorNumber);

  useEffect(() => {
    const getNumber = async () => {
      const newNumber = await getCallNumber();
      setNumber(newNumber);
    };

    const getNumberCandidate = async () => {
      const newNumber = await getCandidateNumber();
      setcandidateNum(newNumber);
    };

    const getNumberEvaluator = async () => {
      const newNumber = await getEvaluatorNumber();
      setEvaluatorNum(newNumber);
    }

    const getNumberProcess = async () => {
      const newNumber = await getEndProcessNumber();
      setProcessNum(newNumber);
    }

    getNumber();
    getNumberCandidate();
    getNumberEvaluator();
    getNumberProcess();
  }, []);

  return (
    <LayoutWithSidebar>
      <h2 className="my-5 ml-5 text-center font-bold text-ter-color lg:text-start">
        Bienvenido
      </h2>

      <div className="flex flex-col items-center justify-center gap-2 text-center md:flex md:flex-row lg:gap-7">
        <section className="flex h-[170px] w-[250px] flex-col items-center justify-center gap-4 rounded-2xl bg-state-hover-secondary font-poppins text-[#5E94FF]">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(94, 148, 255, 0.2)" }}
          >
            <CheckTable color="#5E94FF" />
          </div>

          <p className="text-h4 font-bold">{number}</p>
          <p className="text-h6 font-medium">Convocatorias</p>
        </section>

        <section className="flex h-[170px] w-[250px] flex-col items-center justify-center gap-4 rounded-2xl bg-bg-warning font-poppins text-[#BEA337]">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(190, 163, 55, 0.1)" }}
          >
            <UsersIcon color="#BEA337" />
          </div>

          <p className="text-h4 font-bold">{candidateNum}</p>
          <p className="text-h6 font-medium">Postulantes</p>
        </section>

        <section className="flex h-[170px] w-[250px] flex-col items-center justify-center gap-4 rounded-2xl bg-[#ebffdd] font-poppins text-primary-color">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(0, 105, 53, 0.2)" }}
          >
            <CheckTable color="#006935" />
          </div>

          <p className="text-h4 font-bold"> {processNum}</p>
          <p className="text-h6 font-medium">Procesos Terminados</p>
        </section>

        <section className="flex h-[170px] w-[250px] flex-col items-center justify-center gap-4 rounded-2xl bg-bg-sucess font-poppins text-fill-sucess">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(152, 199, 41, 0.2)" }}
          >
            <UserEvaluatorIcon color="#98C729" />
          </div>

          <p className="text-h4 font-bold">{evaluatorNum}</p>
          <p className="text-h6 font-medium">Evaluadores</p>
        </section>
      </div>

      <h3 className="my-5 ml-5 text-center font-bold text-ter-color lg:text-start">
        Módulos
      </h3>

      {/* Modules */}
      <div className="flex flex-col gap-2 px-4 mb-5 text-sm lg:grid lg:grid-cols-2">
        <Link
          href={CONVOCATIONHR}
          className="flex h-auto w-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-center">
            <SuiCase />
          </div>
          <div>
            <h6 className="font-bold">Convocatoria</h6>
            <p>
              Agrega los datos respectivos para el inico de una Convocatoria
            </p>
          </div>
        </Link>

        <Link
          href={OFFERSHR}
          className="flex h-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-center">
            <CapIcon />
          </div>
          <div>
            <h6 className="font-bold">Oferta</h6>
            <p>
              Gestiona, administra y configura los detalles específicos de cada
              oferta para encontrar al candidato ideal
            </p>
          </div>
        </Link>

        <Link
          href={USERSHR}
          className="flex h-auto w-auto items-center justify-start gap-4 rounded-xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-center">
            <UserIcon />
          </div>
          <div>
            <h6 className="font-bold">Usuarios</h6>
            <p>Agrega nuevos usuarios.</p>
          </div>
        </Link>


        <Link
          href={CALENDARHR}
          className="flex h-auto w-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-center">
            <Calendar />
          </div>
          <div>
            <h6 className="font-bold"> Cronograma</h6>
            <p>Subir Cronograma</p>
          </div>
        </Link>
      </div>
    </LayoutWithSidebar>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const callNumber = await getCallNumber();
  const candidateNumber = await getCandidateNumber();
  const evaluatorNumber = await getEvaluatorNumber();
  const endProcessNumber = await getEndProcessNumber();
  return {
    props: {
      callNumber,
      candidateNumber,
      evaluatorNumber,
      endProcessNumber,
    },
  };
};
export default Home;
