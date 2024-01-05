import ComboBox from "@/components/Form/ComboBox";
import InputLabel from "@/components/Form/InputLabel";
import Password from "@/components/Form/Password";
import {
  validateEcuadorianID,
  validateNotEmpty,
  validatePassword,
} from "@/utils/validations";
import Link from "next/link";

const createUser = () => {
  const idType = ["Cédula", "Pasaporte"];

  const handleFormChange = (
    fieldName: string,
    value: string | string[] | File | null,
  ) => {
    /* if (fieldName === "specialCapacity") {
      setSpecialCapacityVisible(value === "Si");
      if (value === "No") {
        setSpecialCapacityVisible(false);
      } else {
        setSpecialCapacityVisible(true);
      }
    }

    if (fieldName === "catastrophicDisease") {
      setDiseaseVisible(value === "Si");

      if (value === "No") {
        setDiseaseVisible(false);
      } else {
        setDiseaseVisible(true);
      }
    }

    if (fieldName === "nationality") {
      setResidenceYearsVisible(value === "Ecuatoriano");
      if (value !== "Ecuatoriano") {
        setResidenceYearsVisible(true);
      } else {
        setResidenceYearsVisible(false);
      }
    }

    if (Array.isArray(value)) {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [fieldName]: value[0],
      }));
    } else {
      setFormState((prevFormState) => ({
        ...prevFormState,
        [fieldName]: value,
      }));
    } */
  };

  return (
    <>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Crear Usuario
      </h2>

      <div className="pr-2 lg:w-5/6">
        <div
          className="mb-4 rounded-r-3xl bg-gray-bg p-3 shadow-md"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <h5 className="py-3 text-start font-bold text-ter-color">
            Evaluador
          </h5>
          <section>
            <div className="md:grid md:grid-cols-3 md:gap-4">
              <ComboBox
                name={"id_type"}
                title={"Tipo de identificación:"}
                options={idType}
                onChange={() => {
                  console.log("type id");
                }}
              />

              <InputLabel
                name={"id_number"}
                title={"Número de identificación:"}
                errorMessage={"El numero de identificación es necesario."}
                validationFunction={validateEcuadorianID}
              />

              <InputLabel
                name="name"
                title="Nombre:"
                errorMessage={"*Campo Requerido"}
                validationFunction={validateNotEmpty}
                onChange={handleFormChange}
              />

              <InputLabel
                name="lastName1"
                title="Apellido:"
                errorMessage={"*Campo Requerido"}
                validationFunction={validateNotEmpty}
                onChange={handleFormChange}
              />

              <Password
                name={"password"}
                title={"Contraseña:"}
                errorMessage={"*Campo Requerido"}
                validationFunction={validatePassword}
                onChange={handleFormChange}
                helpMessage={""}
                onPasswordChange={handleFormChange}
              />

              <Link href="" className=" flex items-center justify-start">
                <button className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 px-4 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none md:mt-4">
                  + Crear
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default createUser;
