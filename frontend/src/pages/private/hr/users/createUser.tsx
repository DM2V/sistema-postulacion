/* eslint-disable react-hooks/rules-of-hooks */
import ComboBox from "@/components/Form/ComboBox";
import ComboBoxGeneric from "@/components/Form/ComboBoxGeneric";
import FileInput from "@/components/Form/FileLabel";
import InputLabel from "@/components/Form/InputLabel";
import Password from "@/components/Form/Password";
import LayoutWithSidebar from "@/components/Layout/LayoutWithSidebar";
import { USERSHR } from "@/routes/paths";
import { pb } from "@/utils/pocketbase";
import {
  validateEcuadorianID,
  validateEmail,
  validateNotEmpty,
  validatePassword,
} from "@/utils/validations";
import { useRouter } from "next/router";
import { useState } from "react";

const createUser = () => {
  const idType = ["Cédula", "Pasaporte"];
  const [identificationNumber, setIdentificationNumber] = useState<string>("");
  const [name, setName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<string>("");
  const [avatar, setAvatar] = useState<File>();
  const router = useRouter();

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

  async function handleCreateUser() {
    console.log("first")

    const data = {
      "identificationNumber": identificationNumber.trim(),
      "username": username.trim(),
      "email": email.trim(),
      "emailVisibility": true,
      "password": password.trim(),
      "passwordConfirm": password.trim(),
      "name": name.trim(),
      "role": role,
      "lastName": lastName.trim()
    };
    const formData = new FormData()
    formData.append("identificationNumber", data.identificationNumber)
    formData.append("username", data.username)
    formData.append("email", data.email)
    formData.append("emailVisibility", "" + data.emailVisibility)
    formData.append("password", data.password)
    formData.append("passwordConfirm", data.passwordConfirm)
    formData.append("name", data.name)
    formData.append("role", data.role)
    formData.append("lastName", data.lastName)
    formData.append("avatar", avatar as Blob)

    try {
      const record = await pb.collection('users').create(formData);
      router.push(USERSHR)
      console.log(record)
    } catch (error) {
      alert("Error al crear el usuario")
    }

  }

  return (
    <LayoutWithSidebar>
      <h2 className="p-3 text-center font-bold text-ter-color  lg:text-start">
        Crear Usuario
      </h2>

      <div className="pr-2 lg:w-5/6">
        <div
          className="mb-4 rounded-3xl bg-gray-bg p-3 shadow-md ml-5"
          style={{
            boxShadow:
              "15px -7px 0px -8px rgba(0, 74, 62, 0.05), 0px 4px 4px 0px rgba(0, 74, 62, 0.15), 0px -2px 4px 0px rgba(0, 74, 62, 0.15)",
          }}
        >
          <section>
            <div className="flex flex-wrap justify-center">
              <div className="flex w-full gap-5">
                <div className="w-1/3">
                  <ComboBox
                    name={"id_type"}
                    title={"Tipo de identificación:"}
                    options={idType}
                    onChange={() => {
                      console.log("type id");
                    }}
                  />
                </div>
                <div className="w-2/3">
                  <InputLabel
                    name={"id_number"}
                    title={"Número de identificación:"}
                    errorMessage={"El numero de identificación es necesario."}
                    validationFunction={validateEcuadorianID}
                    onChange={(name, value) => {
                      setIdentificationNumber(value)
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <InputLabel
                    name="name"
                    title="Nombre:"
                    errorMessage={"*Campo Requerido"}
                    validationFunction={validateNotEmpty}
                    onChange={(name, selected) => {
                      setName(selected)
                    }}
                    inputType="0"
                  />
                </div>
                <div className="w-1/2">
                  <InputLabel
                    name="lastName1"
                    title="Apellido:"
                    errorMessage={"*Campo Requerido"}
                    validationFunction={validateNotEmpty}
                    onChange={(name, selected) => {
                      setLastName(selected)
                    }}
                    inputType="0"
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="w-1/2">
                  <Password
                    name={"password"}
                    title={"Contraseña:"}
                    errorMessage={"*Campo Requerido"}
                    validationFunction={validatePassword}
                    onChange={handleFormChange}
                    helpMessage={""}
                    onPasswordChange={(name, value) => {
                      setPassword(value)
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <ComboBoxGeneric
                    name={"role"}
                    title={"Rol:"}
                    options={[
                      { label: "Evaluador", value: "evaluator" },
                      { label: "Administrador", value: "admin_hr" },
                    ]}
                    onChange={(name, selected) => {
                      setRole(selected.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <InputLabel
                  name="username"
                  title="Nombre de usuario:"
                  errorMessage={"*Campo Requerido"}
                  validationFunction={validateNotEmpty}
                  onChange={(name, selected) => {
                    setUsername(selected)
                  }}
                />
              </div>
              <div className="w-1/2 pl-3">
                <InputLabel
                  name="email"
                  title="Correo electrónico:"
                  errorMessage={"*Campo Requerido"}
                  validationFunction={validateEmail}
                  inputType="0"
                  onChange={(name, selected) => {
                    setEmail(selected)
                  }}
                />
              </div>
              <div className="w-full">
                <FileInput
                  name="avatar"
                  title="Avatar (en jpg): "
                  accept=".jpg"
                  onChange={(name, selected) => {
                    setAvatar(selected);
                  }}
                />

              </div>

              <button onClick={handleCreateUser} className="focus:shadow-outline hover:t rounded-2xl bg-state-press p-2 px-4 text-white transition-transform hover:scale-110 hover:bg-primary-color focus:outline-none md:mt-4">
                + Crear
              </button>

            </div>
          </section>
        </div>
      </div >
    </LayoutWithSidebar >
  );
};
export default createUser;
