import {
  Calendar,
  CapIcon,
  CheckTable,
  PenEdit,
  SuiCase,
  UserEvaluatorIcon,
  UserIcon,
  UsersIcon,
} from "@/assets/icons";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

const getCallNumber = async (): Promise<number> => {
  // Lógica para llamar a la API y obtener el número de convocatorias activas
  return 8; // Devuelve un número ficticio
};

const getCandidateNumber = async (): Promise<number> => {
  // Lógica para llamar a la API y obtener el número de los postulantes
  return 10; // Devuelve un número ficticio
};
const Home = ({
  callNumber,
  candidateNumber,
}: {
  callNumber: number;
  candidateNumber: number;
}) => {
  const [number, setNumber] = useState(callNumber);
  const [candidateNum, setcandidateNum] = useState(candidateNumber);

  useEffect(() => {
    const getNumber = async () => {
      const newNumber = await getCallNumber();
      setNumber(newNumber);
    };

    const getNumberCandidate = async () => {
      const newNumber = await getCandidateNumber();
      setcandidateNum(newNumber);
    };

    getNumber();
    getNumberCandidate();
  }, []);

  return (
    <>
      <h2 className="text-center font-bold text-ter-color lg:text-start">
        Bienvenido
      </h2>

      {/* Cards */}
      <div className="flex flex-col items-center justify-center gap-2 p-5 text-center md:flex md:flex-row lg:gap-7">
        <section className="flex h-[286px] w-[250px] flex-col items-center justify-center gap-9 rounded-2xl bg-state-hover-secondary font-poppins text-[#5E94FF]">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(94, 148, 255, 0.2)" }}
          >
            <CheckTable color="#5E94FF" />
          </div>

          <p className="text-h4 font-bold">{number}</p>
          <p className="text-h6 font-medium">Convocatorias Activas</p>
        </section>

        <section className="flex h-[286px] w-[250px] flex-col items-center justify-center gap-9 rounded-2xl bg-bg-warning font-poppins text-[#BEA337]">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(190, 163, 55, 0.1)" }}
          >
            <UsersIcon color="#BEA337" />
          </div>

          <p className="text-h4 font-bold">{candidateNum}</p>
          <p className="text-h6 font-medium">Postulantes</p>
        </section>

        <section className="flex h-[286px] w-[250px] flex-col items-center justify-center gap-9 rounded-2xl bg-[#ebffdd] text-primary-color">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(0, 105, 53, 0.2)" }}
          >
            <CheckTable color="#006935" />
          </div>

          <p className="text-h4 font-bold">Traer de la DB</p>
          <p className="text-h6 font-medium">Procesos Terminados</p>
        </section>

        <section className="flex h-[286px] w-[250px] flex-col items-center justify-center gap-9 rounded-2xl bg-bg-sucess font-poppins text-fill-sucess">
          <div
            className="rounded-full p-2 shadow-inner"
            style={{ backgroundColor: "rgba(152, 199, 41, 0.2)" }}
          >
            <UserEvaluatorIcon color="#98C729" />
          </div>

          <p className="text-h4 font-bold">Traer de la DB</p>
          <p className="text-h6 font-medium">Evaluadores</p>
        </section>
      </div>

      <h3 className="text-center font-bold text-ter-color lg:text-start">
        Módulos
      </h3>

      {/* Modules */}
      <div className="flex flex-col gap-2 p-4 text-sm lg:grid lg:grid-cols-2">
        <Link href="/private/hr/convocatoria">
          <section className="flex h-auto w-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105">
            <div className="flex items-center justify-center">
              <SuiCase />
            </div>
            <div>
              <h6 className="font-bold">Convocatoria</h6>
              <p>
                Agrega los datos respectivios para el inico de una Convocatoria
              </p>
            </div>
          </section>
        </Link>

        <section className="flex h-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105">
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
        </section>

        <section className="flex h-auto w-auto items-center justify-start gap-4 rounded-xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105">
          <div className="flex items-center justify-center">
            <UserIcon />
          </div>
          <div>
            <h6 className="font-bold">Usuarios</h6>
            <p>Agrega nuevos usuarios al proceso.</p>
          </div>
        </section>

        <section className="flex h-auto w-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105">
          <div className="flex items-center justify-center">
            <PenEdit />
          </div>
          <div>
            <h6 className="font-bold">Roles</h6>
            <p>
              Administra los roles y asigna los respectivos permisos de acceso
              al sistema
            </p>
          </div>
        </section>

        <section className="flex h-auto w-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105">
          <div className="flex items-center justify-center">
            <CapIcon />
          </div>
          <div>
            <h6 className="font-bold">Postulantes</h6>
            <p>
              Visualiza el estado del proceso de los postulantes, además de
              acceder a información detallada de cada uno oferta
            </p>
          </div>
        </section>

        <section className="flex h-auto w-auto items-center justify-start gap-4 rounded-2xl bg-[#efefef] px-3 py-3 shadow-sm shadow-slate-300 transition-transform hover:scale-105">
          <div className="flex items-center justify-center">
            <Calendar />
          </div>
          <div>
            <h6 className="font-bold"> Cronograma</h6>
            <p>Subir Cronograma</p>
          </div>
        </section>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async () => {
  const callNumber = await getCallNumber();
  const candidateNumber = await getCallNumber();
  return {
    props: {
      callNumber,
      candidateNumber,
    },
  };
};
export default Home;
