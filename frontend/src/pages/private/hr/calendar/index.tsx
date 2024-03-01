import GreenButton from "@/components/Buttons/GreenButton";
import CalendarItem from "@/components/Calendar/CalendarItem";
import FileInput from "@/components/Form/FileLabel";
import InputLabel from "@/components/Form/InputLabel";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { getCalendars } from "@/utils/fetch_functions/calendar";
import { pb } from "@/utils/pocketbase";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export type Calendar = {
  id: string;
  title: string;
  document: string;
};
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

function CalendarHome() {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [createCalendarModalOpen, setCreateCalendarModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [documentFile, setDocumentFile] = useState<File | undefined>();

  function openModal() {
    setCreateCalendarModalOpen(true);
    setTitle("");
    setDocumentFile(undefined);
  }

  async function closeModal() {
    setCreateCalendarModalOpen(false);

    if (documentFile === undefined || title.trim() === "") {
      return
    }

    const formData = new FormData();
    formData.append("document", documentFile as Blob);
    formData.append("title", title);

    try {
      const record = await pb.collection('Calendar').create(formData);
      getCalendars(setCalendars)
    } catch (error) {

    }

  }

  useEffect(() => {
    getCalendars(setCalendars);
  }, []);

  return (
    <LayoutWithSidebar>

      <div className="flex flex-row items-center justify-between mx-5">
        <h3 className="my-5 ml-5 text-center font-bold text-ter-color lg:text-start">
          Cronogramas
        </h3>
        <section className="mt-4 flex w-auto text-sm">
          <button
            className="mx-5 flex transform items-center gap-2 rounded-xl border
            border-primary-color bg-primary-color px-3 py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color" onClick={openModal}>
            Subir nuevo documento
          </button>
        </section>
      </div>

      <div className="bg-[#f3f3f3] h-screen">
        <div className="py-3 mx-10 grid grid-cols-3 gap-3">
          {calendars.map((c) => (
            // eslint-disable-next-line react/jsx-key
            <CalendarItem calendar={c} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={createCalendarModalOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <h3>Subir nuevo documento</h3>
        <InputLabel
          name="title"
          title="Titulo"
          onChange={(name, selected) => {
            setTitle(selected);
          }}
        />
        <FileInput
          accept=".pdf"
          name="document"
          title="Documento"
          onChange={(name, selected) => {
            setDocumentFile(selected);
          }}
        />
        <div className="flex w-full justify-end">
          <GreenButton onClick={closeModal} content="Subir" />
        </div>
      </Modal>
    </LayoutWithSidebar>
  );
}

export default CalendarHome;
