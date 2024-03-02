import React, { FormEvent, ReactElement, useState } from "react";
import GreenButton from "../Buttons/GreenButton";
import { CaratIcon } from "@/assets/icons";
import CRUDTable from "./CRUDTable";
import { HeaderTable } from "@/types/components/types.t";
import Modal from "react-modal";
import { Modal as ModalIcon } from "@/assets/icons";
import { useRouter } from "next/router";

type CRUDSectionProps<T> = {
  elements: T[];
  headers: HeaderTable[];
  title: string;
  description: string;
  addForm: ReactElement;
  fetchElements: () => void;
  editForm?: ReactElement;
  deleteForm?: ReactElement;
  createElement: (fd: FormData) => void;
  editElement: (fd: FormData, elementId: string) => void;
  deleteElement: (elementId: string) => void;
};

function CRUDSection<T extends Record<string, any>>({
  elements,
  headers,
  title,
  description,
  addForm,
  editForm,
  deleteForm,
  fetchElements,
  createElement,
  editElement,
  deleteElement,
}: CRUDSectionProps<T>) {
  const [isListShown, setIsListShown] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<T | null>(null);

  function openAddModal() {
    setIsAddModalOpen(true);
  }

  function closeAddModal() {
    setIsAddModalOpen(false);
  }

  function openDeleteModal(element: T) {
    setSelectedElement(element);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedElement(null);
  }

  function openUpdateModal(element: T) {
    setIsUpdateModalOpen(true);
    setSelectedElement(element);
  }

  function closeUpdateModal() {
    setIsUpdateModalOpen(false);
    setSelectedElement(null);
  }

  async function addSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createElement(formData);
      fetchElements();
    } catch (error) {
      console.error("Error creating element:", error);
    }
    closeAddModal();
  }

  async function updateSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!selectedElement) {
      return;
    }
    try {
      await editElement(formData, selectedElement.id);
      fetchElements();
    } catch (error) {
      console.error("Error updating element:", error);
    }
    closeUpdateModal();
  }

  async function deleteSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedElement) {
      return;
    }
    try {
      await deleteElement(selectedElement.id);
      fetchElements();
    } catch (error) {
      console.error("Error deleting element:", error);
    }
    closeDeleteModal();
  }

  return (
    <div className="flex flex-col px-5">
      <div className="w-fill flex flex-row items-center justify-between">
        <h2 className="text-h4 font-bold text-primary-color">{title}</h2>
        <div className="flex items-center ">
          <GreenButton content="+ Añadir" onClick={openAddModal} />
          <button
            onClick={() => setIsListShown((oldState) => !oldState)}
            className={isListShown ? "rotate-up" : "rotate-down"}
          >
            <CaratIcon />
          </button>
        </div>
      </div>
      {isListShown && (
        <>
          <hr className="my-3 border-2" />
          <CRUDTable
            headers={headers}
            elements={elements}
            openDeleteModal={openDeleteModal}
            openEditModal={openUpdateModal}
          />
          <Modal
            isOpen={isAddModalOpen}
            onRequestClose={closeAddModal}
            className="h-auto w-1/2 rounded-md border-2 bg-gray-bg p-2 shadow-md"
            style={{
              overlay: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <div className="relative flex w-full flex-col items-center justify-center text-center ">
              <h1 className="text text-center uppercase">{title}</h1>
              <p>{description}</p>
              <button
                onClick={closeAddModal}
                className="absolute right-0 top-0 text-h5"
              >
                <ModalIcon />
              </button>
            </div>
            <form onSubmit={addSubmit} className="">
              <div className="my-5 flex flex-wrap border-2 bg-white px-2 py-5">
                {addForm}
              </div>
              <div className="flex w-full items-end justify-end space-x-2">
                <button
                  type="submit"
                  className="rounded-lg bg-primary-color px-5 py-2 font-medium text-white"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-fill-error px-5 py-2 font-medium text-white"
                  onClick={closeAddModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>
        </>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="h-auto w-1/2 rounded-md border-2 bg-gray-bg p-2 shadow-md"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <form onSubmit={deleteSubmit} className="">
          <div className="my-5 bg-white px-2 py-5 text-center">
          <h1 className="text-lg text-center">¿Estás seguro de que quieres eliminar este elemento?</h1>
            {deleteForm}
          </div>
          <div className="flex w-full items-end justify-center space-x-2">
            <button
              type="submit"
              className="rounded-lg bg-primary-color px-5 py-2 font-medium text-white"
            >
              Aceptar
            </button>
            <button
              type="button"
              className="rounded-lg bg-fill-error px-5 py-2 font-medium text-white"
              onClick={closeDeleteModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
      <div className="flex  items-center justify-center">
        <Modal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          className="h-auto w-1/2 rounded-md border-2 bg-gray-bg p-2 shadow-md"
          style={{
            overlay: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <div className="relative flex w-full flex-col items-center justify-center text-center ">
            <h1 className="text text-center uppercase">{title}</h1>
            <p>{description}</p>
            <button
              onClick={closeUpdateModal}
              className="absolute right-0 top-0 text-h5"
            >
              <ModalIcon />
            </button>
          </div>
          <form onSubmit={updateSubmit} className="">
            <div className="my-5 flex flex-wrap border-2 bg-white px-2 py-5">
              {editForm && React.cloneElement(editForm, { selectedElement })}
            </div>
            <div className="flex w-full items-end justify-end space-x-2">
              <button
                type="submit"
                className="rounded-lg bg-primary-color px-5 py-2 font-medium text-white"
              >
                Guardar
              </button>
              <button
                type="button"
                className="rounded-lg bg-fill-error px-5 py-2 font-medium text-white"
                onClick={closeUpdateModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default CRUDSection;