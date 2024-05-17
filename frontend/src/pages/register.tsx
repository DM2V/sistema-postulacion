import GreenButton from "@/components/Buttons/GreenButton";
import ComboBox from "@/components/Form/ComboBox";
import InputLabel from "@/components/Form/InputLabel";
import Password from "@/components/Form/Password";
import { PERSONALDATA } from "@/routes/paths";
import { PostulationPeriod } from "@/types/offers";
import { getPostulationPeriods } from "@/utils/fetch_functions/periods";
import { pb } from "@/utils/pocketbase";
import { validateEcuadorianID, validateEmail, validatePassword } from "@/utils/validations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import signupImg from "../assets/images/signup.png";
import LayoutWithNavbarPublic from "../components/Layout/LayoutWithNavbarPublic";

function Register() {
  const idType = ["Cédula", "Pasaporte"];
  const [identificationNumber, setIdentificationNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<string>("");
  const [periods, setPeriods] = useState<PostulationPeriod[]>([]);
  const router = useRouter();


  const handleFormChange = (
    fieldName: string,
    value: string | string[] | File | null,
  ) => { };

  async function handleCreateUser() {
    console.log("first")

    const data = {
      "identificationNumber": identificationNumber.trim(),
      "email": email.trim().toLowerCase(),
      "emailVisibility": true,
      "password": password.trim(),
      "passwordConfirm": password.trim(),
      "role": role,
      "period": periods[0].id
    };

    const formData = new FormData()
    formData.append("identificationNumber", data.identificationNumber)
    formData.append("email", data.email)
    formData.append("emailVisibility", "" + data.emailVisibility)
    formData.append("password", data.password)
    formData.append("passwordConfirm", data.passwordConfirm)
    formData.append("role", data.role)
    formData.append("period", data.period)

    try {
      const record = await pb.collection('users').create(formData);
      const userId = record?.id;
      console.log(userId)
      router.push({
        pathname: PERSONALDATA,
        query: record?.id // Pasar el ID como un query parameter
      });
      console.log(userId);
      alert("Usuario creado correctamente")
    } catch (error) {
      alert("Error al crear el usuario")
    }
  }

  useEffect(() => {
    getPostulationPeriods(setPeriods);
  }, [])

  return (
    <LayoutWithNavbarPublic>
      <div className="md:bg container mx-auto mb-10 mt-2 w-full px-10 md:flex md:flex-row md:items-center lg:flex lg:flex-row lg:justify-center">
        <div className="z-10 my-5 flex w-full flex-col items-center justify-center rounded-3xl bg-gray-bg p-8 shadow-sm shadow-tp-disable-color md:m-5 md:-ml-1 md:w-96">
          <h4 className="pb-5 text-center text-2xl font-bold text-primary-color lg:text-h4">
            Registro de Postulante
          </h4>

          <div className="w-full text-sm lg:text-base">
            <ComboBox
              name={"id_type"}
              title={"Tipo de identificación:"}
              options={idType}
              onChange={() => {
                setRole("candidate")
                console.log("type id");
              }}

            />

            <InputLabel
              name={"id_number"}
              title={"Número de identificación:"}
              errorMessage={"El numero de identificación es necesario."}
              validationFunction={validateEcuadorianID}
              inputType="0"
              onChange={(name, value) => {
                setIdentificationNumber(value)
              }}
            />

            <InputLabel
              name="email"
              title="Correo electrónico:"
              errorMessage={"*Correo electrónico requerido."}
              validationFunction={validateEmail}
              inputType="0"
              onChange={(name, selected) => {
                setEmail(selected)
              }}
            />

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

            {/*             <div className="mb-5 w-[35rem] md:w-max">
              <div>Captcha</div>

              <CheckBox
                name="privacy_policy"
                options={["Acepto las Políticas de Privacidad*"]}
                selectedOptions={""}
                allowMultipleSelection={true}
                onChange={() => {
                  console.log("privacy policy");
                }}
              />
            </div> */}
          </div>

          <GreenButton onClick={handleCreateUser} content="Enviar" />
        </div>

        <div className="relative -ml-5 hidden h-96 w-96 md:block " dir="rtl">
          <div className="absolute bottom-0 left-0 h-full w-full rounded-s-3xl bg-gradient-to-t from-secondary-color from-20% via-transparent via-30% to-bg-disable to-100%  opacity-70 shadow-sm shadow-tp-disable-color"></div>
          <Image
            src={signupImg}
            alt="signup logo"
            className="h-full w-full rounded-s-3xl object-fill"
            priority={true}
          />
          <h6 className="absolute bottom-0 left-0 right-0 p-2 text-center font-bold text-white">
            Postúlate Universidad de las Fuerzas Armadas ESPE
          </h6>
        </div>
      </div>
    </LayoutWithNavbarPublic>
  );
}

export default Register;
