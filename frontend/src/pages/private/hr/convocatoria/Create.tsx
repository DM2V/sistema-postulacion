import GreenButton from "@/components/Buttons/GreenButton";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import DateInput from "@/components/Form/DateInput";
import FileInput from "@/components/Form/FileLabel";
import InputLabel from "@/components/Form/InputLabel";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { CONVOCATIONHR } from "@/routes/paths";
import { Department, Offer, PostulationPeriod, Site } from "@/types/offers";
import { getDepartments } from "@/utils/fetch_functions/departments";
import { getOffers } from "@/utils/fetch_functions/offer";
import { getPostulationPeriods } from "@/utils/fetch_functions/periods";
import { getSites } from "@/utils/fetch_functions/sites";
import { pb } from "@/utils/pocketbase";
import { validateNotEmpty } from "@/utils/validations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";

type CallData = {
  offersSelected: Offer[];
  applicationPeriod: string | undefined;
  department: string | undefined;
  campus: string | undefined;
  calendar: CalendarPhaseCreate[];
};

type CalendarPhaseCreate = {
  activity: string;
  start: string;
  end: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "70vw",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CreateCall = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [periods, setPeriods] = useState<PostulationPeriod[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedOfferToAdd, setSelectedOfferToAdd] = useState<
    string | undefined
  >();
  const [selectedData, setSelectedData] = useState<CallData>({
    applicationPeriod: undefined,
    department: undefined,
    campus: undefined,
    calendar: [],
    offersSelected: [],
  });
  const [file, setFile] = useState<File | undefined>();
  const [selectedCalendar, setSelectedCalendar] = useState<CalendarPhaseCreate>(
    { activity: "", end: "", start: "" },
  );

  const headerName = [
    "Vacantes",
    "Horas",
    "Sedes",
    "Departamento",
    "Campo Amplio",
    "Campo Específico",
    "Tipo Personal Académico",
  ];
  const headerNameCalendar = ["Actividad", "Inicio", "Fin"];

  function openOfferModal() {
    setIsOfferModalOpen(true);
    setSelectedOfferToAdd(undefined);
  }

  function openCalendarModal() {
    setIsCalendarModalOpen(true);
    setSelectedCalendar({ activity: "", end: "", start: "" });
  }

  function removeOffer(offerId: string) {
    const filtered = selectedData.offersSelected.filter(
      (s) => s.id !== offerId,
    );
    setSelectedData({ ...selectedData, offersSelected: filtered });
  }

  function removeCalendar(calendar: CalendarPhaseCreate) {
    setSelectedData({
      ...selectedData,
      calendar: selectedData.calendar.filter(
        (c) =>
          c.activity !== calendar.activity &&
          c.end !== calendar.end &&
          c.start !== calendar.start,
      ),
    });
  }

  function closeCalendarModal() {
    setIsCalendarModalOpen(false);

    if (selectedCalendar === undefined) {
      return;
    }
    const isAlreadySelected =
      selectedData.calendar.find(
        (c) =>
          c.activity === selectedCalendar.activity &&
          c.end === selectedCalendar.end &&
          c.start === selectedCalendar.start,
      ) !== undefined;

    if (isAlreadySelected) {
      return;
    }

    setSelectedData({
      ...selectedData,
      calendar: [...selectedData.calendar, selectedCalendar].sort((a, b) => {
        // Convert start dates to Date objects for comparison
        const startDateA = new Date(a.start);
        const startDateB = new Date(b.start);
        // Compare the start dates
        return startDateA.getTime() - startDateB.getTime();
      }),
    });
  }
  async function handleCreate() {
    pb.autoCancellation(false);
    let calendarCreated: string[] = [];
    for (const c of selectedData.calendar) {
      const record = await pb.collection("CalendarPhase").create(c);
      calendarCreated.push(record.id);
    }
    pb.autoCancellation(true);

    const data = {
      period: selectedData.applicationPeriod,
      department: selectedData.department,
      site: selectedData.campus,
      calendarPhases: calendarCreated, 
      offers: selectedData.offersSelected.map((ofs) => ofs.id)
    };

    const formData = new FormData();
    formData.append("period", data.period!.toString());
    formData.append("department", data.department!.toString());
    formData.append("site", data.site!.toString());
    for(const cp of data.calendarPhases){
      formData.append("calendarPhases", cp);
    }
    for(const offer of data.offers){
      formData.append("offers", offer);
    }
    formData.append("rules", file as Blob);
    console.log(formData.entries);
    try {
      const record = await pb.collection("Call").create(formData);
      router.push(CONVOCATIONHR);
    } catch (error) {
      alert("Error al crear convocatoria");
    }
  }

  function closeOfferModal() {
    setIsOfferModalOpen(false);
    if (selectedOfferToAdd === undefined) {
      return;
    }

    const offerData = offers.find((offer) => offer.id === selectedOfferToAdd);
    if (!offerData) {
      return;
    }

    const isAlreadySelected =
      selectedData.offersSelected.find(
        (offer) => offer.id === selectedOfferToAdd,
      ) !== undefined;

    if (isAlreadySelected) {
      return;
    }

    setSelectedData({
      ...selectedData,
      offersSelected: [...selectedData.offersSelected, offerData],
    });
  }

  useEffect(() => {
    getOffers(setOffers);
    getPostulationPeriods(setPeriods);
    getDepartments(setDepartments);
    getSites(setSites);
  }, []);
  const router = useRouter();

  return (
    <LayoutWithSidebar>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Convocatoria
      </h2>
      <div className="pr-2 lg:w-5/6">
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <div className="text-sm md:grid md:grid-cols-3 md:gap-3 lg:text-base">
            <section>
              <ComboBoxGeneric
                name={"applicationPeriod"}
                title={"Periodo de Postulación"}
                options={periods.map((period) => {
                  return { label: period.name, value: period.id };
                })}
                onChange={(name, selectedOption) => {
                  selectedData["applicationPeriod"] = selectedOption.value;
                }}
              />
            </section>

            <section>
              <ComboBoxGeneric
                name={"department"}
                title={"Departamento"}
                options={departments.map((d) => {
                  return { label: d.name, value: d.id };
                })}
                onChange={(name, selectedOption) => {
                  selectedData["department"] = selectedOption.value;
                }}
              />
            </section>

            <section>
              <ComboBoxGeneric
                name={"campus"}
                title={"Sede:"}
                options={sites.map((s) => {
                  return { label: s.name, value: s.id };
                })}
                onChange={(name, selectedOption) => {
                  selectedData["campus"] = selectedOption.value;
                }}
              />
            </section>
          </div>

          <section>
            <FileInput
              name={"specificField"}
              title="Bases del concurso"
              onChange={(name, selectedFile) => {
                setFile(selectedFile);
              }}
              accept=".pdf"
              placeholder="Subir Bases del Concurso"
              validationFunction={validateNotEmpty}
            />
          </section>

          <div className="my-4 flex items-center justify-between text-xs">
            <p className="py-3 text-h6 font-bold text-state-press md:text-2xl">
              Fases de la oferta (Cronograma)
            </p>
            <button
              type="button"
              onClick={openCalendarModal}
              className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none"
            >
              +Agregar
            </button>
          </div>

          <div className="my-3 h-auto md:h-auto lg:mx-3 lg:h-auto">
            <div className="max-h-[calc(40vh)] md:max-h-[calc(70vh)] lg:max-h-[calc(90vh)]">
              <table className="w-full overflow-x-scroll rounded-lg border border-gray-300 bg-white">
                {selectedData.calendar.length > 0 && (
                  <thead className="sticky top-0 bg-gray-200">
                    <tr className="sm:table-row">
                      {headerNameCalendar
                        .filter((header) => header !== "id")
                        .map((header) => (
                          <th
                            key={header}
                            className="border-b px-4 py-2 md:table-cell lg:table-cell"
                          >
                            {header.charAt(0).toUpperCase() + header.slice(1)}
                          </th>
                        ))}
                      <th className="border-b px-4 py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {selectedData.calendar && selectedData.calendar.length > 0
                    ? selectedData.calendar.map((calendar) => (
                        <tr
                          key={`${calendar.activity}-${calendar.end}-${calendar.start}`}
                          className="sm:table-row"
                        >
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {calendar.activity}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {calendar.start}
                          </td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            {calendar.end}
                          </td>

                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            <button
                              type="button"
                              onClick={() => removeCalendar(calendar)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla de ofertas */}
          <div className="my-4 flex items-center justify-between text-xs">
            <p className="py-3 text-h6 font-bold text-state-press md:text-2xl">
              Ofertas
            </p>
            <button
              type="button"
              onClick={openOfferModal}
              className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none"
            >
              +Agregar
            </button>
          </div>
          <div className="max-h-[350px] overflow-x-auto text-start text-sm md:text-center md:text-base">
            <div className="max-h-[calc(40vh)] md:max-h-[calc(70vh)] lg:max-h-[calc(90vh)]">
              <table className="w-full overflow-x-scroll rounded-lg border border-gray-300 bg-white">
                {offers.length > 0 && (
                  <thead className="sticky top-0 bg-gray-200">
                    <tr className="sm:table-row">
                      {headerName
                        .filter((header) => header !== "id")
                        .map((header) => (
                          <th
                            key={header}
                            className="border-b px-4 py-2 md:table-cell lg:table-cell"
                          >
                            {header.charAt(0).toUpperCase() + header.slice(1)}
                          </th>
                        ))}
                      <th className="border-b px-4 py-2 md:table-cell lg:table-cell">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                )}
                <tbody>
                  {selectedData.offersSelected &&
                  selectedData.offersSelected.length > 0
                    ? selectedData.offersSelected.map((offer) => (
                        <tr key={offer.id} className="sm:table-row">
                          <td>{offer.openings}</td>
                          <td>{offer.hours}</td>
                          <td>{offer.expand?.site?.name}</td>
                          <td>{offer.expand?.department?.name}</td>
                          <td>{offer.expand?.wideField?.name}</td>
                          <td>{offer.expand?.specificField?.name}</td>
                          <td>{offer.expand?.academicStaff?.name}</td>
                          <td className="border-b px-4 py-2 md:table-cell lg:table-cell">
                            <button
                              type="button"
                              onClick={() => removeOffer(offer.id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <GreenButton onClick={handleCreate} content="Crear Convocatoria" />
          </div>
        </div>

        <Modal
          isOpen={isOfferModalOpen}
          onRequestClose={closeOfferModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3 className="mb-2">Agregar oferta a convocatoria</h3>
          <p className="mb-5">
            Selecciona una oferta para agregarla a esta convocatoria
          </p>
          <ComboBoxGeneric
            name={"selecteOfferAdd"}
            title={"Oferta:"}
            options={offers.map((s) => {
              return {
                label: `${s.expand?.site?.name} - ${s.expand?.department?.name} - ${s.expand?.contractType?.name} - ${s.expand?.academicStaff?.name} - Vacantes: ${s.openings} - Horas: ${s.hours} - Periodo: ${s.expand?.period?.name}`,
                value: s.id,
              };
            })}
            onChange={(name, selectedOption) => {
              setSelectedOfferToAdd(selectedOption.value);
            }}
          />
          <div className="flex w-full justify-end">
            <GreenButton onClick={closeOfferModal} content="Agregar" />
          </div>
        </Modal>

        <Modal
          isOpen={isCalendarModalOpen}
          onRequestClose={closeCalendarModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3 className="mb-2">Agregar fase de calendario</h3>
          <p className="mb-5">
            Llena estos datos para agregar una nueva fase al calendario
          </p>

          <InputLabel
            name="activity"
            title="Actividad: "
            onChange={(name, selected) => {
              setSelectedCalendar({ ...selectedCalendar, activity: selected });
            }}
          />
          <DateInput
            name="start"
            title="Inicio: "
            onChange={(name, selected) => {
              setSelectedCalendar({
                ...selectedCalendar,
                start: selected.toISOString().slice(0, 10),
              });
            }}
          />
          <DateInput
            name="end"
            title="Final: "
            onChange={(name, selected) => {
              setSelectedCalendar({
                ...selectedCalendar,
                end: selected.toISOString().slice(0, 10),
              });
            }}
          />

          <div className="flex w-full justify-end">
            <GreenButton onClick={closeCalendarModal} content="Agregar" />
          </div>
        </Modal>
      </div>
    </LayoutWithSidebar>
  );
};

export default CreateCall;
