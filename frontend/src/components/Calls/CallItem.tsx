import { DeleteIcon, Eye } from "@/assets/icons";
import { CONVOCATIONHRVIEW } from "@/routes/paths";
import { Call } from "@/types/convocatoria";
import Link from "next/link";
import React from "react";
import Modal from "react-modal";

function CallItem({ call, handleDelete, }: { call: Call; handleDelete: (id: string) => void; }) {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteCall() {
    try {
      handleDelete(call.id)
      closeModal();
    } catch (error) { }
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="flex items-center justify-between rounded-lg border-2 p-5 shadow-sm bg-white">

      <div className="flex items-end">
        <div className="flex flex-col text-sm">

          <p className="text-gray-600 font-medium">{call.expand?.period?.name}</p>
          <p className="flex flex-row items-center justify-start space-x-2 gap-2 leading-6 text-tp-heading-color">
            <b>Sede:</b> {call.expand?.site?.name}
          </p>
          <p>
            <b>Departamento:</b> {call.expand?.department?.name}
          </p>
          <p>
            <b>Creada el:</b> {call.created.slice(0, 10)}
          </p>

          <div className="flex flex-row gap-4 mt-2 justify-between">
            <div className="flex justify-center items-center gap-1 hover:scale-110 transition-all transform">
              <Eye />
              <p className="text-primary-color font-semibold">
                <Link href={`${CONVOCATIONHRVIEW}/${call.id}`}>Ver</Link>
              </p>
            </div>
            <button className="text-fill-error font-bold hover:scale-110 transition-all transform" onClick={openModal}><DeleteIcon color="red"/></button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>¿Seguro deseas eliminar la convocatoria?</h3>
        <p className="my-3">
          Esto eliminará la convocatoria permanentemente y será irreversible
        </p>
        <div className="flex w-full justify-end gap-3">
          <button
            onClick={closeModal}
            className="rounded-lg border-2 border-black px-5 py-1 font-bold transition-all hover:bg-black hover:text-white"
          >
            Cancelar
          </button>
          <button
            onClick={deleteCall}
            className="rounded-lg bg-red-600 px-5 py-1 font-bold text-white transition-all hover:bg-red-800"
          >
            Eliminar
          </button>
        </div>
      </Modal>

    </div>
  );
}

export default CallItem;
