import { SignupIcon } from "@/assets/icons";
import LoginImg from "@/assets/images/login.jpg";
import GreenButton from "@/components/Buttons/GreenButton";
import InputLabel from "@/components/Form/InputLabel";
import Password from "@/components/Form/Password";
import Footer from "@/components/Layout/Footer";
import LayoutWithNavbarPublic from "@/components/Layout/LayoutWithNavbarPublic";
import { CANDIDATEPANEL, EVALUATORHOME, HOMEHR, REGISTER, } from "@/routes/paths";
import { User } from "@/types/user";
import { pb } from "@/utils/pocketbase";
import { validateEmail, validatePassword } from "@/utils/validations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";


function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return;
    }

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword<User>(email, password);
      const role = authData.record.role;

      switch (role) {
        case "candidate":
          router.push(CANDIDATEPANEL);
          
          break;
        case "admin_hr":
          router.push(HOMEHR);
          break;
        case "evaluator":
          router.push(EVALUATORHOME);
          break;
        default:
          break;
      }
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrectos');

      console.log(error);
    } finally {
      
      setLoading(false);
    }
  }

  return (

    <LayoutWithNavbarPublic>
      <div className="lg: mx-5 flex-col md:flex md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src={LoginImg}
            alt="login-logo"
            className="mt-1 hidden h-96 w-full md:block lg:h-[505px] lg:pl-14"
            width={500}
            height={384}
            priority={true}
          />
        </div>
        <div className="md:w-1/2 lg:mt-4 lg:px-16">
          <p className="m-4 text-center text-tp-disable-color md:text-sm lg:text-base">
            Bienvenido(a) al portal de selección de personal académico, por favor ingrese sus
            datos.
          </p>
                {errorMessage && (
        <div className="text-red-500 m-4 text-center  md:text-sm lg:text-base ">
          {errorMessage}
        </div>
)}
          <form
            className="m-2 mx-auto md:w-3/4 md:text-sm lg:text-base"
            onSubmit={handleSubmit}
          >
            <InputLabel
              name={"email"}
              title="Correo Electrónico:"
              errorMessage={"*Campo Requerido"}
              validationFunction={validateEmail}
              inputType="0"
            />
            <Password
              name={"password"}
              title={"Contraseña:"}
              errorMessage={"*Campo Requerido"}
              validationFunction={validatePassword}
              helpMessage={""}
            />

            <GreenButton disabled={loading} content="Ingresar" />

          </form>

          <div className="m-4 text-center text-sm font-medium text-tp-disable-color lg:text-base">
            <div>
              ¿No recuerdas tu contraseña{" "}
              <b className="text-state-hover">Recuperar Contraseña</b>
            </div>
            <div>
              ¿Tienes problemas?{" "}
              <b className="text-state-hover">Contacta al administrador</b>
            </div>
          </div>

          <div className="m-4 mx-auto w-full rounded-2xl bg-bg-disable p-3 text-center text-sm md:w-3/4 lg:text-base">
            <div>¿No tienes usuario y clave para ingresar?</div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <SignupIcon />
              <Link href={REGISTER}>
                <div className="hover:text-primary-hover font-bold text-primary-color transition-transform hover:scale-110">
                  Regístrate aquí
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 rounded-2xl bg-state-hover px-5 py-2 text-sm text-white lg:h-max lg:w-auto lg:px-10 lg:py-2 lg:text-base">
        <h5 className="mb-2 text-center text-2xl font-bold md:text-h5">
          Información Importante
        </h5>
        <ol className="list-decimal pl-3">
          <li>
            Los/las aspirantes podrán postular a{" "}
            <strong>una sola vacante</strong> de la convocatoria.
          </li>
          <li>
            El proceso de postulación será <strong>gratuito</strong>.
          </li>
          <li>
            Los/las postulantes podrán realizar su registro solo durante la fase
            de postulaciones.
          </li>
          <li>
            Una vez culminada la aplicación a la vacante, la o el participante
            no podrá modificar el registro para el puesto que ha postulado.
          </li>
          <li>
            El concurso se ejecutará en dos fases:
            <ol type="a" className="list-disc pl-4">
              <li>
                La fase de <strong>méritos</strong> (cuya calificación vale
                <strong>60%</strong> sobre la puntuación total del concurso).
              </li>
              <li>
                La fase de <strong>oposición</strong> (<strong>40%</strong>{" "}
                sobre la puntuación total del concurso).
              </li>
            </ol>
          </li>
          <li>
            La fase de méritos se realizará de manera virtual y consiste en el
            análisis, verificación y calificación de los documentos presentados
            por la o el participante, según lo requerido por cada vacante.
          </li>
          <li>
            La fase de oposición se realizará de manera presencial y tiene tres
            componentes:
            <ol type="a" className="list-disc pl-4">
              <li>Clase demostrativa.</li>
              <li>Exposición pública.</li>
              <li>
                Prueba teórica-oral realizada a través de una entrevista al o a
                la participante.
              </li>
            </ol>
          </li>
          <li>
            Solo las y los participantes que obtengan un{" "}
            <strong>puntaje mínimo de 40</strong> sobre 50 en la fase de méritos
            serán convocados a la fase de oposición.
          </li>
        </ol>
      </div>
      <Footer />
    </LayoutWithNavbarPublic>

  );
}

export default Login;
