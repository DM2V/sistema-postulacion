import GreenButton from "@/components/Buttons/GreenButton";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import DateInput from "@/components/Form/DateInput";
import InputLabel from "@/components/Form/InputLabel";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { OFFERSHR } from "@/routes/paths";
import { AcademicStaff, Activity, ContractualType, Department, PostulationPeriod, Site, SpecificField, WideField } from "@/types/offers";
import { getAcademicStaff } from "@/utils/fetch_functions/academicStaff";
import { getActivities } from "@/utils/fetch_functions/activities";
import { getContractualTypes } from "@/utils/fetch_functions/contractualTypes";
import { getDepartments } from "@/utils/fetch_functions/departments";
import { getPostulationPeriods } from "@/utils/fetch_functions/periods";
import { getSites } from "@/utils/fetch_functions/sites";
import { getSpecificField } from "@/utils/fetch_functions/specificField";
import { getWideField } from "@/utils/fetch_functions/wideField";
import { pb } from "@/utils/pocketbase";
import { validateNotEmpty } from "@/utils/validations";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export const Offer = () => {
  const [periods, setPeriods] = useState<PostulationPeriod[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [sites, setSites] = useState<Site[]>([])
  const [academicStaff, setAcademicStaff] = useState<AcademicStaff[]>([]);
  const [wideField, setWideField] = useState<WideField[]>([]);
  const [specificField, setSpecificField] = useState<SpecificField[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [contractualTypes, setContractualTypes] = useState<ContractualType[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<string | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
  const [selectedSite, setSelectedSite] = useState<string | undefined>();
  const [selectedContractualType, setSelectedContractualType] = useState<string | undefined>();
  const [selectedAcademicStaff, setSelectedAcademicStaff] = useState<string | undefined>();
  const [selectedWideField, setSelectedWideField] = useState<string | undefined>();
  const [selectedSpecificField, setSelectedSpecificField] = useState<string | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [openings, setOpenings] = useState<number | undefined>();
  const [hours, setHours] = useState<number | undefined>();
  const [compensation, setCompensation] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  // globally disable auto cancellation
  pb.autoCancellation(false);

  useEffect(() => {
    getPostulationPeriods(setPeriods);
    getDepartments(setDepartments);
    getSites(setSites);
    getContractualTypes(setContractualTypes);
    getAcademicStaff(setAcademicStaff);
    getWideField(setWideField);
    getSpecificField(setSpecificField);
    getActivities(setActivity);
  }, [])


  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const offerData = {
      "period": selectedPeriod,
      "contractType": selectedContractualType,
      "wideField": selectedWideField,
      "specificField": selectedSpecificField,
      "site": selectedSite,
      "department": selectedDepartment,
      "academicStaff": selectedAcademicStaff,
      "activity": selectedActivity,
      "startDate": startDate,
      "endDate": endDate,
      "openings": openings,
      "hours": hours,
      "compensation": compensation
    }

    pb.collection('Offer').create(offerData).then((_data) => {
      router.push(OFFERSHR);
    })
  }

  return (
    <LayoutWithSidebar>
      <div className="flex flex-row items-center justify-between mx-5">
        <h3 className="font-bold text-ter-color my-5 ml-5">Crear Oferta</h3>
      </div>

      <form onSubmit={handleSubmit} className="pr-2 lg:w-5/6 text-sm px-10">
        <div
          className="mb-4 rounded-3xl bg-gray-bg p-3 shadow-md "
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <div className="md:grid md:grid-cols-3 md:gap-x-4">
            {/* Periodo de aplicacion */}
            <section>
              <ComboBoxGeneric
                name={"applicationPeriod"}
                title={"Periodo de Postulación"}
                options={periods.map((period) => { return { label: period.name, value: period.id } })}
                onChange={(name, selectedOption) => {
                  setSelectedPeriod(selectedOption.value);
                }}
              />
            </section>

            {/* Departamento */}
            <section>
              <ComboBoxGeneric
                name={"department"}
                title={"Departamento"}
                options={departments.map((d) => { return { label: d.name, value: d.id } })}
                onChange={(name, selectedOption) => {
                  setSelectedDepartment(selectedOption.value);
                }}
              />
            </section>

            {/* Sede */}
            <section>
              <ComboBoxGeneric
                name={"campus"}
                title={"Sede"}
                options={sites.map((s) => { return { label: s.name, value: s.id } })}
                onChange={(name, selectedOption) => {
                  setSelectedSite(selectedOption.value);
                }}
              />
            </section>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            {/* Tipo de contratacion */}
            <section>
              <ComboBoxGeneric
                name={"typeOfHiring"}
                title={"Tipo de contratación"}
                options={contractualTypes.map((s) => { return { label: s.name, value: s.id } })}
                onChange={(name, selectedOption) => {
                  setSelectedContractualType(selectedOption.value);
                }}
              />
            </section>

            {/* Personal Academico */}
            <section>
              <ComboBoxGeneric
                name={"academicStaff"}
                title={"Personal Académico"}
                options={academicStaff.map((s) => { return { label: s.name, value: s.id } })}
                onChange={(name, selectedOption) => {
                  setSelectedAcademicStaff(selectedOption.value);
                }}
              />
            </section>
          </div>

          {/* Campo amplio */}
          <section>
            <ComboBoxGeneric
              name={"wideField"}
              title={"Campo Amplio"}
              options={wideField.map((s) => { return { label: s.name, value: s.id } })}
              onChange={(name, selectedOption) => {
                setSelectedWideField(selectedOption.value);
              }}
            />
          </section>

          {/* Campo especifico */}
          <section>
            <ComboBoxGeneric
              name={"specificField"}
              title={"Campo Específico"}
              options={specificField.map((s) => { return { label: s.name, value: s.id } })}
              onChange={(name, selectedOption) => {
                setSelectedSpecificField(selectedOption.value);
              }}
            />
          </section>

          <div className="md:grid md:grid-cols-3 md:gap-x-4">
            {/* Actividad */}
            <section>
              <ComboBoxGeneric
                name={"activity"}
                title={"Actividad"}
                options={activity.map((s) => { return { label: s.name, value: s.id } })}
                onChange={(name, selectedOption) => {
                  setSelectedActivity(selectedOption.value);
                }}
              />
            </section>

            {/* Fecha de Inicio */}
            <section>
              <DateInput
                name={"startDate"}
                title={"Fecha de Inicio"}
                onChange={(name, selectedOption) => {
                  selectedOption.setSeconds(30);
                  setStartDate(selectedOption.toISOString());
                }}
              />
            </section>

            {/* Fecha de fin */}
            <section>
              <DateInput
                name={"endDate"}
                title={"Fecha de Fin"}
                onChange={(name, selectedOption) => {
                  selectedOption.setSeconds(30);
                  setEndDate(selectedOption.toISOString());
                }}
              />
            </section>

            {/* Vacantes */}
            <section>
              <InputLabel
                name={"vacancies"}
                title={"Vacantes"}
                placeholder="Ejm: 2"
                onChange={(name, selectedOption) => {
                  setOpenings(parseInt(selectedOption))
                }}
                validationFunction={validateNotEmpty}
              />
            </section>

            {/* Horas */}
            <section>
              <InputLabel
                name={"hours"}
                title={"Horas"}
                placeholder="Ejm: 40"
                onChange={(name, selectedOption) => {
                  setHours(parseInt(selectedOption))
                }}
                validationFunction={validateNotEmpty}
              />
            </section>

            {/* Remuneración */}
            <section>
              <InputLabel
                name={"remuneration"}
                title="Remuneración:"
                onChange={(name, selectedOption) => {
                  setCompensation(parseFloat(selectedOption))
                }}
                placeholder="Ejm: $2000"
                validationFunction={validateNotEmpty}
              />
            </section>
          </div>
        </div>

        <div className="mb-3 mt-5 flex justify-center">
          <GreenButton disabled={loading} content="Crear Oferta" />
        </div>
      </form>
    </LayoutWithSidebar>
  );
};

export default Offer;
